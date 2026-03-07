# Vehicle Statuses and Transitions
**Status:** [COMPLETE]
**Source:** context-lot-walkthrough.md Sections 4, 12; LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md Sections 3–4

---

## Overview

Every vehicle on the Edmonton Office lot is in exactly one state at all times. This file defines every valid state, the conditions for entering and exiting each state, and the critical rules that prevent misclassification.

---

## State Definitions Table

| State | Definition | Correct System Status Label | Entry Trigger | Exit Trigger |
|---|---|---|---|---|
| Ship Mode | Factory transport state — battery disconnected, software in low-power mode. Vehicle cannot be driven normally or delivered. | No specific Airtable status — vehicle must NOT be entered as "RECON" | Vehicle arrives from factory still in transport configuration | Battery reconnected AND software reset performed |
| Pending PDI | New vehicle arrived, awaiting Pre-Delivery Inspection. Vehicle is in the system but has not yet been inspected. | `AVAILABLE` or as explicitly set — NEVER `IN RECON` | Vehicle exits Ship Mode (or arrives without ship mode) | Service technician begins PDI |
| PDI In Progress | Being actively inspected by a service technician. | There is nothing in Airtable to see this or know this information [COMPLETE] | Technician begins PDI work | Technician completes PDI and marks complete in system |
| PDI Complete | Inspection done. Technician has marked complete in the manufacturer system. | Updated by technician in manufacturer system | Technician marks PDI complete | Vehicle moves to Detailing |
| Detailing | Vehicle being cleaned/detailed by external vendor (DHG) or quick wash. | In service flow | PDI Complete | Detailing vendor completes work |
| Front-Line Ready (FLR) | Fully PDI'd + fully detailed + no stickers/tape + stock-in tag placed. Ready for display. | `AVAILABLE` or `DEMO` in Airtable | Detailing complete, all FLR conditions met | Vehicle placed on display OR vehicle is sold |
| On Display (Front Line) | Vehicle physically parked in the Cage and actively available for customer viewing and sale. | `AVAILABLE` or `DEMO` | Vehicle moved to Cage slot | Vehicle sold OR removed for service |
| Sold | Customer has purchased the vehicle. Vehicle is awaiting delivery OR has been delivered. | `SIGNED DEAL` or `WHOLESALE \| SOLD` | Sale transaction completed | Customer delivery completed |
| Booked Not Delivered (BND) | Vehicle has an active deal on paper but has NOT yet been physically handed over to the buyer. | `BOOKED \| NOT DELIVERED` | Deal is booked/signed but delivery has not occurred | Customer takes delivery of vehicle |
| Trade-In | Vehicle received from a customer as part of a deal. Vehicle belongs to the dealership, condition and destination TBD. | Varies based on condition and routing decision | Customer surrenders vehicle as trade-in | Vehicle is routed to DHG (detail), West Side of Building (RECON), or Auction Area |
| Customer Vehicle | A customer's personal vehicle on the lot for any reason (awaiting service pickup, waiting during service, etc.). Does NOT belong to the dealership. | Not an inventory item — must be signed | Customer's personal vehicle arrives on lot | Customer retrieves their vehicle |
| Recon | Vehicle undergoing reconditioning or mechanical work before it can be offered for sale. | `IN RECON`, `INCOMING`, `WHOLESALE`, or `CHASE` | Vehicle determined to need mechanical work or preparation before retail sale | Reconditioning work complete, vehicle moves toward FLR |
| Dealer Trade Incoming | Vehicle arriving from another dealership. Requires final PDI + full detail before any placement decision, even if the originating dealer certifies it as ready. | AVAILABLE (applied immediately on arrival, same as standard new vehicle) [COMPLETE] | Vehicle transport from another dealer arrives on lot | Final PDI complete + full detail complete |
| Auction Bound | Vehicle routed to auction rather than retail sale. | Not tracked in Airtable with a specific status label | Management decision to route vehicle to auction | Vehicle leaves lot for auction |
| Non-Prime / Division One | Vehicle identified as belonging to the Non-Prime division. Completely prohibited on this lot. | Airtable `STOCK HOLDER` = `NON PRIME DIVISION` | Vehicle arrives on lot (incorrectly) | Vehicle transported to AB \| STURGEON DODGE immediately |

---

## Critical Rules — Never Violate

**RULE 1: New arrivals are NEVER given "Recon" status.**
A new vehicle that arrives and needs PDI is "Pending PDI" — NOT "RECON." Classifying a new arrival as RECON hides it from the sales inventory system. Sales staff cannot see it, cannot sell it, and it generates zero revenue while occupying a slot.

