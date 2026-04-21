# Ostr-itch Data Layer Specification

**Status:** Draft v0.1
**Date:** March 26, 2026
**Graduated from:** Everything Ecosystem Idea Dump, items 147–154 (Session 6)
**Provenance:** Ideas originated in ecosystem-level idea dump during methodology development. Graduated to Ostr-itch specs as first test of the harness idea graduation workflow.

---

## 1. Overview

Ostr-itch requires a data layer that serves two parallel interfaces:

- **The harness interface (AI-native):** Agents read and write structured markdown files — entity profiles, idea dumps, session logs, provenance chains. This is Ostr-itch v0, operational today through skill files.
- **The software interface (human-native):** Users interact through a UI with dashboards, visualizations, and structured forms. Data is stored in a database, queried efficiently, and rendered visually.

Both interfaces read from and write to the same underlying data. The data layer must serve both without requiring either to translate for the other.

## 2. Architecture

### 2.1 Three-Layer Stack

```
┌─────────────────────────────────────────────┐
│  Interface Layer                             │
│  ┌──────────────┐  ┌─────────────────────┐  │
│  │ Harness       │  │ Software UI          │  │
│  │ (Skill files, │  │ (Visual engine,      │  │
│  │  markdown,    │  │  dashboards,         │  │
│  │  agents)      │  │  forms)              │  │
│  └──────┬───────┘  └──────────┬──────────┘  │
├─────────┴──────────────────────┴─────────────┤
│  Virtual File Machine                        │
│  Presents filesystem-like interface.          │
│  Bridges local files ↔ graph database.       │
│  Manages sync, persistence, sovereignty.     │
├──────────────────────────────────────────────┤
│  Storage Layer                               │
│  ┌──────────────┐  ┌─────────────────────┐  │
│  │ Local         │  │ Graph Database       │  │
│  │ Filesystem    │  │ (Neo4j)              │  │
│  │ (person's    │  │ Structured storage,  │  │
│  │  hard drive) │  │ traversal, queries   │  │
│  └──────────────┘  └─────────────────────┘  │
└──────────────────────────────────────────────┘
```

### 2.2 Virtual File Machine

The virtual file machine is the bridge between the local filesystem and the graph database. It presents a filesystem-like interface to both agents and users while maintaining structured persistence underneath.

**Responsibilities:**
- Present entity profiles, idea dumps, session logs, and provenance chains as navigable files/directories
- Store underlying data on the person's local hard drive (local-first sovereignty)
- Sync local file representations with graph database records
- Handle read/write operations from both harness agents (markdown) and software UI (structured data)
- Manage conflict resolution when both interfaces modify the same data

**Design principle:** The person's data lives on their machine. Cloud sync and collaboration are layered on top as optional features. The default is local ownership. This is consistent with the methodology's sovereignty principle.

**Open questions:**
- File format for local persistence: continue with markdown, or use a structured format (SQLite, binary graph format) that the VFM translates to/from markdown for agent consumption?
- How does the VFM handle concurrent access from multiple agents or a user + agent simultaneously?
- Does the VFM maintain its own index/cache for fast lookups, or does it always read from the filesystem?

### 2.3 Graph Database (Neo4j)

The methodology's data is inherently graph-structured. Entities are nodes. Relationships are edges. Provenance chains are paths. The graph database makes this structure queryable and performant.

**Data model mapping:**

| Methodology Concept | Graph Representation |
|---------------------|---------------------|
| Entity profile | Node with properties (identity, classification, lifecycle, etc.) |
| Relationship (horizontal, vertical, diagonal, etc.) | Typed edge between entity nodes |
| Pillar (product, brand, business) | Child nodes connected to entity node |
| Idea (in idea dump) | Node with status, provenance properties |
| Provenance chain | Path through idea nodes and entity nodes with timestamps |
| Person profile | Node with capacity, project, relationship properties |
| Position schema | Node connected to entity node and optionally to person node |
| Idea dump | Collection node connected to its entity + all idea nodes within it |
| Session log entry | Node with session properties, connected to entities/ideas touched |

