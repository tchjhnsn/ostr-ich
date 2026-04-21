# The General Structural Analysis Methodology

**Version:** 1.0
**Date:** March 24, 2026
**Status:** Foundational draft — this document articulates the intellectual core of Ostr-itch for the first time. It will evolve as the product and methodology develop.

---

## What This Document Is

This document describes the general structural analysis methodology — the intellectual foundation of Ostr-itch. It answers the question: what does it mean to structurally analyze anything?

Ostr-itch is an encyclopedia of how things are structured. But "how things are structured" is not a casual observation — it is the application of a methodology. This document defines that methodology. Without it, Ostr-itch is a collection of diagrams. With it, Ostr-itch is a systematic tool for understanding the architecture of reality.

---

## The Core Insight

Every structured entity in the world — a corporation, a government, a biological organism, a solar system, a social hierarchy, a supply chain, a family — can be understood by asking the same set of structural questions:

1. **What are its constituent parts?**
2. **How are those parts organized relative to each other?**
3. **How do the parts relate to each other?**
4. **What is the lifecycle of each part?**
5. **What is the lifecycle of the whole?**

These five questions are domain-general. They apply to a Fortune 500 company and to the structure of a cell. The answers are domain-specific — a corporation has departments, a cell has organelles — but the questions are universal.

This is the core insight: structure is a universal property of organized systems, and the methodology for analyzing structure can be formalized independently of domain.

---

## The Five Structural Questions

### 1. What are its constituent parts?

Every structured entity is composed of parts. The first analytical act is decomposition — identifying what the parts are.

This seems simple, but the difficulty is in choosing the right level of granularity. A corporation can be decomposed into subsidiaries, or into departments, or into teams, or into individuals. A biological organism can be decomposed into organ systems, or into organs, or into tissues, or into cells, or into molecules. The methodology does not prescribe a single level — it asks the analyst (or the user, or the AI) to identify the parts at the level that is meaningful for the analysis being performed.

**The granularity principle:** Decompose to the level where each part has distinct identity and function. If two parts have the same function and no meaningful distinction, they are one part. If a part contains sub-parts with meaningfully different functions, it should be decomposed further. Stop when further decomposition yields parts that are interchangeable or indistinct.

**Domain examples:**
- **Corporation:** Alphabet → Google, Waymo, Verily, X, DeepMind (constituent parts at the subsidiary level)
- **Government:** United States Federal Government → Executive Branch, Legislative Branch, Judicial Branch (constituent parts at the branch level)
- **Biological:** Human body → Nervous system, Cardiovascular system, Respiratory system, Digestive system (constituent parts at the organ system level)
- **Celestial:** Solar system → Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, asteroid belt, Kuiper belt (constituent parts at the body level)
- **Social:** A university → Colleges, administrative units, student organizations, governance bodies (constituent parts at the organizational unit level)

### 2. How are those parts organized relative to each other?

Once parts are identified, the next question is arrangement. How do the parts sit relative to each other? This is the topology of the structure — its shape.

**Organizational patterns** (non-exhaustive — these are common patterns, not a closed set):

- **Hierarchical:** Parts are arranged in layers of authority or containment. A parent contains children. This is the most common pattern in human organizations and the one Ostr-itch's current codebase implements (tree structure). Examples: corporate org charts, military command structures, file systems, biological taxonomy.

- **Networked:** Parts are connected to each other without a strict hierarchy. Connections can be many-to-many. Examples: neural networks, social networks, the internet, trade relationships between nations.

- **Layered:** Parts are arranged in stacked layers where each layer depends on the one below it and provides services to the one above it. Examples: the OSI network model, geological strata, the software stack (hardware → OS → middleware → application).

