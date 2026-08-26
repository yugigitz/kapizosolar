export type Solution = {
  slug: string
  title: string
  audience: string
  summary: string
  typicalUse: string
  benefits: string[]
  systemOptions: string[]
  waKey: 'general' | 'commercial' | 'industrial' | 'agricultural'
}

export const solutions: Solution[] = [
  {
    slug: 'residential',
    title: 'Residential Rooftop Solar',
    audience: 'Independent houses, villas and apartment owners',
    summary:
      'Rooftop solar systems sized around your household consumption, designed to reduce your monthly electricity bill and give you long-term protection from tariff increases.',
    typicalUse: 'Typically 1 kW to 10 kW depending on your bill and available shadow-free roof area.',
    benefits: [
      'Reduces the units you buy from the grid every month',
      'Long asset life with low running cost',
      'Eligible for consideration under government rooftop solar schemes, subject to prevailing guidelines',
      'Adds a visible, long-term improvement to your property',
    ],
    systemOptions: ['On-grid', 'Hybrid with battery backup'],
    waKey: 'general',
  },
  {
    slug: 'commercial',
    title: 'Commercial Solar EPC',
    audience: 'Shops, showrooms, offices, hospitals, schools and commercial buildings',
    summary:
      'Commercial tariffs are usually higher than residential, which means each unit generated on your own roof displaces a more expensive unit from the grid.',
    typicalUse: 'Typically 10 kW to several hundred kW depending on load profile and roof area.',
    benefits: [
      'Offsets daytime consumption, which is when most commercial loads run',
      'Predictable long-term energy cost compared with rising tariffs',
      'Uses existing roof space that is otherwise unproductive',
      'Supports organisational sustainability commitments',
    ],
    systemOptions: ['On-grid', 'Hybrid', 'Solar with energy storage'],
    waKey: 'commercial',
  },
  {
    slug: 'industrial',
    title: 'Industrial Solar Solutions',
    audience: 'Factories, processing units, workshops and industrial sheds',
    summary:
      'Industrial roofs usually offer large, uninterrupted areas well suited to higher-capacity solar plants matched to a continuous daytime load.',
    typicalUse: 'Typically 50 kW and above, designed around your connected load and sanctioned demand.',
    benefits: [
      'Large shadow-free roof area is used productively',
      'Daytime generation aligns well with industrial shift operations',
      'Structured design accounting for load, protection and safety requirements',
      'Documentation support for approvals and metering',
    ],
    systemOptions: ['On-grid', 'Hybrid', 'Solar with energy storage'],
    waKey: 'industrial',
  },
  {
    slug: 'agricultural',
    title: 'Agricultural Solar Solutions',
    audience: 'Farms, agricultural pump sets and rural establishments',
    summary:
      'Solar solutions for agricultural applications, designed around pump capacity, water requirement and daily operating hours.',
    typicalUse: 'Sized to the pump rating and daily running hours rather than a monthly electricity bill.',
    benefits: [
      'Reduces dependence on grid supply timing for daytime operations',
      'Designed around actual pump load and duty cycle',
      'Suitable for locations with adequate open, shadow-free area',
      'Guidance on applicable schemes, subject to prevailing government guidelines',
    ],
    systemOptions: ['Solar pumping', 'On-grid', 'Hybrid'],
    waKey: 'agricultural',
  },
]

export const serviceList = [
  'Residential Rooftop Solar',
  'Commercial Solar EPC',
  'Industrial Solar Solutions',
  'Agricultural Solar Solutions',
  'On-Grid Solar Systems',
  'Hybrid Solar Systems',
  'Solar + Battery Energy Storage',
  'Solar System Design & Engineering',
  'Rooftop Site Assessment',
  'Installation & Commissioning',
  'Net Metering Assistance',
  'Subsidy / Scheme Documentation Assistance',
  'Electrical & Solar Balance-of-System Solutions',
  'Solar Maintenance & After-Sales Support',
]

export type SystemType = {
  id: string
  name: string
  flow: string[]
  bestFor: string
  explanation: string
  considerations: string[]
}

