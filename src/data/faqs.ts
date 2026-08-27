export type Faq = {
  q: string
  a: string
  category: 'basics' | 'sizing' | 'technical' | 'commercial' | 'scheme'
}

export const faqs: Faq[] = [
  {
    category: 'sizing',
    q: 'How much roof space do I need for solar?',
    a: 'Roughly 80 to 100 sq ft of shadow-free terrace per kW. So a 3 kW system needs about 250 to 300 sq ft — a little under a third of a typical 1,000 sq ft terrace. The exact figure depends on module wattage and efficiency, the tilt and orientation of the structure, and the spacing needed to avoid row-to-row shading. Elevated structures over an existing roof slab can change the usable area considerably, so the number is confirmed during site assessment.',
  },
  {
    category: 'sizing',
    q: 'What size solar system do I need for my home?',
    a: 'Work it out from your bill, not from your terrace size. Sizing starts from your monthly consumption in units. Take your average monthly units from recent bills and work back to the daily requirement, then size the system against the generation your location can realistically deliver. In Telangana, a well-installed 1 kW system commonly generates in the region of 4 to 4.5 units per day averaged over the year, though this varies with season, orientation, shading and system condition. Roof area, budget and your target bill offset then refine the final capacity.',
  },
  {
    category: 'technical',
    q: 'Will solar work on cloudy and rainy days?',
    a: 'Yes, but the panels generate less. They work on whatever light reaches them, so on a heavily overcast day output can fall well below a clear day. This is expected and is already accounted for when annual generation is estimated, which is why sizing uses a yearly average rather than a best-day figure. Monsoon months typically generate less than clear winter and pre-summer months.',
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
    q: 'Do I really need a battery?',
    a: 'Only if you need power during cuts, or want to use solar energy after sunset. A battery does not increase how much electricity your panels generate — it stores what has already been generated so you can use it later, with a small round-trip loss. If your supply is reliable and your goal is bill reduction, an on-grid system without a battery usually gives better value. If outages are frequent or long, a hybrid system is worth the additional cost.',
  },
  {
    category: 'commercial',
    q: 'What is net metering?',
    a: 'It is the arrangement that lets your daytime solar offset your night-time usage. Your DISCOM installs a bi-directional meter that records both the units you import from the grid and the units you export to it. Your billing then reflects the net position rather than gross consumption. Eligibility, capacity limits, the settlement method and the application process are set by the distribution company and applicable state regulations, and these can change. We assist with the documentation, but approval rests with the DISCOM.',
  },
  {
    category: 'commercial',
    q: 'How long will the whole installation take?',
    a: 'The work on your terrace is usually a few days. Once material is at site and the structure work begins, a typical home system goes up quickly. The overall timeline from order to a fully commissioned, net-metered system is longer because it includes design, procurement, installation, testing, and then the DISCOM application, inspection and meter change. Approval-related steps are handled by the distribution company, so we do not promise a guaranteed date for that portion.',
  },
  {
    category: 'technical',
    q: 'What maintenance does a solar system need?',
    a: 'Mostly just keeping the panels clean. Dust on the glass reduces output more than people expect. In most Telangana locations, periodic cleaning through the dry and dusty months makes a visible difference. Beyond that, maintenance is largely inspection-based: checking mounting hardware, cable condition, earthing, protection devices and inverter status. There are no moving parts in the panels themselves, so the system is low-maintenance rather than no-maintenance.',
  },
  {
    category: 'commercial',
    q: 'What warranty do I get?',
    a: 'Your warranties come from the manufacturers of each component, not from us as the installer, and they differ from part to part. Solar modules typically carry a product warranty and a separate long-term performance warranty; inverters carry their own manufacturer warranty with an option to extend on many models; batteries, structures and balance-of-system components each have their own terms. The exact warranty applicable to your system is stated in your proposal, based on the components actually selected for your project.',
  },
  {
    category: 'scheme',
    q: 'How does the government solar subsidy actually work?',
    a: 'Under the PM Surya Ghar rooftop solar scheme, eligible residential consumers can receive central financial assistance for a grid-connected system: 60% of the cost at government benchmark prices for up to 2 kW, plus 40% of the additional cost between 2 kW and 3 kW, capped at the 3 kW level — approximately ₹30,000, ₹60,000 and ₹78,000 for 1 kW, 2 kW and 3 kW-and-above respectively. It is applied for through the national portal, and released after DISCOM inspection and document verification. Note that the scheme routes the balance payment through an empanelled vendor, and Kapizo Solar does not currently claim empanelment. Amounts and rules are set by the government and can change, so verify the current position on pmsuryaghar.gov.in before deciding.',
  },
  {
    category: 'commercial',
    q: 'Will my electricity bill become zero after solar?',
    a: 'Almost certainly not exactly zero, though it can come down a great deal. Even with a well-sized system, most tariffs include fixed charges and duties that continue regardless of how many units you draw. Your consumption pattern also matters: a system sized to your annual units still imports from the grid at night and in low-generation months. A realistic goal is a large reduction in the energy component of the bill, with the exact outcome depending on sizing, tariff and consumption behaviour.',
  },
  {
    category: 'technical',
    q: 'Will solar work during a power cut?',
    a: 'Only if you have a battery. This surprises most people, so it is worth being clear: a normal on-grid system shuts down during a power cut, even in bright sunshine. The inverter is required to disconnect the moment grid supply fails, so that your system cannot send power back into lines that DISCOM staff may be working on. It is a safety rule, not a fault in your system. If you want power during cuts, you need a hybrid system with a battery, sized to the specific circuits you want to keep running — usually lights, fans, the fridge and a few sockets rather than the whole house. At night the same logic applies: an on-grid system simply draws from the grid as before, while a hybrid system draws from the battery first.',
  },
  {
    category: 'commercial',
    q: 'Is solar worth it for my shop, office or hospital?',
    a: 'Usually yes, and often more so than for a home. Commercial tariffs are higher than residential, so every unit you generate replaces a costlier unit from the grid. Commercial loads also tend to run during daylight hours, which aligns well with solar generation. Design considerations include the roof structure, available shadow-free area, connected load and the applicable net metering rules for your consumer category.',
  },
  {
    category: 'commercial',
    q: 'Can I use solar for my farm pump?',
    a: 'Yes, but a pump is sized differently from a house. Instead of working backwards from a monthly bill, we size to the pump rating, how much water you need and how many hours a day it runs. Open, shadow-free area availability is a key factor. Applicable schemes for agricultural solar differ from residential rooftop schemes and are subject to prevailing government guidelines.',
  },
  {
    category: 'commercial',
    q: 'Which plan should I choose — Budget, Standard or Premium?',
    a: 'Most homes end up on Standard, so start there. Budget covers the essentials properly at the lowest entry cost and makes sense if your only goal is cutting the bill. Standard adds better panels, monitoring you can actually check on your phone, and full surge protection — the upgrades that matter most over fifteen years. Premium is for you if you need backup during power cuts, or you want the highest specification available. The honest deciding question is whether power cuts bother you enough to pay for a battery.',
  },
]
