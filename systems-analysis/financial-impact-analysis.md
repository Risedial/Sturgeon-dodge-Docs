# Financial Impact Analysis
**Phase:** 2 — Systems Analysis
**Status:** [COMPLETE]
**Source:** knowledge/financial-penalties.md (all dollar amounts); knowledge/service-department-utilization.md; knowledge/compliance-requirements.md; knowledge/external-vendors.md
**Date:** 2026-03-09

---

## Overview

This document quantifies the financial impact of operational failures and the financial value of operational standards at the Edmonton Office lot. All dollar amounts in Section A trace directly to `knowledge/financial-penalties.md`. Estimates in Sections B and C are tagged `[ASSUMPTION]` with their basis clearly stated. Missing figures are tagged `[NEEDS_INPUT]`.

---

## Section A — Direct Costs (Known Amounts)

All figures below are sourced from `knowledge/financial-penalties.md` and are confirmed costs — enforced, not theoretical.

### A1. Dealer Plate Lost

| Item | Amount | Borne By | Enforcement |
|---|---|---|---|
| Lost dealer plate penalty | $500 per occurrence | Employee who last signed it out through Key Cafe | **ENFORCED — CONFIRMED PRECEDENT** (employee named Charlie [AMBIGUOUS — role unknown] paid this penalty in full) |

**Risk per incident:** $500 direct charge to an individual employee.
**Systemic risk:** If peer-to-peer transfers are not prevented, the wrong employee bears this cost and the correct accountable party escapes penalty — destroying the deterrent effect.

---

### A2. GPS Key Tag — Lost or Not Returned

| Item | Amount | Borne By | Enforcement |
|---|---|---|---|
| GPS key tag reprogram | $25 per occurrence | Employee who lost or failed to return it | **ENFORCED** |

**Risk per incident:** $25 per tag. Every vehicle key set has a GPS tag. If a tag is lost or separated from the key set, this cost applies.

---

### A3. Vehicle Keys — Lost

| Item | Amount | Borne By | Enforcement |
|---|---|---|---|
| Vehicle key replacement | ~50% of replacement cost | Employee who lost them | **ENFORCED** |

**Note:** Exact replacement cost varies by vehicle model — no single figure applies across all inventory. No standard amount is specified in source material. `[NEEDS_INPUT]` — Exact per-model key replacement costs should be compiled for common inventory makes/models.

---

### A4. Skipped Detail — Rework Cost

| Item | Amount | Borne By | Notes |
|---|---|---|---|
| Skipped detail rework | $275 per occurrence | Not confirmed — who bears this cost is not specified in source material `[NEEDS_INPUT]` | **CONFIRMED COST** — Confirmed real incident: vehicle delivered without detail, full redo required. |

**Context:** Normal DHD full detail cost is $60 per vehicle. The $275 rework cost represents the premium for performing the detail as a reactive rework rather than a standard pre-delivery step — nearly 4.6x the cost of doing it correctly.

---

### A5. Ship Mode Delivery Failure — Tow Cost

| Item | Amount | Borne By | Notes |
|---|---|---|---|
| Tow cost (ship mode delivery failure) | Not specified `[NEEDS_INPUT]` | Not specified `[NEEDS_INPUT]` | **CONFIRMED COST** — Confirmed real incident: vehicle died next day, required tow back. Cost is in addition to the $275 detail rework. |

---

### A6. DHD Full Vehicle Detail — Operational Cost

| Item | Amount | Per | Notes |
|---|---|---|---|
| DHD full detail | $60 | Per vehicle | Normal operational cost. Not a penalty — this is the correct cost when detail is performed as intended. |

**Reference:** `knowledge/external-vendors.md`, Section 1.

---

### A7. Service Department — Daily Labor Cost

| Item | Amount | Per | Notes |
|---|---|---|---|
| Service department labor | ~$3,000 | Per day | 9 staff. This cost is incurred every operational day regardless of utilization. |

