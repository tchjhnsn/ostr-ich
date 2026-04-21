---
name: specification-anchored-development
description: >
  Specification-Anchored Development (SAD) is the mandatory methodology for all
  multi-session AI-assisted software projects. Trigger on ANY task involving
  building, architecting, implementing, or significantly modifying a codebase
  across multiple sessions. Also trigger when the user says "new project,"
  "start building," "spec this out," "let's architect," or references Vir,
  Polity, or any other product under active development. This skill defines
  how the entire development process works end-to-end and must be consulted
  whenever starting a project, beginning a session, or encountering a decision
  boundary. MANDATORY TRIGGERS: new project, spec, implement, architecture,
  session start, decision, data model, API, checkpoint, CLAUDE.md, convention,
  verification, spec change, evolution, reconcile.
---

# Specification-Anchored Development (SAD)
## AI Reference Document — Full Methodology

> **Core principle**: Compounding error is the defining failure mode of iterative
> AI development. Even a 1% per-step error rate becomes catastrophic over 50+ steps.
> SAD addresses this by narrowing the space of "correct" behavior through formal
> specification *before* any implementation begins. A precise spec doesn't improve
> the per-step success rate — it collapses what "incorrect" can even mean.

---

## QUICK REFERENCE

### The Seven Specification Layers

| Priority | Layer | Document | Addresses | Read When |
|----------|-------|----------|-----------|-----------|
| 1st | 0 | `SESSION_LOG.md` | Institutional memory, decisions, rationale | Every session, FIRST |
| 2nd | 4 | `CLAUDE.md` | Naming, style, forbidden patterns, session protocol | Every session, SECOND |
| 3rd | 1 | `PRODUCT_SPEC.md` | Intent, scope, user taxonomy, core flows | Scoping features |
| 4th | 2 | `DATA_MODEL_SPEC.md` | Entities, relationships, constraints | Any data-touching work |
| 5th | 3 | `IMPL_SPEC.md` | Architecture, APIs, build pipeline | Crossing service boundaries |
| 6th | 5 | `BEHAVIORAL_SPEC.md` | Edge cases, error conditions, state machines | Implementing validation/errors |
| 7th | 6 | `VERIFICATION_SPEC.md` | Acceptance criteria, invariants, coverage | Verifying implementation |

### Human Checkpoint Summary

| Checkpoint | When Triggered | Minimum Engagement |
|------------|---------------|-------------------|
| ★ 1.1 Interrogation Review | End of idea interrogation | Identify surprises; carry into spec |
| ★ 1.2 Product Spec Review | First complete product spec draft | Full read-through — 20–40 min |
| ★ 1.3 Data Model Review | First complete data model draft | Verify entity coverage and cardinalities |
| ★ 1.4 Implementation Spec Review | First complete impl spec draft | Verify architecture and API contracts |
| ★ 1.5 Full Spec Package Review | Before implementation begins | Cross-spec consistency — 60–90 min |
| ★ 2.x Decision Boundary | Mid-session, per AI proposal | Confirm / Redirect / Escalate |
| ★ 3.1 Verification Review | After each implementation unit | Review compliance report |

### Spec Change Classes

| Class | What Changed | Propagates To |
|-------|-------------|---------------|
| Class 1 — Scope | In/Out of scope list | ALL downstream layers |
| Class 2 — Structural | Entity, relationship, or property | Data Model → Impl → Behavioral → Verification |
| Class 3 — Behavioral | Rule, constraint, or error response | Behavioral → Verification |
| Class 4 — Convention | Naming or style rule | CLAUDE.md only + retroactive normalization |

---

## PART 1: SESSION OPENING PROTOCOL

**This protocol is mandatory at the start of every implementation session.**

