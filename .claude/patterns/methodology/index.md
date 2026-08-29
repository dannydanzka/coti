# Methodology — The Sovereignty Chain

> **PURPOSE**: Navigation hub for the methodologies that cover the full software lifecycle, by role
> **SCOPE**: Every stage from business knowledge to production release
> **EN ESTE PROYECTO**: se conservan los cuatro primeros eslabones — **SBD → SCI → SCD → SCG**.
> Los eslabones de entrega, QA y release (SDP · SQP · SRO) no se trajeron; viven en el repo de
> Soberanía del Código si alguna vez se necesitan.
> **NOTA**: la intake de requerimientos aparece a veces como **SRD**; es el mismo eslabón que **SCI**.

---

## The Chain

```
SBD → SCI → SCD → SCG
 │     │     │     │
 │     │     │     └─── Code execution, governed (Dev)
 │     │     └───────── Pre-code context design (Dev + TL)
 │     └─────────────── Requirement intake (PO + Commercial)
 └───────────────────── Domain knowledge repository (Product owner + IT)
```

Each methodology is a **role's framework**: entry conditions, phases, artifacts, handoff to the
next link. Reference file first (always loadable), deep-dive sub-SOPs in its subfolder (on demand).

## The Methodologies

| # | Methodology | Role | Input | Output | Doc |
|---|---|---|---|---|---|
| 0 | **SBD** — Sovereign Business Domain | Domain owner | Business need to document | Domain page (Business + Technical views) in `soverum/products/<name>/domain/` | [`domain/SBD.md`](domain/SBD.md) |
| 1 | **SCI** — Sovereign Commercial Intake *(fork alias: SRD)* | PO / Commercial | Business pain | INVEST-compliant story | [`commercial/SCI.md`](commercial/SCI.md) + [`commercial/SCI/`](commercial/SCI/) |
| 2 | **SCD** — Sovereign Context Design | Dev + TL | SCI-compliant ticket | `.claude/business/` + `.claude/plans/` | [`development/SCD.md`](development/SCD.md) + [`development/SCD/`](development/SCD/) |
| 3 | **SCG** — Sovereign Code Governance | Dev | SCD plan | Code + tests + lint/tsc green | [`development/SCG.md`](development/SCG.md) + [`development/SCG/`](development/SCG/) |

> industry best practices — adapt per organization before adopting as firm process. SBD imported

## Inside SCG — how the code itself gets written

| Practice | File | Note |
|---|---|---|

