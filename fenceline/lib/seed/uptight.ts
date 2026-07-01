import type { Community } from "../types";

/**
 * The middle of the ramp: three Uptight communities.
 * All communities, people, and events are fictional (see /about).
 */
export const UPTIGHT: Community[] = [
  {
    slug: "stonebriar-terrace",
    name: "Stonebriar Terrace",
    location: "Naperville, IL",
    type: "condo",
    strictness: 58,
    toxicity: 48,
    duesMonthly: 410,
    ruleCount: 77,
    avgFine: 95,
    responseWeeks: 3,
    homes: 140,
    founded: 2001,
    tagline:
      "Runs like a hotel. Feels like one, both ways.",
    blurb:
      "A 140-unit brick mid-rise pair where the association runs tight and slightly cold. Balcony inspections happen twice a year with a checklist (no grills, no storage visible above the rail, planters inside the drip line). The building is immaculate and the reserve fund is healthy; residents debate whether that's worth the hall-monitor energy.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "This is a condominium. There are no backyards. Please stop asking; we know it's you, 4B.",
      },
      "rv-boat-parking": {
        stance: "banned",
        note: "The garage has height clearance of 6'8\" and assigned stalls. Oversized vehicles have no lawful place here.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "Minimum lease term is 12 months, adopted 2019, upheld by unit-owner vote 88–31.",
      },
      "solar-panels": {
        stance: "banned",
        note: "The roof is a common element. Individual installations on common elements are not permitted.",
      },
      "exterior-paint": {
        stance: "banned",
        note: "Exterior surfaces are common elements maintained by the association. Your door is Sherwin-Williams 'Iron Ore.' It stays 'Iron Ore.'",
      },
      "fence-height": {
        stance: "banned",
        note: "Not applicable, and no, you may not enclose your balcony. See §7.3, and also the answer is no.",
      },
      "yard-signs": {
        stance: "conditional",
        note: "One sign inside your own window during election season. The lobby, lawn, and hallways are neutral territory.",
      },
      "basketball-hoops": {
        stance: "banned",
        note: "The garage roof deck is for lounging. Ball sports migrate; the answer is the park two blocks east.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "White lights only on balcony rails, December 1 through January 10. Uniformity is the aesthetic.",
      },
      "flagpole": {
        stance: "conditional",
        note: "Bracket-mounted flags up to 3'x5' per federal and Illinois law. Freestanding poles, no.",
      },
    },
    reviews: [
      {
        id: "sbt-1",
        author: "Owner, 5 yrs",
        date: "2026-03-02",
        tierRead: 2,
        body:
          "The building runs like a hotel and feels like one too, in both directions. My radiator leak got a contractor in 36 hours; my request to keep a bike on the balcony got a violation notice in 24. The rules are enforced evenly, I'll give them that — the board president got written up for her own doormat being off-spec.",
        pros: ["Even-handed enforcement", "Genuinely excellent maintenance", "Funded reserves, no surprise assessments"],
        cons: ["Balcony checklist twice a year", "Zero flexibility, even for invisible stuff"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "sbt-2",
        author: "Renter, 2 yrs",
        date: "2025-09-21",
        tierRead: 2,
        body:
          "As a renter you feel like a guest of the state. Move-in required a $500 deposit, an elevator reservation, and a 'renter orientation' PDF with 19 pages. Nothing here is mean, it's just relentless. The white-lights-only December rule is real and they walk the sidewalk checking.",
        pros: ["Quiet, clean, secure"],
        cons: ["19-page renter orientation", "Holiday lights uniformity patrol"],
        recommend: false,
        boardApproval: true,
      },
      {
        id: "sbt-3",
        author: "Owner, 9 yrs",
        date: "2024-11-18",
        tierRead: 1,
        body:
          "People complain about the inspections until they see the sister building on Route 59 that skipped them — spalling balconies and a $2.1M special assessment. Our dues are $410 and boring. Boring is the product. Buy here if you want boring; it is delivered in full.",
        recommend: true,
        boardApproval: true,
      },
      {
        id: "sbt-4",
        author: "Former owner, 2018–2025",
        date: "2025-05-04",
        tierRead: 3,
        body:
          "Sold after seven years. The final straw was small: a $95 fine for a wreath that stayed up until January 14 (limit: the 10th). Four days. Ninety-five dollars. Everything worked and nothing was warm. I live somewhere shaggier now and wave at my neighbors.",
        pros: ["Building never had a maintenance crisis"],
        cons: ["$95 wreath fine, four days late", "Community feeling of a well-run airport"],
        recommend: false,
        boardApproval: false,
      },
    ],
  },
  {
    slug: "aspen-row",
    name: "Aspen Row Townhomes",
    location: "Littleton, CO",
    type: "townhome",
    strictness: 64,
    toxicity: 42,
    duesMonthly: 180,
    ruleCount: 68,
    avgFine: 110,
    responseWeeks: 3,
    homes: 84,
    founded: 2011,
    tagline:
      "Trash cans on a timer, fines on a schedule.",
    blurb:
      "Eighty-four modern townhomes with mountain views and a fine schedule that operates with the timing precision of a transit system. Trash cans out before 6 AM or after 8 PM on pickup day: $50, no warning tier. Snow must be cleared from your walk within 24 hours of snowfall end — measured, residents swear, with a stopwatch. Nobody is screaming; everybody is invoicing.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "Lots are 0.06 acres. Where, exactly? Denied as a matter of geometry.",
      },
      "rv-boat-parking": {
        stance: "banned",
        note: "No street parking of trailers, RVs, or boats at any time. The tow list runs weekly.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "30-day minimum, adopted 2022 after the Unit 40 incidents. We will not be elaborating on the incidents.",
      },
      "solar-panels": {
        stance: "conditional",
        note: "Approved with flush-mount racking and black-frame panels. Two-week turnaround if the form is complete.",
      },
      "exterior-paint": {
        stance: "banned",
        note: "The association paints on a 7-year cycle in the three approved scheme sets. Individual repainting voids the cycle.",
      },
      "fence-height": {
        stance: "conditional",
        note: "Rear patio privacy screens to 6 ft in the builder's cedar profile only. The profile spec is on the portal.",
      },
      "yard-signs": {
        stance: "conditional",
        note: "One sign, 45 days pre-election, in the mulch bed only. Signs in turf interfere with mowing contracts.",
      },
      "basketball-hoops": {
        stance: "banned",
        note: "Driveways are 18 ft deep and shared-use. Hoops create a documented rebound-into-garage-door problem.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "November 15 – January 15, clips only (no staples, no nails — we repaint what you puncture).",
      },
      "flagpole": {
        stance: "conditional",
        note: "Bracket flags only. A freestanding pole on a 0.06-acre lot would technically be in two people's yards.",
      },
    },
    reviews: [
      {
        id: "asr-1",
        author: "Owner, 4 yrs",
        date: "2026-04-18",
        tierRead: 2,
        body:
          "I got the famous trash fine: $50, with a timestamped photo, for cans at the curb 40 minutes past the 8 PM deadline on a Tuesday. I was at my kid's playoff game. I appealed with my own timestamped photo of the game; appeal denied, 'the schedule is the schedule.' The neighborhood looks fantastic. I have never felt less like a person.",
        pros: ["Property values doing great", "Snow contractor is genuinely fast"],
        cons: ["$50 trash fine, 40 minutes, photographic evidence", "Appeals process is decorative"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "asr-2",
        author: "Owner, 6 yrs",
        date: "2025-12-07",
        tierRead: 2,
        body:
          "Here's the deal you're signing: $180 buys you snow removal, exterior paint, roof reserves, and a management company that treats the covenants like firmware. Nothing is personal. My solar application was approved in 11 days flat because I filled the form out right. My neighbor's took three months because he freelanced the racking. Read the spec, live in peace.",
        pros: ["Fast when you follow the format", "Dues are honestly priced for what's covered"],
        cons: ["Zero human discretion anywhere in the loop"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "asr-3",
        author: "Renter, 20 mo",
        date: "2025-03-25",
        tierRead: 3,
        body:
          "The snow rule is the one that gets renters. '24 hours from snowfall end' — end as determined by the management company's weather service, not your eyeballs. I cleared at hour 26 after a two-day storm and the $110 fine went to my landlord, who added it to my rent with a processing fee. Beautiful place. Bring a shovel and a lawyer.",
        cons: ["Snow clock starts when a server in Texas says so", "Fines pass through leases with markup"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "asr-4",
        author: "Owner, 2 yrs",
        date: "2024-08-13",
        tierRead: 2,
        body:
          "Moved from an HOA-free bungalow street, so the culture shock was real. But I'll say this: the rules are published, the fines are on a schedule, and enforcement is camera-consistent. It's strict, not crooked — after reading some of the horror stories on this site, that distinction matters more than I thought.",
        recommend: true,
        boardApproval: true,
      },
    ],
  },
  {
    slug: "saltmeadow-landing",
    name: "Saltmeadow Landing",
    location: "Wilmington, NC",
    type: "coastal",
    strictness: 72,
    toxicity: 40,
    duesMonthly: 310,
    ruleCount: 88,
    avgFine: 125,
    responseWeeks: 3,
    homes: 176,
    founded: 2008,
    tagline:
      "Six approved colors. Three weeks per storm door.",
    blurb:
      "A marsh-front community of 176 elevated homes where the architectural committee guards a palette of six approved coastal colors ('Oyster,' 'Sea Fog,' 'Cordgrass'…) with the intensity of a museum conservation department. Everything requires a form; most forms come back approved; all of them take three weeks. The boardwalk is stunning. The process is the price.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "Between the hawks, the flood zone, and the smell carrying over the marsh — no. The marsh is the amenity.",
      },
      "rv-boat-parking": {
        stance: "conditional",
        note: "Boats under 26 ft on trailers, side-yard only, behind an approved screen. This is a coastal community; we're not banning boats. We're hiding them.",
      },
      "short-term-rentals": {
        stance: "conditional",
        note: "7-night minimum, registration, and a $300/year permit. The rental homes fund half the boardwalk budget; we're pragmatists.",
      },
      "solar-panels": {
        stance: "conditional",
        note: "Approved on rear slopes with marine-grade racking documentation. Salt air eats cheap hardware and then it eats our roofline.",
      },
      "exterior-paint": {
        stance: "conditional",
        note: "Six approved body colors, three trim whites. Submit the manufacturer code — 'kind of like Sea Fog' is not a color.",
      },
      "fence-height": {
        stance: "conditional",
        note: "Four-foot open-picket only, no privacy fences — marsh sightlines are protected in the covenants.",
      },
      "yard-signs": {
        stance: "conditional",
        note: "One sign, 4 sq ft, 60 days around elections. Storm-season exception: no signs when a named storm is inside 72 hours; they become projectiles.",
      },
      "basketball-hoops": {
        stance: "conditional",
        note: "Portable hoops stored under the house when not in use. Nothing permanent seaward of the front setback.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "Thanksgiving through January 8, warm white or blue. The osprey camera does not need a light show behind it.",
      },
      "flagpole": {
        stance: "conditional",
        note: "One pole to 20 ft, hurricane-rated ground sleeve required, flags down at tropical storm watch.",
      },
    },
    reviews: [
      {
        id: "sml-1",
        author: "Owner, 3 yrs",
        date: "2026-05-11",
        tierRead: 2,
        body:
          "It took three weeks to get approval to install a white storm door. White. On a white house. The form asked for the manufacturer, model, glass type, and a photo simulation. It came back APPROVED with a note thanking me for 'maintaining envelope consistency.' I laughed, then I looked down my street — every house genuinely looks like the brochure — and I understood the deal I'd made.",
        pros: ["The place is postcard-consistent", "Committee approves most complete applications"],
        cons: ["Three weeks for a storm door", "Photo simulation requirement is unhinged"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "sml-2",
        author: "Owner, 8 yrs",
        date: "2025-10-02",
        tierRead: 2,
        body:
          "After Hurricane Idalia's near-miss, the association had debris crews on the boardwalk before the county cleared the main road. The same machinery that makes you file a form for a doorbell also pre-contracts storm recovery. It's one machine. You don't get the second thing without the first.",
        pros: ["Storm response is best-in-county", "Reserves fully funded"],
        cons: ["The machine does not distinguish big from small"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "sml-3",
        author: "Renter, 1 yr",
        date: "2025-02-14",
        tierRead: 3,
        body:
          "Renting here on a corporate relocation. The color palette thing is not a joke: my landlord's porch swing was cited as 'unapproved exterior modification — non-palette finish' because it was teak. Teak! The natural color of wood! It now wears a coat of 'Cordgrass' and I think about that every time I sit on it.",
        cons: ["A porch swing required a paint decision from a committee"],
        recommend: false,
        boardApproval: true,
      },
      {
        id: "sml-4",
        author: "Owner, 5 yrs",
        date: "2024-07-19",
        tierRead: 2,
        body:
          "Pro tip nobody gives you at closing: the committee meets the first Tuesday of the month, and the three-week clock is really a 'did you make this month's agenda' clock. Submit by the last Friday of the month and things move fine. Miss it and your storm door waits a full cycle. Strict, slow, but not vindictive — your application will not be weaponized, just… marinated.",
        pros: ["Predictable if you learn the rhythm"],
        cons: ["The rhythm is nowhere written down"],
        recommend: true,
        boardApproval: true,
      },
    ],
  },
];