**RULE 2: Ship mode vehicles must be fully cleared before anything else happens.**
A vehicle in ship mode must have: battery reconnected AND software reset performed AND PDI completed — BEFORE it can be placed on the front line OR delivered to a customer. No exceptions.

**RULE 3: PDI cannot be skipped for dealer trades.**
Even if the originating dealership says the vehicle is already inspected and ready, the Edmonton Office must perform its own final PDI. This is a Stellantis requirement and applies to every dealer trade.

**RULE 4: Non-prime vehicles leave immediately.**
Any vehicle with Airtable `STOCK HOLDER` = `NON PRIME DIVISION` must be routed to AB \| STURGEON DODGE immediately. These vehicles are prohibited on the Edmonton Office lot without exception.

---

## State Transition Diagram

```
VEHICLE ARRIVES ON LOT
         │
         ├── Is STOCK HOLDER = "NON PRIME DIVISION"?
         │   └── YES → Route to AB | STURGEON DODGE immediately [TERMINAL]
         │
         └── STOCK HOLDER = "STURGEON DODGE" → Continue
                   │
                   ├── Is it a Dealer Trade?
                   │   └── YES → [DEALER TRADE INCOMING]
                   │              │
                   │              └── Route to Service for final PDI + full detail
                   │                           │
                   │                           └── → [PDI IN PROGRESS] → [PDI COMPLETE]
                   │                                           │
                   │                                           └── → [DETAILING]
                   │                                                       │
                   │                                                       └── → [FRONT-LINE READY]
                   │
                   ├── Is it in Ship Mode?
                   │   └── YES → [SHIP MODE]
                   │              │
                   │              ├── Reconnect battery
                   │              ├── Perform software reset
                   │              └── → [PENDING PDI]
                   │
                   ├── Is it a new vehicle (KM ≤ 1,000)?
                   │   └── YES → [PENDING PDI]
                   │              │
                   │              └── Route to Service for PDI
                   │                           │
                   │                           └── → [PDI IN PROGRESS]
                   │                                           │
                   │                                           └── [PDI COMPLETE]
                   │                                                     │
                   │                                                     └── → [DETAILING]
                   │                                                                 │
                   │                                                                 └── → [FRONT-LINE READY]
                   │                                                                               │
                   │                                                                               └── → [ON DISPLAY — CAGE]
                   │
                   ├── Is it a Trade-In?
                   │   └── YES → [TRADE-IN] — Place trade-in banner immediately
                   │              │
                   │              ├── Needs detail only? → Route to DHG → [DETAILING] → [FRONT-LINE READY]
                   │              ├── Needs mechanical work? → West Side of Building → [RECON]
                   │              └── Auction-bound? → Auction Area → [AUCTION BOUND]
                   │
                   └── Is it a customer's personal vehicle?
                       └── YES → [CUSTOMER VEHICLE] — Place customer sign immediately
                                  │
                                  └── Customer retrieves vehicle → [OFF LOT — TERMINAL]

---

[ON DISPLAY — CAGE]
         │
         └── Vehicle is sold
                   │
                   └── → [SOLD] — Place sold sign immediately with customer name
                              │
                              ├── Move to East Side Fence Line
                              ├── Is deal booked but delivery not yet occurred?
                              │   └── YES → [BND — BOOKED NOT DELIVERED]
                              │              │
                              │              └── Stays at East Side Fence Line until delivery
                              │
                              └── Delivery occurs → Customer takes vehicle [TERMINAL — off lot]
```

---

## What NEVER Happens

| Prohibited Action | Why Prohibited | Consequence |
|---|---|---|
| New vehicle categorized as "Recon" | Hides vehicle from sales inventory system | Vehicle cannot be found or sold; days-in-stock accumulate invisibly |
| Vehicle skips PDI and goes to display | Violates Stellantis compliance requirement | Drops compliance rate below 80%; triggers manufacturer fines and docking |
| Vehicle delivered in ship mode | Battery is disconnected; vehicle dies within hours | Confirmed incident: car died next day, required tow, complete rework ($275 detail + tow cost) |
| Vehicle sits on front line without PDI + detail + tag | Does not meet Cage requirements | Compliance failure; potential customer dissatisfaction; non-compliant lot |
| Vehicle sits without identification signage | No one can determine its status | Confirmed incident: Kia sat 6 weeks with no identification; completely paralyzed |
| Detail skipped before delivery | $275 confirmed rework cost if skipped | Confirmed incident: vehicle delivered without detail, had to be fully redone |

---

