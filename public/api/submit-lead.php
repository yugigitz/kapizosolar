<?php
/**
 * Kapizo Solar — lead intake endpoint.
 *
 * Runs on Hostinger shared hosting (PHP). Accepts a JSON POST from the website
 * enquiry form, validates and sanitises it server-side, appends it to a durable
 * JSONL store OUTSIDE the web root, and emails it to the configured recipients.
 *
 * Storage happens before email. If the mail transport fails, the lead is still
 * captured on disk and the response says so, so a lead is never silently lost.
 *
 * No credentials are hardcoded. Everything sensitive is read from the
 * environment (see .env.example). Nothing about this file's configuration is
 * exposed to the browser.
 */

declare(strict_types=1);

// ---------------------------------------------------------------------------
// Configuration (environment only — never hardcode secrets)
// ---------------------------------------------------------------------------

/** Read an env var from getenv(), $_ENV/$_SERVER, or an optional .env file. */
function env(string $key, ?string $default = null): ?string
{
    static $dotenv = null;
    if ($dotenv === null) {
        $dotenv = [];
        // .env must live OUTSIDE the public web root.
        $path = __DIR__ . '/../../.env';
        if (is_readable($path)) {
            foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
                $line = trim($line);
                if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                    continue;
                }
                [$k, $v] = explode('=', $line, 2);
                $dotenv[trim($k)] = trim(trim($v), "\"'");
            }
        }
    }
    $v = getenv($key);
    if ($v !== false && $v !== '') return $v;
    if (!empty($_ENV[$key])) return (string) $_ENV[$key];
    if (!empty($dotenv[$key])) return $dotenv[$key];
    return $default;
}

$ALLOWED_ORIGINS = array_filter(array_map('trim', explode(',', (string) env('LEAD_ALLOWED_ORIGINS', 'https://kapizosolar.in,https://www.kapizosolar.in'))));
$TO              = array_filter(array_map('trim', explode(',', (string) env('LEAD_TO_EMAIL', ''))));
$FROM            = env('LEAD_FROM_EMAIL', '');
$SUBJECT_PREFIX  = env('LEAD_SUBJECT_PREFIX', '[Kapizo Lead]');
$STORE_PATH      = env('LEAD_STORE_PATH', __DIR__ . '/../../storage/leads.jsonl');
$RATE_LIMIT_MAX  = (int) env('LEAD_RATE_LIMIT_PER_HOUR', '20');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function respond(int $status, array $payload): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Collapse whitespace, strip control chars and cap length. */
function clean(mixed $v, int $max = 500): string
{
    if (!is_scalar($v)) return '';
    $s = (string) $v;
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
    $s = preg_replace('/\s+/u', ' ', $s) ?? '';
    $s = trim($s);
    return mb_substr($s, 0, $max);
}

/** Strip header-injection vectors from anything used in a mail header. */
function headerSafe(string $s): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d", "\t"], ' ', $s));
}

function clientIp(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) {
            $ip = explode(',', (string) $_SERVER[$k])[0];
            return trim($ip);
        }
    }
    return 'unknown';
}

// ---------------------------------------------------------------------------
// CORS / method
// ---------------------------------------------------------------------------

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed', 'message' => 'Use POST.']);
}

// ---------------------------------------------------------------------------
// Parse + validate
// ---------------------------------------------------------------------------

$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 20000) {
    respond(413, ['ok' => false, 'error' => 'payload_too_large', 'message' => 'Enquiry is too large.']);
}

$in = json_decode($raw, true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'bad_json', 'message' => 'Could not read the submitted data.']);
}

// Honeypot: real users never fill this hidden field.
if (clean($in['company'] ?? '') !== '') {
    // Accept silently so bots do not learn they were caught.
    respond(200, ['ok' => true, 'stored' => false, 'emailed' => false, 'reference' => 'n/a']);
}

$name  = clean($in['name'] ?? '', 120);
$phone = clean($in['phone'] ?? '', 30);
$city  = clean($in['city'] ?? '', 120);
$email = clean($in['email'] ?? '', 190);

$errors = [];
if (mb_strlen($name) < 2)  $errors['name']  = 'Please enter your name.';

$digits = preg_replace('/\D/', '', $phone) ?? '';
if (strlen($digits) < 10 || strlen($digits) > 13) {
    $errors['phone'] = 'Please enter a valid mobile number.';
} else {
    $digits = substr($digits, -10);
    if (!preg_match('/^[6-9]\d{9}$/', $digits)) {
        $errors['phone'] = 'Please enter a valid 10-digit Indian mobile number.';
    }
}

if (mb_strlen($city) < 2) $errors['city'] = 'Please enter your city or town.';

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address, or leave it blank.';
}

if ($errors) {
    respond(422, ['ok' => false, 'error' => 'validation_failed', 'fields' => $errors, 'message' => 'Please correct the highlighted fields.']);
}

$allowedTypes = ['Residential', 'Commercial', 'Industrial', 'Agricultural'];
$customerType = clean($in['customerType'] ?? '', 40);
if (!in_array($customerType, $allowedTypes, true)) $customerType = 'Residential';