- **Radial:** Parts emanate from a shared center. The center is the core; the outer parts are surfaces or expressions of the core. Examples: a product with multiple interfaces (Ostr-itch's own product composition model: core → surfaces), a sun with orbiting planets, a hub-and-spoke transit system.

- **Cyclical:** Parts are arranged in a loop where each part feeds into the next. Examples: the water cycle, the Krebs cycle, a feedback loop in a control system, the legislative process (draft → committee → floor vote → executive → implementation → evaluation → draft).

- **Hybrid:** Most real-world structures combine multiple patterns. A corporation is hierarchical internally but networked in its external relationships. A government is hierarchical in its branches but cyclical in its legislative process. The methodology does not force a single pattern — it identifies which patterns are present and where.

### 3. How do the parts relate to each other?

Organization describes position. Relationships describe interaction. Two parts can be adjacent in a hierarchy but have no operational relationship, or distant in hierarchy but deeply interdependent.

**Relationship dimensions:**

- **Type:** What kind of relationship is this? (dependency, competition, collaboration, containment, regulation, data flow, resource flow, authority, etc.)
- **Directionality:** Does the relationship flow one way or both ways?
- **Strength:** How tightly coupled are the parts? Could one exist without the other?
- **Formality:** Is the relationship encoded in rules, or emergent from behavior?

**Domain-specific relationship vocabularies:**

Different domains have their own vocabularies for relationships. The methodology provides the structural dimensions (type, directionality, strength, formality) and each domain fills in the specific vocabulary.

- **Business:** Supplies, competes with, regulates, acquires, partners with, depends on, integrates with
- **Government:** Has authority over, reports to, checks, balances, advises, funds, regulates
- **Biology:** Symbiosis, parasitism, predation, mutualism, competition, dependence
- **Social:** Mentors, reports to, collaborates with, influences, opposes, governs

The Everything Ecosystem framework — the business-domain instantiation of this methodology — defines six relationship types: horizontal adjacency, vertical integration, diagonal movement, radial, loose affiliation, and external dependency. These are the business-domain answer to "how do parts relate?" Other domains would have different specific types, but the structural dimensions underneath are the same.

### 4. What is the lifecycle of each part?

Parts are not static. They are created, they develop, they mature, they may decline, and they may be archived or discontinued. Understanding where each part is in its lifecycle is essential to understanding the current state of the structure.

**Lifecycle as a structural primitive:**

The methodology does not prescribe a single lifecycle model. Different domains have different lifecycle patterns:

- **Business entities:** Ideation → Documentation → Implementation → Production (the Everything Ecosystem lifecycle model, optimized for products and organizations)
- **Biological organisms:** Conception → Growth → Maturation → Reproduction → Senescence
- **Stars:** Molecular cloud → Protostar → Main sequence → Red giant → White dwarf / Neutron star / Black hole
- **Legislation:** Draft → Introduction → Committee review → Floor debate → Vote → Enactment → Implementation → Evaluation → Amendment or Repeal
- **Technologies:** Invention → Adoption → Standardization → Ubiquity → Obsolescence

What is universal is that every part has a lifecycle and that knowing where a part is in its lifecycle tells you what to expect from it, what it needs, and what comes next. The methodology requires that lifecycle be tracked for every part.

### 5. What is the lifecycle of the whole?

The structure itself has a lifecycle distinct from the lifecycles of its parts. The United States government has persisted for over two centuries while individual branches, agencies, and officeholders have cycled through their own lifecycles. A corporation can outlive every product it has ever made. A species can outlive every individual organism.

**Structural resilience:** How well does the structure survive the loss or replacement of individual parts? A resilient structure can replace parts without losing its identity. A fragile structure depends on specific parts — if they fail, the whole fails.

**Structural evolution:** Structures change over time. They add parts, remove parts, reorganize. The methodology tracks not just the current state of the structure but its evolution — what it was, what it is, and what it is becoming.

---

## Domain-Specific Instantiation

The general methodology asks universal structural questions. Domain-specific instantiations answer them with domain-appropriate vocabulary, lifecycle models, relationship types, and constituent parts.

### The Everything Ecosystem: Business-Domain Instantiation

The Everything Ecosystem framework is a business-domain instantiation of this methodology. It answers the five structural questions for business entities:

1. **Constituent parts** → The three pillars: product, brand, business. Every business entity is composed of these three aspects (or consciously lacks one or more of them).
2. **Organization** → Classification spectrum (ecosystem, subsidiary, product-within-company, etc.) and product composition (core, variants, surfaces, platform capabilities).
3. **Relationships** → Six relationship types: horizontal adjacency, vertical integration, diagonal movement, radial, loose affiliation, external dependency.
4. **Part lifecycle** → Four stages: ideation, documentation, implementation, production. Applied per-pillar.
5. **Whole lifecycle** → Entity status: active, archived, discontinued. Plus mission alignment and ecosystem positioning.

The framework also adds business-specific structural primitives: the independence test, the classification confidence system, field statuses, product orientation, and documentation expectations. These are the business-domain elaborations of the general methodology's structural questions.

### Other Domain Instantiations (Planned)

Ostr-itch's ambition is to instantiate this methodology across all domains. Each domain instantiation would answer the five structural questions with domain-appropriate specifics:

**Government structures:**
1. **Constituent parts** → Branches, agencies, offices, positions, jurisdictions
2. **Organization** → Hierarchical (executive chain of command), separated powers (checks and balances), federalist (national/state/local layers)
3. **Relationships** → Authority, oversight, funding, advisory, regulatory, jurisdictional
4. **Part lifecycle** → Established, reformed, reorganized, merged, abolished
5. **Whole lifecycle** → Founded, amended, revolutionary change, dissolution

**Biological structures:**
1. **Constituent parts** → Organ systems, organs, tissues, cells, organelles (at different granularity levels)
2. **Organization** → Hierarchical (organism → system → organ → tissue → cell), networked (neural, circulatory), layered (skin layers, cortical layers)
3. **Relationships** → Functional dependence, signaling, regulation, support, transport
4. **Part lifecycle** → Differentiation, development, maturation, function, apoptosis or regeneration
5. **Whole lifecycle** → Embryonic, juvenile, adult, senescent

**Celestial structures:**
1. **Constituent parts** → Stars, planets, moons, asteroids, comets, rings, fields (gravitational, magnetic)
2. **Organization** → Gravitational hierarchy (galaxy → star system → planet → moon), orbital mechanics, cluster membership
3. **Relationships** → Gravitational binding, tidal forces, orbital resonance, radiation influence
4. **Part lifecycle** → Stellar evolution (protostar → main sequence → giant → remnant), planetary formation and potential habitability evolution
5. **Whole lifecycle** → System formation from molecular cloud, stable configuration, eventual stellar death and system dispersal

---

## Structural Primitives at the General Level

Certain concepts are structurally primitive — they appear in every domain instantiation, though the specific vocabulary changes.

**Decomposition** — every structured entity can be decomposed into parts. The methodology's first act is always decomposition.

**Organization pattern** — every collection of parts has an arrangement. The arrangement may be intentional (an org chart) or emergent (a social network), but it exists and can be described.

**Relationships** — parts interact. The interactions have type, direction, strength, and formality. Every domain has its own relationship vocabulary, but every domain has relationships.

**Lifecycle** — parts and wholes change over time. Every entity was created, exists in some state, and will eventually end or transform. Tracking lifecycle is universal.

**Visibility** — not all aspects of a structure are equally observable. Some parts are public, some private, some hidden. Some relationships are formal and documented, others informal and inferred. The methodology distinguishes between what is declared and what is observed.

**Recursive depth** — structures contain structures. A corporation contains departments which contain teams which contain people. A government contains branches which contain agencies which contain offices. The methodology applies at every level. The same structural questions asked of the whole can be asked of any part.

**No blanks** — every field that the methodology defines must have a value or a status explaining why it has no value. This is the discipline that turns structural analysis from casual observation into systematic knowledge. A blank is not neutral — it is a failure of analysis.

---

## What Ostr-itch Implements

Ostr-itch is the product that implements this methodology. Its role is to:

1. **Catalog** — Store structural representations of entities across all domains, creating an encyclopedia of how things are structured.
2. **Visualize** — Provide a visual-first interface (canvas-based, n8n-like feel) for exploring structures. Structure is spatial — it should be seen, not just described.
3. **Enable creation** — Allow users to create their own structural representations, whether for analysis, education, or operational use.
4. **Export** — Make structures portable. Export in formats that other tools and AI systems can consume.
5. **Serve as source of truth** — Be the place where AI agents go to understand how things are structured. Not through API integration (cost-prohibitive), but through browser-accessible pages that AI agents can read like humans.
6. **Accept contributions** — Operate on a Wikipedia model where community members contribute and curate structural knowledge.
7. **Support simulation** (future) — Enable "what if" analysis by allowing users to modify structures and observe the implications.

The current codebase implements a small fraction of this: a client-side tree visualizer with localStorage persistence, a single seed dataset (Alphabet/Google), and CRUD operations for nodes. The vision is vast. This document — alongside the product specification and technical architecture (both yet to be written) — provides the intellectual anchor for what Ostr-itch is building toward.

---

## The Relationship Between This Methodology and the Everything Ecosystem Framework

This methodology and the Everything Ecosystem framework are the same intellectual project operating at different levels of abstraction.

The Everything Ecosystem framework took a specific question — "how should I structure my business entities?" — and developed a rigorous methodology for answering it: three pillars, classification spectrum, lifecycle stages, relationship types, product composition, documentation expectations, engagement modes, structural primitives.

That methodology, it turns out, is the business-domain expression of a more general structural analysis methodology. The three pillars are the business answer to "what are the constituent parts?" Product composition is the business answer to "how are parts organized?" The six relationship types are the business answer to "how do parts relate?" The four lifecycle stages are the business answer to "what is the lifecycle of each part?"

Ostr-itch takes this general methodology and implements it as software for all domains. It does not just catalog structures — it applies a systematic methodology to the cataloging. This makes it more than an encyclopedia of diagrams. It is an encyclopedia built on a consistent analytical framework, which means that structures in different domains can be compared, that structural patterns can be identified across domains, and that the methodology itself can be refined as more structures are analyzed.

This mutual reinforcement is the key design insight: the framework learns from being applied to diverse domains (via Ostr-itch), and Ostr-itch is more than a collection of diagrams because it applies a rigorous methodology (derived from the framework). They are better together than either is alone.

---

## Open Questions and Developing Answers

This document articulates the methodology for the first time. Several questions were raised during
the initial draft. Some now have directional answers; others remain open.

### 1. Cross-Domain Structural Patterns (Highest Priority)

**Question:** If Ostr-itch catalogs structures across all domains, it becomes possible to identify
structural patterns that repeat. Hub-and-spoke appears in transit systems, corporate organizations,
and nervous systems. Hierarchical containment appears in governments, file systems, and biological
taxonomy. Are these cross-domain patterns structurally primitive, or are they surface similarities
hiding different mechanics?

**Developing answer:** This is one of the most important capabilities Ostr-itch can develop. Recognizing
structural patterns that persist across domains — or recognizing structural similarities between
entities in different domains — gives Ostr-itch the ability to perform **comparative structural
analysis**. If a hub-and-spoke pattern appears in transit systems, corporate organizations, and
nervous systems, the comparative question becomes: what properties does hub-and-spoke confer regardless
of domain? What are the failure modes? What are the strengths? What happens when a hub fails?

This capability enables a host of downstream questions: "What organizational structure from domain X
has been tried in domain Y?" "What structural pattern correlates with resilience across domains?"
"What structure from nature solves the same problem this corporation is trying to solve?"

Whether these cross-domain patterns are truly structurally primitive (same deep mechanics) or surface
similarities (same shape, different mechanics) is itself a question Ostr-itch can help answer — by
cataloging enough instances to compare.

**Status:** Directionally resolved. Cross-domain pattern recognition is a core capability, not a
nice-to-have. The implementation question (how to detect and surface these patterns) remains open.

### 2. Domain-Specific Vocabularies

**Question:** Each domain has its own terminology for constituent parts, relationships, and lifecycle
stages. Does Ostr-itch define a standard vocabulary per domain, or do contributors bring their own?

**Developing answer:** Both. Contributors bring their own vocabulary when creating or editing structural
representations. AI fills in the blanks and — critically — synthesizes related vocabularies. The
synthesis happens in two directions:

- **Contributor-introduced vocabulary:** When contributors from different backgrounds describe the
  same structural relationship using different terms, AI identifies the equivalence and proposes
  a mapping. If one contributor describes a biological relationship as "mutualism" and another
  describes a business relationship as "strategic partnership," the AI can surface the structural
  similarity and ask whether the mapping is valid.

- **Incumbent vocabulary:** Established domain-specific terms (symbiosis, partnership, subsidiarity,
  federation) have existing definitions. Ostr-itch should respect these definitions while also
  identifying when terms from different domains describe structurally equivalent relationships.

The goal is not to flatten all vocabulary into a single universal lexicon — that would lose the
domain-specific nuance that makes each field's terminology precise. The goal is to maintain
domain-specific vocabulary while building a structural-equivalence layer underneath that enables
cross-domain comparison.

**Status:** Directionally resolved. Dual-source vocabulary (contributors + AI synthesis) with
structural-equivalence mapping. Implementation details TBD.

### 3. Minimum Viable Structural Representation

**Question:** For any entity in any domain, what is the minimum information needed for the
representation to be useful? The Everything Ecosystem framework defines minimum viable documentation
per lifecycle stage. Does this generalize?

**Developing answer:** Not yet determined. The Everything Ecosystem's approach (expected documentation
per pillar per lifecycle stage) works because business entities have a well-understood structure.
Whether this generalizes to all domains — where the "pillars" and "lifecycle stages" differ
fundamentally — is unclear. A biological organism's minimum viable representation may be very
different from a government's.

