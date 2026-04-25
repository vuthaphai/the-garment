You are a senior full-stack architect.
Generate a complete, production-ready application using Preset 2 (Enterprise/Scale).

This preset optimizes for reliability, security, auditability, and long-term operability over speed of initial delivery.

# 0) INPUTS (REQUIRED)

Fill these before generation:

- PROJECT_NAME: <string>
- SHORT_NAME: <string>
- BUSINESS_DOMAIN: <string>
- PRIMARY_FEATURES: <bullet list>
- TARGET_USERS: <bullet list>
- ENVIRONMENTS: dev, sit, uat, prod

# 1) TECH STACK (DEFAULTS, OVERRIDABLE)

Use these defaults unless INPUTS explicitly override:

- Backend: Java 21, Spring Boot 3.x, Spring WebFlux (reactive)
- Frontend: Angular 21.x, Tailwind CSS, NgRx Signal Store
- Database: PostgreSQL
- Local runtime: Docker Compose
- Cloud target: AWS (default region us-east-2)
- CI/CD: GitHub Actions

Enterprise defaults:

- Infrastructure as Code required for non-dev environments
- Structured logs and traces required in all backend services
- Automated security and quality gates required before deploy

# 2) ARCHITECTURE STYLE

Build a microservices solution with explicit bounded contexts.
Use business-domain boundaries, not technical-layer boundaries.

Required services:

- backend/{SHORT_NAME}-bff-service (port 8080): client-facing API, auth, orchestration
- backend/{SHORT_NAME}-data-adapter-service (port 8082): persistence/data-access APIs
- backend/{SHORT_NAME}-service (port 8081): cross-domain orchestration/workflows
- backend/{SHORT_NAME}-common (optional): only for truly shared contracts/utilities

Mandatory principles:

- Database-per-service (no shared schema ownership)
- API versioning via /api/v1/\*
- Backward compatibility for published client APIs
- Prefer eventual consistency for cross-service workflows
- Use saga/compensation when multi-service transactions are required
- Contract-first APIs for external/client-facing interfaces
- Explicit ownership for each service and data store

# 3) BACKEND ENGINEERING STANDARDS

For all backend services, enforce:

- Layering: Controller -> Service (interface) -> Client/Repository
- Controllers depend on service interfaces, never implementation classes
- No blocking calls in reactive flows (no block(), no toFuture().get())
- DTOs separated from domain/entity classes
- Bean validation on request DTOs
- Global exception handling with consistent error response contract
- Idempotency strategy for retryable write operations
- API compatibility policy for non-breaking evolution

Reactive method patterns:

- create: Mono.just(req) -> map -> flatMap(save/call) -> map(response)
- findById: find -> switchIfEmpty(error) -> map(response)
- update: find -> switchIfEmpty(error) -> mutate -> save -> map(response)
- delete: find -> switchIfEmpty(error) -> delete

Logging and error handling:

- use doOnNext and doOnError for side-effect logs
- use onErrorMap for downstream exception translation
- do not hide errors with broad catch blocks inside reactive chains

# 4) INTER-SERVICE COMMUNICATION

BFF must call downstream services via typed clients (WebClient wrappers).
Do not place downstream HTTP logic directly in controllers.

For each downstream call, apply resilience:

- timeout
- retry with backoff
- circuit breaker
- downstream error mapping (404, 4xx, 5xx)
- bulkhead/resource isolation for critical paths

Additional enterprise communication requirements:

- Avoid long synchronous call chains across multiple services
- Prefer asynchronous events for non-blocking cross-domain workflows
- Ensure idempotent event handlers for at-least-once delivery semantics

Add request correlation/tracing headers propagation.

# 5) SECURITY BASELINE

Implement production-grade security:

- Spring Security 6 (reactive for WebFlux services)
- JWT/OAuth2 resource-server style where applicable
- Role-based access control (at least ADMIN and USER)
- Least-privilege endpoint authorization
- Internal service auth strategy for service-to-service calls
- No secrets in source; use env vars and secret managers
- Security headers and secure defaults at edge components
- Audit logging for authentication and authorization-sensitive operations

Public endpoints allowed:

- auth login/refresh
- actuator health/info (as configured)
- swagger docs only if explicitly requested

# 6) CONFIGURATION & ENVIRONMENTS

Externalize all environment-specific settings.

Required:

- application.yml + profile overlays (application-dev.yml, application-sit.yml, application-uat.yml, application-prod.yml)
- .env for local only (gitignored)
- environment variable reference table in README
- cloud secret integration strategy (AWS Secrets Manager for non-dev)
- configuration change strategy with approval workflow for sit/uat/prod

# 7) OBSERVABILITY

Implement observability by default:

- Spring Boot Actuator endpoints
- Micrometer metrics
- Distributed tracing (OpenTelemetry or Zipkin-compatible setup)
- Structured logging with traceId/spanId correlation
- Health probes suitable for container orchestration

Enterprise observability additions:

- Golden signals dashboards (latency, traffic, errors, saturation)
- SLO definitions per critical API and alerting rules
- Runbook links for common incidents and degraded modes

