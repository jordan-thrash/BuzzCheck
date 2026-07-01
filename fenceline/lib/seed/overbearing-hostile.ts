import type { Community } from "../types";

/**
 * The deep end: three Overbearing, two Hostile.
 * All communities, people, and events are fictional (see /about).
 */
export const OVERBEARING_HOSTILE: Community[] = [
  {
    slug: "prairie-gate-estates",
    name: "Prairie Gate Estates",
    location: "Plano, TX",
    type: "single-family",
    strictness: 86,
    toxicity: 64,
    duesMonthly: 185,
    ruleCount: 142,
    avgFine: 175,
    responseWeeks: 5,
    homes: 420,
    founded: 1999,
    tagline:
      "Mulch has a paint code. The newsletter is a docket.",
    blurb:
      "Four hundred twenty homes, 142 rules, and an architectural standards document that specifies mulch by manufacturer color code. The monthly drive-through inspection generates a violation docket residents call 'the newsletter.' Appeals go to a committee that meets when it meets. The lawns are perfect. So is the resentment.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "Prohibited under §9.1 (livestock and fowl). Reported sightings are investigated within 48 hours.",
      },
      "rv-boat-parking": {
        stance: "banned",
        note: "No RV, boat, or trailer visible from any street or common area at any time, including loading (2-hour grace, permit required).",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "Leases under 12 months are prohibited. Violation triggers a $500/week continuing fine. We check the listing sites.",
      },
      "solar-panels": {
        stance: "conditional",
        note: "Permitted per Texas Property Code §202.010, which we have read closely for every discretion it leaves us. Expect conditions.",
      },
      "exterior-paint": {
        stance: "conditional",
        note: "Body colors from the Approved Schedule only (currently 14). Trim, door, and shutter combinations require separate approval.",
      },
      "fence-height": {
        stance: "conditional",
        note: "Six-foot board-on-board cedar, stained 'Prairie Fawn' within 90 days of installation. Gate hardware: oil-rubbed bronze.",
      },
      "yard-signs": {
        stance: "conditional",
        note: "As permitted by Texas Election Code — exactly as permitted, measured, and not one day longer.",
      },
      "basketball-hoops": {
        stance: "conditional",
        note: "Permanent hoops by application (setback, pole color, clear backboard). Portable hoops stored in garage nightly.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "Installed no earlier than Nov 1, removed by Jan 15. Icicle-style lights on rooflines only, not on shrubs (§11.4(c)).",
      },
      "flagpole": {
        stance: "conditional",
        note: "One in-ground pole to 20 ft per state law. Application must include an engineer-stamped footing detail.",
      },
    },
    reviews: [
      {
        id: "pge-1",
        author: "Owner, 6 yrs",
        date: "2026-04-03",
        tierRead: 3,
        body:
          "I was fined $175 for 'non-conforming mulch color.' The notice cited §11.2(f) and helpfully included a paint chip: my mulch was 'Espresso' and the approved color is 'Canyon Brown (ref. SW 6048).' I re-mulched. The re-inspection failed because the new mulch had 'faded inconsistently.' I now think about mulch the way other people think about their mortgage rate.",
        pros: ["Resale values genuinely strong", "Common areas immaculate"],
        cons: ["Mulch has a Sherwin-Williams reference code", "Re-inspection can fail on 'fading'"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "pge-2",
        author: "Owner, 11 yrs",
        date: "2025-09-28",
        tierRead: 3,
        body:
          "The drive-through inspection is the first Wednesday of every month, 9 AM, same white pickup. Old-timers sweep their driveways Tuesday night like it's a religious observance. If you comply preemptively, the HOA is almost invisible. The moment you don't, you discover the appeals committee meets 'as needed' and hasn't found a need since March.",
        pros: ["Predictable if you live defensively"],
        cons: ["Appeals committee is functionally a voicemail box", "5-week response to everything except fines"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "pge-3",
        author: "Owner, 2 yrs",
        date: "2025-06-15",
        tierRead: 2,
        body:
          "Bought here for the schools knowing the reputation. Honest accounting: 24 months, three violations (edging, trash can visible from street on a non-collection day, wreath 9 days past deadline), $0 in fines because I fixed each within the 10-day cure window. The system is oppressive but it is at least *documented* oppression. Read all 142 rules before you close. All of them.",
        pros: ["Cure window honored if you move fast", "Everything is in writing"],
        cons: ["Three violations in two years for a careful person"],
        recommend: true,
        boardApproval: false,
      },
      {
        id: "pge-4",
        author: "Former owner, 2016–2024",
        date: "2024-05-20",
        tierRead: 4,
        body:
          "We sold after the flagpole saga: eight months and an engineer-stamped footing drawing to fly a flag the state of Texas says I can fly. The board's own president had a non-conforming basketball hoop the entire time (clear backboard rule — his was acrylic smoke). When I pointed this out in open session, my next inspection found four violations. Draw your own map of that.",
        cons: ["Enforcement got personal after public comment", "Eight months for a flagpole application"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "pge-5",
        author: "Renter, 10 mo",
        date: "2026-01-08",
        tierRead: 3,
        body:
          "My landlord forwards every violation with the subject line 'FYI' and I have learned to fear the letters F, Y, and I. Current count: edging (twice), 'driveway staining,' and a warning that my doormat ('novelty text') may violate §11.9. The doormat says WELCOME. It's under review.",
        recommend: false,
        boardApproval: false,
      },
    ],
  },
  {
    slug: "harbor-pines",
    name: "Harbor Pines",
    location: "Venice, FL",
    type: "55+",
    strictness: 76,
    toxicity: 62,
    duesMonthly: 355,
    ruleCount: 96,
    avgFine: 130,
    responseWeeks: 4,
    homes: 268,
    founded: 1993,
    tagline:
      "Pristine shuffleboard, Balkan flag politics.",
    blurb:
      "A 55+ community where the shuffleboard courts are pristine and the politics are Balkan. Ninety-six rules, most enforced, some enforced *at* people. The long-running flag war (whose flags, how many, which causes) has consumed three boards, two recall votes, and at least one friendship per cul-de-sac. Holiday lights come down January 2 — not the 3rd.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "No. And before you cite the 'therapy chicken' article from the newsletter dispute of 2023: still no.",
      },
      "rv-boat-parking": {
        stance: "conditional",
        note: "Storage lot only, waitlist currently 14 months. Overnight driveway parking for loading: one permit per quarter.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "Two-month minimum, two rentals per year, renters must be 55+. Our certification depends on this and we audit.",
      },
      "solar-panels": {
        stance: "conditional",
        note: "Permitted per Florida statute. The committee's 'aesthetic conditions' have been challenged twice. The committee remains undefeated.",
      },
      "exterior-paint": {
        stance: "conditional",
        note: "Nine approved schemes. Repaint required when the association's inspector rates your finish below 7/10. The scale is his.",
      },
      "fence-height": {
        stance: "banned",
        note: "No fences. Hedges to 4 ft may be approved. This has been litigated. The hedge won, the fence never has.",
      },
      "yard-signs": {
        stance: "banned",
        note: "No signs of any kind except security-company markers under 1 sq ft. Yes, this includes the pickleball tournament. Especially that.",
      },
      "basketball-hoops": {
        stance: "banned",
        note: "There are no children resident here and the noise complaints from visitor use were unanimous. Denied since 2007.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "December 1 to January 2. On the 3rd, the golf cart goes out with the clipboard. You've been told.",
      },
      "flagpole": {
        stance: "conditional",
        note: "One pole, one U.S. flag, one service flag below it. The Flag Display Rule runs four pages. Read all four before hoisting anything.",
      },
    },
    reviews: [
      {
        id: "hbp-1",
        author: "Owner, 8 yrs",
        date: "2026-02-20",
        tierRead: 3,
        body:
          "The amenities are five-star and the grounds crew deserves a parade. But the flag rule is four pages because every clause is a scar from a specific feud, and enforcement depends on which faction is up. My garden flag (sandhill crane, decorative, apolitical — it's a BIRD) was cited within a week. The house on Compass Court flew a 4x6 novelty flag for a month; that owner plays golf with the vice president.",
        pros: ["Grounds and amenities genuinely excellent"],
        cons: ["Four-page flag rule", "Enforcement tracks golf foursomes"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "hbp-2",
        author: "Owner, 15 yrs",
        date: "2025-08-09",
        tierRead: 3,
        body:
          "I've survived three boards. Each recall was supposed to fix the culture; each new board discovered the clipboard and the golf cart and fell in love. On January 3rd they really do photograph remaining holiday lights. My neighbor's timer failed while she was in the hospital; the fine was waived only after her daughter came to open session with the discharge paperwork. That sentence should embarrass someone. It didn't.",
        cons: ["Jan 2 lights deadline enforced from a golf cart", "Compassion requires documentary evidence"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "hbp-3",
        author: "Owner, 4 yrs",
        date: "2025-04-27",
        tierRead: 2,
        body:
          "Contrarian take from someone who reads the budget: this place is run *well* — funded reserves, no special assessments in a decade, insurance renewed in a Florida market that's eating other associations alive. The social toxicity is real but it's resident-on-resident; the paid manager is a saint with a flak jacket. Know which fights are the HOA's and which are just... retirement.",
        pros: ["Financially bulletproof", "Professional manager absorbs the worst of it"],
        cons: ["The residents ARE the weather system"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "hbp-4",
        author: "Former owner, 2019–2025",
        date: "2025-12-30",
        tierRead: 4,
        body:
          "Left this year. Final tally: cited for a hedge at 4'3\" (limit 4'), for a 'non-standard' mailbox flag the postal service installed, and for wind chimes ('auditory nuisance, on complaint'). The complaint, I eventually learned, came from a board member's spouse two streets away who walks past my house by choice. Beautiful place to visit. Bring earplugs, apparently.",
        cons: ["Wind chimes cited as auditory nuisance", "Complaints travel two streets but compassion doesn't"],
        recommend: false,
        boardApproval: false,
      },
    ],
  },
  {
    slug: "driftwood-shores",
    name: "Driftwood Shores",
    location: "Galveston, TX",
    type: "coastal",
    strictness: 70,
    toxicity: 68,
    duesMonthly: 520,
    ruleCount: 83,
    avgFine: 160,
    responseWeeks: 5,
    homes: 152,
    founded: 2006,
    tagline:
      "A civil war over Airbnb, with a beach view.",
    blurb:
      "A gulf-front tower-and-townhome complex in open civil war over short-term rentals. Roughly half the owners bought to Airbnb; the board bought to stop them. The result is lockbox sweeps, hallway camera reviews, a $160 average fine, and two lawsuits with the association's name on them. The beach is beautiful and nobody is looking at it.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "It's a gulf-front condominium tower. The seagulls are the only permitted birds and even they're on notice.",
      },
      "rv-boat-parking": {
        stance: "conditional",
        note: "Boat slips by separate lease. Trailers in the south lot only, $40/month, no living aboard anything, we've had to say it.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "30-day minimum as of the 2024 amendment, currently under legal challenge by the Owners' Rental Coalition. Enforcement continues during litigation.",
      },
      "solar-panels": {
        stance: "banned",
        note: "Common-element roof, engineered wind rating, no individual penetrations. This one isn't politics, it's physics.",
      },
      "exterior-paint": {
        stance: "banned",
        note: "Association-maintained envelope. Balcony interiors: two approved colors, and yes we can see your balcony from the beach.",
      },
      "fence-height": {
        stance: "banned",
        note: "No owner-installed barriers. Dune walkover fencing is association property — leave the sea oats alone.",
      },
      "yard-signs": {
        stance: "banned",
        note: "No signs in windows or on balconies visible from the exterior. 'BEACH ACCESS IS A RIGHT' banners are signs. See you at the hearing.",
      },
      "basketball-hoops": {
        stance: "banned",
        note: "The garage levels have clearance and echo issues. There's a public court at the county park a half mile north.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "Balcony rail lights Dec 1–Jan 6, warm white, no chase patterns. Turtle-season rules override everything May–October.",
      },
      "flagpole": {
        stance: "conditional",
        note: "Bracket flags to 3'x5' on your own balcony. The flag plaza by the pool is association-controlled — that fight is over, or so we keep announcing.",
      },
    },
    reviews: [
      {
        id: "dws-1",
        author: "Owner, 5 yrs",
        date: "2026-05-02",
        tierRead: 3,
        body:
          "I live here full-time, which makes me a minority. Weekends used to be luggage carts and lost bachelorette parties; since the 2024 amendment it's process servers and passive-aggressive elevator flyers from both sides. The board's lockbox sweeps found 14 illegal rentals last quarter — and also cut off my dog sitter's access, because the sweep tooling can't tell a pet sitter from a paying guest.",
        pros: ["Full-time residents finally getting quiet weekends"],
        cons: ["Enforcement tooling is a blunt instrument", "Two active lawsuits priced into next year's dues"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "dws-2",
        author: "Owner, 7 yrs",
        date: "2025-11-23",
        tierRead: 4,
        body:
          "I bought in 2019 when the sales office handed out projected rental income sheets — printed, laminated, on association letterhead adjacent. The same building now fines me $500/week for the exact use they marketed. Whatever you think of Airbnb, that's a bait-and-switch, and the 'anonymous' hallway camera reviews that always seem to start on rental-owner floors tell you what kind of fight this is.",
        cons: ["Rules reversed on the exact use case that was marketed", "Camera reviews target known rental floors"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "dws-3",
        author: "Renter, 6 mo",
        date: "2025-07-14",
        tierRead: 3,
        body:
          "Six-month corporate lease, fully legal, and I still got questioned in the lobby twice ('are you an owner? who's your host?'). The vibe between neighbors is airport-security. Gorgeous unit, gorgeous water, and I eat breakfast to the sound of the 8 AM civil-war thread on the residents' app.",
        cons: ["Lobby interrogations for legal tenants"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "dws-4",
        author: "Former owner, 2017–2025",
        date: "2025-03-06",
        tierRead: 4,
        body:
          "Sold at a loss to exit the litigation exposure. Special assessment for legal fees: $2,400 and climbing when I left. Fine print for buyers: ask for the board minutes from March 2024 onward, and count the words 'counsel advises.' I counted 41 instances in one meeting. That's not a community, that's a deposition with a pool.",
        cons: ["$2,400 legal special assessment and rising"],
        recommend: false,
        boardApproval: false,
      },
    ],
  },
  {
    slug: "cypress-bend-commons",
    name: "Cypress Bend Commons",
    location: "Clearwater, FL",
    type: "condo",
    strictness: 78,
    toxicity: 92,
    duesMonthly: 465,
    ruleCount: 89,
    avgFine: 250,
    responseWeeks: 6,
    homes: 124,
    founded: 1988,
    tagline:
      "The fine-to-lien pipeline, perfected since 1988.",
    blurb:
      "A garden-condo complex where the association has perfected the fine-to-lien pipeline. Average fine: $250. Board response to owners: six weeks. Board response from the association's law firm: by Friday. One resident is currently defending a lien over $410 in disputed fines that began with a $75 citation for a garden hose. The pool is closed for 'resurfacing' (year three).",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "Prohibited. The 2022 'emotional support duck' matter is resolved and referenced in the amended declaration, which should tell you how it went.",
      },
      "rv-boat-parking": {
        stance: "banned",
        note: "Towing is contracted, automatic, and per the signage 'at vehicle owner's expense and risk.' The risk part is load-bearing.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "12-month minimum. Applications for hardship exceptions are reviewed by counsel. Counsel bills the association either way.",
      },
      "solar-panels": {
        stance: "banned",
        note: "Common-element roofs. An owner petition for a community solar study was 'received and filed' in 2023. It remains received. And filed.",
      },
      "exterior-paint": {
        stance: "banned",
        note: "Association scheme only. Note: front doors repainted by owners 'in the correct color but without authorization' remain violations. Process is the product.",
      },
      "fence-height": {
        stance: "banned",
        note: "No owner fencing. Patio dividers are common elements. That your divider is crumbling is a maintenance request, not an invitation.",
      },
      "yard-signs": {
        stance: "banned",
        note: "None, per the 2021 amendment passed after the 'RECALL THE BOARD' era. The irony is noted and survived by the amendment.",
      },
      "basketball-hoops": {
        stance: "banned",
        note: "Denied. The hoop removed in 2019 was a liability determination. The kids can be mad at the insurance carrier.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "Dec 5–Jan 5, patio rail only, cited on day 1 of noncompliance. Consider this your annual warning; individual warnings are not issued.",
      },
      "flagpole": {
        stance: "banned",
        note: "Bracket flag per statute, nothing more. The statute is the ceiling here, not the floor.",
      },
    },
    reviews: [
      {
        id: "cbc-1",
        author: "Owner, 4 yrs",
        date: "2026-06-10",
        tierRead: 4,
        body:
          "Read this before you waive your inspection period: my neighbor is currently fighting a LIEN — on her HOME — over $410 in fines that started with a $75 citation for a garden hose left coiled on her patio ('exterior storage'). She disputed it; late fees and 'administrative costs' did the rest. The association's law firm sends certified mail like other people send texts. I keep my patio bare as a courtroom.",
        cons: ["$75 hose citation compounded into a $410 lien fight", "Certified mail as a first-contact strategy"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "cbc-2",
        author: "Owner, 9 yrs",
        date: "2026-03-19",
        tierRead: 4,
        body:
          "Six weeks for the board to answer a question about MY OWN account ledger. Four days for a violation notice after my grandson's pool float was visible on the patio overnight. The pool, incidentally, has been 'resurfacing' since 2023 — the float was a violation for a pool that doesn't functionally exist. You cannot satirize this place. I've tried. This review is attempt eleven.",
        cons: ["Six-week response on ledger questions", "Pool closed three years and counting"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "cbc-3",
        author: "Renter, 2 yrs",
        date: "2025-05-08",
        tierRead: 3,
        body:
          "Renters are weirdly safer here — fines route to owners, so the board mostly ignores us. Rent is below market because everyone knows. The grounds are actually kept nice (the landscaping contract is the one thing that runs on time), and if you never own a square foot of it, the machine grinds past you. Grim arbitrage, but I'm reporting what I see.",
        pros: ["Below-market rent, decent landscaping"],
        cons: ["The discount exists for a reason"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "cbc-4",
        author: "Former owner, 2012–2024",
        date: "2024-10-01",
        tierRead: 4,
        body:
          "Twelve years, and I watched the board learn that fines are revenue. The turn came with the 2018 management company switch — violations went from 30 a year to 300, and 'administrative fees' appeared on every notice. When I sold, my estoppel letter took the statutory maximum and cost the statutory maximum. Of course it did. Everything here runs to the statutory maximum except the elevator inspections.",
        cons: ["Violations 10x'd after management switch", "Fines are a line item, not a deterrent"],
        recommend: false,
        boardApproval: false,
      },
    ],
  },
  {
    slug: "vista-del-rey",
    name: "Vista del Rey",
    location: "Chula Vista, CA",
    type: "townhome",
    strictness: 94,
    toxicity: 84,
    duesMonthly: 290,
    ruleCount: 163,
    avgFine: 220,
    responseWeeks: 5,
    homes: 96,
    founded: 2015,
    tagline:
      "163 rules, four lawsuits, zero human overrides.",
    blurb:
      "Ninety-six stacked townhomes governed by 163 rules, a license-plate camera at the gate, and a board that has litigated against its own residents four times since 2021 — twice over yard signs. Guest parking requires an app, the app requires the board's approval, and the board requires, apparently, total victory. The average fine is $220 and rising like the sea.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "Prohibited, and the rule was expanded in 2023 to include 'avian fostering.' We are aware of the loophole community. We read your forum.",
      },
      "rv-boat-parking": {
        stance: "banned",
        note: "Zero tolerance. The camera reads plates; the tow contract auto-dispatches at 72 hours. There is no human in this loop and that is by design.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "Prohibited. The association employs a monitoring service that scrapes listing platforms weekly. First offense: $1,000. There is no second-offense tier because there are no second offenses.",
      },
      "solar-panels": {
        stance: "conditional",
        note: "California law compels approval. Our conditions document is 9 pages. Both facts are true and we are at peace with the tension.",
      },
      "exterior-paint": {
        stance: "banned",
        note: "Association-controlled envelope, repainted on cycle. The 2022 'accent door' petition (61 signatures) was denied. Cohesion is the amenity.",
      },
      "fence-height": {
        stance: "banned",
        note: "Patio walls are structural and common. Attaching anything to them — trellis, lights, décor — is an unauthorized modification. Yes, décor.",
      },
      "yard-signs": {
        stance: "banned",
        note: "Signage is prohibited beyond the statutory minimum, which we honor precisely and defend vigorously. See Ramos v. Association (settled, terms confidential).",
      },
      "basketball-hoops": {
        stance: "banned",
        note: "No sports apparatus in drives, walks, or garages-with-door-open. The garage-door clause was added in 2024. You know why.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "Dec 10–Jan 3, white only, professional installation certificate required for anything above the first-floor rail line.",
      },
      "flagpole": {
        stance: "banned",
        note: "No poles. One bracket flag per unit per Civil Code §4705, dimensions enforced with a tape measure we bought for the purpose.",
      },
    },
    reviews: [
      {
        id: "vdr-1",
        author: "Owner, 3 yrs",
        date: "2026-05-25",
        tierRead: 4,
        body:
          "The board sued a retired teacher over two yard signs. I want that to sink in: OUR association, funded by OUR dues, paid a law firm to litigate against a 71-year-old whose signs said, and I am quoting, 'SLOW DOWN' and 'KINDNESS MATTERS.' The settlement is confidential; the legal line item in the budget is not. It was $38,000 last year.",
        cons: ["$38k annual legal spend, 96 units — do the math per door", "Sued a resident over a KINDNESS MATTERS sign"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "vdr-2",
        author: "Owner, 4 yrs",
        date: "2025-10-17",
        tierRead: 4,
        body:
          "My mother visited for a week. The guest parking app rejected her plate three times (Arizona plates confuse it), the camera flagged her on day 2, and the tow happened at 5:40 AM on day 4 despite an open support ticket. The board's response, verbatim: 'The system worked as designed.' That's the most honest thing they've ever said.",
        cons: ["Tow-by-algorithm with no human override", "'The system worked as designed'"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "vdr-3",
        author: "Renter, 16 mo",
        date: "2025-06-29",
        tierRead: 3,
        body:
          "It is spotless here. Uncannily spotless. The landscaping is edged like a golf course and the parking lot could host surgery. I pay for that with an app for guests, an app for packages, an app for the gym, and the low-grade knowledge that a camera logged me carrying a kayak at 6 AM ('storage in transit' warning, I wish I were joking). Some people want this. Be sure you're some people.",
        pros: ["Immaculate grounds", "Quiet, secure, everything works"],
        cons: ["Three apps and a plate camera to exist here"],
        recommend: false,
        boardApproval: false,
      },
      {
        id: "vdr-4",
        author: "Former owner, 2016–2023",
        date: "2024-04-12",
        tierRead: 4,
        body:
          "Original buyer, sold in 2023. Watched it curdle in real time: 2016's board waved at you; 2019's board hired the management company; 2021's board hired the law firm; 2023's board WAS the law firm's client list. 163 rules and the number that matters is 4 — the lawsuits against residents. Nobody sues their way to a neighborhood.",
        cons: ["Four lawsuits against residents since 2021"],
        recommend: false,
        boardApproval: false,
      },
    ],
  },
];
