# Entity Profile: Ostr-itch

## 1. Identity

- **Name:** Ostr-itch
- **Description:** An open source, visual-first organizational structure encyclopedia for both humans and AI agents. Catalogues how things are structured — businesses, governments, natural systems, social hierarchies, celestial bodies — and allows users to create, explore, and export structural representations. Designed to be a source of truth layer that helps AI reason about structures and systems from first principles.
- **Type:** software
- **Parent Entity:** Torian Projects ecosystem (loose affiliation — may belong to an open source foundation)
- **Date Created:** 2025 (approximate, based on codebase)
- **Profile Version:** 1.0
- **Last Updated:** March 24, 2026

## 2. Classification

- **Classification:** open-source-tool
- **Classification Rationale:** Ostr-itch is intended to be open source with community contributions (Wikipedia model). It does not have an independent business model — revenue generation is consciously deferred. It has the beginnings of its own brand identity (the name "Ostr-itch" is distinctive and memorable). Its operations would be partially separate from the parent ecosystem (own GitHub repo, own community, potentially own foundation). It is NOT a subsidiary because it lacks independent business operations and identity. It is NOT a product-within-company because it is explicitly open source with community governance intent. It is NOT shared infrastructure because it has external users and its own brand. Open-source-tool is the best current classification, though it is an ambitious one — closer to "open source platform" than "open source library."
- **Classification Confidence:** provisional — the current codebase is a prototype; classification is based on stated vision, not current evidence alone.
- **Independence Test:**
  - Does it have its own product? Yes — an organizational structure encyclopedia with visual engine, text search, and file export.
  - Does it have its own brand? In development — "Ostr-itch" is a distinctive name, but no visual identity, website, or brand materials exist yet.
  - Does it have its own business model? No — consciously deferred. Revenue generation is not the focus. May emerge at scale.
  - Does it have operations and identity separate from the parent's core? Partially — separate repo, intended for separate community. But currently operated as a personal project within the broader ecosystem.
  - Would users identify with it independently of any other entity? Yes, eventually — the Wikipedia-like contribution model and public-facing encyclopedia would create independent identity.
- **Potential Trajectory:** Currently a personal project / early prototype. Intended trajectory: open source tool with community contributions → potential foundation governance → SEO-prominent source of truth for AI agents. Could develop business pillar at scale (premium features, enterprise API, hosted service) but this is consciously deferred. The classification could evolve to subsidiary if Ostr-itch develops independent business operations and a foundation with its own governance.

## 3. Pillar Assessment