One possible approach: the minimum viable structural representation at the general level is an
answer to all five structural questions (constituent parts, organization, relationships, part
lifecycle, whole lifecycle) at the shallowest meaningful depth. But "shallowest meaningful depth"
is itself domain-dependent.

**Status:** Open. Needs further exploration as more domain instantiations are developed.

### 4. Emergent vs. Designed Structures

**Question:** A corporation is designed (someone decided on the org structure). An ecosystem is
emergent (no one designed the food web). The methodology's structural questions apply to both,
but the analytical posture differs. How does this distinction affect the methodology?

**Developing answer:** The distinction between emergent and designed structures must be formally
delineated in the methodology. However, the boundary between them is not always clean — and this
is where the methodology encounters one of its most philosophically challenging problems.

Some structures are clearly designed: a corporate org chart, a constitution, a building. Some
are clearly emergent: a food web, a language, a market. But many structures exist in a contested
space where the claim of emergence vs. design is itself a political, philosophical, or theological
assertion.

**The transcendental problem:** Certain structures that humans observe or participate in are claimed
to reflect transcendental realities — realities that are not empirically observable but are inferred
through reasoning, revelation, or tradition. The doctrine of the divine right of kings, for example,
asserts that monarchical authority is an emergent structure — that heaven has conferred the right to
rule, making the king's position a natural/divine feature of reality rather than a human design
choice. Others will claim the exact same structure is designed — a political arrangement created by
humans to consolidate power, justified post hoc by theological claims.

