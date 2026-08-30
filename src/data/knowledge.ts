import { business } from './business'

export type ArticleSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type Article = {
  slug: string
  title: string
  summary: string
  /** Direct answer block for answer engines — stated first, before the detail. */
  directAnswer: string
  publishedISO: string
  updatedISO: string
  readMinutes: number
  sections: ArticleSection[]
  faqs?: { q: string; a: string }[]
  relatedLinks: { label: string; to: string }[]
  sources?: { label: string; href: string }[]
  seo: { title: string; description: string }
}

export const AUTHOR = business.name

export const articles: Article[] = [
  {
    slug: 'rooftop-solar-guide-telangana',
    title: 'Rooftop Solar Guide for Telangana',
    summary:
      'What a homeowner or business in Telangana needs to understand before installing rooftop solar: sizing, generation, costs, approvals and the decisions that actually matter.',
    directAnswer:
      'Rooftop solar in Telangana works well because the state receives strong year-round irradiance. A well-installed system commonly generates in the region of 4 to 4.5 units per kW per day averaged across the year. The main decisions are capacity (driven by your consumption, not your roof size), system type (on-grid for bill reduction, hybrid if you need backup), and component specification.',
    publishedISO: '2026-08-26',
    updatedISO: '2026-08-26',
    readMinutes: 8,
    sections: [
      {
        heading: 'Why Telangana suits rooftop solar',
        paragraphs: [
          'Telangana receives strong solar irradiance for most of the year, with a clear generation peak through the pre-summer and summer months and a dip during the monsoon. Averaged across a full year, a well-installed and unshaded system commonly generates in the region of 4 to 4.5 units per kW per day.',
          'That annual average is the number worth planning against. Sizing a system on a best-day figure produces a design that disappoints for most of the year, which is why we work backwards from your annual consumption rather than from peak output.',
        ],
      },
      {
        heading: 'Start with consumption, not roof size',
        paragraphs: [
          'The most common sizing mistake is starting from available roof area. Roof area sets an upper limit, but your electricity consumption sets the target. A system much larger than your consumption exports surplus you may not be fully compensated for; a system much smaller leaves you buying expensive units from the grid.',
          'Take your average monthly units from recent bills, convert to a daily figure, and divide by the expected generation per kW per day. That gives your target capacity. Then check whether your shadow-free roof area can physically accommodate it at roughly 80 to 100 sq ft per kW.',
        ],
      },
      {
        heading: 'Shading matters more than most people expect',
        paragraphs: [
          'Shading is not proportional. A parapet wall, a water tank, an overhead cable or a neighbouring building shading part of an array can reduce output disproportionately depending on how the modules are strung together.',
          'This is why a genuine site assessment involves looking at the shadow pattern through the day and across seasons, not just measuring the slab. It also drives design choices such as module layout, string configuration and whether an elevated structure is worth the additional cost.',
        ],
      },
      {
        heading: 'On-grid or hybrid',
        paragraphs: [
          'If your goal is reducing the bill and your supply is reasonably reliable, an on-grid system is the better value. It has no battery, costs less per kW, and offsets your daytime consumption.',
          'If outages are frequent or long enough to matter, a hybrid system with a battery keeps your essential circuits running. The battery is sized to those specific circuits, not to the whole property, and it adds meaningful cost. Deciding this honestly at the start avoids paying for backup you did not need or discovering you have none when you wanted it.',
        ],
      },
      {
        heading: 'What drives the cost',
        paragraphs: [
          'Cost per kW is driven by capacity, roof type, structure height, cable run length, component tier and the protection scheme. Larger systems generally cost less per kW than small ones because fixed costs are spread further.',
          'Be cautious of quotes that are substantially cheaper than others for the same capacity. The savings usually come from somewhere specific: thinner protection on the DC side, a lighter structure, longer payment terms to the installer, or components with weaker warranty terms. Ask what specifically differs rather than treating price as the only variable.',
        ],
      },
      {
        heading: 'Approvals and net metering',
        paragraphs: [
          'A grid-connected system requires an application to your distribution company, technical feasibility approval, inspection after installation, and a meter change for net metering. These steps are controlled by the DISCOM, and timelines vary.',
          'Any installer promising a guaranteed approval date is describing something they do not control. What a good installer can do is prepare the documentation correctly, so the application is not delayed by avoidable errors.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How much does rooftop solar cost in Telangana?',
        a: 'Cost depends on capacity, roof type, structure height, cable runs and component selection, so a single figure would be misleading. Larger systems cost less per kW than small ones. The reliable way to get a number is a site assessment followed by a written quote against your actual roof, with the specification stated line by line so you can compare quotes meaningfully.',
      },
      {
        q: 'How many units will a rooftop solar system generate in Telangana?',
        a: 'As an annual average, plan for roughly 4 to 4.5 units per kW per day for a well-installed, unshaded system. A 3 kW system therefore generates in the region of 12 to 13 units per day averaged across the year, generating more in clear pre-summer months and less during the monsoon.',
      },
    ],
    relatedLinks: [
      { label: 'Calculate your system size', to: '/solar-calculator' },
      { label: 'Residential rooftop solar', to: '/solutions/residential' },
      { label: 'Compare Kapizo plans', to: '/plans' },
    ],
    seo: {
      title: 'Rooftop Solar Guide for Telangana | Kapizo Solar',
      description:
        'A practical guide to rooftop solar in Telangana: expected generation, how to size your system, shading, cost drivers, on-grid vs hybrid, and DISCOM approvals.',
    },
  },
  {
    slug: 'on-grid-vs-hybrid-solar',
    title: 'On-Grid vs Hybrid Solar: Which Should You Choose?',
    summary:
      'The practical difference between on-grid and hybrid solar systems, what each costs you, and how to decide which one your property actually needs.',
    directAnswer:
      'Choose on-grid if your goal is reducing your electricity bill and your grid supply is reliable. It costs less per kW and has no battery to replace. Choose hybrid if you need power during outages. The deciding question is not which is technically better, but whether you need backup: a hybrid system costs meaningfully more and that cost only pays off if outages actually affect you.',
    publishedISO: '2026-08-26',
    updatedISO: '2026-08-26',
    readMinutes: 6,
    sections: [
      {
        heading: 'How an on-grid system works',
        paragraphs: [
          'An on-grid system connects your solar array to your existing grid connection through an inverter. During daylight, solar powers your loads directly. If you generate more than you are consuming, the surplus can be exported to the grid where net metering is available.',
          'There is no battery. During a grid outage the inverter disconnects automatically and the system stops producing. This is a safety requirement, not a fault. It prevents your system from energising lines that utility staff may be working on.',
        ],
      },
      {
        heading: 'How a hybrid system works',
        paragraphs: [
          'A hybrid system uses an inverter capable of managing three sources at once: solar, battery and grid. Solar powers your loads and charges the battery during the day. When the grid fails, the inverter isolates from the grid and continues supplying your backed-up circuits from the battery.',
          'The key design decision is which circuits get backed up. Backing up the entire property requires a much larger battery than backing up lights, fans, a fridge and a few sockets. Most customers are better served by a carefully chosen subset.',
        ],
      },
      {
        heading: 'What the difference costs you',
        paragraphs: [
          'A hybrid system costs more for two reasons: the hybrid inverter itself, and the battery. The battery is usually the larger share, and unlike the modules, it has a finite cycle life and will need replacement at some point during the system life.',
          'This is the honest trade-off. A battery does not generate additional electricity. It stores what has already been generated, with a small round-trip loss. If your supply is reliable, that money buys you nothing you would notice. If outages are frequent, it buys you something you would notice immediately.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Ask yourself how many hours of outage you experienced in the last year and how much they actually disrupted you. If the honest answer is "not much", an on-grid system is the better use of the same budget. You could install more capacity instead and offset more of your bill.',
          'If outages are regular, or if you have equipment that cannot tolerate interruption, hybrid is worth it. A middle path also exists: specify a hybrid-ready inverter now and add the battery later. This costs slightly more upfront than a plain on-grid inverter but preserves the option without paying for the battery today.',
        ],
        bullets: [
          'Reliable supply, goal is bill reduction → on-grid',
          'Frequent or long outages → hybrid with battery',
          'Unsure, but want to keep options open → hybrid-ready inverter, battery added later',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I add a battery to an on-grid system later?',
        a: 'Only if the inverter supports it. A standard on-grid string inverter cannot simply have a battery attached. You would need to replace the inverter or add separate equipment. If there is any chance you will want backup later, specify a hybrid-ready inverter at the design stage. Tell your installer this before the design is finalised, not after installation.',
      },
      {
        q: 'Why does my solar system stop working during a power cut?',
        a: 'If you have an on-grid system, this is expected behaviour and not a fault. Grid-tied inverters are required to disconnect when grid supply fails, so that your system cannot energise the distribution lines while utility staff may be working on them. Only a hybrid or off-grid system with a battery can continue supplying your loads during an outage.',
      },
    ],
    relatedLinks: [
      { label: 'Compare system types', to: '/solutions#system-types' },
      { label: 'High Performance option with battery backup', to: '/plans/high-performance' },
      { label: 'Calculate your system size', to: '/solar-calculator' },
    ],
    seo: {
      title: 'On-Grid vs Hybrid Solar Explained | Kapizo Solar',
      description:
        'On-grid or hybrid solar? Understand how each works, what the battery really costs you, why on-grid systems stop during outages, and how to choose for your property.',
    },
  },
  {
    slug: 'how-to-choose-solar-system-size',
    title: 'How to Choose Your Solar System Size',
    summary:
      'A step-by-step method for working out the rooftop solar capacity you actually need, using your electricity bill rather than guesswork.',
    directAnswer:
      'Size your system from your electricity consumption, not your roof area. Take your average monthly units from recent bills, divide by 30 for daily consumption, then divide by the expected generation per kW per day (about 4.2 units in Telangana). That gives your target capacity in kW. Then confirm your shadow-free roof area can hold it at roughly 80 to 100 sq ft per kW.',
    publishedISO: '2026-08-26',
    updatedISO: '2026-08-26',
    readMinutes: 5,
    sections: [
      {
        heading: 'Step 1: Find your actual consumption in units',
        paragraphs: [
          'Your bill shows consumption in units (kWh). Take an average across several recent bills rather than a single month, because consumption varies seasonally. Air conditioning in summer changes the picture substantially.',
          'If you only have the rupee amount and not the units, divide the energy charge by your tariff per unit. Be aware that most bills also include fixed charges and duties that are not proportional to consumption, so dividing the total bill by the tariff overstates your usage.',
        ],
      },
      {
        heading: 'Step 2: Convert to a daily figure',
        paragraphs: [
          'Divide your average monthly units by 30. A household consuming 400 units a month is using roughly 13 units a day. This is the number your system needs to generate to offset your consumption on an annual basis.',
        ],
      },
      {
        heading: 'Step 3: Divide by expected generation per kW',
        paragraphs: [
          'For Telangana, plan against roughly 4.2 units per kW per day as an annual average. Our example household needing 13 units a day would therefore need approximately 3 kW.',
          'This is the point where the calculation becomes an estimate rather than arithmetic. The actual figure for your roof depends on orientation, tilt, shading and the specification of the components used.',
        ],
      },
      {
        heading: 'Step 4: Check your roof can hold it',
        paragraphs: [
          'At roughly 80 to 100 sq ft per kW, a 3 kW system needs approximately 250 to 300 sq ft of shadow-free area. If your available area is smaller, you have three options: install a smaller system and accept a partial offset, use higher-efficiency modules to fit more capacity into the same area, or use an elevated structure that lets you build over an area you also want to keep using.',
        ],
      },
      {
        heading: 'Step 5: Sanity-check against your goals and budget',
        paragraphs: [
          'A system sized to fully offset annual consumption is a reasonable default, but it is not the only sensible choice. Some customers deliberately install less because of budget, planning to expand later. Others install more because they expect consumption to grow: an electric vehicle, an additional floor, a new air conditioner.',
          'What matters is that the number is deliberate. A capacity chosen because it was the package on offer, rather than because it matched consumption, is the most common reason customers are disappointed with their results.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What size solar system do I need for a 3000 rupee electricity bill?',
        a: 'It depends on your tariff. At around ₹7.5 per unit for a residential connection, a ₹3,000 bill corresponds to roughly 400 units a month, or about 13 units a day. At an annual average of 4.2 units per kW per day, that suggests approximately a 3 kW system. Your own tariff and slab structure will shift this figure, so use your actual units rather than the rupee amount where possible.',
      },
      {
        q: 'Should I install a bigger system than I need?',
        a: 'Usually not by much. Surplus exported to the grid is settled according to your DISCOM\'s net metering rules, which may not compensate you at the same rate you pay for imported units. Modest headroom for future consumption growth is reasonable. Significantly oversizing on the assumption that export is as valuable as self-consumption generally is not.',
      },
    ],
    relatedLinks: [
      { label: 'Use the solar calculator', to: '/solar-calculator' },
      { label: 'System size guide', to: '/#size-guide' },
      { label: 'Compare Kapizo plans', to: '/plans' },
    ],
    seo: {
      title: 'How to Choose Your Solar System Size | Kapizo Solar',
      description:
        'A step-by-step method for sizing rooftop solar from your electricity bill: converting to units, calculating capacity, checking roof area and sanity-checking the result.',
    },
  },
  {
    slug: 'net-metering-explained',
    title: 'Net Metering Explained',
    summary:
      'What net metering is, how the billing works, what your DISCOM controls, and why it changes the economics of rooftop solar.',
    directAnswer:
      'Net metering is an arrangement where a bi-directional meter records both the electricity you import from the grid and the surplus you export to it, and your bill reflects the net position. It matters because it lets a solar system offset consumption that happens outside daylight hours. Eligibility, capacity limits and settlement rules are set by your distribution company and applicable state regulations.',
    publishedISO: '2026-08-26',
    updatedISO: '2026-08-26',
    readMinutes: 5,
    sections: [
      {
        heading: 'What the meter actually does',
        paragraphs: [
          'A conventional meter records only what you draw from the grid. A bi-directional meter records two quantities separately: units imported and units exported. Your billing is then calculated on the relationship between them rather than on gross consumption alone.',
          'Practically, this means your solar generation during the day can offset consumption at night, subject to how your DISCOM settles the export.',
        ],
      },
      {
        heading: 'Why it matters for the economics',
        paragraphs: [
          'Without net metering, only the solar energy you consume at the moment it is generated has value. Anything generated while you are out of the house would be wasted. Net metering captures that surplus, which substantially improves the return on a system sized to your annual consumption.',
          'This is also why net metering rules affect optimal system sizing. If export is settled at a lower rate than import, a system sized well beyond your consumption becomes less attractive.',
        ],
      },
      {
        heading: 'What your DISCOM controls',
        paragraphs: [
          'The distribution company sets eligibility by consumer category, capacity limits relative to your sanctioned load, the technical requirements your installation must meet, the inspection process, and how the settlement is calculated and carried forward.',
          'These rules are set by regulation and can change. Any installer stating them as fixed permanent facts is overstating the position. What we can do is tell you what applies at the time of your enquiry and prepare the application correctly.',
        ],
      },
      {
        heading: 'The application process',
        paragraphs: [
          'In outline: you apply to the DISCOM, the application is assessed for technical feasibility on your connection, the system is installed to the applicable specifications, an inspection is carried out, and the bi-directional meter is installed.',
          'Timelines depend on the DISCOM, not the installer. What a good installer controls is submitting complete and correct documentation so the application is not delayed by avoidable errors.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I get paid for the solar electricity I export?',
        a: 'It depends on your DISCOM\'s settlement mechanism. In many net metering arrangements, exported units offset imported units rather than generating a cash payment, with any remaining surplus carried forward or settled at a specified rate at the end of a settlement period. Confirm the current arrangement for your consumer category with your distribution company.',
      },
      {
        q: 'Is net metering available for commercial connections?',
        a: 'Availability and terms differ by consumer category and are set by state regulation. Commercial and industrial connections often have different capacity limits and settlement terms than residential ones. We confirm what applies to your specific connection category during the design stage.',
      },
    ],
    relatedLinks: [
      { label: 'PM Surya Ghar scheme explained', to: '/pm-surya-ghar' },
      { label: 'Residential rooftop solar', to: '/solutions/residential' },
      { label: 'Calculate your system size', to: '/solar-calculator' },
    ],
    seo: {
      title: 'Net Metering Explained | Kapizo Solar',
      description:
        'How net metering works for rooftop solar: bi-directional metering, how billing is settled, what your DISCOM controls, and why it affects the right system size.',
    },
  },
  {
    slug: 'solar-maintenance-guide',
    title: 'Rooftop Solar Maintenance Guide',
    summary:
      'What rooftop solar actually needs after commissioning: cleaning, inspection, monitoring, and the failure points worth knowing about.',
    directAnswer:
      'Rooftop solar is low-maintenance rather than no-maintenance. The main routine requirement is keeping modules clean, since dust noticeably reduces output in Telangana conditions. Beyond that, maintenance is inspection-based: checking mounting hardware, cable condition, earthing, protection devices and inverter status periodically.',
    publishedISO: '2026-08-26',
    updatedISO: '2026-08-26',
    readMinutes: 5,
    sections: [
      {
        heading: 'Cleaning',
        paragraphs: [
          'Dust accumulation is the most common cause of underperformance, and it is the easiest to fix. In dry, dusty months the drop in output between a clean and a soiled array is visible in the monitoring data.',
          'Clean in the early morning or evening when the modules are cool. Spraying cold water on hot glass is not good practice. Use water and a soft brush. Avoid abrasive materials, harsh detergents and walking on the modules.',
        ],
      },
      {
        heading: 'What to inspect periodically',
        paragraphs: [
          'Beyond cleaning, a periodic visual inspection catches most developing issues before they become failures.',
        ],
        bullets: [
          'Mounting structure: check for loose fasteners, corrosion and any movement',
          'Cabling: check for UV degradation, chafing where cables pass over edges, and secure routing',
          'Earthing connections: check for corrosion and tightness',
          'DC and AC protection devices: confirm they are intact and accessible',
          'Inverter: check for error codes, unusual noise, ventilation obstruction and dust ingress',
          'Modules: check for visible damage, hot spots, discoloration or delamination',
        ],
      },
      {
        heading: 'Monitoring is your early warning',
        paragraphs: [
          'If your system has monitoring, use it. A gradual decline in daily generation relative to comparable days usually indicates soiling. A sudden drop indicates something specific: a tripped protection device, an inverter fault, or a string that has gone offline.',
          'This is one of the practical reasons to specify monitoring rather than treating it as a luxury. Without it, an underperforming string can go unnoticed for months.',
        ],
      },
      {
        heading: 'What tends to fail, and when',
        paragraphs: [
          'Modules are the most durable part of the system and typically carry long performance warranties. The inverter is an electronic device with a shorter service life than the modules, and it is the component most likely to need replacement during the system life. Batteries, where fitted, have a defined cycle life and are a planned replacement rather than an unexpected failure.',
          'Cable and connector issues, particularly at DC connectors exposed to weather, are a more common source of problems than most customers expect. Quality of the original installation matters here more than any maintenance you can perform afterwards.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How often should solar panels be cleaned?',
        a: 'It depends on local dust conditions. In dry, dusty periods in Telangana, more frequent cleaning is worthwhile; during and after monsoon rain, less. Rather than fixing a rigid schedule, watch your generation data. A steady decline relative to comparable days is the signal that cleaning is due.',
      },
      {
        q: 'Does rooftop solar need an annual maintenance contract?',
        a: 'Not necessarily, but periodic professional inspection is worthwhile, particularly for larger systems where you cannot easily inspect the array yourself. The value is in checking the things that are not visible from the ground: connector condition, earthing integrity, structure fasteners and inverter internals.',
      },
    ],
    relatedLinks: [
      { label: 'Kapizo after-sales support', to: '/about' },
      { label: 'Compare Kapizo plans', to: '/plans' },
      { label: 'Contact Kapizo Solar', to: '/contact' },
    ],
    seo: {
      title: 'Rooftop Solar Maintenance Guide | Kapizo Solar',
      description:
        'What rooftop solar maintenance actually involves: cleaning frequency, what to inspect, how to use monitoring data, and which components fail first.',
    },
  },
  {
    slug: 'solar-panel-installation-mancherial',
    title: 'Solar Panel Installation in Mancherial, Telangana',
    summary:
      'What installing rooftop solar in Mancherial actually involves: generation you can expect, roof and shading realities, the DISCOM process, and how the local picture differs from the rest of Telangana.',
    directAnswer:
      'Rooftop solar performs well in Mancherial for the same reason it does across Telangana: strong year-round irradiance, commonly around 4 to 4.5 units per kW per day averaged over a year. What varies locally is roof construction, shading from adjacent buildings and water tanks, and which DISCOM office handles your net metering application. Capacity should be sized from your electricity consumption rather than from available roof area.',
    publishedISO: '2026-08-30',
    updatedISO: '2026-08-30',
    readMinutes: 7,
    sections: [
      {
        heading: 'What generation to expect in Mancherial',
        paragraphs: [
          'Mancherial sits within the same strong irradiance band as most of Telangana. A well-installed, unshaded system commonly averages in the region of 4 to 4.5 units per kW per day across a full year, peaking through the pre-summer months and dipping through the monsoon.',
          'Plan against the annual average rather than a good day in March. Sizing on peak output produces a system that disappoints for most of the year, and it is the single most common cause of a customer feeling misled after installation.',
        ],
      },
      {
        heading: 'Roof realities on local buildings',
        paragraphs: [
          'Most residential roofs we assess locally are flat RCC slabs, which suit ballasted or bolted mounting structures and give reasonable freedom over module orientation. That is an advantage over pitched roofs, where orientation is fixed by the building.',
          'The constraints that actually bite are parapet walls, overhead water tanks, staircase headrooms and the proximity of neighbouring buildings. Each casts a shadow that moves through the day, and shading is not proportional: a small shadow across the wrong part of a string can cut output well beyond the area it covers.',
        ],
      },
      {
        heading: 'Sizing from consumption, not from the terrace',
        paragraphs: [
          'Bring two or three recent electricity bills. Average monthly units, divided by 30, divided by the daily generation per kW, gives the capacity that matches your usage. Roof area then tells you whether that capacity physically fits, at roughly 90 sq ft of shadow-free space per kW.',
          'If the roof cannot hold what your consumption justifies, an elevated structure is sometimes worth costing out. If your consumption is modest, resist the temptation to fill the slab: surplus exported at a settlement rate lower than your tariff is worth less than a unit you consume yourself.',
        ],
      },
      {
        heading: 'The approval and metering process',
        paragraphs: [
          'A grid-connected system needs DISCOM approval and a suitable meter for export. The application, inspection and meter change run on the DISCOM\u2019s timelines, not the installer\u2019s, and that is worth knowing before you plan around a date.',
          'An installer can prepare the documentation, submit correctly the first time and follow it through, which usually matters more than any promise about speed. Ask who handles the paperwork and what happens if the inspection raises an objection.',
        ],
      },
      {
        heading: 'Being local, and what it is worth',
        paragraphs: [
          'We are based in Mancherial and work across Mancherial and other locations in Telangana. The physics of generation does not change across the state; what changes is how quickly someone can be on your roof for the site visit, and whether they come back when something needs attention in year three.',
          'That is the practical argument for a local installer, and it is a fair one to test: ask where the team is based and who attends a service call.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I install rooftop solar in Mancherial?',
        a: 'Yes. Mancherial receives strong irradiance year-round and the approval and net metering process runs through the local DISCOM in the normal way for Telangana.',
      },
      {
        q: 'How much roof do I need for a 3 kW system?',
        a: 'Roughly 270 sq ft of genuinely shadow-free area, at about 90 sq ft per kW. Usable area is what matters: parapet setbacks, tank shadows and walkways all reduce it.',
      },
      {
        q: 'Does Kapizo Solar work only in Mancherial?',
        a: 'No. We are based in Mancherial and take on work across Mancherial and other locations in Telangana.',
      },
    ],
    relatedLinks: [
      { label: 'Solar Savings Calculator', to: '/solar-calculator' },
      { label: 'Rooftop Solar Guide for Telangana', to: '/solar-knowledge/rooftop-solar-guide-telangana' },
      { label: 'Get a Solar Quote', to: '/contact' },
    ],
    seo: {
      title: 'Solar Panel Installation in Mancherial, Telangana | Kapizo Solar',
      description:
        'What rooftop solar installation in Mancherial involves: expected generation, roof and shading constraints, sizing from your electricity bill, and the DISCOM approval and net metering process in Telangana.',
    },
  },
  {
    slug: 'solar-payback-period-telangana',
    title: 'Solar Payback Period in Telangana',
    summary:
      'How to work out when a rooftop solar system pays for itself, which variables move the answer most, and why a published payback figure is usually worth ignoring.',
    directAnswer:
      'Payback period is the installed cost divided by the annual saving. The saving side can be estimated reliably from your consumption, tariff and expected generation. The cost side depends on capacity, roof type, structure and components, so it comes from a written quotation for your property rather than from a published rate. A higher tariff, higher daytime self-consumption and an unshaded roof all shorten payback.',
    publishedISO: '2026-08-30',
    updatedISO: '2026-08-30',
    readMinutes: 6,
    sections: [
      {
        heading: 'The calculation, and why half of it is easy',
        paragraphs: [
          'Payback is installed cost divided by annual saving. The annual saving is estimable to a useful degree of accuracy: take expected generation, work out how much of it replaces units you would otherwise buy, and value those at your tariff.',
          'The cost side is the harder half, and it is site-specific. Capacity, roof type, structure height, cable runs and component selection all move it. This is why we do not publish a price per kW: a single figure would be wrong for most roofs, and a payback period built on a wrong figure is worse than no figure at all.',
        ],
      },
      {
        heading: 'What shortens payback',
        paragraphs: [
          'Three things dominate, and only one of them is about the hardware.',
        ],
        bullets: [
          'A higher tariff: every unit avoided is worth exactly what you would have paid for it',
          'Higher self-consumption: units used as they are generated carry full retail value, while exported surplus is settled on DISCOM terms',
          'An unshaded, well-oriented roof: shading reduces generation disproportionately',
        ],
      },
      {
        heading: 'Why commercial payback is often shorter',
        paragraphs: [
          'Commercial and industrial consumers usually pay a higher tariff and consume more during daylight hours, when a rooftop system is generating. Both factors raise the value of each generated unit, so the same capacity pays back faster than it would on a home with a low tariff and mostly evening consumption.',
          'For a household, the equivalent lever is shifting flexible loads into daylight: pumping, washing, and anything else that can run at noon rather than at nine in the evening.',
        ],
      },
      {
        heading: 'What payback does not capture',
        paragraphs: [
          'Payback is a single number and it hides things. It says nothing about the years after payback, when the system continues generating with no capital left to recover. It says nothing about component life, degradation or maintenance, and it says nothing about the value of insulation from future tariff increases.',
          'Treat it as one input among several rather than the decision itself.',
        ],
      },
      {
        heading: 'Subsidy and the payback figure',
        paragraphs: [
          'Central financial assistance under PM Surya Ghar, where an applicant is eligible, reduces the net cost and therefore shortens payback. It is decided by the government and your DISCOM under the prevailing scheme rules, and it is not something an installer can promise.',
          'Work out payback both ways: on the full cost, and on the cost net of assistance you have actually been sanctioned. The first is the figure you can rely on.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I calculate solar payback period?',
        a: 'Divide the installed cost from your written quotation by the estimated annual saving. Estimate the saving from your consumption, tariff and expected generation — the Solar Savings Calculator does that part from your monthly bill.',
      },
      {
        q: 'Why does this site not publish a payback figure?',
        a: 'Because publishing one requires assuming a price per kW, and a single assumed rate would be wrong for most roofs. We show the savings side and leave the cost side to a quotation for your actual property.',
      },
      {
        q: 'Does a bigger system pay back faster?',
        a: 'Not automatically. A system larger than your consumption exports more surplus, and exported units are settled on DISCOM terms rather than at your retail tariff, so the marginal capacity can pay back more slowly than the first few kilowatts.',
      },
    ],
    relatedLinks: [
      { label: 'Solar Savings Calculator', to: '/solar-calculator' },
      { label: 'Solar Loan EMI Calculator', to: '/solar-loan-emi' },
      { label: 'PM Surya Ghar', to: '/pm-surya-ghar' },
    ],
    seo: {
      title: 'Solar Payback Period in Telangana: How to Calculate It | Kapizo Solar',
      description:
        'How to work out the payback period for rooftop solar in Telangana, which factors shorten it, why published payback figures mislead, and how subsidy and self-consumption change the answer.',
    },
  },
  {
    slug: 'solar-loan-vs-upfront-payment',
    title: 'Solar Loan or Paying Upfront: How to Decide',
    summary:
      'A straightforward comparison of financing a rooftop solar system against paying for it outright, including what an EMI actually costs you and what to check with a lender.',
    directAnswer:
      'Paying upfront costs nothing in interest and is cheaper in absolute terms. A loan spreads the cost so the system can be installed sooner and the bill reduction starts sooner, at the price of the interest. The comparison worth making is total interest against the value of installing earlier, plus whatever else the capital would have done. Kapizo Solar is not a lender and the terms come from your bank.',
    publishedISO: '2026-08-30',
    updatedISO: '2026-08-30',
    readMinutes: 6,
    sections: [
      {
        heading: 'What financing actually costs',
        paragraphs: [
          'A solar loan is an ordinary reducing-balance retail loan. The instalment is fixed; the interest share of it falls over the term as the outstanding balance drops. Total interest is the total repaid minus the amount borrowed, and it rises with both the rate and the tenure.',
          'Model it before you decide. A longer tenure makes the monthly figure comfortable and the loan more expensive overall, and the difference between a five-year and a ten-year term at the same rate is usually larger than people expect.',
        ],
      },
      {
        heading: 'The comparison that matters',
        paragraphs: [
          'Set the monthly instalment against the monthly bill reduction the system is expected to deliver. If the saving covers a meaningful share of the instalment, the system is partly financing itself while you repay, and the full saving continues once the loan closes.',
          'Estimate the saving side first, from your consumption and tariff, then bring that figure to the EMI calculation. Compare monthly against monthly, and do it before any subsidy, since assistance is decided separately and is not guaranteed.',
        ],
      },
      {
        heading: 'What to ask a lender',
        paragraphs: [
          'The interest rate is not the whole cost, and two offers with the same headline rate can differ materially once the rest is counted.',
        ],
        bullets: [
          'Processing fee, and whether it is deducted from the disbursed amount',
          'Fixed or floating rate, and what a floating rate is benchmarked to',
          'Whether any insurance is bundled, and whether it is optional',
          'Prepayment and foreclosure terms, and any charge for closing early',
          'Documentation, inspection or legal fees charged separately',
          'Whether disbursement is staged against installation milestones',
        ],
      },
      {
        heading: 'A note on what an installer can and cannot tell you',
        paragraphs: [
          'Kapizo Solar does not lend, does not broker finance and has no tie-up with any lender. We can size the system and estimate the saving; approval, rates, fees and eligibility are entirely between you and your bank.',
          'Be cautious of any installer who quotes you a guaranteed rate or promises approval. Those are the lender\u2019s to give, and an installer who offers them is describing something they do not control.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a solar loan worth it?',
        a: 'It depends on whether installing sooner is worth the interest. Financing starts the bill reduction earlier; paying upfront avoids the interest entirely. Work out the total interest on the tenure you are considering and weigh it against a year or two of earlier savings.',
      },
      {
        q: 'How much EMI will I pay on a solar loan?',
        a: 'It follows from the amount, rate and tenure. The Solar Loan EMI Calculator returns the instalment, the total interest and the total repayment from those three inputs.',
      },
      {
        q: 'Does PM Surya Ghar pay for a solar loan?',
        a: 'No. PM Surya Ghar provides central financial assistance for eligible residential grid-connected systems; it is not a loan product. Assistance and financing are separate processes decided by different parties.',
      },
    ],
    relatedLinks: [
      { label: 'Solar Loan EMI Calculator', to: '/solar-loan-emi' },
      { label: 'Solar Savings Calculator', to: '/solar-calculator' },
      { label: 'Solar Payback Period in Telangana', to: '/solar-knowledge/solar-payback-period-telangana' },
    ],
    seo: {
      title: 'Solar Loan or Upfront Payment: How to Decide | Kapizo Solar',
      description:
        'Comparing a rooftop solar loan against paying upfront: what the interest actually costs, how EMI compares with electricity bill savings, and the charges to check with a lender before committing.',
    },
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