export const systemTypes: SystemType[] = [
  {
    id: 'on-grid',
    name: 'On-Grid Solar',
    flow: ['Solar Panels', 'Solar Inverter', 'Home / Business Loads', 'Grid'],
    bestFor: 'Customers whose main goal is reducing the monthly electricity bill.',
    explanation:
      'The system works alongside your grid connection. Solar powers your loads during the day, and anything extra can be exported to the grid where net metering is available. There is no battery, so the system does not run during a grid outage.',
    considerations: [
      'Lowest cost per kW of the three options',
      'No backup during a power cut, because the inverter must shut down for safety',
      'Requires DISCOM approval and a suitable meter for export',
    ],
  },
  {
    id: 'hybrid',
    name: 'Hybrid Solar',
    flow: ['Solar Panels', 'Hybrid Inverter', 'Loads + Battery', 'Grid'],
    bestFor: 'Customers who want bill reduction and backup for essential loads.',
    explanation:
      'A hybrid inverter manages solar, battery and grid together. Solar runs your loads and charges the battery. During an outage, the battery supplies your backed-up circuits.',
    considerations: [
      'Higher cost because of the battery and hybrid inverter',
      'Battery capacity is sized to the loads you want backed up, not the whole house',
      'Batteries have their own service life, separate from the panels',
    ],
  },
  {
    id: 'storage',
    name: 'Solar + Battery Storage',
    flow: ['Solar Panels', 'Inverter', 'Battery Bank', 'Loads'],
    bestFor: 'Sites with unreliable supply or a need to shift solar energy to evening use.',
    explanation:
      'Energy generated during the day is stored and used later. This is useful where grid supply is unreliable or where a meaningful part of consumption happens after sunset.',
    considerations: [
      'Storage adds cost and should be sized deliberately',
      'Round-trip losses mean stored energy is slightly less than energy generated',
      'Best decided after reviewing your actual consumption pattern',
    ],
  },
]

export const processSteps = [
  {
    step: 1,
    title: 'Requirement Discussion',
    detail:
      'We start with a conversation about your property, your electricity usage and what you want solar to achieve — bill reduction, backup, or both.',
  },
  {
    step: 2,
    title: 'Electricity Bill Analysis',
    detail:
      'Your recent bills tell us your actual consumption pattern, tariff category and sanctioned load. This is the foundation for correct sizing.',
  },
  {
    step: 3,
    title: 'Site Assessment',
    detail:
      'We assess usable roof area, orientation, shadow patterns through the day, structural suitability and the route for cabling and earthing.',
  },
  {
    step: 4,
    title: 'System Design & Proposal',
    detail:
      'You receive a system design with capacity, component selection, protection scheme, expected generation range and a clear commercial proposal.',
  },
  {
    step: 5,
    title: 'Installation & Commissioning',
    detail:
      'Mounting structure, modules, inverter, DC and AC protection, earthing and cabling are installed and tested before the system is commissioned.',
  },
  {
    step: 6,
    title: 'Documentation & Support',
    detail:
      'We assist with net metering paperwork and applicable scheme documentation, and remain available for after-sales support and maintenance guidance.',
  },
]

export const componentCategories = [
  {
    name: 'Solar Modules',
    what: 'The panels that convert sunlight into DC electricity.',
    selection:
      'Selected on efficiency, technology, warranty terms and suitability for your available roof area.',
  },
  {
    name: 'Inverters',
    what: 'Converts DC from the panels into AC usable by your loads and the grid.',
    selection:
      'Selected on system type (on-grid or hybrid), capacity matching, MPPT design and monitoring capability.',
  },
  {
    name: 'Mounting Structures',
    what: 'The structure that holds modules at the correct tilt and orientation.',
    selection:
      'Selected on roof type, wind loading, corrosion resistance and required tilt for your location.',
  },
  {
    name: 'Cables',
    what: 'DC and AC cabling connecting modules, inverter and your distribution board.',
    selection:
      'Sized for current-carrying capacity and voltage drop, with UV-rated cable used on exposed DC runs.',
  },
  {
    name: 'Protection Equipment',
    what: 'DC and AC protection devices, surge protection and earthing.',
    selection:
      'Specified so that both the DC and AC sides are protected and the system is safe to isolate for maintenance.',
  },
  {
    name: 'Energy Storage',
    what: 'Batteries used in hybrid and storage systems.',
    selection:
      'Selected on chemistry, usable capacity, cycle life and the specific loads you want backed up.',
  },
  {
    name: 'Monitoring',
    what: 'Lets you see generation and system status.',
    selection:
      'Depends on the inverter platform and whether you want per-string or system-level visibility.',
  },
]

export const whyKapizo = [
  {
    title: 'Engineering-First Approach',
    detail:
      'Sizing starts from your actual consumption and site conditions, not from a generic package list.',
  },
  {
    title: 'Quality-Focused Components',
    detail:
      'Components are selected on performance, warranty and suitability for the specific project rather than on lowest headline price alone.',
  },
  {
    title: 'Proper Electrical Protection',
    detail:
      'DC-side and AC-side protection and earthing are treated as part of the core design, not as optional extras.',
  },
  {
    title: 'Transparent System Explanation',
    detail:
      'You get a clear explanation of what is being installed, why that capacity, and what the realistic generation range is.',
  },
  {
    title: 'Clean Installation Practices',
    detail:
      'Cable routing, structure alignment and finishing are treated as part of the deliverable.',
  },
  {
    title: 'Documentation Assistance',
    detail:
      'Support with net metering and applicable scheme paperwork, subject to the requirements of the relevant authority.',
  },
  {
    title: 'After-Sales Support',
    detail:
      'Guidance on monitoring, cleaning schedules and service after the system is commissioned.',
  },
  {
    title: 'Telangana-Focused Service',
    detail:
      'Based in Mancherial and serving customers across Telangana, with local site access and follow-up.',
  },
]