**Reference:** `knowledge/financial-penalties.md` — Operational Cost Reference; `knowledge/service-department-utilization.md`, Section 1.

**Current utilization context:** On the day of the walkthrough, the service department served 1 external customer against this $3,000/day cost base.

---

### A8. Stellantis Non-Compliance — Fines and Docking

| Item | Amount | Borne By | Notes |
|---|---|---|---|
| Stellantis PDI non-compliance fines | Not specified `[NEEDS_INPUT]` | Dealership | Currently at 80% compliance — RED ZONE. Fines and docking begin at or near this threshold. |
| Stellantis docking | Not specified `[NEEDS_INPUT]` | Dealership | Mechanism and amounts not specified in source material. |

**Current status:** 80% compliance rate is confirmed as "entering the red zone where fines and docking begin." `knowledge/compliance-requirements.md`, Section 1.

**`[NEEDS_INPUT]`:** Exact Stellantis fine amounts and docking mechanism must be obtained from the Stellantis dealer agreement or directly from the manufacturer.

---

## Section B — Indirect Costs

Indirect costs do not appear as line items on an invoice but have real financial impact. Each estimate below includes its reasoning basis. All estimates are tagged `[ASSUMPTION]`.

---

### B1. Revenue Delay from RECON Misclassification (Hidden Inventory)

**Issue:** New vehicle arrivals entered as RECON instead of Pending PDI disappear from the sales inventory system. Sales staff cannot see or sell them. Days-in-stock accumulate invisibly.

**Estimate basis:** `[ASSUMPTION]`
- A new vehicle that is invisible to sales for 5 additional days due to misclassification generates 0 additional revenue during those days.
- A vehicle that could be sold generates no gross profit until it appears in inventory.
- Gross profit per new vehicle sale is not specified in source material — no dollar figure can be confirmed. `[NEEDS_INPUT]`
- However, every day a vehicle is hidden is a day the front line has one fewer vehicle than it should, and sales staff have one fewer option to present to customers.

**Qualitative impact:** HIGH. This is the current default behavior — most new arrivals are entered as RECON. The aggregate hidden inventory effect across all misclassified vehicles creates a persistent, invisible drag on sales capacity.

---

### B2. PDI Rework Cost When Process Is Skipped

**Issue:** When PDI is skipped under salesperson pressure and the vehicle reaches a customer without PDI, any issues discovered by the customer require rework. The ship mode incident demonstrates the extreme case.

**Known confirmed cost:** $275 (detail rework) + tow cost (unspecified) for the ship mode incident.

**Estimate basis for partial/incomplete PDI:** `[ASSUMPTION]`
- Even a partial skip (PDI done but not marked in manufacturer system) costs management time to diagnose and correct.
- A skipped PDI that causes a mechanical failure post-delivery adds: tow cost + repair cost + customer satisfaction damage + potential warranty complications.
- No specific figure can be confirmed beyond the $275 + tow cost documented in the ship mode incident.

**Qualitative impact:** HIGH. Each skipped PDI also directly reduces the Stellantis compliance rate, compounding into Section A8 manufacturer penalties.

---

### B3. Management Time Spent Correcting Avoidable Issues

**Issue:** Every avoidable failure — a vehicle in the wrong zone, a missing sold sign, a lost key, a misclassified vehicle — consumes management and lot staff time to investigate and correct.

**Estimate basis:** `[ASSUMPTION]`
- The 3-strike escalation protocol for sold signs alone requires 3 separate management interactions per incident before resolution.
- Each morning lot walk generates a task list that includes avoidable issues (wrong zone, missing tags, compliance gaps) that would not exist if standards were consistently followed.
- Management time has an implicit hourly cost. No specific salary or hourly rate is specified in source material. `[NEEDS_INPUT]`

**Qualitative impact:** MEDIUM. The aggregate time cost across all avoidable issues is material but unquantifiable without hourly cost data.

---

### B4. Customer Satisfaction Impact from Mis-Delivered Vehicles

