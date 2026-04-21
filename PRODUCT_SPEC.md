# PRODUCT SPECIFICATION
# Project: Vir (Org Structure Visualizer)
# Version: 0.1.0
# Status: DRAFT
# Last revised: 2026-03-22
# Depends on: (none)

---

## 1. VISION STATEMENT

Vir is a visual-first, AI-readable encyclopedia of organizational structures across human institutions, historical civilizations, biological systems, and personal life. The problem it solves: no structured, queryable knowledge base exists for how things are organized. Existing resources are prose-based (Wikipedia), static and single-purpose (org chart tools), or proprietary and siloed (corporate internal tools). AI agents have no canonical structured source to query when asked about organizational structures. Humans who want to understand organizational patterns across domains — to inform their own decisions about how to organize systems — have no tool that lets them visually compare structures across time and category. Vir provides that tool. It is a reference platform where structure is the primary unit of information, visuals are the primary medium, and text is secondary. It is built for both humans and AI agents to read, query, and learn from.

---

## 2. SCOPE BOUNDARY

### In Scope

- Visual representation of organizational structures as interactive node-and-edge graphs
- Temporal dimension on all structural data: every relationship has a time range; users can scrub a timeline to see structure at any point in time
- Entity lineage: modeling historical continuity across structurally distinct entities (e.g., Roman Republic -> Roman Empire, Soviet Union -> Russian Federation)
- Category browsing: companies, governments/nations, states/cities, non-human social hierarchies, educational institutions, organizations, prominent individuals
- Curated V1 dataset: editorially selected and verified organizational structures across multiple categories
- Curated non-human organizational structures: ant colonies, wolf packs, bee hives, primate social hierarchies, elephant herds (V1 set — extensible)
- Entity disambiguation: prominence-based ranking with contextual filtering and biographical validation metadata
- Role-as-node modeling: roles are independent entities; people occupy roles with temporal edges
- Event nodes: structural transition events (appointments, elections, mergers, reorganizations) modeled as first-class nodes connecting the entities involved with temporal stages
- Confidence scoring: all data carries provenance and confidence metadata (AI-generated, human-contributed, editorially verified)
- AI-readable data format: all graph data structured for easy tokenization, queryable via API
- Public API for AI agents and LLMs to query organizational structures programmatically
- Search: graph-queryable search for entities, roles, structures, and cross-domain pattern queries
- English-language interface and content (V1)

### Out of Scope

- Geography as a structural substrate (deferred; data model must be extensible to accommodate it in future versions)
- Causal analysis or historical narrative ("why did Rome fall" is out of scope; "how was Rome governed in 200 BC" is in scope)
- Native AI/LLM integration: the platform does not host, run, or pay for AI inference; AI interaction occurs through external tools (browser extensions such as Claude in Chrome, AI-native browsers such as Comet or Dia)
- Creation Tool: a separate product for designing personal organizational structures, informed by the reference graph but architecturally and experientially independent
- Biographical content as primary information: birth dates, personal histories, and life details are not displayed as primary content; biographical properties exist only as disambiguation metadata on PersonNodes
- Community contribution and editorial governance (deferred to post-V1; V1 is a curated dataset)
- Multi-language support (deferred; translation may be handled by the external AI reasoning layer rather than native i18n — see Open Questions)
- Real-time collaboration or multi-user editing
- User accounts or authentication (V1 is a public read-only reference with curated editorial input)

---

## 3. USER TAXONOMY

### Reference Consumer
Goals: Look up how a specific entity (company, government, organism) is organized. See the structure visually. Understand the relationships between positions, roles, and people. Navigate structure across time.
Capabilities: Browse categories. Search entities. Expand/collapse tree structures. Scrub timeline. Click into nodes for detail.
Constraints: Cannot edit data. Cannot contribute new structures. Interacts read-only.

### Systems Thinker
Goals: Compare organizational patterns across domains to inform personal or professional decisions. Observe how structures evolve over time. Identify recurring patterns (centralization under pressure, flat hierarchies in early-stage entities, etc.).
Capabilities: All Reference Consumer capabilities. Additionally: cross-domain comparison views. Filter by structural properties (e.g., "show all entities that transitioned from hierarchical to flat"). Export graph data for use in external AI reasoning tools.
Constraints: Cannot edit data. May use external AI tools (browser extensions, AI-native browsers) to reason about exported data.