1. Read `SESSION_LOG.md` (full — don't skim)
2. Read `CLAUDE.md` (full)
3. Read the spec layer(s) relevant to the current task
4. State: (a) the precise task, (b) which spec section(s) it maps to, (c) anticipated decision points
5. Check for unresolved staleness markers in the Session Log
6. **Do not write a single line of implementation code until steps 1–5 are complete**

> **Staleness rule**: If there are unresolved staleness markers on the module you're
> about to work on, run a reconciliation sprint first. No new features on modules
> with unresolved markers.

---

## PART 2: THE FIVE PHASES

### Phase 1: Specification (Pre-Implementation)

**Nothing is built in this phase. The entire phase produces documents.**

#### Step 1.1 — Idea Interrogation
Ask clarifying questions in this order:
1. What problem does this solve, precisely?
2. Who experiences this problem?
3. What does success look like — what would a user do differently after this exists?
4. What is explicitly out of scope?
5. What are the non-negotiable constraints?

Output: raw interrogation transcript. Do NOT attempt to write spec during this step.

**★ Checkpoint 1.1**: Human reads transcript, marks surprises. Surprises must carry into the Product Spec explicitly.

#### Step 1.2 — Product Specification Draft
- Draft the complete Product Spec from the interrogation transcript
- First pass must be complete — do not iterate section by section
- Complete drafts make contradictions visible; partial drafts hide them

**★ Checkpoint 1.2**: Full human read-through. Criteria: Vision accurate? Out of Scope defensible? Core Flows match mental model? Open Questions resolved or flagged?

#### Step 1.3 — Data Model Specification Draft
- Pre-draft decision-boundary checkpoint: propose entity list, await confirmation
- Every entity named in Product Spec must appear in Data Model
- Every relationship implied by a Core Flow must be explicit

**★ Checkpoint 1.3**: Verify entity coverage, cardinalities, temporal rules, constraint precision.

#### Step 1.4 — Implementation Specification Draft
- Pre-draft checkpoint: propose architectural decomposition, await confirmation before drafting API contracts
- Architecture decisions are the most expensive to reverse

**★ Checkpoint 1.4**: Verify architecture matches mental model, API contracts fully specified, version pins included, security/performance explicit.

#### Step 1.5 — Convention Document (CLAUDE.md) Draft
Place in repo root before any implementation begins.

#### Step 1.6 — Behavioral + Verification Spec Draft
- Behavioral Spec from Core Flows + Data Model (surfaces hidden edge cases)
- Verification Spec from Product Spec requirements

**★ Checkpoint 1.5 — Full Spec Package Review** (GATE — nothing proceeds without this)
Review for: contradictions between specs, unresolved Open Questions, Verification Spec specific enough to know when done.

---

### Phase 2: Implementation

#### Session Protocol (repeat every session)
1. Run Session Opening Protocol (Part 1 above)
2. Execute Step 2.1 → 2.4 below

#### Step 2.1 — Task Scoping
Produce a one-paragraph declaration: precise task + spec reference + anticipated decision boundaries. Do not proceed without this.

#### Step 2.2 — Decision-Boundary Checkpoints
Trigger a checkpoint when:
- A decision is not fully specified in the current spec
- Multiple valid interpretations exist
- The decision would have downstream consequences in other parts of the system

**Checkpoint format:**
```
CHECKPOINT
────────────────────────────────────────────
Decision: [one declarative sentence]

Options:
  A) [description] — Tradeoffs: [pros/cons]
  B) [description] — Tradeoffs: [pros/cons]

My proposal: Option [X] because [specific rationale]

Spec reference: [Document] § [Section]

Respond with:
  CONFIRM    — proceed with my proposal
  REDIRECT   — proceed with [alternative]
  ESCALATE   — this requires a spec update before proceeding
────────────────────────────────────────────
```

**On ESCALATE**: Pause implementation. Initiate mini-spec-revision cycle (Phase 4). Do not implement until spec is updated and the checkpoint is re-issued.

**On rubber-stamp risk**: If a checkpoint is confirmed with no engagement ("yes," "ok"), note this in the Session Log. A rubber-stamped checkpoint is not a validated decision — treat the underlying question as still open.

#### Step 2.3 — Implementation
Build against spec. Every output must be traceable to a specific spec section.

#### Step 2.4 — Session Log Entry
**Mandatory at end of every session:**
```markdown
---
Date: YYYY-MM-DD
Session type: [Spec / Implementation / Verification / Evolution]

DECISIONS MADE:
  1. Decision: [...]
     Rationale: [...]
     Alternatives rejected: [...]
     Spec impact: [Layer | Section | Change type]

CHECKPOINTS TRIGGERED:
  1. [What triggered it]
     Resolution: [Confirmed / Redirected / Escalated]

SPEC AMBIGUITIES DISCOVERED:
  1. [The ambiguity]
     Resolution: [Resolved as X / Still open]

STALENESS MARKERS:
  1. [Module/section] — reason: [spec changed while module not yet updated]

PROPOSED SPEC REVISIONS:
  1. [Layer] [Section]: [What should change]
---
```

---

### Phase 3: Verification

Verification is not end-of-project — it runs after every significant implementation unit (feature, module, data layer).

#### Step 3.1 — Spec Compliance Check
Run through the Spec Compliance Checklist in the Verification Spec. Produce pass/fail report per item.

Failures are **implementation bugs**, not spec ambiguities — unless the failure reveals a genuine spec gap (which triggers Phase 4).

#### Step 3.2 — Invariant Verification
Verify all invariants in the Invariant Catalog hold for the current implementation state.

**★ Checkpoint 3.1**: Human reviews report. All failures prioritized and resolved before new features added.

---

### Phase 4: Spec Evolution

Triggered any time a spec change is required. Never silent.

#### The Change Protocol

1. **Classify the change** (Class 1–4, see Quick Reference)
2. **Draft in isolation** — update originating layer only, confirm before propagating
3. **Propagate downstream** — produce a diff for each affected layer, review each
4. **Reconcile the implementation** — produce reconciliation plan before modifying code
5. **Log the change** — Session Log entry: change, classification, layers affected, rationale

#### Staleness Prevention
- When a spec section changes, mark all code sections that reference it as "pending review" in Session Log
- Check these markers at session start
- Do not add new features to any module with unresolved staleness markers

#### Reconciliation Sprints
After any Class 1 or Class 2 spec change: the NEXT implementation session begins with a reconciliation sprint — a dedicated pass through affected code to verify it matches the updated spec. **This is not optional.**

#### When Specs Diverge from Reality
When implementation reveals a spec is factually incorrect (not ambiguous — wrong):
1. Stop implementation immediately
2. Document: what spec says, what reality requires, why incompatible
3. Revise spec to match reality — **never patch code to work around a spec you intend to keep**
4. Run full Change Protocol for the appropriate class

---

### Phase 5: Completion

#### Step 5.1 — Full Spec Audit
Compare current implementation against every spec layer. Produce discrepancy report. Classify discrepancies:
- Spec ahead of implementation → planned future work
- Implementation ahead of spec → spec update needed
- Implementation contradicts spec → defect

#### Step 5.2 — Spec Archival
All spec documents versioned and archived with code. Spec version at each deployment recorded in Session Log.

---

## PART 3: SPECIFICATION DOCUMENT STRUCTURES

### What Makes a Spec "Good Enough to Build Against"

A spec is buildable when it satisfies all four:

- **Completeness**: Every entity, behavior, and constraint that will be implemented is *named*. Not necessarily fully elaborated — named. Unnamed things don't exist in implementation.
- **Unambiguity**: Every statement has exactly one interpretation. Scope qualifiers ("most," "some," "typically") are red flags. Implicit assumptions are red flags.
- **Consistency**: No statement contradicts another. Data model and product spec describe the same entities. Impl spec and convention doc use the same naming.
- **Operationalizability**: Every requirement can be tested. "Users can reset their password" is operationalizable. "The system should be user-friendly" is not.

---

### Layer 0: Session Log (`SESSION_LOG.md`)

**Role**: Institutional memory. Solves the AI context loss problem between sessions. This is the single most underrated document — the AI reads it FIRST, every session.

**Format**: Reverse-chronological. Records why decisions were made — not what changed (that's a changelog) or what was committed (that's a git log).

**Template**: See Session Log Entry format in Phase 2, Step 2.4.

---

### Layer 1: Product Specification (`PRODUCT_SPEC.md`)

**Role**: Resolves ambiguity at the intent level. Every other spec derives from this. If something isn't in the Product Spec, it doesn't exist.

**Writing convention**: Declarative sentences. "The system does X" not "should do X." Present tense. Every term with a specific meaning must appear in the Glossary.

**Required sections**:

```
1. VISION STATEMENT
   One paragraph: problem → for whom → why it matters.
   Not marketing copy — precision instrument. Every decision traceable to it.

2. SCOPE BOUNDARY
   IN SCOPE: [list]
   OUT OF SCOPE: [list]  ← as important as In Scope; prevents spec-level scope creep

3. USER TAXONOMY
   For each user type:
     Goals: [...]
     Capabilities: [...]
     Constraints: [...]
   (Not personas — personas are marketing. Taxonomy entries specify what users
    can do, cannot do, and need the system to provide.)

4. CORE FLOWS
   For each flow:
     Preconditions: [...]
     Happy path: [numbered steps]
     Error path: [at least one, with specific error]
   No implementation detail. Behavioral descriptions only.

5. EDITORIAL RULES
   Content, tone, presentation rules. What language? What is forbidden?
   Moderation criteria if UGC involved.

6. NON-NEGOTIABLE CONSTRAINTS
   Legal, regulatory, performance, ethical — not subject to product tradeoffs.
   Cannot be scope-reduced.

7. GLOSSARY
   [Term]: [Definition in one sentence]
   Every domain-specific term. One definition prevents two-word meaning drift.

8. OPEN QUESTIONS
   Q1: [Question] — Owner: [name] — Due: [date]
   Undeclared open questions become hidden assumptions.
```

**Quality criteria**:
- Can you use the Out of Scope list to reject a feature request?
- Does every Core Flow have an explicit error path?
- Are all Glossary terms used consistently throughout?

---

### Layer 2: Data Model Specification (`DATA_MODEL_SPEC.md`)

**Role**: Formal definitions of every entity, relationship, constraint, temporal rule. Formal enough that code can be validated against it mechanically.

**Writing convention**: Tabular structure. Every property has type, constraint, nullability, derivation rule if computed. Constraints as boolean predicates, not prose.

**Required sections**:

```
1. ENTITY REGISTRY
   Table: name | description | primary key type | creation rule |
          deletion rule (hard/soft/forbidden) | product spec reference

2. PROPERTY TABLES (per entity)
   Table: property name | type | nullable | default | constraint | derivation
   Constraints are PREDICATES. "length ≤ 255" not "reasonable length."

3. RELATIONSHIP MAP (per relationship)
   Table: entity A | relationship name | entity B | cardinality |
          required? | cascade behavior
   Expressed in BOTH directions.

4. CONSTRAINT CATALOG
   Business-rule constraints spanning multiple entities.
   Per entry: name | predicate | entities spanned | error message on violation

5. TEMPORAL RULES
   Audit fields, state machines (with legal transitions),
   time-bounded records, archival rules.

6. INDEX AND QUERY PLAN
   Per major query: access pattern | expected data volume | required performance
   Drives index decisions. Prevents logically-correct-but-operationally-broken schemas.
```

**Quality criteria**:
- Can you construct a valid database schema from this document alone?
- Is every entity named in the Product Spec represented here?
- Are all M:N relationships fully specified including the join entity?
- Does every constraint have a name that can appear in validation error messages?

---

### Layer 3: Implementation Specification (`IMPL_SPEC.md`)

**Role**: Technical architecture, service boundaries, API contracts, build pipeline. Prevents architectural drift between sessions.

**Writing convention**: Declarative past tense for decisions: "We chose X because Y, not Z because W." This preserves rationale — essential for correct future evolution.

**Required sections**:

```
1. TECHNOLOGY STACK
   Every technology: choice | version | rationale for selection
   Version pins are REQUIRED.

2. SYSTEM ARCHITECTURE
   Per unit (service/module/layer): responsibility (one sentence) |
   inputs | outputs | dependencies
   Expressed as directed graph where edges = dependencies.

3. API CONTRACTS (per endpoint/interface)
   method | path | request shape (with types) | response shape (with types) |
   error responses (with codes and messages) | authentication requirements
   Both sides of every interface build to this.

4. FILE SYSTEM TOPOLOGY
   Organizational principles, not file listing.
   Rules: a new contributor should place any new file correctly from this section alone.

5. BUILD PIPELINE
   Per step: what it does | what it requires | what it produces | what failure looks like
   Covers: local dev | CI | staging | production

6. SECURITY MODEL
   Authentication mechanism | authorization model (RBAC/ABAC/etc.) |
   data classification | compliance requirements
   Every data access decision traceable to this section.

7. PERFORMANCE BUDGET
   Per critical operation: operation | required latency | measurement method
   Enforceable, not aspirational.
```

**Quality criteria**:
- Can you determine from this document whether any given file should be a server or client component?
- Does every API contract specify all error responses, not just the happy path?
- Is every technology choice justified, not just listed?
- Can you trace a data access decision to its authorization rule?

---

### Layer 4: Convention Document (`CLAUDE.md` — lives in repo root)

**Role**: Prevents the most common class of small inconsistency errors. Read at the start of every session (second, after Session Log).

**Writing convention**: Every rule actionable without judgment. "Use good naming" is not a rule. Examples of correct AND incorrect patterns required for each rule.

**Required sections**:

```
# CLAUDE.md
# Read this at the start of every session before writing any code.

## PROJECT CONTEXT
[What this project is. Current state. Technology stack. Non-obvious decisions.]

## SESSION PROTOCOL
1. Read SESSION_LOG.md
2. Read this document
3. Read the spec layer(s) relevant to the current task
4. State: task + spec reference + anticipated decision points
5. Do not proceed until above is complete

## NAMING CONVENTIONS
Components:      PascalCase (e.g. UserProfile, not userProfile)
Files:           kebab-case (e.g. user-profile.tsx)
Functions:       camelCase (e.g. getUserById)
Database tables: snake_case plural (e.g. user_profiles)
Env variables:   SCREAMING_SNAKE_CASE (e.g. DATABASE_URL)
[Add all categories relevant to the project]

## FILE ORGANIZATION
[Decision tree: where does each type of file go?]

## FORBIDDEN PATTERNS
- [Never do X because Y]
- [Never use library Z — use W instead because ...]

## CHECKPOINT PROTOCOL
Trigger a checkpoint when:
- A decision is not fully specified
- Multiple valid interpretations exist
- Downstream consequences are likely
[Use checkpoint format from SAD methodology Phase 2, Step 2.2]

## TESTING RULES
- Every API endpoint must have: happy path + at least one error path test
- [Test file location and naming]
- [Any required test patterns]
```

---

### Layer 5: Behavioral Specification (`BEHAVIORAL_SPEC.md`)

**Role**: Specifies system behavior under edge cases, error conditions, and boundary inputs. The most commonly omitted layer — prevents the largest class of late-stage surprises.

**Required sections**:

```
1. VALIDATION RULES
   Per entity/operation: input | validation predicate | error response on failure

2. STATE TRANSITION RULES
   Per stateful entity: states | legal transitions | trigger conditions
   Expressed as a state machine, not prose.

3. ERROR TAXONOMY
   Per error type: code | user-facing message policy | logging requirement
   Categories: validation | authorization | not-found | server | dependency failure

4. CONCURRENCY AND IDEMPOTENCY RULES
   Per write operation: behavior on duplicate submission | behavior on concurrent submission |
   idempotency requirement | how idempotency is achieved

5. DEPENDENCY FAILURE MODES
   Per external dependency: behavior when unavailable | fallback? | graceful degradation? |
   hard failure?
   These must be explicit decisions, not discovered at 2am.
```

---

### Layer 6: Verification Specification (`VERIFICATION_SPEC.md`)

**Role**: Defines what a passing implementation looks like. Makes specs enforceable rather than aspirational.

**Required sections**:

```
1. TEST COVERAGE REQUIREMENTS
   Per category (unit/integration/e2e) and area: what must be tested

2. ACCEPTANCE CRITERIA
   Per Core Flow: specific observable outcomes that constitute correct behavior
   Must be directly translatable to automated or manual tests.

3. INVARIANT CATALOG
   Per invariant: statement | entities it spans | test that verifies it
   Statements about system state that must always be true, regardless of operations.

4. SPEC COMPLIANCE CHECKLIST
   Per spec layer: questions the AI answers before declaring a task complete
   Example: "Is every entity in this implementation traceable to the Data Model Spec?"
```

---

## PART 4: PRESSURE TEST — KNOWN FAILURE MODES

### What Will Break First (in order of likelihood)

**1. Spec staleness** (most predictable failure)
Under time pressure, developers update code rather than specs because updating code feels like progress and updating specs feels like overhead. The staleness marker system + reconciliation sprint requirement are the mechanisms that prevent this. If you implement one thing from this methodology besides the specs themselves, make it: **no new features on any module with unresolved staleness markers**.

**2. Specification ambiguity propagation**
Certain spec sections will contain hidden ambiguities — statements that sound precise but aren't. "User authentication should be secure" is an example. Run a precision audit: review specs specifically for statements that sound precise but are actually aspirations with specification syntax.

**3. Checkpoint fatigue**
Decision-boundary checkpoints require genuine engagement. A rubber-stamped checkpoint is worse than no checkpoint — it creates a false record of validation. The minimum viable engagement for a checkpoint: read the proposal, consider the alternatives, and either confirm with a reason or redirect with an instruction.

**4. AI context loss between sessions** (partially mitigated by Session Log)
The Session Log is the primary mitigation. But even with it: the AI doesn't know which decisions were made across sessions, which alternatives were rejected, or why. The Session Log must be genuinely maintained — not as a formality.

### What Was Missing from the Original Four-Layer Design

**Behavioral Specification**: No layer for edge cases, error conditions, boundary inputs. Data model tells you what an entity is; behavioral spec tells you what happens when a form is submitted with a null required field, when an API times out, when two writes conflict simultaneously.

**Verification Specification**: No spec for how to verify implementation matches spec. Without this, compliance is a matter of judgment rather than evidence.

**Dependency Surface**: No tracking of external dependencies and their behavioral assumptions. A third-party API changing its response shape breaks implementations that were otherwise correct against the spec.

**Migration Specification** (for data-heavy projects): How do data model changes propagate to existing data? A correct data model change can produce broken runtime state without a migration spec.

---

## PART 5: COMPLEMENTARY TECHNIQUES

### Highest Compatibility Integrations

**Contract-Driven Development (OpenAPI)**
Generate machine-readable OpenAPI specs from the Implementation Spec. Use for: automatic mock generation (frontend builds before backend is implemented), contract testing (automated verification that implementations honor contracts), drift detection (CI fails on divergence). Tools: OpenAPI Generator, Pact, Prism.

**Type-Driven Development (TypeScript)**
Define domain types first, before any logic. The Data Model Spec maps to TypeScript type definitions. Every entity becomes an interface. Constraints expressible as type-level constraints should be. Transforms parts of the spec from document into executable code. Add "Type Registry" section to Data Model Spec mapping each entity to its TypeScript type.

**Architecture Decision Records (ADRs)**
Promote significant decisions from the Session Log to full ADRs in `/docs/adr/`. ADRs are numbered sequentially and never revised — a changed decision generates a new ADR that supersedes the previous. Prevents the most common AI context failure: re-architecting something that was deliberately designed a specific way.

**Event Storming (for complex domain modeling)**
Model the system as domain events → commands → aggregates → read models before writing the Data Model Spec. Prevents designing a data model based on UI screens rather than domain behavior. Output maps directly to Entity Registry and State Transition Rules.

**Property-Based Testing (Invariant Coverage)**
Every invariant in the Invariant Catalog should be expressed as a property-based test. Tools: fast-check (TypeScript), Hypothesis (Python). Provides stronger coverage than example-based tests and catches edge cases no human would specify.

**Strangler Fig (for large spec evolution)**
When a Class 1 or Class 2 change is large enough to constitute a redesign, create a new spec document (e.g., `DATA_MODEL_V2.md`) rather than revising the existing one. Both versions coexist until migration is complete. Prevents partial-migration states from creating internal spec inconsistency.

---

## PART 6: TEMPLATES

### Product Specification Header
```markdown
# PRODUCT SPECIFICATION
# Project: [name]
# Version: 0.1.0
# Status: DRAFT | APPROVED | SUPERSEDED
# Last revised: YYYY-MM-DD
# Depends on: (none)

## 1. VISION STATEMENT
[One paragraph. Problem → for whom → why it matters.]

## 2. SCOPE BOUNDARY
### In Scope
- [Feature/capability 1]

### Out of Scope
- [Explicitly excluded thing 1]

## 3. USER TAXONOMY
### [User Type Name]
Goals: [...]
Capabilities: [...]
Constraints: [...]

## 4. CORE FLOWS
### Flow: [Name]
Preconditions: [...]
Happy path:
  1. User does X
  2. System does Y
Error path:
  1. User does X with invalid input
  2. System responds with [specific error]

## 5. EDITORIAL RULES
[...]

## 6. NON-NEGOTIABLE CONSTRAINTS
[...]

## 7. GLOSSARY
[Term]: [Definition in one sentence]

## 8. OPEN QUESTIONS
Q1: [Question] — Owner: [name] — Due: [date]
```

### Data Model Entity Entry
```markdown
## Entity: [EntityName]
Description: [One sentence]
Product spec reference: [Section]
Primary key: [type]
Creation rule: [Who/what creates this entity and when]
Deletion rule: hard | soft | forbidden

### Properties
| Property   | Type     | Nullable | Default | Constraint          | Derivation |
|------------|----------|----------|---------|---------------------|------------|
| id         | UUID     | NO       | auto    | unique              |            |
| created_at | DateTime | NO       | now()   |                     |            |
| [prop]     | [type]   | [Y/N]    | [val]   | [predicate]         | [formula]  |

### Relationships
| Relates to | Relationship | Cardinality | Required | Cascade  |
|------------|-------------|-------------|----------|----------|
| [EntityB]  | [verb]      | 1:N         | YES      | restrict |
```

### Decision-Boundary Checkpoint
```
CHECKPOINT
────────────────────────────────────────────
Decision: [one declarative sentence]

Options:
  A) [description]
     Tradeoffs: [pros and cons]
  B) [description]
     Tradeoffs: [pros and cons]

My proposal: Option [X] because [specific rationale]

Spec reference: [Document] § [Section]

Respond with:
  CONFIRM    — proceed with my proposal
  REDIRECT   — proceed with [alternative]
  ESCALATE   — this requires a spec update before proceeding
────────────────────────────────────────────
```

### Session Log Entry
```markdown
---
Date: YYYY-MM-DD
Session type: Spec | Implementation | Verification | Evolution

DECISIONS MADE:
  1. Decision: [...]
     Rationale: [...]
     Alternatives rejected: [...]
     Spec impact: [Layer | Section | Change type]

CHECKPOINTS TRIGGERED:
  1. [What triggered the checkpoint]
     Resolution: Confirmed | Redirected | Escalated

SPEC AMBIGUITIES DISCOVERED:
  1. [The ambiguity]
     Resolution: [How resolved or "still open"]

STALENESS MARKERS:
  1. [Module/section] — reason: [...]

PROPOSED SPEC REVISIONS:
  1. [Layer] [Section]: [What should change]
---
```

---

## PART 7: CRITICAL REMINDERS FOR AI

1. **Spec authority**: When reality conflicts with spec, the spec changes — not the policy. Never patch code around a spec you intend to keep.

2. **Checkpoint discipline**: Trigger checkpoints on irreversible decisions with downstream consequences. Not every micro-decision. Not zero decisions.

3. **Escalate on spec gaps**: If a checkpoint reveals a genuine spec gap, escalate — do not improvise an answer and proceed. Pause and update the spec first.

4. **Session Log first**: Every session reads the Session Log before anything else. If you don't have the Session Log, ask for it or note that context may be missing.

5. **Layer derivation**: The Product Spec is the source of truth. Data Model, Impl Spec, Behavioral Spec, and Verification Spec all derive from it. Contradictions between derived specs resolve back to the Product Spec.

6. **Reconciliation before new work**: If you discover a staleness marker, run a reconciliation sprint before adding new features to the affected module.

7. **Naming consistency**: If a term appears in the Glossary, use it exactly as defined everywhere. Synonym drift is the most insidious spec inconsistency.

8. **No silent drift**: Every spec change is logged. Every propagation is traced. Every reconciliation is noted. Silence is the enemy.

---

*Specification-Anchored Development — Version 1.0 — March 2026*
*Developed by Torian and Claude*
