# Compliance Requirements
**Status:** [COMPLETE]
**Source:** context-lot-walkthrough.md Sections 4, 12

---

## Overview

The Edmonton Office has two categories of compliance requirements: Stellantis manufacturer requirements (externally mandated, with financial penalties for non-compliance) and internal lot standards (self-enforced, with operational consequences).

---

## 1. Stellantis PDI Compliance — Manufacturer Requirement

### The Requirement
**Every vehicle delivered to the Edmonton Office dealership must have its final PDI completed within 2 calendar days of delivery.**

| Parameter | Value |
|---|---|
| Requirement type | Stellantis (manufacturer) mandate |
| Deadline | 2 calendar days from vehicle delivery to dealership |
| Applies to | All new vehicles arriving at the dealership |
| Applies to | All dealer trades arriving at the dealership |
| Tracked by | Technician entries in the manufacturer system (not Airtable) |
| Responsibility | Service technician performs PDI; technician marks complete in system |

### Current Compliance Status
**Current rate: 80% — ENTERING THE RED ZONE**

At 80% compliance, the Edmonton Office is at or near the threshold where Stellantis begins applying financial penalties (fines and docking). This is not a hypothetical future risk — it is the current state as of the walkthrough.

### Consequences of Non-Compliance
- **Financial fines** imposed by Stellantis (exact amounts not available)
- **Docking** — potential reduction in manufacturer allocations or bonuses (exact mechanism not specified)
- Continued decline in compliance rate makes recovery increasingly difficult

### What "PDI Complete" Means
PDI is complete only when:
1. A service technician has physically performed the Pre-Delivery Inspection
2. The technician has marked the PDI complete in the **manufacturer system** (not just Airtable)

A vehicle is NOT PDI complete if:
- The PDI was done at the factory (that is the initial PDI — the final PDI at the dealership is still required)
- Someone "checked it over" informally without marking it in the system
- The salesperson says it is "good to go"

### Dealer Trade PDI Rule
The same 2-day window applies to dealer trades. Even if the originating dealership certifies the vehicle as ready, the Edmonton Office must perform its own final PDI within 2 days of the vehicle arriving on this lot.

---

## 2. Ship Mode Protocol — Non-Negotiable Pre-Delivery Requirement

### What Ship Mode Is
Factory transport state in which:
- Battery is disconnected
- Software is in low-power/transport mode
- Vehicle cannot be driven normally

### Required Steps Before Any Other Action
A vehicle in ship mode must complete ALL of the following before it can be placed on the front line or delivered to a customer:

1. **Battery reconnection** — physical reconnection of the battery
2. **Software reset** — manufacturer-specified software reset procedure
3. **PDI completion** — full Pre-Delivery Inspection performed by a technician and marked complete in the manufacturer system

These three steps must happen **in sequence and in full**. No step can be skipped. No step can be substituted.

### Never-Skip Rule — The Ship Mode Delivery Failure

> **CONFIRMED REAL INCIDENT — This happened at the Edmonton Office.**

A vehicle was delivered to a customer while still in ship mode. The battery was disconnected. The PDI had not been performed. The detail had not been completed.

**What happened:**
- The car died the next day after delivery — the customer was stranded
- The vehicle had to be towed back to the dealership
- Cost: $275 (skipped detail rework) + tow cost + complete rework of the entire preparation process
- The customer experienced a failed delivery and had to wait for the work to be redone

**This confirms that PDI and ship mode clearance cannot be skipped under any circumstances.** The cost of skipping is far greater than the cost of doing it correctly.

---

## 3. Salesperson Override Attempts — How to Handle

Sales staff may pressure lot staff to skip PDI or rush delivery before PDI is complete. This pressure must be resisted every time.

### If a salesperson says "it's good to go" or "don't worry about it":

**Respond with exactly:**
> "Stellantis requires final PDI within 2 days. We're at 80% compliance, in the red zone. It needs to go through."

This response:
- States the manufacturer requirement
- States the current compliance position
- Makes clear the consequence (red zone = fines and docking begin)
- Does not leave room for negotiation

### If delivery is imminent (customer is waiting):

**Action:** Expedite through PDI — go to the service department immediately and request priority processing. Do NOT skip the PDI. The customer waits. The PDI happens first.

---

## 4. Lot Display Compliance — Internal Standards

### Front-Line Display Requirements
All vehicles in the Cage must simultaneously meet these standards:

| Requirement | Standard | Consequence of Failure |
|---|---|---|
| PDI complete | Required before any Cage placement | Vehicle must be removed from Cage and sent to service |
| Fully detailed | Required before any Cage placement | Vehicle must be sent to DHG for detail before placement |
| No stickers | All manufacturer/transport stickers removed | Remove stickers before display |
| No tape | All tape removed (seals, labels, etc.) | Remove tape before display |
| Stock-in tag | Placed in bottom-right corner of windshield | Tag before placing in Cage |
| Facing outward | Facing toward customers | Reposition vehicle |
| Door spacing | Doors can fully open | Reposition vehicle to adequate spacing |

### Non-Prime Prohibition
Non-prime / Division One vehicles are prohibited on the Edmonton Office lot at all times. Placing one on this lot constitutes a compliance failure because:
- These vehicles are not covered under this lot's insurance
- They operate under a separate business entity

---

## 5. New Vehicle Categorization Compliance

### The RECON Misclassification Problem
A critical compliance failure occurs when new vehicle arrivals are classified as "RECON" (or "IN RECON") instead of "Pending PDI."

| Correct Classification | Incorrect Classification |
|---|---|
| New arrival = "Pending PDI" | New arrival = "IN RECON" |
| Vehicle appears in sales inventory | Vehicle disappears from sales inventory |
| Sales staff can see and sell it | Sales staff cannot see or sell it |
| Days-in-stock accumulate visibly | Days-in-stock accumulate invisibly |

**Any employee who assigns "RECON" status to a new vehicle arrival is creating a compliance failure that directly costs the dealership revenue.**

---

## 6. Compliance Summary

| Requirement | Authority | Deadline / Standard | Current Status | Consequence of Failure |
|---|---|---|---|---|
| Final PDI within 2 days of delivery | Stellantis (manufacturer) | 2 calendar days | 80% compliance — RED ZONE | Financial fines + docking |
| Ship mode cleared before display/delivery | Stellantis + operational | Before any other step | No separate compliance rate tracked | Vehicle failure, tow, rework |
| Dealer trade PDI within 2 days | Stellantis (manufacturer) | 2 calendar days from arrival | No separate tracking from standard PDI | Same as standard PDI non-compliance |
| New vehicles never classified as RECON | Internal | Immediate on arrival | It is the current default — most new arrivals are entered as RECON [COMPLETE] | Hidden inventory, lost sales |
| Non-prime vehicles prohibited | Internal / Insurance | Immediate on detection | Very rarely — has happened only once or twice in the dealership's history [COMPLETE] | Insurance exposure |

---