The methodology cannot resolve these disputes. What it can do is:

1. **Require that the emergent/designed distinction be declared.** Every structural representation
   must state whether the structure is claimed as emergent, designed, or contested.
2. **When contested, represent the contestation.** Note the competing claims about the structure's
   origin. "Proponents claim this is emergent (divinely ordained). Critics claim this is designed
   (political construction)." The methodology does not adjudicate — it catalogs the structural
   claims alongside the structural reality.
3. **Distinguish between the structure and the claim about the structure.** The monarchy exists
   as a structural fact regardless of whether its authority is divinely granted or politically
   constructed. The methodology can describe the structure (hierarchy, succession rules, scope
   of authority) without resolving the metaphysical claim about its origin.

This makes the methodology epistemically honest: it describes what it can observe and notes what
is claimed but unverifiable. The transcendental claims become metadata on the structure — they are
part of how the structure is understood and contested, even if they cannot be empirically confirmed.

**Status:** Directionally resolved. Emergent/designed/contested as a required field. Transcendental
claims cataloged as metadata. Implementation details TBD.

### 5. Simulation

**Question:** The vision includes the ability to modify structures and observe implications.
What does "observe implications" mean formally? What is the general-purpose simulation framework?

**Developing answer:** The general purpose of simulation in Ostr-itch is **prediction under
constraints.** The core question simulation answers:

> Given a specified task, a set of trade-offs that can be made, and a set of non-negotiables that
> cannot be compromised, which organizational structure completes the task most efficiently without
> violating the non-negotiables?

This framing makes simulation actionable rather than abstract. It is not "what happens if we change
this?" in the open-ended sense — it is "given what we need to achieve and what we cannot sacrifice,
what structure is optimal?"

Examples across domains:
- **Business:** "We need to ship a product in 6 months. We cannot compromise on quality. We can
  trade off headcount, budget allocation, and team structure. What organizational structure gets
  us there?"
- **Government:** "We need to distribute emergency relief within 48 hours. We cannot compromise
  on equity of distribution. We can trade off cost, bureaucratic process, and inter-agency
  coordination overhead. What governmental structure achieves this?"
- **Biology (theoretical):** "An organism needs to survive in an environment with limited oxygen.
  It cannot compromise on energy production for brain function. What organ system configuration
  supports this?" (This is more descriptive-analytical than prescriptive, but the structural
  question is the same.)

This is a very complex capability to implement. It requires not just structural data but
performance data — how well do specific structures perform specific tasks under specific
constraints? This data would accumulate over time as Ostr-itch catalogs more structures and
as contributors annotate structures with performance characteristics.

**Status:** Vision established. Implementation is a long-term goal. The prediction-under-constraints
framing provides the intellectual anchor. Technical approach TBD.