**Key traversal queries the diagnostic system needs:**
- "All active ideas in [entity] dump older than N sessions" → implementation lag
- "All ideas in [dump] referencing [sub-area]" → clustering detection
- "Path from idea origin to current location" → provenance chain visualization
- "All entities with no changelog entries in N days" → inactivity detection
- "Shortest path between two entities through relationships" → relationship mapping
- "All ideas routed from [entity A] to [entity B]" → flow pattern analysis

## 3. Phased Implementation

### Phase 1: Graph Database Foundation
**Goal:** Store methodology data in Neo4j. Replace markdown-as-database with queryable graph.

**Deliverables:**
- Neo4j schema matching the data model mapping above
- Import pipeline: read existing markdown files (entity profiles, idea dumps) and create graph nodes/edges
- Export pipeline: generate markdown representations from graph data (for harness agent consumption)
- Basic CRUD operations for entities, ideas, relationships, provenance entries
- Diagnostic system queries implemented as Cypher queries

**Success criteria:**
- All existing entity profiles and idea dumps representable in the graph
- Diagnostic queries (lag, clustering, inactivity) return accurate results
- Round-trip fidelity: import markdown → store in graph → export markdown produces equivalent output

### Phase 2: Graph Analytics
**Goal:** Use Neo4j Graph Data Science library for pattern detection.

**Deliverables:**
- Community detection algorithms applied to idea dumps (clustering)
- Centrality analysis across entity hierarchy (which entities are most connected/critical)
- Pathfinding algorithms for provenance chain analysis
- Similarity scoring between entities (structural similarity)

**Success criteria:**
- Clustering detection matches or exceeds rule-based heuristics in the current diagnostic skill
- Centrality scores surface non-obvious entity importance
- Pathfinding produces complete provenance visualizations

### Phase 3: Graph Neural Network
**Goal:** Train a GNN for predictive capabilities.

**Prerequisites:** Sufficient accumulated data from real usage — many entities profiled, many ideas routed through full lifecycle, multiple ecosystems modeled.

**Deliverables:**
- Entity birth prediction: detect structural signatures of "this idea cluster is becoming an entity"
- Implementation lag prediction: predict which entities will experience lag based on structural profile
- Routing recommendation: suggest optimal routing targets for new ideas
- Cross-domain pattern transfer: identify structural patterns that hold across business, government, biological, and other domains

**Success criteria:**
- Predictions measurably improve diagnostic system accuracy over rule-based heuristics
- Cross-domain patterns validated by domain experts
- Model can explain predictions (not just black-box classification)

**Open questions:**
- Training data volume: how many entity lifecycles constitute sufficient training data?
- GNN architecture: node classification, link prediction, or graph classification? Likely a combination.
- Build vs. use: custom GNN from scratch, or fine-tune existing graph ML models?
- Relationship to Neo4j GDS: does Phase 2 analytics serve as feature engineering for Phase 3 GNN inputs?

## 4. Data Sovereignty

**Core principle:** The person's data lives on their machine by default.

**Implementation:**
- Local filesystem is the source of truth for persistence
- Graph database can run locally (Neo4j Community Edition, or embedded graph DB)
- Cloud sync is an optional feature, not a requirement
- Export formats should be open and portable (not locked into proprietary formats)
- The person can always access their raw data without the software running

**Implications for virtual file machine:**
- VFM must work fully offline
- Sync to cloud/collaboration features are additive, not constitutive
- Data migration between machines should be a supported operation (move your ecosystem)

## 5. Relationship to Harness

The harness (skill files + markdown handoffs) continues to function regardless of whether the graph database exists. The data layer is additive:

- **Without graph DB:** Harness operates on markdown files. Diagnostic queries are approximate (text-based analysis of dump files). This is the current state and remains functional.
- **With graph DB:** Harness operates on markdown files that are synced with the graph. Diagnostic queries are precise (Cypher traversals). The VFM keeps both representations in sync.
- **With GNN:** Diagnostic system gains predictive capabilities in addition to observational ones. Harness skill files can reference GNN predictions as inputs to recommendations.

The graph database does not replace the harness. It makes the harness more powerful.

---

*This specification graduated from the Everything Ecosystem Idea Dump (items 147–154) on March 26, 2026 during Session 6. It is the first document produced through the harness's idea graduation workflow.*