# 8) DATA & MIGRATIONS

For PostgreSQL:

- normalized schema per bounded context
- Liquibase versioned changelogs (001-_, 002-_, ...)
- primary keys, foreign keys, constraints, indexes
- seed data for local development

For reactive data access (WebFlux + R2DBC):

- do not assume JPA-style pageable repository methods
- implement reactive pagination patterns explicitly

# 9) FRONTEND STANDARDS (ANGULAR)

Build standalone-component architecture with feature-first structure.

Required:

- Angular standalone APIs
- route-level lazy loading
- OnPush change detection
- typed API service layer and centralized API path constants
- JWT interceptor and global error interceptor
- auth guards for protected routes
- reusable shared UI components
- responsive Tailwind styling
- accessibility basics (focus handling, aria labels, announcements where useful)

# 10) TESTING & QUALITY GATES

Generation is incomplete unless tests are included.

For each backend service include:

- service unit tests
- controller tests (WebFlux/WebTestClient)
- mapper tests
- global exception handler tests
- reactive assertions via StepVerifier where applicable

Add:

- JaCoCo coverage reporting
- minimum thresholds: line >= 80%, branch >= 80%
- CI gates that fail on test or coverage violations
- static analysis and style checks as mandatory gates

Recommended additional tests:

- integration tests with Testcontainers/WireMock
- consumer/contract tests for service boundaries
- resilience fallback behavior tests

Mandatory for Enterprise/Scale preset:

- consumer-provider contract tests for inter-service APIs
- smoke tests in deployment pipeline before traffic shift
- regression suite for critical business journeys

# 11) DEVSECOPS BASELINE

Include secure-by-default delivery:

- dependency vulnerability scanning
- Docker image scanning
- IaC static analysis (if IaC present)
- Dockerfile linting
- basic SAST integration point
- dependency license policy checks

# 12) DEPLOYMENT TARGETS (AWS DEFAULT)

Provide deployment artifacts for:

- Backend on EC2 (Docker) behind Nginx reverse proxy
- Frontend on S3 + CloudFront
- PostgreSQL on AWS RDS (non-dev)
- container registry on ECR
- TLS via ACM

Include runtime hardening:

- non-root containers
- health/readiness/liveness checks
- graceful shutdown settings
- rolling or blue-green deployment strategy with rollback plan

# 13A) OPERATIONS & GOVERNANCE (ENTERPRISE)

Also provide:

- ADRs for key architecture decisions (service boundaries, communication style, data consistency approach)
- RTO/RPO assumptions and backup/restore strategy
- Capacity and scaling baseline (horizontal scaling triggers)
- Risk register with top failure modes and mitigations

# 13) DELIVERABLES FORMAT (MANDATORY)

Return all of the following:

1. Complete project directory tree
2. Full source code for every generated file
3. README with setup instructions for dev/sit/uat/prod
4. API inventory table:
   - method
   - path
   - auth required
   - owning service
   - description
5. Environment variable table by environment
6. Test matrix per service
7. Coverage summary per backend module
8. CI/CD workflow files and explanation
9. Architecture decision notes (key trade-offs and assumptions)
10. SLO/alert matrix for critical APIs
11. Rollback and incident response playbook summary

# 14) OUTPUT RULES

- If a requirement conflicts with another, call out conflict and choose the safest production default.
- If information is missing, proceed with explicit assumptions and list them.
- Prefer maintainability and operational simplicity over novelty.
- Avoid over-decomposition; start with the minimum number of services that cleanly fits domain boundaries.
- Keep APIs and naming consistent across backend and frontend.

# 15) ENTERPRISE GUARDRAIL CHECKLIST (MANDATORY)

Before finalizing output, verify all checks below are satisfied.
If any check fails, treat generation as incomplete and fix the gap.

1. BFF API ownership check:
   - BFF must expose client-oriented use-case APIs.
   - BFF must not be a long-term 1:1 CRUD mirror of internal data-adapter resources.

2. Domain boundary check:
   - Services must be grouped by business capabilities, not technical layers.
   - Document why each service boundary exists and who owns it.

3. Contract testing check:
   - Consumer-provider contract tests must exist for every BFF-to-internal service API dependency.
   - CI must fail if contract verification fails.

4. Inter-service resilience check:
   - Every synchronous downstream call must enforce timeout, retry/backoff, circuit breaker, and error mapping.
   - Critical paths must include bulkhead/resource isolation.

5. Service-to-service security check:
   - Internal calls must use explicit service authentication (for example mTLS or signed service token).
   - Do not rely on user JWT alone for internal trust.

6. SLO and alerting check:
   - Define SLO targets per critical API (latency/error/availability).
   - Provide alert thresholds and dashboard mapping for those SLOs.

7. Deployment safety check:
   - Deployment must include pre-traffic smoke tests and explicit rollback criteria.
   - Document blue-green or rolling release strategy and rollback steps.

8. Decomposition guardrail check:
   - Only split/create new services when at least one applies:
     independent scaling need, independent release cadence, or clear team ownership boundary.
   - If criteria are not met, keep capability in existing service and record rationale.