**Issue:** The ship mode delivery failure created a customer whose new vehicle died the next day. Beyond the direct financial rework cost, this customer experienced a failed delivery.

**Estimate basis:** `[ASSUMPTION]`
- Customer satisfaction failure on a new vehicle delivery is a high-severity event.
- Impact may include: customer complaints, negative reviews, loss of repeat business, damage to dealership reputation.
- No specific revenue figure can be confirmed for lost future business. `[NEEDS_INPUT]`

**Qualitative impact:** HIGH in terms of relationship damage. The $275 + tow cost is the minimum quantifiable impact — the reputational cost is unquantifiable but real.

---

## Section C — Opportunity Costs

Opportunity costs represent revenue that could be earned if operations were fully optimized. Each item includes reasoning. All estimates are tagged `[ASSUMPTION]`.

---

### C1. Service Department Underutilization — Daily Revenue Gap

**Current state:** 9 service staff at ~$3,000/day labor cost. On the day of the walkthrough: 1 external customer served.

**Opportunity:** Routing all internal vehicle work to service converts idle technician hours into productive, internally-billed or overhead-justifying work.

**Estimate basis:** `[ASSUMPTION]`
- A new vehicle PDI takes a technician approximately [time not specified — `[NEEDS_INPUT]`] to complete.
- If the Edmonton Office receives an average of [number not specified — `[NEEDS_INPUT]`] new vehicles per week, the PDI volume represents a defined number of technician-hours per week.
- At $3,000/day / 9 staff ≈ $333/day per staff member. Any idle time represents $333/day/person in unrecovered overhead.
- If the service department operates at 1-customer utilization for 5 days per week, and each customer generates, on average, $X in revenue `[NEEDS_INPUT]`, the gap between current revenue and full-capacity revenue is substantial.

**Qualitative impact:** HIGH. The service department is described as operating at near-zero utilization on the walkthrough day. Routing all internal PDIs and inspections is the primary lever to reduce this gap.

**Connection to compliance:** Every PDI routed to service and completed within 2 days improves Stellantis compliance, reducing the risk of Section A8 manufacturer fines. Service utilization and compliance improvement are complementary outcomes of the same action.

---

### C2. Revenue Lost from Front-Line Vehicles Not Displayed Due to Missing PDI/Detail/Tags

**Issue:** A vehicle cannot be placed in the Cage until PDI is complete, detail is complete, and a stock-in tag is placed. Any delay in these steps means a Cage slot is empty (or filled with an older, lower-priority vehicle) while a newer or more desirable vehicle sits in staging.

**Estimate basis:** `[ASSUMPTION]`
- The Cage holds 20 vehicles. All 20 slots should be filled at all times.
- Each day a Cage slot is empty or filled with a lower-priority vehicle is a day a higher-priority vehicle is not in front of customers.
- Gross profit per vehicle sale is not specified in source material. `[NEEDS_INPUT]`
- However, vehicles in the Cage sell. Vehicles in staging do not. The delay between arrival and Cage placement directly delays the sale opportunity.

**Qualitative impact:** MEDIUM to HIGH depending on inventory volume and velocity. The faster vehicles move from arrival → PDI → detail → Cage, the sooner they can be sold.

---

## Section D — Cost Prevention Analysis

The table below maps each major operational process to the financial risk it prevents, with estimated frequency and annual risk exposure.

**Legend:**
- `[ASSUMPTION]` — frequency estimate is inferred; not stated in source material
- `[NEEDS_INPUT]` — data required from operations to calculate

