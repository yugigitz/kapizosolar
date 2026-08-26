/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      colors: {
        kapizo: {
          navy: '#0b1f3a',
          'navy-light': '#12305a',
          green: '#146c2e',
          'green-dark': '#0c4a1f',
          'green-light': '#4caf3f',
          // Brand orange. Use for decorative fills, icons and elements on dark
          // backgrounds. It is only 2.6:1 against white, so it must NOT carry
          // small text on light backgrounds or sit behind white button text.
          orange: '#f5820c',
          'orange-light': '#ffa53d',
          // Accessible orange: 5.05:1 against white in both directions.
          // Use for text on light backgrounds and for button fills under white text.
          'orange-deep': '#b35309',
          'orange-deep-hover': '#8f4207',
          amber: '#ffb300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,31,58,0.06), 0 8px 24px -8px rgba(11,31,58,0.12)',
        'card-hover': '0 4px 12px rgba(11,31,58,0.10), 0 16px 40px -12px rgba(11,31,58,0.18)',
      },
      backgroundImage: {
        'kapizo-gradient': 'linear-gradient(135deg, #0b1f3a 0%, #12305a 55%, #146c2e 100%)',
        'kapizo-radial': 'radial-gradient(circle at 30% 20%, rgba(245,130,12,0.18), transparent 55%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
