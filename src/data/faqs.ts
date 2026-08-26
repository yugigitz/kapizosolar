export type Faq = {
  q: string
  a: string
  category: 'basics' | 'sizing' | 'technical' | 'commercial' | 'scheme'
}

export const faqs: Faq[] = [
  {
    category: 'sizing',
    q: 'How much rooftop space is required for solar?',
    a: 'As a working rule, plan for roughly 80 to 100 sq ft of shadow-free area per kW for a standard rooftop installation. A 3 kW system therefore needs approximately 250 to 300 sq ft. The exact figure depends on module wattage and efficiency, the tilt and orientation of the structure, and the spacing needed to avoid row-to-row shading. Elevated structures over an existing roof slab can change the usable area considerably, so the number is confirmed during site assessment.',
  },
  {
    category: 'sizing',
    q: 'What size solar system do I need?',
    a: 'Sizing starts from your monthly consumption in units, not from your roof size. Take your average monthly units from recent bills and work back to the daily requirement, then size the system against the generation your location can realistically deliver. In Telangana, a well-installed 1 kW system commonly generates in the region of 4 to 4.5 units per day averaged over the year, though this varies with season, orientation, shading and system condition. Roof area, budget and your target bill offset then refine the final capacity.',
  },
  {
    category: 'technical',
    q: 'Does rooftop solar work during cloudy weather?',
    a: 'Yes, but at reduced output. Panels respond to available irradiance, so on an overcast day generation can drop substantially compared with a clear day. This is expected and is already accounted for when annual generation is estimated, which is why sizing uses a yearly average rather than a best-day figure. Monsoon months typically generate less than clear winter and pre-summer months.',
  },
  {
    category: 'basics',
    q: 'What is on-grid solar?',
    a: 'An on-grid system works alongside your existing grid connection with no battery. Solar powers your loads during the day, and where net metering is available, surplus generation can be exported to the grid and accounted against your consumption. Because there is no battery and the inverter is required to disconnect during a grid outage for line-worker safety, an on-grid system does not provide backup during a power cut. It is the lowest-cost configuration and suits customers whose main goal is bill reduction.',
  },
  {
    category: 'basics',
    q: 'What is hybrid solar?',
    a: 'A hybrid system uses an inverter that manages solar, battery and grid together. During the day, solar runs your loads and charges the battery. During an outage, the battery supplies the circuits you have chosen to back up. It costs more than on-grid because of the battery and the hybrid inverter, and the battery is sized to your essential loads rather than to the entire property.',
  },
  {
    category: 'technical',
    q: 'Do I need a battery?',
    a: 'Only if you need backup during outages or want to use solar energy after sunset. A battery does not increase how much electricity your panels generate — it stores what has already been generated so you can use it later, with a small round-trip loss. If your supply is reliable and your goal is bill reduction, an on-grid system without a battery usually gives better value. If outages are frequent or long, a hybrid system is worth the additional cost.',
  },
  {
    category: 'commercial',
    q: 'What is net metering?',
    a: 'Net metering is an arrangement with your electricity distribution company where a bi-directional meter records both the units you import from the grid and the units you export to it. Your billing then reflects the net position rather than gross consumption. Eligibility, capacity limits, the settlement method and the application process are set by the distribution company and applicable state regulations, and these can change. We assist with the documentation, but approval rests with the DISCOM.',
  },
  {
    category: 'commercial',
    q: 'How long does installation take?',
    a: 'For a typical residential rooftop system, the physical installation usually takes a few days once material is at site and the structure work begins. The overall timeline from order to a fully commissioned, net-metered system is longer because it includes design, procurement, installation, testing, and then the DISCOM application, inspection and meter change. Approval-related steps are handled by the distribution company, so we do not promise a guaranteed date for that portion.',
  },
  {
    category: 'technical',
    q: 'What maintenance does a solar system require?',
    a: 'The main routine requirement is keeping the module surface clean, since dust reduces output. In most Telangana locations, periodic cleaning through the dry and dusty months makes a visible difference. Beyond that, maintenance is largely inspection-based: checking mounting hardware, cable condition, earthing, protection devices and inverter status. There are no moving parts in the panels themselves, so the system is low-maintenance rather than no-maintenance.',
  },
  {
    category: 'commercial',
    q: 'What warranties apply?',
    a: 'Warranties come from the component manufacturers rather than from the installer, and they differ by component. Solar modules typically carry a product warranty and a separate long-term performance warranty; inverters carry their own manufacturer warranty with an option to extend on many models; batteries, structures and balance-of-system components each have their own terms. The exact warranty applicable to your system is stated in your proposal, based on the components actually selected for your project.',
  },
  {
    category: 'scheme',
    q: 'How does the government subsidy work?',
    a: 'Under the PM Surya Ghar rooftop solar scheme, eligible residential consumers can receive central financial assistance for a grid-connected rooftop system, applied through the national portal and processed with the involvement of your distribution company. The subsidy is credited to the applicant after installation and inspection, subject to the conditions in force. Eligibility rules, applicable amounts, capacity limits and procedural requirements are set by the government and can change, so verify the current position on the official portal before making a decision.',
  },
  {
    category: 'commercial',
    q: 'Can solar reduce my electricity bill completely?',
    a: 'It can substantially reduce it, but a bill rarely becomes exactly zero. Even with a well-sized system, most tariffs include fixed charges and duties that continue regardless of how many units you draw. Your consumption pattern also matters: a system sized to your annual units still imports from the grid at night and in low-generation months. A realistic goal is a large reduction in the energy component of the bill, with the exact outcome depending on sizing, tariff and consumption behaviour.',
  },
  {
    category: 'technical',
    q: 'What happens when there is no sunlight?',
    a: 'At night or during very low light, an on-grid system simply draws from the grid as it did before solar. A hybrid system draws from the battery first for the backed-up circuits, then falls back to the grid. This is why sizing is done against annual generation rather than assuming solar covers every hour.',
  },
  {
    category: 'commercial',
    q: 'Can commercial buildings install solar?',
    a: 'Yes, and commercial buildings are often good candidates. Commercial tariffs are typically higher than residential, so each unit generated on site displaces a more expensive unit. Commercial loads also tend to run during daylight hours, which aligns well with solar generation. Design considerations include the roof structure, available shadow-free area, connected load and the applicable net metering rules for your consumer category.',
  },
  {
    category: 'commercial',
    q: 'Can agricultural customers use solar?',
    a: 'Yes. Agricultural applications are usually sized differently from homes: instead of working backwards from a monthly bill, the system is sized to the pump rating, the water requirement and the daily operating hours. Open, shadow-free area availability is a key factor. Applicable schemes for agricultural solar differ from residential rooftop schemes and are subject to prevailing government guidelines.',
  },
  {
    category: 'commercial',
    q: 'How do I choose between Budget, Standard and Premium?',
    a: 'The three plans differ in component specification, protection scheme, monitoring, documentation support and whether battery backup is included. Budget covers the essentials correctly at the lowest entry cost and suits a straightforward bill-reduction goal. Standard upgrades module efficiency, monitoring and protection, and is what most residential customers choose. Premium adds a higher component tier, a hybrid or hybrid-ready inverter with a battery option, and priority support. The right choice depends on your budget, whether you need backup, and how long you intend to hold the asset.',
  },
]