| Process | Financial Risk Prevented | Frequency Estimate | Annual Risk Exposure |
|---|---|---|---|
| Non-prime vehicle check before placement | Insurance liability for non-prime vehicles on lot (unquantifiable — depends on any incident that occurs) | `[ASSUMPTION]` Once or twice per year based on historical frequency | Unquantifiable — depends on incident severity; insurance non-coverage is catastrophic risk |
| Ship mode clearance before display/delivery | $275 (detail rework) + tow cost (unspecified) + customer relationship damage per incident | `[ASSUMPTION]` Potential for 1–5 incidents per year without protocol | `[ASSUMPTION]` $275–$1,375 minimum direct cost + unquantifiable tow and reputational costs annually |
| PDI completion within 2 days | Stellantis fines/docking (amounts `[NEEDS_INPUT]`) | Continuous — every new vehicle arrival and dealer trade | Ongoing — rate currently at 80%, in red zone; each PDI missed increases exposure |
| New arrival status as Pending PDI (not RECON) | Hidden inventory delay — revenue delayed per vehicle per day | `[ASSUMPTION]` Currently affecting most new arrivals (current default is RECON) | `[ASSUMPTION]` Multiple vehicles × multiple days per vehicle × gross profit per vehicle `[NEEDS_INPUT]` |
| Sold sign placed immediately | Vehicle disposition errors — wrong vehicle moved, potential resale attempt | `[ASSUMPTION]` Risk per sold vehicle without sign | Low direct cost per incident but high operational disruption cost |
| Key Cafe sign-out/sign-in compliance | $500 per lost plate + ~50% key replacement cost + $25 GPS tag | `[ASSUMPTION]` 1–3 potential incidents per year without controls | `[ASSUMPTION]` $525–$1,575+ per year in penalties at current risk level |
| No peer-to-peer key/plate transfers | Misattributed $500 plate penalty (correct person escapes, wrong person pays) | `[ASSUMPTION]` Risk exists any time a plate changes hands informally | $500 per incident if plate is lost after peer-to-peer transfer |
| Stock-in tag on every vehicle | Operational paralysis — confirmed Kia incident: 6 weeks idle, zero revenue | `[ASSUMPTION]` Risk exists for every untagged vehicle | Revenue loss for every day a vehicle is idle × gross profit per vehicle `[NEEDS_INPUT]` |
| Morning lot walk (daily) | All above risks — early detection prevents compounding | Daily — every operational day | The morning lot walk is the primary risk detection mechanism across all categories |
| Service department routing (all internal work) | $3,000/day underutilization overhead × idle days | Daily — every operational day | `[ASSUMPTION]` At current 1-customer utilization, the gap is the difference between 1-customer revenue and $3,000/day cost, every day |
| DHD full detail before delivery | $275 rework cost per vehicle + customer satisfaction damage | `[ASSUMPTION]` Risk exists for every vehicle delivery without confirming detail is complete | `[ASSUMPTION]` 1–5 incidents per year without controls = $275–$1,375 minimum direct cost |
| Accountability Agreement before key/plate access | All key/plate financial penalties apply to unaccountable employees | Every new employee hire | $500+ per new employee who accesses plates/keys without signing — if incident occurs |
| Staff parking on street (not on lot) | Lot space consumed; operational disruption for transport trucks; professionalism standards | Daily — every arrival of every staff member | No direct financial cost, but operational disruption and standards degradation |

---

## Financial Priority Ranking

Based on confirmed costs and known current state, the following operational processes carry the highest financial priority:

| Priority | Process | Basis |
|---|---|---|
| 1 | PDI completion within 2 days — route all internal work to service | $3,000/day overhead + Stellantis fines at 80% compliance (red zone) |
| 2 | New arrivals classified as Pending PDI (not RECON) | Currently the default failure mode — affecting most new arrivals right now |
| 3 | Ship mode clearance before display/delivery | Confirmed $275+ per incident; confirmed precedent exists |
| 4 | Key/plate accountability (Key Cafe compliance) | $500 per lost plate — confirmed precedent; enforced |
| 5 | Stock-in tag on every vehicle | Confirmed 6-week paralysis (Kia incident) — zero revenue for extended period |
| 6 | Sold sign immediately on sold vehicles | Operational risk — wrong vehicle moved; resale confusion |
| 7 | Non-prime check before placement | Insurance exposure — catastrophic if incident occurs |

---