### AI Agent
Goals: Query structured organizational data to ground responses about how things are organized. Retrieve specific subgraphs (e.g., "the US Cabinet in Q1 2025"). Receive data in machine-readable format optimized for tokenization.
Capabilities: Query the public API. Filter by entity type, time range, confidence level. Retrieve full subgraphs or specific node/edge data.
Constraints: Read-only API access. No write capabilities. Rate-limited.

### Curator (V1 Editorial Role)
Goals: Populate the reference graph with accurate organizational structures. Verify AI-seeded data. Correct errors. Maintain data quality and consistency.
Capabilities: Add, edit, and remove nodes and edges. Set confidence levels. Add provenance citations. Manage entity lineage chains.
Constraints: Must follow editorial rules. All changes logged. No bulk operations without review.

### Researcher
Goals: Study organizational structures across history, biology, and institutions for academic or journalistic purposes. Access structured data for analysis.
Capabilities: All Reference Consumer capabilities. Additionally: API access for bulk data retrieval. Citation-friendly data format.
Constraints: Read-only. Subject to API rate limits.

### Educator
Goals: Use organizational structure visualizations as teaching materials. Show students how governments, companies, or biological systems are organized. Demonstrate structural change over time.
Capabilities: All Reference Consumer capabilities. Shareable links to specific views (entity + time range). Embeddable visualizations.
Constraints: Read-only. Cannot modify data.

---

## 4. CORE FLOWS

### Flow: Browse Organizational Structure
Preconditions: User is on the Vir homepage or a category page.
Happy path:
  1. User selects a category (e.g., Companies)
  2. System displays a browsable list of entities in that category, ranked by prominence
  3. User selects an entity (e.g., Google)
  4. System renders the organizational structure of that entity as an interactive node-and-edge graph, defaulting to the most recent known state
  5. User expands/collapses nodes to explore the hierarchy
  6. User clicks a node to see detail (role description, occupant, temporal metadata)

Error path:
  1. User selects a category with no curated entities
  2. System displays: "No structures available in this category yet. [Suggest a structure]"

### Flow: Timeline Navigation
Preconditions: User is viewing an organizational structure.
Happy path:
  1. User activates the timeline control
  2. System displays a timeline scrubber showing the temporal range of the current entity
  3. User scrubs to a specific date
  4. System re-renders the graph to reflect the organizational structure at that point in time — nodes and edges with active time ranges at the selected date are visible; others are hidden
  5. User can step through discrete structural change events (appointments, reorganizations) using next/previous controls

Error path:
  1. User scrubs to a date before the entity's origin
  2. System snaps to the earliest known date and displays: "Earliest known structure: [date]"

### Flow: Entity Search
Preconditions: User is on any page.
Happy path:
  1. User enters a search query (e.g., "Sundar Pichai" or "US Cabinet")
  2. System returns ranked results: entities, roles, and people matching the query, ordered by prominence and contextual relevance
  3. User selects a result
  4. System navigates to that entity's organizational structure view

Error path — Ambiguous query:
  1. User searches "George Washington"
  2. System returns multiple results ranked by prominence: President George Washington (highest), other individuals with that name (lower)
  3. Each result displays disambiguation metadata: role, time period, associated entities
  4. User selects the intended result

Error path — No results:
  1. User searches for an entity not in the database
  2. System displays: "No structures found for '[query]'. [Suggest this structure]"

### Flow: AI Agent API Query
Preconditions: AI agent has API access.
Happy path:
  1. Agent sends a structured query: entity identifier + optional time range + optional confidence threshold
  2. System returns a JSON graph payload: nodes, edges, temporal metadata, confidence scores, provenance
  3. Agent uses the structured data to ground its response to the end user

Error path:
  1. Agent queries an entity not in the database
  2. System returns: 404 with structured error: { "error": "entity_not_found", "query": "[original query]", "suggestions": [...] }

### Flow: Curator Edits Structure
Preconditions: Curator is authenticated and viewing an organizational structure.
Happy path:
  1. Curator selects a node or edge to edit
  2. System opens an editing interface with current properties and temporal metadata
  3. Curator modifies properties (e.g., corrects an appointment date, changes a role title)
  4. Curator adds a provenance citation for the change
  5. System saves the edit, logs the change, and updates the confidence level based on the provenance type