### 6. Data Model

**Question:** The current codebase uses a simple tree (parent-child nodes with type, name, subtitle,
meta). The methodology described in this document requires far more. What is the data model?

**Developing answer:** The data model must be graph-based. The methodology requires:

- Multiple relationship types with varying directionality and strength
- Recursive depth (structures within structures)
- Multiple organizational patterns (hierarchical, networked, layered, radial, cyclical, hybrid)
- Domain-specific vocabulary as node/edge metadata
- Lifecycle tracking per node
- Temporal data (how the structure changes over time)
- Cross-domain linkage (pattern recognition across structures in different domains)

A simple tree cannot represent this. The two leading architectural assumptions are:

- **Graph database** (e.g., Neo4j, or a similar property graph system) — naturally represents
  nodes, edges, properties, and traversals. Well-suited for the relationship-heavy, recursively
  deep data that Ostr-itch needs to store and query.
- **Graph neural network** — for the AI/ML layer that performs pattern recognition, vocabulary
  synthesis, and eventually simulation. A GNN could learn structural embeddings that enable
  cross-domain comparison ("this government structure is structurally similar to this corporate
  structure").

These are not mutually exclusive — the graph database stores the data, the GNN reasons over it.
The graph database is the persistence layer; the GNN is the intelligence layer.

**Status:** Directionally resolved (graph-based). Specific technology choices and schema design
are part of the technical architecture document (not yet written).

---

## Changelog

| Date | Change | Trigger |
|------|--------|---------|
| March 24, 2026 | Document created (v1.0) | Articulation of the design insight that the Everything Ecosystem framework is a business-domain instantiation of a general structural analysis methodology, and recognition that this methodology needs to be documented as the intellectual foundation of Ostr-itch |
| March 24, 2026 | Open questions updated with developing answers (v1.1). Cross-domain patterns elevated to highest priority. Vocabulary management, emergent/designed distinction, simulation purpose, and data model directionally resolved. Transcendental problem articulated as a formal challenge for the methodology. | Founder mind dump on open questions |