$lead = [
    'reference'     => 'KPZ-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3))),
    'received_at'   => date('c'),
    'name'          => $name,
    'phone'         => $digits,
    'email'         => $email,
    'city'          => $city,
    'customer_type' => $customerType,
    'monthly_bill'  => clean($in['monthlyBill'] ?? '', 20),
    'system_size'   => clean($in['systemSize'] ?? '', 40),
    'plan'          => clean($in['plan'] ?? '', 60),
    'roof_type'     => clean($in['roofType'] ?? '', 60),
    'roof_area'     => clean($in['roofArea'] ?? '', 20),
    'message'       => clean($in['message'] ?? '', 2000),
    'source_page'   => clean($in['sourcePage'] ?? '', 200),
    'ip'            => clientIp(),
    'user_agent'    => clean($_SERVER['HTTP_USER_AGENT'] ?? '', 200),
];

// ---------------------------------------------------------------------------
// Rate limit (per IP, per hour) — cheap file-based guard against abuse
// ---------------------------------------------------------------------------

$storeDir = dirname($STORE_PATH);
if (!is_dir($storeDir)) @mkdir($storeDir, 0750, true);

$rlFile = $storeDir . '/ratelimit-' . sha1($lead['ip']) . '.txt';
$window = time() - 3600;
$hits = [];
if (is_readable($rlFile)) {
    $hits = array_filter(array_map('intval', explode(',', (string) file_get_contents($rlFile))), fn($t) => $t > $window);
}
if (count($hits) >= $RATE_LIMIT_MAX) {
    respond(429, ['ok' => false, 'error' => 'rate_limited', 'message' => 'Too many enquiries from this connection. Please call or WhatsApp us instead.']);
}
$hits[] = time();
@file_put_contents($rlFile, implode(',', $hits), LOCK_EX);

// ---------------------------------------------------------------------------
// 1) Persist first — a stored lead is never lost even if email fails
// ---------------------------------------------------------------------------

$stored = false;
$line = json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
if (@file_put_contents($STORE_PATH, $line, FILE_APPEND | LOCK_EX) !== false) {
    @chmod($STORE_PATH, 0640);
    $stored = true;
    // Protect the store if it ever ends up inside a web-served directory.
    $guard = $storeDir . '/.htaccess';
    if (!file_exists($guard)) @file_put_contents($guard, "Require all denied\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
}

// ---------------------------------------------------------------------------
// 2) Email notification
// ---------------------------------------------------------------------------

$emailed = false;
$mailError = null;

if (!$TO || !$FROM) {
    $mailError = 'mail_not_configured';
} else {
    $lines = [
        'New enquiry from kapizosolar.in',
        '',
        'Reference     : ' . $lead['reference'],
        'Received      : ' . $lead['received_at'],
        '',
        'Name          : ' . $lead['name'],
        'Mobile        : ' . $lead['phone'],
        'Email         : ' . ($lead['email'] !== '' ? $lead['email'] : '—'),
        'City          : ' . $lead['city'],
        'Customer type : ' . $lead['customer_type'],
        'Monthly bill  : ' . ($lead['monthly_bill'] !== '' ? '₹' . $lead['monthly_bill'] : '—'),
        'System size   : ' . ($lead['system_size'] !== '' ? $lead['system_size'] : '—'),
        'Preferred plan: ' . ($lead['plan'] !== '' ? $lead['plan'] : '—'),
        'Roof type     : ' . ($lead['roof_type'] !== '' ? $lead['roof_type'] : '—'),
        'Roof area     : ' . ($lead['roof_area'] !== '' ? $lead['roof_area'] . ' sq ft' : '—'),
        '',
        'Message / requirements:',
        $lead['message'] !== '' ? $lead['message'] : '—',
        '',
        '---',
        'Submitted from: ' . ($lead['source_page'] !== '' ? $lead['source_page'] : '—'),
        'Call: +91' . $lead['phone'],
        'WhatsApp: https://wa.me/91' . $lead['phone'],
    ];
    $body = implode("\r\n", $lines);

    $subjectBits = array_filter([$SUBJECT_PREFIX, $lead['customer_type'], $lead['name'], $lead['city']]);
    $subject = headerSafe(implode(' ', $subjectBits) . ' — ' . $lead['reference']);

    $headers = [
        'From: ' . headerSafe($FROM),
        'Reply-To: ' . headerSafe($lead['email'] !== '' ? $lead['email'] : $FROM),
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: kapizo-lead-intake',
    ];

    // -f sets the envelope sender, which shared hosts usually require.
    $ok = @mail(
        headerSafe(implode(', ', $TO)),
        $subject,
        $body,
        implode("\r\n", $headers),
        '-f' . headerSafe($FROM)
    );
    if ($ok) {
        $emailed = true;
    } else {
        $mailError = 'mail_send_failed';
    }
}

// ---------------------------------------------------------------------------
// Response — success only if the lead is durably captured somewhere
// ---------------------------------------------------------------------------

if (!$stored && !$emailed) {
    error_log('kapizo lead intake failed: store and mail both failed (' . ($mailError ?? 'unknown') . ')');
    respond(500, [
        'ok' => false,
        'error' => 'delivery_failed',
        'message' => 'We could not submit your enquiry. Please try again, or reach us on WhatsApp or by phone.',
    ]);
}

if (!$emailed) {
    // Stored but not emailed — still a captured lead, worth logging loudly.
    error_log('kapizo lead stored but not emailed (' . ($mailError ?? 'unknown') . '): ' . $lead['reference']);
}

respond(200, [
    'ok' => true,
    'reference' => $lead['reference'],
    'stored' => $stored,
    'emailed' => $emailed,
]);
