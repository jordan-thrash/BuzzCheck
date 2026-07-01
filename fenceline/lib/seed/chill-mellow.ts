import type { Community } from "../types";

/**
 * The gentle end of the scale: two Chill, two Mellow.
 * All communities, people, and events are fictional (see /about).
 */
export const CHILL_MELLOW: Community[] = [
  {
    slug: "the-larches",
    name: "The Larches",
    location: "Bend, OR",
    type: "single-family",
    strictness: 18,
    toxicity: 8,
    duesMonthly: 45,
    ruleCount: 22,
    avgFine: 25,
    responseWeeks: 1,
    homes: 210,
    founded: 1998,
    tagline:
      "The HOA you forget exists, except when it plows.",
    blurb:
      "A trail-adjacent neighborhood where the HOA's main job is plowing the loop road and restocking dog bags at the trailhead. The rulebook fits on four pages, most of it about wildfire defensible space, and the board's idea of enforcement is a sticky note. Dues are $45 and people genuinely wonder what they're for.",
    stances: {
      "backyard-chickens": {
        stance: "allowed",
        note: "Up to six hens, no roosters. The bears are a bigger problem than we are.",
      },
      "rv-boat-parking": {
        stance: "allowed",
        note: "Driveway parking is fine. If it hasn't moved in a year we'll leave a friendly note.",
      },
      "short-term-rentals": {
        stance: "conditional",
        note: "Register with the board so we know who to call when the hot tub party runs late.",
      },
      "solar-panels": {
        stance: "allowed",
        note: "It's Oregon. Take whatever sun you can get.",
      },
      "exterior-paint": {
        stance: "allowed",
        note: "Earth tones preferred, nothing enforced. The 'preferred' is doing no work.",
      },
      "fence-height": {
        stance: "conditional",
        note: "Six feet max, and keep wildlife corridors open on lots backing the creek.",
      },
      "yard-signs": {
        stance: "allowed",
        note: "Say what you want. We just ask that signs come down within a month of the election.",
      },
      "basketball-hoops": {
        stance: "allowed",
        note: "Permanent or portable, either way. The cul-de-sac game on Sundays is a tradition.",
      },
      "holiday-lights": {
        stance: "allowed",
        note: "No policy. One house does a synchronized display and honestly it's great.",
      },
      "flagpole": {
        stance: "allowed",
        note: "One pole per lot, 20 feet or under. That's the whole rule.",
      },
    },
    reviews: [
      {
        id: "lar-1",
        author: "Owner, 9 yrs",
        date: "2026-03-14",
        tierRead: 0,
        body:
          "In nine years the HOA has contacted me twice: once about firewood stacked against the house during fire season (fair), once to ask if I'd lost a kayak (I had). Dues are $45 and the road actually gets plowed before the school bus comes. I forget the HOA exists, which I believe is the highest compliment available.",
        pros: ["Fire-season rules are the only rules anyone enforces", "Board answers email within days"],
        cons: ["Community wells meeting once a year runs long"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "lar-2",
        author: "Owner, 3 yrs",
        date: "2025-08-02",
        tierRead: 0,
        body:
          "We moved from a planned community in Phoenix with a 90-page rulebook, so The Larches felt like witness protection. The architectural 'review' for our shed was a guy named from the board walking over, looking at it, and saying 'yeah that's a shed.' Approved same day.",
        recommend: true,
        boardApproval: true,
      },
      {
        id: "lar-3",
        author: "Renter, 14 mo",
        date: "2025-01-19",
        tierRead: 1,
        body:
          "Chill overall, but the defensible-space inspection in June is real — they walked the lot line and flagged our woodpile and a dead juniper. Landlord got 30 days to clear it. Given the fire two ridges over in 2023, hard to be mad about the one thing they're strict on.",
        pros: ["Rules exist for actual safety reasons"],
        cons: ["June inspection is non-negotiable"],
        recommend: true,
        boardApproval: true,
      },
    ],
  },
  {
    slug: "old-mill-crossing",
    name: "Old Mill Crossing",
    location: "Greenville, SC",
    type: "single-family",
    strictness: 24,
    toxicity: 10,
    duesMonthly: 35,
    ruleCount: 18,
    avgFine: 20,
    responseWeeks: 2,
    homes: 96,
    founded: 1986,
    tagline:
      "Covenants from 1986, enforcement from never.",
    blurb:
      "Ninety-six brick ranches around a pond with a fountain that the entire $35 monthly dues apparently keeps running. The covenants were written in 1986 and largely forgotten by 1991. The board is three retirees who hold the annual meeting at the Methodist church and spend most of it discussing the fountain.",
    stances: {
      "backyard-chickens": {
        stance: "conditional",
        note: "The covenants say no livestock; the board voted 2–1 that four hens aren't livestock.",
      },
      "rv-boat-parking": {
        stance: "allowed",
        note: "Half this neighborhood owns a bass boat. We're not going to war with ourselves.",
      },
      "short-term-rentals": {
        stance: "allowed",
        note: "No rule on the books. Nobody's tried it yet, so nobody's ruined it yet.",
      },
      "solar-panels": {
        stance: "allowed",
        note: "The 1986 covenants don't mention solar because it was 1986. Go ahead.",
      },
      "exterior-paint": {
        stance: "allowed",
        note: "The houses are brick. Paint your shutters whatever you like.",
      },
      "fence-height": {
        stance: "allowed",
        note: "Six feet in back, four in front, same as the county. We just copied the county.",
      },
      "yard-signs": {
        stance: "allowed",
        note: "It's your yard. The pond is ours; keep signs out of the pond.",
      },
      "basketball-hoops": {
        stance: "allowed",
        note: "There's been a hoop at the end of Millrace Court since 1994. It stays.",
      },
      "holiday-lights": {
        stance: "allowed",
        note: "Lights up whenever, down whenever. The Hendersons' inflatables are their own reward.",
      },
      "flagpole": {
        stance: "allowed",
        note: "Nobody has ever asked. Consider this a yes.",
      },
    },
    reviews: [
      {
        id: "omc-1",
        author: "Owner, 22 yrs",
        date: "2026-05-30",
        tierRead: 0,
        body:
          "The only fine I've heard of in two decades was $20 for someone who kept putting yard waste in the pond overflow, and the board waived it when he stopped. Dues went from $30 to $35 in 2019 and it required two meetings. This is the control group other HOAs should be measured against.",
        pros: ["$35 dues", "Board treats fining as a last resort"],
        cons: ["Pond fountain politics are 80% of every meeting"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "omc-2",
        author: "Owner, 4 yrs",
        date: "2025-10-11",
        tierRead: 1,
        body:
          "Sleepy in a good way, but don't expect speed. I asked for approval to replace my mailbox post (technically required, nobody knows why) and got an answer in three weeks, hand-delivered, on paper. The answer was 'of course, why did you ask?'",
        recommend: true,
        boardApproval: true,
      },
      {
        id: "omc-3",
        author: "Former owner, 2015–2024",
        date: "2024-06-08",
        tierRead: 0,
        body:
          "Sold last year and the HOA estoppel letter took a week and cost nothing, which anyone who has sold in a stricter community will recognize as a small miracle. The covenants are so old they still reference a community pool that was never built. Nobody has amended them because nobody has needed to.",
        pros: ["Zero-friction resale process"],
        recommend: true,
        boardApproval: true,
      },
    ],
  },
  {
    slug: "kettle-creek-ranch",
    name: "Kettle Creek Ranch",
    location: "Ocala, FL",
    type: "equestrian",
    strictness: 44,
    toxicity: 16,
    duesMonthly: 685,
    ruleCount: 61,
    avgFine: 75,
    responseWeeks: 1,
    homes: 58,
    founded: 2004,
    tagline:
      "$685/mo buys competence and a dragged arena.",
    blurb:
      "Fifty-eight five-acre parcels with a shared arena, forty miles of hacking trails, and dues that run $685 a month — the price of a professionally managed barn community. The rules are real (manure management, pasture rotation, trailer staging) but they're horse rules, written by horse people, enforced by a manager who answers email within the day.",
    stances: {
      "backyard-chickens": {
        stance: "allowed",
        note: "You have horses. Chickens are the least of anyone's concerns. Keep coops 50 ft off the lot line.",
      },
      "rv-boat-parking": {
        stance: "conditional",
        note: "Horse trailers in designated staging areas; RVs behind the barn line, screened from the road.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "Liability with livestock on property is unmanageable. This one is firm and always will be.",
      },
      "solar-panels": {
        stance: "allowed",
        note: "Barn roofs are ideal for it. Submit the mounting plan so we know it survives a hurricane.",
      },
      "exterior-paint": {
        stance: "conditional",
        note: "Ranch palette on dwellings and barns — ask for the book. It's 22 colors; you'll find one.",
      },
      "fence-height": {
        stance: "conditional",
        note: "Four-board or no-climb wire at 54 to 60 inches. It's a horse community; fencing is safety.",
      },
      "yard-signs": {
        stance: "conditional",
        note: "One sign per parcel at the drive entrance. The trails stay sign-free.",
      },
      "basketball-hoops": {
        stance: "allowed",
        note: "Fine by the house. Not near the arena — the sound spooks green horses.",
      },
      "holiday-lights": {
        stance: "allowed",
        note: "Enjoy. Keep displays off pasture fencing; horses will test anything that blinks.",
      },
      "flagpole": {
        stance: "allowed",
        note: "One pole up to 25 ft at the residence. Halyards must be secured — flapping hardware and horses don't mix.",
      },
    },
    reviews: [
      {
        id: "kcr-1",
        author: "Owner, 6 yrs",
        date: "2026-04-22",
        tierRead: 1,
        body:
          "Yes, $685 a month. It buys a dragged arena, mowed trails, and a manager who had a downed oak off the bridle path by 9 AM after the last tropical storm. The manure rule (removal or composting 100 ft from any well) gets enforced with actual site visits, and thank god, because one bad neighbor could make five acres smell like fifty.",
        pros: ["Professional management, one-day response times", "Rules written by people who ride"],
        cons: ["Dues are a mortgage payment", "Trailer staging rules are fussy on event weekends"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "kcr-2",
        author: "Owner, 2 yrs",
        date: "2025-11-05",
        tierRead: 1,
        body:
          "We got one violation notice in two years: our new run-in shed went up 40 feet from the lot line instead of the required 50. The letter included the survey excerpt, the exact covenant section, and a phone number that a human answered. We moved the shed; they closed it out same week. Firm but never petty.",
        recommend: true,
        boardApproval: true,
      },
      {
        id: "kcr-3",
        author: "Owner, 11 yrs",
        date: "2024-09-17",
        tierRead: 2,
        body:
          "Longtime residents remember when dues were $410 and grumble accordingly — the arena resurfacing and the new well drove two big increases. The board publishes the reserve study every year, so at least the math is public. Strict about the right things, expensive about everything.",
        pros: ["Transparent budgets, funded reserves"],
        cons: ["Dues climbed 67% in a decade"],
        recommend: true,
        boardApproval: false,
      },
      {
        id: "kcr-4",
        author: "Renter, 8 mo",
        date: "2026-01-30",
        tierRead: 1,
        body:
          "Renting a guest cottage here while my barn gets built two counties over. As a renter you're handed the same 61 rules with your lease and the manager introduces herself in week one. It's structured, but nobody's hiding the structure. You know exactly what you signed.",
        recommend: true,
        boardApproval: true,
      },
    ],
  },
  {
    slug: "meadowlark-village",
    name: "Meadowlark Village",
    location: "Georgetown, TX",
    type: "55+",
    strictness: 38,
    toxicity: 24,
    duesMonthly: 240,
    ruleCount: 54,
    avgFine: 40,
    responseWeeks: 2,
    homes: 312,
    founded: 1997,
    tagline:
      "Gentle rules, chatty committees, gnome census.",
    blurb:
      "A 55+ village of 312 garden homes where the HOA runs pickleball leagues, a wood shop, and a rules regime that is mostly gentle and occasionally nosy. Enforcement arrives as a phone call before it's ever a letter. The famous annual controversy is the garden gnome census — decorations are capped at 'tasteful groupings' and interpretation varies.",
    stances: {
      "backyard-chickens": {
        stance: "banned",
        note: "This came to a community vote in 2021. The nays had it, 204 to 61. Blame your neighbors, not the board.",
      },
      "rv-boat-parking": {
        stance: "conditional",
        note: "The gated storage lot is $18/month and has cameras. Driveways are for cars and grandkids' bikes.",
      },
      "short-term-rentals": {
        stance: "banned",
        note: "Age-restricted community — short-term rentals would break our 55+ certification. Non-negotiable.",
      },
      "solar-panels": {
        stance: "conditional",
        note: "Approved on rear-facing slopes; street-facing requires committee review, which approves most of them.",
      },
      "exterior-paint": {
        stance: "conditional",
        note: "Twelve approved body colors. The committee added two warmer tones in 2024 after feedback. We listen, slowly.",
      },
      "fence-height": {
        stance: "conditional",
        note: "Four-foot wrought-iron look in back only. Open sightlines are a safety feature here, not an aesthetic.",
      },
      "yard-signs": {
        stance: "conditional",
        note: "One political sign, 60 days before an election, down within 10 days after. Everyone gets one; nobody gets seven.",
      },
      "basketball-hoops": {
        stance: "banned",
        note: "Permanent hoops aren't permitted. A portable one for visiting grandkids, up for the weekend, is fine — just put it away.",
      },
      "holiday-lights": {
        stance: "conditional",
        note: "Up after Thanksgiving, down by January 15. The reminder letter is friendly. The second one is less so.",
      },
      "flagpole": {
        stance: "allowed",
        note: "Per Texas law and our own inclination. Keep it under 20 ft and lit if flown at night.",
      },
    },
    reviews: [
      {
        id: "mlv-1",
        author: "Owner, 7 yrs",
        date: "2026-02-09",
        tierRead: 1,
        body:
          "The rules are real but the enforcement is human. When my husband was in the hospital and the lawn got away from us, the 'violation' was a neighbor from the landscape committee quietly mowing it and a card in the mailbox. That's the culture. The gnome census is silly, and we treat it as such.",
        pros: ["Enforcement starts with a phone call", "Amenities actually justify the dues"],
        cons: ["Decoration rules are subjective", "Committee approvals move at retirement speed"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "mlv-2",
        author: "Owner, 3 yrs",
        date: "2025-07-26",
        tierRead: 2,
        body:
          "Mellow with an asterisk. The board is kind; the decoration committee is a hobbyist police force. I was asked to 'consolidate' my gnomes from six to a 'grouping of no more than four.' I did it, but I want it on record that Gerald and Simone were separated against their will.",
        pros: ["Responsive board, good financials"],
        cons: ["'Tasteful groupings' is not a measurable standard"],
        recommend: true,
        boardApproval: true,
      },
      {
        id: "mlv-3",
        author: "Owner, 12 yrs",
        date: "2024-12-14",
        tierRead: 1,
        body:
          "Twelve years, two boards, one special assessment ($1,100 for the clubhouse roof, announced with a full engineering report and a payment plan). Compare that to my sister's HOA in Florida and this place is run like a Swiss watch that also plays canasta.",
        recommend: true,
        boardApproval: true,
      },
    ],
  },
];
