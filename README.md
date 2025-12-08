

# 🚀 FlowOrchestrator — Visual Workflow Automation Control Plane

**Enterprise Edition (v2.0)**

<div align="center">
  <img height="150" src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif"  />
</div>



FlowOrchestrator is a **developer-first visual builder** for durable distributed automation powered by **Temporal.io**. It allows technical teams to create, observe, and collaborate on complex workflows combining AI pipelines, SaaS integrations, human approvals, and compensation logic — all with production-grade reliability and SRE-style debugging.

### 🔋 Tech Stack

**Frontend**
<p>
<img src="https://img.shields.io/badge/React-18-blue?logo=react" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
<img src="https://img.shields.io/badge/Vite-fast-purple?logo=vite" />
<img src="https://img.shields.io/badge/ReactFlow-Graph-0170FE?logo=react" />
<img src="https://img.shields.io/badge/TailwindCSS-Design-06B6D4?logo=tailwindcss" />
<img src="https://img.shields.io/badge/Yjs-CRDT-7F00FF" />
</p>




**Backend**
<p>
<img src="https://img.shields.io/badge/Temporal-Workflows-3448C5?logo=temporal" />
<img src="https://img.shields.io/badge/NestJS-API-E0234E?logo=nestjs" />
<img src="https://img.shields.io/badge/Python-AI+Workers-3776AB?logo=python" />
<img src="https://img.shields.io/badge/Postgres-DB-4169E1?logo=postgresql" />
<img src="https://img.shields.io/badge/Redis-Cache-D92C2E?logo=redis" />
<img src="https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes" />
</p>

---

---

## 🌟 Features

| Category | Highlights |
|--------|------------|
| 🌀 Visual Workflow Builder | Drag-drop nodes • Auto-layout • Smart validation • Versioning |
| 🤖 AI Tasking | AWS Textract • LLM JSON validation • Prompt templates |
| 🔄 Durable Execution | Retries • Compensation • Task Queues • Long-running |
| 🔬 Observability | Gantt traces • Real-time logs • State/time-travel debugging |
| 🤝 Collaboration | CRDT (Yjs) sync <200ms • Live cursors • Conflict-free |
| 🔐 Security & Multi-Tenancy | RBAC roles • Token encryption (AES-256+KMS) • Audit log |
| 📈 SRE-Grade UX | Error budgets • Latency dashboards • Worker health metrics |

---

## 🧩 Problem It Solves

Teams who build automation today must piece together:

* Long-running state that survives failures
* External SaaS/API connectivity with auth refresh
* Human approvals + async signals
* Clear debugging with traceability
* Scalable concurrent execution

Traditional systems are brittle and invisible.
FlowOrchestrator fixes this with **durability**, **traceability**, and **collaboration**.

---

## 📊 Product Goals & KPIs

| Target             | KPI / SLO                  |
| ------------------ | -------------------------- |
| Reliability        | 99.95% workflow success    |
| Availability       | 99.9% platform uptime      |
| Debuggability      | <90 sec failure root-cause |
| Collaboration      | <200ms CRDT sync           |
| Editor performance | <16ms render + 100 nodes   |
| Trace panel load   | <1.5s                      |
| Run retention      | 90 days (configurable)     |

---

## 🧱 Core Functional Capabilities

### Visual Editor

* Infinite canvas, pan/zoom, realtime presence
* Node palette with drag-and-drop creation
* Node property configuration: retries, task queue, prompts
* Versioning: draft → publish → run

### Node Types

| Group        | Node            | Description                               |
| ------------ | --------------- | ----------------------------------------- |
| Triggers     | Webhook         | Start workflow from external POST         |
|              | Cron            | Temporal Schedule                         |
|              | Event Bus       | Internal pub/sub                          |
| AI           | Textract OCR    | Document → structured JSON                |
|              | LLM Transformer | Prompt templates + JSON schema validation |
| Actions      | SaaS API        | Generic connector pattern                 |
|              | Database        | Postgres writes                           |
|              | Webhook POST    | Call external services                    |
| Control Flow | If/Else         | Deterministic branching                   |
|              | Parallel        | Branch fan-out + join                     |
|              | Delay           | Temporal timer                            |
|              | Human Approval  | Pause + await signal                      |

---

## 🔍 Observability & Debugging (SRE-style)

* Node-level status: idle / running / retry / success / failed
* Gantt execution trace with durations
* Live log tailing via WebSocket
* Error deep links + stack trace + remediation
* Context & variable inspector
* Dashboard: throughput, latency P95/P99, worker queue depth

---