### 3a. Product Pillar
- **Status:** in-progress
- **Lifecycle Stage:** implementation (code exists, but scope has expanded far beyond what's built)
- **Product Orientation:** offering (delivered to external users — both humans and AI agents)
- **Description:** Ostr-itch produces a visual and textual encyclopedia of organizational structures across all domains: business, government, nature, social hierarchies, celestial systems. It allows users to look up how anything is structured, create their own structures, export structures as files, and (eventually) run simulations to evaluate structural effectiveness. It answers "what" and "how" — not "why" — but provides the structural information that enables reasoning about "why."
- **Key Artifacts:**
  - Codebase: Astro 6 + React 19 + Framer Motion app (`org-viz-app/`)
  - Seed data: Alphabet/Google organizational structure (`google.js`)
  - Store: localStorage-based CRUD operations for org trees (`orgStore.js`)
  - Components: OrgTree (recursive tree renderer), Sidebar, SettingsMenu, three editor modes (inline, panel, modal)
  - SAD_SKILL.md (Specification-Anchored Development methodology)
  - NOTE: ThriveSight PROJECT_ROADMAP.md was removed and relocated to ThriveSight/docs/ in Session 7.
- **Notes:** The current codebase implements a small fraction of the stated vision. What exists is a client-side tree visualizer with localStorage persistence and a single seed dataset. The vision encompasses: a visual encyclopedia, AI-readable data layer, community contributions, graph agents, simulation capabilities, file export, and integration with an in-house AI model. The gap between current implementation and vision is substantial — this is an ideation/early-implementation product that has outgrown its prototype.

#### Product Composition

Ostr-itch is complex enough to warrant product composition analysis. It contains what feel like distinct products within it.

- **Core:** Structural data — the graph of how things are organized. Every entity, every hierarchy, every relationship, stored in a format that is both human-browsable and AI-readable. This is the thing everything else depends on. Without the structural data, there is no encyclopedia, no visual engine, no simulation, no AI reasoning layer.
- **Variants:** Not yet determined. Could eventually have variants optimized for different domains (business structures, government structures, natural systems) or different fidelity levels (simplified overviews vs. granular detail).
- **Surfaces:**
  - Visual engine (primary surface) — canvas-based graph visualization, n8n-like feel. Visual-first interaction with structures. This is the surface most users will experience.
  - Text-based search/results — look up any structure and get text results alongside visuals.
  - File export — export structures as files that can be used in simulations, other tools, or AI workflows.
  - Contribution interface — Wikipedia-like interface for community members to add and edit structural data.
  - Browser-accessible surface — designed to be accessed by AI agents through browsers (Chrome extension, Comet, Dia) rather than through API integration, to avoid inference costs.
- **Platform Capabilities:**
  - Graph agents — autonomous agents that continuously discover and organize structural information across domains.
  - Contribution/governance system — community governance for data quality, similar to Wikipedia's editorial model.
  - Export format/protocol — the file format that structures are exported as, enabling simulation and external tool integration.
  - Future: integration point for in-house AI model (Polity project).

### 3b. Brand Pillar
- **Status:** conceptual
- **Lifecycle Stage:** ideation
- **Intentionality:** Partially intentional — the name "Ostr-itch" has been chosen and is distinctive. No other brand work has been done.
- **Brand-Product Relationship:** product-creates-brand — the brand will emerge from the product's utility and community. If Ostr-itch becomes as useful as Wikipedia for structural information, the brand will form around that utility.
- **Description:** No formal brand identity exists. The name is memorable and distinctive. The brand aspiration is to be the Wikipedia of organizational structures — authoritative, community-driven, AI-readable, showing up before Wikipedia in search results for structural queries.
- **Brand Operations:** Not yet determined. An open source project of this ambition would eventually need: a website, documentation site, community forums, social media presence, conference talks, and potentially a foundation with its own brand identity.
- **Key Artifacts:** Name only. No logo, no style guide, no website, no brand documentation.
- **Notes:** The SEO goal (showing up before Wikipedia in Google search results) is a brand-adjacent ambition that will require significant brand and content strategy. This is a long-term goal that depends on the product being genuinely useful and well-indexed.

### 3c. Business Pillar
- **Status:** intentionally-absent (with noted potential)
- **Lifecycle Stage:** N/A — business pillar is consciously deferred
- **Revenue Model:** Consciously deferred — "I don't really intend to make money off of this product. Maybe at some scale there is the possibility of it generating revenue." Possible future models: premium/enterprise features, hosted service, API access, sponsorships, foundation funding.
- **Business Products:** N/A
- **Independence:** N/A — no business operations to assess
- **Key Artifacts:** None
- **Notes:** The intentional absence of a business model is itself a strategic decision aligned with the open source, community-driven vision. Revenue generation may become relevant at scale but is not a current priority or constraint.

## 4. Mission Alignment

- **Ecosystem Mission:** Consciously deferred — Torian Projects' ecosystem mission has not been formally articulated yet. However, the emerging theme across projects is: building tools and platforms that help people and AI understand, organize, and reason about the structures of reality.
- **Entity's Role in Mission:** Ostr-itch is potentially a foundational data layer for the entire ecosystem. If the ecosystem's mission involves building AI-powered tools for understanding the world (Polity's news app, counseling platform, civic tools), Ostr-itch provides the structural knowledge base that powers reasoning across all of them.
- **Mission Alignment Strength:** strong (provisionally — pending formal ecosystem mission articulation)
- **Notes:** Ostr-itch may be one of the most mission-critical entities in the ecosystem because it provides a data foundation that multiple other entities could depend on. If the in-house AI model for Polity needs to reason about structures, Ostr-itch is the source of truth. If the news app needs to explain political structures, Ostr-itch provides the data. This makes Ostr-itch a high-leverage entity — getting it right enables many other things.

## 5. Relationships

### Relationship: Ostr-itch ↔ Polity News App (planned)
- **Type:** radial (Ostr-itch as core, News App as surface) or vertical (Ostr-itch provides data layer, News App provides interpretation layer)
- **Strength:** emerging — the News App is conceptual, the relationship is envisioned but not built
- **Directionality:** bidirectional — Ostr-itch provides structural data to the News App; the News App may contribute structural data back to Ostr-itch as it encounters and interprets real-world organizational structures through news events
- **Independence:** The News App would depend on Ostr-itch for structural data. Ostr-itch can exist without the News App. However, the News App could strengthen Ostr-itch by contributing discovered structures.
- **Description:** The News App would use Ostr-itch's structural data to help users reason about "why" things happen in politics, business, and other domains. Ostr-itch provides the "what" and "how"; the News App provides the "why" powered by that structural context. Critically, the News App may also function as a surface for Ostr-itch — a surface that not only consumes structural data but contributes it. When the News App encounters organizational structures in the news (a government reorganization, a corporate merger, a new regulatory body), it could feed those structures back into Ostr-itch's encyclopedia, making the News App an indirect contribution surface.
- **Ambiguity Notes:** This relationship has three valid readings: (1) radial — Ostr-itch as core, News App as a surface that both reads and writes structural data; (2) vertical — Ostr-itch as data infrastructure, News App as application layer; (3) symbiotic — the News App is its own product that happens to have a bidirectional data relationship with Ostr-itch. Reading (1) is the most interesting because it positions the News App as a surface that adds data to the core, not just presents it. This "contributing surface" pattern is not yet documented in the framework's product composition model and may represent a new concept worth formalizing.

### Relationship: Ostr-itch ↔ Polity In-House AI Model (planned)
- **Type:** vertical — Ostr-itch provides training/reference data, AI model provides inference capability
- **Strength:** emerging — both are in early stages
- **Directionality:** bidirectional — Ostr-itch feeds data to the AI model; the AI model (and its graph agents) feed organized data back to Ostr-itch
- **Independence:** Each can exist independently, but both are stronger together
- **Description:** The in-house AI model will be trained partly on Ostr-itch's structural data. Ostr-itch's graph agents may be powered by the AI model. This creates a virtuous cycle: better structural data → better AI reasoning → better automated data organization → more structural data.
- **Ambiguity Notes:** This could also be seen as a radial relationship if the AI model is considered the core and Ostr-itch is considered a data surface.

### Relationship: Ostr-itch ↔ Everything Ecosystem Framework
- **Type:** vertical — the framework provides the methodology, Ostr-itch provides the implementation. Also contains a generalization relationship: the framework is a business-domain instantiation of a general structural analysis methodology, and Ostr-itch is the product that generalizes that methodology to all domains.
- **Strength:** strong — Ostr-itch was identified as the tool that implements what the framework describes
- **Directionality:** bidirectional — the framework provides business-domain structural analysis methodology to Ostr-itch; Ostr-itch generalizes that methodology and may feed domain-general insights back to the framework
- **Independence:** The framework can exist as a skill without Ostr-itch. Ostr-itch could exist without the framework but would lack the structured methodology for entity profiling. However, they are intellectually the same project operating at different levels of abstraction.
- **Description:** The Everything Ecosystem operational methodology defines how to analyze, classify, and build entity profiles for business entities. Ostr-itch is the software that generalizes this structural analysis methodology to all domains — business, government, nature, social hierarchies, celestial systems. The framework asks "what are the constituent parts of a business entity?" (answer: product, brand, business). Ostr-itch asks the domain-general version: "what are the constituent parts of any structured entity?" The structural questions underneath are the same; the domain-specific vocabulary differs. This makes the framework and Ostr-itch two expressions of the same intellectual project — the framework specialized for its domain, Ostr-itch generalized across all domains. A foundational document describing this general structural analysis methodology needs to be created and placed in Ostr-itch's documentation.

### Relationship: Ostr-itch ↔ External AI Services (current)
- **Type:** external-dependency
- **Strength:** moderate — Ostr-itch is designed to be accessed BY external AI through browsers rather than integrating AI APIs
- **Directionality:** External AI → Ostr-itch (AI agents consume Ostr-itch data)
- **Independence:** Ostr-itch can function without AI consumers. AI agents benefit from Ostr-itch but don't depend on it.
- **Description:** In the current architecture, Ostr-itch avoids API integration costs by being browser-accessible. AI agents (Claude via Chrome extension, Perplexity's Comet, Dia by The Browser Company) access Ostr-itch through the browser like a human would. This is a deliberate architectural choice driven by cost constraints.

## 6. Visibility

| Asset | Visibility | Notes |
|-------|-----------|-------|
| Source code | public | Intended to be open source on GitHub |
| Structural data (encyclopedia) | public | Community-contributed, publicly browsable |
| User-created org structures | private (per-user) | Users create their own structures — private by default |
| Brand assets | N/A | No brand assets exist yet |
| Business docs | N/A | No business pillar |
| Documentation | public | Open source project needs public docs |
| Repository | public | GitHub public repo |
| Website | planned — public | Not yet built |

## 7. Child Entities

| Child Entity | Classification | Status | Origin |
|-------------|---------------|--------|--------|
| Visual Engine | Not yet classified — could be a surface or its own entity | conceptual | Core surface of the product composition |
| Contribution System | Not yet classified — could be platform capability or shared infrastructure | conceptual | Modeled after Wikipedia's editorial system |

Note: At this stage, no child entities have developed enough independence to warrant their own entity profiles. The product composition describes internal structure. If the visual engine or contribution system develop their own brand, community, or governance, they may cross the threshold.

## 8. Lifecycle & Archival

- **Status:** active
- **If Archived/Discontinued:** N/A

## 9. Documentation Audit

- **Documentation Status:** sparse (improving — 2 of 15 expected documents now exist)

| Expected Document | Status | Priority | Notes |
|------------------|--------|----------|-------|
| Entity profile | exists | critical | This document. Created March 24, 2026 via Discovery Mode stress test. |
| General structural analysis methodology | exists (v1.1) | critical | `STRUCTURAL_ANALYSIS_METHODOLOGY.md` — Created March 24, 2026. Articulates the five universal structural questions, domain-specific instantiation pattern, structural primitives at general level, planned domain instantiations, and relationship between methodology and Everything Ecosystem framework. Open questions partially resolved (cross-domain patterns, vocabulary management, emergent/designed distinction, simulation, data model). Foundational draft — will evolve as product develops. |
| Product description / what is this | missing | critical | The codebase has no README, no spec, no written description of what Ostr-itch is. The vision exists only in conversation. This is the highest-priority gap. |
| Product specification / PRD | missing | critical | The scope described in conversation is vast. A specification would define: v1 scope, target users, key features, technical architecture, data model. Without this, implementation has no anchor. |
| Data layer specification | exists (v0.1) | critical | `specs/DATA_LAYER_SPEC.md` — Created March 26, 2026. Graduated from ecosystem idea dump items 147–154. Specifies three-layer stack (interface layer, virtual file machine, storage layer), graph database schema mapping, phased implementation (Neo4j → graph analytics → GNN), data sovereignty principles, and relationship to harness. First spec document produced through harness idea graduation workflow. |
| Technical architecture document | missing | critical | The current codebase is a client-side prototype. The vision requires: graph database, contribution system, AI accessibility, export pipeline, graph agents. The architectural decisions for this have not been documented. |
| Repository README | missing | critical | A public open source repo needs a README explaining what the project is, how to run it, how to contribute, and what the license is. |
| Open source license | missing | critical | Ostr-itch is intended to be open source but has no license file. Without a license, it is technically all-rights-reserved. |
| Contributing guide | missing | important | A Wikipedia-model open source project needs clear contribution guidelines. |
| Brand vision / positioning | missing | important | The aspiration to be "the Wikipedia of organizational structures" and to outrank Wikipedia in search results needs to be articulated and documented. |
| Data model specification | missing | important | What is an "organizational structure" in Ostr-itch's data model? The current code uses a simple tree (parent-child nodes). The vision includes relationships, types, evolution over time, cross-domain structures. The data model needs a specification. |
| Idea dump / mind dump | partially exists | recommended | Vision and ideas have been captured in the Everything Ecosystem IDEA_DUMP.md (Sessions 2 and 3, March 24, 2026) but this is an ecosystem-level document, not an Ostr-itch-specific idea dump. An Ostr-itch-specific idea dump would consolidate the product vision, architectural ideas, and domain exploration notes in one place within this repo. |
| User personas | missing | recommended | Who uses Ostr-itch? The vision describes: the founder (personal tool), general public (encyclopedia lookup), AI agents (source of truth), contributors (Wikipedia editors), students/teachers, businesses, government analysts. These need to be articulated. |
| Roadmap | missing | important | No Ostr-itch-specific roadmap exists. (ThriveSight roadmap previously misplaced here was relocated in Session 7.) |
| Issue templates | missing | recommended | Needed for community contribution management |
| CI/CD pipeline | missing | recommended | Needed for automated testing and deployment |

- **Documentation Status:** sparse (improving — 3 of 16)
- **Recommended Next Document:** Product specification / PRD. The data layer spec now exists but the overall product spec (v1 scope, target users, key features) is still the highest-priority gap — it anchors all other implementation decisions. Second priority: README + license (unblocks open source contribution). Third priority: Technical architecture document (the data layer spec covers one aspect; the full technical architecture is broader).

## 10. Changelog

| Date | Change | Trigger |
|------|--------|---------|
| March 24, 2026 | Entity profile created (v1.0) | Discovery Mode stress test of Everything Ecosystem framework |
| March 24, 2026 | Updated News App relationship to bidirectional (contributing surface pattern). Updated Everything Ecosystem Framework relationship to reflect design insight (framework as business-domain instantiation, Ostr-itch as generalization). Added entity profile, idea dump, and general structural analysis methodology to documentation audit. Reprioritized recommended next document to general structural analysis methodology. (v1.1) | Post-stress-test iteration on framework and entity relationships |
| March 24, 2026 | Documentation audit updated: STRUCTURAL_ANALYSIS_METHODOLOGY.md status changed from "missing" to "exists (v1.1)." Recommended next document updated to Product specification / PRD. Documentation status updated to "sparse (improving — 2 of 15)." (v1.2) | Audit trigger: new document created for entity |
| March 26, 2026 | Documentation audit updated: DATA_LAYER_SPEC.md added (exists v0.1). Documentation status updated to "sparse (improving — 3 of 16)." Recommended next document remains Product specification / PRD. (v1.3) | Audit trigger: specs/DATA_LAYER_SPEC.md created. First document graduated from idea dump through harness workflow. |
| March 26, 2026 | ThriveSight PROJECT_ROADMAP.md removed from repo (relocated to ThriveSight/docs/). Entity profile notes updated. Repo moved from GitHub/ostr-itch to projects/ostr-itch as part of ecosystem file structure reorganization. (v1.4) | Session 7: ecosystem workspace reorganization. |