Error path:
  1. Curator attempts to delete a node that has dependent edges
  2. System displays: "This node has [N] active relationships. Reassign or remove them before deleting."

### Flow: Cross-Domain Comparison
Preconditions: User has viewed at least one organizational structure.
Happy path:
  1. User activates comparison mode
  2. User selects a second entity from any category
  3. System renders both structures side by side
  4. User can visually compare hierarchy depth, branching patterns, role types, and structural properties

Error path:
  1. User attempts to compare two entities with vastly different scales (e.g., a 3-person startup and the US federal government)
  2. System renders both but displays a notice: "These structures differ significantly in scale. Comparison shows structural patterns, not proportional representation."

### Flow: Export Graph Data
Preconditions: User is viewing an organizational structure.
Happy path:
  1. User selects "Export" from the structure view
  2. System offers export formats: JSON (graph data), PNG/SVG (visual snapshot)
  3. User selects a format
  4. System generates and delivers the export
  5. User can feed the JSON export into an external AI reasoning tool for analysis

Error path:
  1. Export of a very large structure exceeds size limits
  2. System displays: "This structure is too large to export in full. Export a subtree by selecting a node first."

---

## 5. EDITORIAL RULES

- All structural data must represent documented, verifiable organizational relationships. No speculative or hypothetical structures in the reference graph.
- Contentious or disputed structural claims are deferred until a dispute resolution process is established (post-V1). V1 includes only well-established, uncontested structures.
- Every node and edge must have a provenance citation: the source of the information (official corporate filing, government record, academic publication, reputable journalism, AI-generated pending verification).
- Confidence tiers:
  - Tier 1 — Editorially Verified: human curator has verified against authoritative source. Displayed by default.
  - Tier 2 — Human Contributed: submitted by a human contributor, not yet editorially verified. Displayed with confidence indicator.
  - Tier 3 — AI Generated: seeded by AI from public sources, not yet human-reviewed. Displayed only when user opts in or AI agent requests all confidence levels.
- Node and edge labels use formal names, not colloquial names. "Secretary of Defense" not "defense secretary." "Chief Executive Officer" not "CEO" (though "CEO" is an acceptable alias for search).
- Time ranges use ISO 8601 date format. Dates with unknown precision use the most specific known value (year if month unknown, month if day unknown).
- Entity lineage relationships must specify the nature of the succession: "constitutional successor," "territorial successor," "organizational rebrand," "revolutionary replacement."
- Non-human organizational structures use domain-appropriate terminology (e.g., "queen" for a bee colony, "alpha" for a wolf pack) rather than imposing human organizational language.

---

## 6. NON-NEGOTIABLE CONSTRAINTS

- Visual-first: in every view, the graph visualization is the primary content. Text is supplementary. No view defaults to a text-only representation of structure.
- AI-readable: all graph data is stored and served in structured, machine-parseable formats. The API returns JSON-LD or equivalent structured graph format, not HTML or prose.
- No token cost: the platform does not host, invoke, or pay for any LLM inference. All AI reasoning happens externally.
- Temporal completeness: every structural relationship (edge) has a start date. End dates are required for terminated relationships and null for ongoing ones. No relationship exists without temporal metadata.
- Data model extensibility: the core graph schema must support the addition of new node types, edge types, and substrates (geography, events beyond structural transitions) without schema redesign. Type registries must be additive, not exhaustive.
- Provenance chain: every node and edge must be traceable to its source. Unsourced data is invalid and must not enter the production graph.
- Entity identity: every entity has a globally unique identifier that is stable across time. Name changes, role changes, and structural reorganizations do not change an entity's identifier.
- Query performance: graph queries for a single entity's organizational structure (at a given time point) must feel near-instantaneous to users. Target: under 200ms for typical queries. Formal performance budget to be defined in Implementation Spec.
- English-first: V1 content and interface are in English. The data model does not preclude multi-language support, but V1 does not implement it.

---

## 7. GLOSSARY

**Entity**: Any distinct thing that can be organized or participate in an organizational structure. People, roles, companies, governments, biological organisms, documents, and events are all entity types.