## 🤝 Collaboration & Workflow Versioning

* CRDT (Yjs) multi-user editing
* Offline edits sync on reconnect
* Presence: avatars, cursors
* Workflow versioning with rollback & published locks

---

## 🛠️ Technical Architecture

| Layer            | Technology                           |
| ---------------- | ------------------------------------ |
| Frontend         | React 18 + TypeScript + Vite         |
| Diagram Engine   | React Flow                           |
| Collaboration    | Yjs CRDT + WS provider               |
| Backend API      | NestJS (REST + WebSocket)            |
| Workflow Runtime | Temporal Cluster                     |
| AI Workers       | Python (Textract + LLM)              |
| Storage          | Postgres, Redis, S3                  |
| Observability    | OpenTelemetry + Prometheus + Grafana |
| Auth & Security  | OAuth2 + JWT + KMS encryption        |

---

## 🧬 Data Model Summary

| Entity       | Key Fields                                   |
| ------------ | -------------------------------------------- |
| Workflow     | id, name, version, yDocumentState, updatedAt |
| WorkflowRun  | runId, status, startTime, traceId            |
| Logs         | timestamp, runId, level, message             |
| Integrations | provider, encrypted accessToken, scope       |

---

## 🌐 High-Level API Contracts

### Start a Workflow Run

`POST /workflows/{id}/runs`

```json
{
  "input": {},
  "version": "string"
}
```

### Check Run Status

`GET /runs/{runId}` → JSON status + timestamps

### Stream Logs

`WS /runs/{runId}/logs`

### Collaborative Editing Stream

`WS /workflows/{id}/collab`

---

## 🔐 Security & Compliance

* RBAC: Admin / Editor / Viewer
* Audit logging for all critical actions
* Envelope encryption using AES-256 + KMS
* HTTPS, JWT rotation (15 min), secure token vault
* Tenant isolation via PostgreSQL RLS

---

## 📌 Non-Functional Requirements

* Horizontal scalability across all services
* High performance UI rendering
* API rate-limits per tenant
* Automated Postgres snapshots + S3 lifecycle policies

---

## ✔️ MVP Acceptance Criteria

* Create + publish workflow visually
* Execute run through Temporal with success
* Textract → LLM → DB pipeline fully functional
* Human approval node halts + resumes execution
* Live logs + trace display for all runs
* Collaborative editing <200ms latency
* Observability dashboard working

---

## ⚠️ Risks & Mitigations

| Risk                      | Mitigation                                     |
| ------------------------- | ---------------------------------------------- |
| Temporal worker failures  | Retries, autoscaling, DLQ                      |
| Graph editing perf issues | Virtualized rendering + memoization            |
| Token security exposure   | KMS, frequent rotation, least-privilege scopes |
| CRDT overload             | Chunking, backpressure + cluster scaling       |

---

## 🔄 CI/CD & Operations

* GitHub Actions (build + test + images)
* ArgoCD GitOps deployments
* Blue/Green deploy strategy
* Worker autoscaling based on queue depth
* Full tracing + alerting: error budget, latency, queue thresholds

---

## 📦 Suggested Repository Structure

```
flow-orchestrator/
├─ frontend/         # React + React Flow + Yjs
├─ backend/          # NestJS API + WebSockets
├─ workers/          # Python Temporal workers (Textract & LLM)
├─ infra/            # Kubernetes, Helm, Terraform
├─ docs/             # Architecture, ROADMAP, runbooks
└─ .github/          # CI/CD
```

---

## 🏃 Local Dev Quick Start

```bash
# Frontend
cd frontend && pnpm install && pnpm dev

# Backend
cd ../backend && pnpm install && pnpm dev

# Temporal (local)
temporal server start-dev
```

Frontend → [http://localhost:3000](http://localhost:3000)
API → [http://localhost:4000](http://localhost:4000)

---

## 🗺️ Roadmap (Next Major Enhancements)

1. Code generation from Workflow Editor → Temporal SDK
2. Global WebSocket collaboration scaling
3. More AI nodes (Embeddings, RAG, Vision models)
4. Workflow analytics replay + drift detection
5. Advanced SLA policy automation & auto-remediation

---

## 📝 License

Apache 2.0 — open source friendly & enterprise safe.

---

## 👥 Maintainers & Support

Platform Engineering Team
Email: (mailto:samdoinndev@gmail.com)**
<div align="center">
  <img height="160" src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" />
  <h1>📝 TaskNest — Where Ideas Turn Into Action</h1>
  <h3>Plan Smarter • Stay Organized • Achieve More</h3>
</div>