**Node**: The graph representation of an entity. Every entity maps to exactly one node. A node has a type, properties, and temporal metadata.

**Edge**: A directional relationship between two nodes. Every edge has a type, properties (including temporal metadata), and provenance. Edges represent structural relationships: "occupies role," "reports to," "subsidiary of," "member of," "succeeded by."

**Entity Lineage**: A chain of distinct organizational entities connected by succession edges, representing historical continuity across structural discontinuities. The Roman Republic and the Roman Empire are separate entities linked by a lineage edge of type "constitutional transformation."

**Event Node**: A node representing a structural transition event — an appointment, election, merger, reorganization, dissolution, or founding. Event nodes connect the entities involved in the transition and carry temporal stages (e.g., nomination date, confirmation date, effective date).

**Role Node**: A node representing a position or function within an organizational structure, independent of any person who occupies it. "CEO of Google" is a role node. Sundar Pichai is a person node connected to that role node by a temporal "occupies" edge.

**Person Node**: A node representing a specific individual. Person nodes carry biographical disambiguation metadata (birth year, nationality, known-for summary) but biographical details are not primary content — they exist for identity resolution.

**Temporal Edge**: An edge with a start date, an optional end date, and optional intermediate stage dates. All structural edges in the graph are temporal.

**Confidence Tier**: A classification of data trustworthiness. Tier 1: Editorially Verified. Tier 2: Human Contributed. Tier 3: AI Generated. Confidence tiers are properties of nodes and edges, not separate entities.

**Provenance**: The source chain for a piece of data. Every node and edge has a provenance record: who created it, when, based on what source, and at what confidence tier.

**Structure**: The complete graph of an organizational entity at a given point in time — all nodes, edges, and their properties that are temporally active at that moment.

**Substrate**: A foundational layer of reality that organizational structures exist within. V1 substrate: human and biological organizational relationships. Future substrates: geography, economics, information flow.

**Disambiguation Metadata**: Properties on a node that exist for the purpose of distinguishing it from other nodes with similar names or roles, not for display as primary content. Birth year, nationality, and "known for" summary on PersonNodes are disambiguation metadata.

**Prominence Score**: A computed metric reflecting how many edges, references, and cross-entity connections a node has. Used for search ranking and disambiguation. Not editorially set — derived from graph topology.

---

## 8. OPEN QUESTIONS

Q1: What is the product name? "Vir" is a working title. — Owner: Torian — Due: Before public launch

Q2: Can the external AI reasoning layer handle translation of labels and descriptions, making native i18n infrastructure unnecessary for multilingual support? This depends on how the AI integration pattern works in practice. — Owner: Torian — Due: Post-V1

Q3: What is the formal performance budget for graph queries? "Near-instantaneous" is specified as a constraint; the Implementation Spec must define specific latency targets per query type. — Owner: Engineering — Due: Implementation Spec draft

Q4: What accessibility standards does V1 target? WCAG 2.1 AA is a reasonable default for a visual-first web application, but this requires confirmation. — Owner: Torian — Due: Before implementation

Q5: How are curated non-human structures selected for V1? The current list (ant colonies, wolf packs, bee hives, primate social hierarchies, elephant herds) is proposed but not confirmed. Selection criteria: well-documented social hierarchy, distinct from human organizational patterns, pedagogically valuable for cross-domain comparison. — Owner: Torian — Due: Before data seeding begins

Q6: What is the entity boundary for "prominence" in V1? Only prominent individuals are modeled as PersonNodes. What threshold defines prominence? Possible criteria: holds or held a named leadership role in an entity already in the graph, OR is referenced by multiple edges from existing entities. — Owner: Torian — Due: Before data seeding begins

Q7: What is the protocol for handling cases where a user queries a structure that exists but at an ambiguous time point? (e.g., "the organizational structure of the President of the United States" — which president? which term? which point within the term?) The system likely defaults to the current/most recent and offers disambiguation. — Owner: Engineering — Due: Behavioral Spec draft

Q8: How are documents (constitutions, charters, corporate bylaws) represented in the graph? Documents establish authority relationships and may themselves be nodes with edges to the entities they govern. This has significant data model implications. — Owner: Torian — Due: Data Model Spec draft
