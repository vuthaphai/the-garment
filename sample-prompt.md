You are a senior full-stack architect. Generate a complete, production-ready 
application named "[PROJECT_NAME]".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Database  : PostgreSQL (local dev) · AWS RDS PostgreSQL (sit/uat/prod)
Backend   : Java 21 · Spring Boot 3.x · Spring WebFlux (Reactive) Microservice
Frontend  : Angular 21.2 · Tailwind CSS · NgRx Signal Store
Hosting   : AWS (Region: us-east-2)
             · Backend  → EC2 Ubuntu + Docker + Nginx reverse proxy
             · Frontend → S3 + CloudFront (static hosting)
             · Database → AWS RDS PostgreSQL
             · Images   → AWS ECR (Elastic Container Registry)
             · Secrets  → AWS Secrets Manager
             · SSL/TLS  → AWS ACM (Certificate Manager)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. DATABASE — PostgreSQL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Local Dev Database (used in application-dev.yml):
- Host     : localhost
- Port     : 5432
- Username : postgres
- Password : stored in .env file (never committed to git)
- DB Name  : [PROJECT_NAME]_dev

NOTE: Store password in .env and reference via ${DB_PASSWORD} in application-dev.yml.
Add .env to .gitignore. Never hardcode credentials in any source file.

- Design a normalized schema relevant to [PROJECT_NAME]
- Provide Liquibase versioned SQL changelog scripts (001-*, 002-*, …) with formatted SQL headers
- Include indexes, foreign keys, and constraints
- Seed script with sample data

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. BACKEND — Microservices Architecture (Spring Boot 3.x)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service Layout:
  backend/
  ├── [SHORT_NAME]-bff-service/          # BFF: API gateway + business rules (port 8080)
  ├── [SHORT_NAME]-data-adapter-service/ # Data adapter: PostgreSQL access layer (port 8082)
  ├── [SHORT_NAME]-service/              # Core domain service: orchestration/integration (port 8081)
  └── [SHORT_NAME]-common/              # (OPTIONAL) Shared library: PageResponse, ErrorResponse,
                                        #   ResourceNotFoundException, BusinessException, constants
                                        #   Use when duplication across services becomes significant.
                                        #   Consumed as a local Maven dependency by all three services.

  e.g. for "Vehicles Fleet Tracker": vft-bff-service, vft-data-adapter-service, vft-service, vft-common

Service Layer Pattern (ALL three services):
- Use interface + implementation split for every service:
    service/XxxService.java         (interface)
    service/impl/XxxServiceImpl.java (implementation, annotated @Service)
- Controllers depend on the interface only (never reference the impl class directly).

REACTIVE CHAIN STANDARD (mandatory pattern for all service implementations):
Every service method MUST follow this reactive operator sequence — no blocking calls ever:

  // CREATE
  Mono<XxxResponse> create(XxxRequest req) {
      return Mono.just(req)
          .map(mapper::toEntity)
          .flatMap(repository::save)
          .map(mapper::toResponse);
  }

  // FIND BY ID (with not-found guard)
  Mono<XxxResponse> findById(Long id) {
      return repository.findById(id)
          .switchIfEmpty(Mono.error(new ResourceNotFoundException("Xxx", id)))
          .map(mapper::toResponse);
  }

  // UPDATE
  Mono<XxxResponse> update(Long id, XxxRequest req) {
      return repository.findById(id)
          .switchIfEmpty(Mono.error(new ResourceNotFoundException("Xxx", id)))
          .doOnNext(entity -> mapper.updateEntity(req, entity))
          .flatMap(repository::save)
          .map(mapper::toResponse);
  }

  // DELETE
  Mono<Void> delete(Long id) {
      return repository.findById(id)
          .switchIfEmpty(Mono.error(new ResourceNotFoundException("Xxx", id)))
          .flatMap(repository::delete);
  }

Reactive Logging Rule:
- Use .doOnNext(e -> log.debug("...")) and .doOnError(e -> log.error("...", e))
- NEVER use try-catch inside flatMap/map — let reactive error signals propagate.
- Use .onErrorMap(SomeException.class, e -> new BusinessException(e.getMessage()))
  to translate downstream exceptions before they reach the controller.

Reactive Error Operator Reference:
  .switchIfEmpty(Mono.error(...))   → treat missing result as error
  .doOnError(log::error)            → side-effect log (does NOT catch)
  .onErrorMap(Ex.class, e -> ...)   → translate exception type
  .onErrorReturn(defaultValue)      → graceful fallback value
  .onErrorResume(e -> Mono.just())  → fallback Mono

Global Quality Gate — Testing (MANDATORY for all 3 backend services):
- Generation is NOT complete unless src/test/java exists in each backend service.
- Each backend service MUST include at minimum:
  1) Service layer unit tests for every XxxServiceImpl class
  2) Controller WebFlux tests (@WebFluxTest or WebTestClient)
  3) Mapper tests for enum/string conversions and updateEntity behavior
  4) GlobalExceptionHandler tests for validation + not-found + business errors
- Every reactive test MUST use reactor-test StepVerifier for Mono/Flux assertions.
- Add JaCoCo + Maven Surefire/Failsafe configuration and fail build when backend coverage is below 80%.
- CI must run: mvn -q test and mvn -q verify for each backend service module.

Request Flow:
  Frontend → [SHORT_NAME]-bff-service (8080) → [SHORT_NAME]-data-adapter-service (8082) → PostgreSQL

━━━━━━━━━━━━━━━━━━━━━━━━
[SHORT_NAME]-bff-service (port 8080)
━━━━━━━━━━━━━━━━━━━━━━━━
Purpose: Backend-for-Frontend — receives all requests from the Angular frontend,
enforces business rules, applies orchestration logic, and delegates data operations
to [SHORT_NAME]-data-adapter-service via internal reactive HTTP (WebClient).

Runtime:
- Java 21
- Spring Boot 3.x + Spring WebFlux (fully reactive, non-blocking)
- Reactor Netty as embedded server (replaces Tomcat)

Architecture:
- Reactive layered: Controller → Service → WebClient (calls [SHORT_NAME]-data-adapter-service)
- All return types are Mono<T> or Flux<T>
- API versioning via URL prefix: /api/v1/
- DTOs (request/response) separated from domain classes
- MapStruct mappers for all Domain ↔ DTO conversions (one mapper interface per domain)
- Mapper package: com.[pkg].mapper  (e.g. VehicleMapper, StaffMapper, AuthMapper)
- No direct database access

CRITICAL — Domain Model Rules:
- All domain classes that extend a BaseEntity MUST use Lombok @SuperBuilder (not @Builder)
  on both the parent and every child class. Plain @Builder on a subclass does NOT expose
  inherited fields (id, createdAt, updatedAt) in the generated builder — MapStruct will
  fail with: "Unknown property 'id' in result type XxxBuilder".
- Because @SuperBuilder exposes inherited fields to the builder, do NOT add
  @Mapping(target = "id/createdAt/updatedAt", ignore = true) on toEntity() mapper methods
  (those fields won't be in the source DTO anyway and MapStruct will error on the target).
  The ignore = true annotations are still valid on updateEntity(@MappingTarget …) methods
  since those use setters, not the builder.

Package Layout (per service):
  src/main/java/com/[pkg]/
  ├── config/          # WebClient bean, SecurityConfig (@EnableWebFluxSecurity)
  ├── controller/      # @RestController — returns Mono<ResponseEntity<T>>
  ├── service/         # XxxService.java interfaces
  │   └── impl/        # XxxServiceImpl.java implementations (@Service)
  ├── client/          # WebClient wrappers (typed REST clients)
  ├── domain/          # Plain POJOs — use @SuperBuilder (not @Builder) when extending BaseEntity
  ├── dto/             # Request / Response DTOs + PageResponse<T>
  ├── mapper/          # MapStruct interfaces: @Mapper(componentModel="spring")
  ├── util/            # Shared helpers: PageUtils (reactive pagination), DateUtils, etc.
  ├── security/        # JwtAuthenticationFilter (WebFilter), JwtTokenProvider,
  │                    # ReactiveUserDetailsService impl
  └── exception/       # GlobalExceptionHandler (@RestControllerAdvice),
                       # ErrorResponse, ResourceNotFoundException, BusinessException

Code Quality:
- Bean Validation with @Valid on all request DTOs
- Global exception handling via @RestControllerAdvice
  · WebExchangeBindException replaces MethodArgumentNotValidException
  · ServerWebExchange replaces WebRequest
  · All handlers return Mono<ResponseEntity<ErrorResponse>>
- Custom error response body (timestamp, status, message, path)
- RESTful conventions: correct HTTP verbs + status codes
- CORS configuration via org.springframework.web.cors.reactive

Features:
- Spring Security 6 reactive: @EnableWebFluxSecurity + @EnableReactiveMethodSecurity
  · SecurityWebFilterChain (ServerHttpSecurity)
  · JWT as WebFilter (implements WebFilter, not OncePerRequestFilter)
  · ReactiveUserDetailsService + ReactiveAuthenticationManager
    (UserDetailsRepositoryReactiveAuthenticationManager)
  · ReactiveSecurityContextHolder.withAuthentication()
- Role-based access control (ADMIN / USER)
- Pagination via PageResponse<T> POJO (replaces Spring Data Page<T> in responses)
- OpenAPI 3 / Swagger UI via springdoc-openapi-starter-webflux-ui
- Spring Boot Actuator: /actuator/health, /actuator/info, /actuator/metrics, /actuator/circuitbreakers

Resilience — WebClient Calls to [SHORT_NAME]-data-adapter-service:
ALL WebClient calls to the data-adapter MUST be wrapped with:
  1. Timeout:        .timeout(Duration.ofSeconds(5))
  2. Retry:          .retry(2) or .retryWhen(Retry.backoff(2, Duration.ofMillis(500)))
  3. Circuit Breaker: via spring-cloud-starter-circuitbreaker-reactor-resilience4j
       @CircuitBreaker(name = "dataAdapter", fallbackMethod = "...")
     OR inline: ReactiveCircuitBreakerFactory.create("dataAdapter").run(webClientCall, throwable -> fallback)
  4. Error mapping:  .onErrorMap(WebClientResponseException.NotFound.class,
                         e -> new ResourceNotFoundException("Resource not found"))
                     .onErrorMap(WebClientResponseException.class,
                         e -> new BusinessException("Downstream error: " + e.getStatusCode()))

WebClient Bean configuration (in WebClientConfig.java):
  @Bean("dataAdapterWebClient")
  public WebClient dataAdapterWebClient(WebClient.Builder builder) {
      return builder
          .baseUrl(dataAdapterUrl)
          .codecs(c -> c.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
          .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
          .filter(ExchangeFilterFunction.ofResponseProcessor(response -> {
              if (response.statusCode().isError()) {
                  return response.createException().flatMap(Mono::error);
              }
              return Mono.just(response);
          }))
          .build();
  }

Resilience4j configuration in application.yml:
  resilience4j:
    circuitbreaker:
      instances:
        dataAdapter:
          registerHealthIndicator: true
          slidingWindowSize: 10
          failureRateThreshold: 50
          waitDurationInOpenState: 10s
          permittedNumberOfCallsInHalfOpenState: 3
    timelimiter:
      instances:
        dataAdapter:
          timeoutDuration: 5s

Distributed Tracing (Micrometer + Zipkin):
- Add micrometer-tracing-bridge-brave + zipkin-reporter-brave to produce trace/span IDs
- application.yml: management.tracing.sampling.probability=1.0 (dev) / 0.1 (prod)
- application.yml: management.zipkin.tracing.endpoint=${ZIPKIN_URL:http://localhost:9411/api/v2/spans}
- Every log line will automatically include traceId and spanId via MDC

DevOps:
- application.yml profiles: dev, sit, uat, prod
- Env var: DATA_ADAPTER_URL (URL of [SHORT_NAME]-data-adapter-service)
- Env var: JWT_SECRET, CORS_ALLOWED_ORIGINS
- Env var: ZIPKIN_URL (optional, for distributed tracing)
- Secrets via environment variables; sit/uat/prod secrets via AWS Secrets Manager
- Docker multi-stage Dockerfile (exposes port 8080)
- AWS region: us-east-2

Key pom.xml dependencies:
- spring-boot-starter-webflux
- spring-boot-starter-security
- spring-cloud-starter-circuitbreaker-reactor-resilience4j
- springdoc-openapi-starter-webflux-ui
- mapstruct (1.5.x) + mapstruct-processor (annotation processor)
- jjwt-api / jjwt-impl / jjwt-jackson
- micrometer-tracing-bridge-brave
- zipkin-reporter-brave
- reactor-test (test scope)
- spring-cloud-contract-wiremock (test scope — for integration tests)

Spring Cloud BOM: add <spring-cloud.version>2023.0.x</spring-cloud.version> to parent pom
  <dependencyManagement><dependency>spring-cloud-dependencies BOM</dependency></dependencyManagement>

Testing:
- Unit tests: JUnit 5 + Mockito (service layer, mock WebClient via StepVerifier)
- reactor-test StepVerifier for all Mono/Flux assertions
- Integration tests: @SpringBootTest + WireMock (mock [SHORT_NAME]-data-adapter-service)
- MUST include tests for success + validation error + downstream 404 + downstream 5xx translation
- MUST include circuit breaker open/half-open state tests (mock WebClient to throw exceptions)
- At least 80% line coverage and 80% branch coverage for this service

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SHORT_NAME]-data-adapter-service (port 8082)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Purpose: Internal data access layer — exposes a reactive REST API consumed only by
[SHORT_NAME]-bff-service. Handles all database operations via Spring Data R2DBC.
No business logic; no public-facing security (internal network only).

Runtime:
- Java 21
- Spring Boot 3.x + Spring WebFlux (fully reactive, non-blocking)
- Reactor Netty as embedded server

Architecture:
- Reactive layered: Controller → Service → R2DBC Repository
- All return types are Mono<T> or Flux<T>
- API versioning via URL prefix: /api/v1/
- DTOs (request/response) separated from JPA entities
- MapStruct mappers for all Entity ↔ DTO conversions (one mapper per entity)
- Mapper package: com.[pkg].mapper  (e.g. VehicleEntityMapper, StaffEntityMapper)
- Spring Data R2DBC with PostgreSQL (r2dbc-postgresql driver)
- Liquibase for database migrations (master YAML changelog + individual SQL changesets)
  NOTE: Liquibase still uses JDBC datasource (spring.datasource.*) alongside R2DBC

CRITICAL — Domain/Entity Model Rules:
- All entities that extend a BaseEntity MUST use Lombok @SuperBuilder (not @Builder) on
  both the parent and every child class. Plain @Builder on a subclass does NOT include
  inherited fields (id, createdAt, updatedAt) in the generated builder, causing MapStruct
  compilation errors like: "Unknown property 'id' in result type XxxBuilder".
  Pattern:
    @SuperBuilder @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public abstract class BaseEntity { ... }

    @SuperBuilder @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public class VehicleEntity extends BaseEntity { ... }

CRITICAL — R2DBC Pagination Rule:
- R2dbcRepository / ReactiveCrudRepository does NOT support findAll(Pageable) like JPA.
  Only findAll() and findAll(Sort) are available on the repository interface.
  For offset-based pagination you MUST inject R2dbcEntityTemplate and use:
    r2dbcEntityTemplate.select(XxxEntity.class)
        .matching(Query.empty().offset((long) page * size).limit(size))
        .all()
        .map(mapper::toResponse)
  Count query: r2dbcEntityTemplate.count(Query.empty(), XxxEntity.class)
  Imports: org.springframework.data.r2dbc.core.R2dbcEntityTemplate
           org.springframework.data.relational.core.query.Query

Package Layout (per service):
  src/main/java/com/[pkg]/
  ├── config/          # R2DBC config, WebFlux config
  ├── controller/      # @RestController — returns Mono<ResponseEntity<T>>
  ├── service/         # XxxService.java interfaces
  │   └── impl/        # XxxServiceImpl.java implementations (@Service)
  │                    #   Inject R2dbcEntityTemplate for pagination (not findAll(Pageable))
  ├── repository/      # R2DBC repositories (R2dbcRepository) — findAll(Sort) only, no findAll(Pageable)
  ├── entity/          # @Table entities for R2DBC — use @SuperBuilder (not @Builder) when extending BaseEntity
  ├── dto/             # Request / Response DTOs + PageResponse<T>
  ├── mapper/          # MapStruct interfaces: @Mapper(componentModel="spring")
  │                    #   Entity → DTO (toResponse), DTO → Entity (toEntity)
  │                    #   All enum-like fields stored as String in entity + DTO
  ├── util/            # Shared helpers: PageUtils (reactive pagination), DateUtils, etc.
  └── exception/       # GlobalExceptionHandler, ErrorResponse,
                       # ResourceNotFoundException, BusinessException

Code Quality:
- Bean Validation with @Valid on all request DTOs
- Global exception handling via @RestControllerAdvice
  · WebExchangeBindException replaces MethodArgumentNotValidException
  · ServerWebExchange replaces WebRequest
  · All handlers return Mono<ResponseEntity<ErrorResponse>>
- Custom error response body (timestamp, status, message, path)
- RESTful conventions: correct HTTP verbs + status codes

Features:
- Reactive pagination via PageResponse<T> (custom POJO, not Spring Data Page)
- Spring Boot Actuator: /actuator/health, /actuator/info, /actuator/metrics

Distributed Tracing (Micrometer + Zipkin):
- Same setup as bff-service: micrometer-tracing-bridge-brave + zipkin-reporter-brave
- Trace IDs automatically propagate via HTTP headers (B3 propagation)
- This links BFF spans to data-adapter spans in Zipkin UI

R2DBC URL format:
- Dev:  r2dbc:postgresql://localhost:5432/[PROJECT_NAME]_dev
- Prod: r2dbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}  (or ${DB_R2DBC_URL})

DevOps:
- application.yml profiles: dev, sit, uat, prod
- Dev: local PostgreSQL r2dbc URL via ${DB_PASSWORD} in application-dev.yml
- sit/uat/prod: AWS RDS PostgreSQL, credentials from AWS Secrets Manager
  · spring.r2dbc.url: ${DB_R2DBC_URL}
  · spring.r2dbc.username / password: ${DB_USERNAME} / ${DB_PASSWORD}
  · spring.datasource.* kept for Liquibase only
- AWS region: us-east-2
- Docker multi-stage Dockerfile (exposes port 8082)

Key pom.xml dependencies:
- spring-boot-starter-webflux
- spring-boot-starter-data-r2dbc
- org.postgresql:r2dbc-postgresql (runtime)
- org.postgresql:postgresql (runtime — Liquibase only)
- liquibase-core
- mapstruct (1.5.x) + mapstruct-processor (annotation processor)
- lombok (provided) + lombok-mapstruct-binding (annotation processor, ensures Lombok runs before MapStruct)
- micrometer-tracing-bridge-brave
- zipkin-reporter-brave
- reactor-test (test scope)
- org.testcontainers:postgresql (test scope)
- org.testcontainers:r2dbc (test scope)

Testing:
- Unit tests: JUnit 5 + Mockito (service layer, StepVerifier for reactive assertions)
- Integration tests: @SpringBootTest + Testcontainers (PostgreSQL via R2DBC)
- MUST include tests for pagination queries via R2dbcEntityTemplate path
- MUST include repository integration tests for unique constraints and existsBy* methods
- At least 80% line coverage and 80% branch coverage for this service

━━━━━━━━━━━━━━━━━━━━━━━━
[SHORT_NAME]-service (port 8081)
━━━━━━━━━━━━━━━━━━━━━━━━
Purpose: Core domain orchestration/integration layer — sits between BFF and data-adapter.
Use for: multi-source aggregation (payroll calculation, reporting), saga/workflow coordination,
and any business logic that spans multiple data-adapter resources.
If the project has no complex orchestration logic at MVP, this service may be deferred.

Runtime:
- Java 21, Spring Boot 3.x + Spring WebFlux, Reactor Netty
- All return types Mono<T> / Flux<T>
- Same reactive chain pattern as bff-service (switchIfEmpty, doOnError, onErrorMap)
- Same Resilience4j circuit breaker around WebClient calls to data-adapter
- Same Micrometer + Zipkin distributed tracing

Architecture:
- Reactive layered: Controller → Service → WebClient (calls data-adapter)
- Interface + impl split for every service (same as bff/data-adapter)
- No direct database access; no security (internal network only, like data-adapter)
- API versioning: /api/v1/

Testing:
- Unit tests: JUnit 5 + Mockito + reactor-test StepVerifier for all service implementations
- Integration tests: @SpringBootTest + WireMock (mock data-adapter endpoints)
- Controller tests: WebTestClient for all /api/v1/* endpoints
- MUST test circuit breaker fallback behavior
- At least 80% line coverage and 80% branch coverage for this service

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. FRONTEND — Angular 21.2 (Best Practices)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File Naming Convention (Angular 21 official style guide):
- Use hyphen-separated words: UserProfile → user-profile.ts
- NO type suffixes: use user-profile.ts NOT user-profile.component.ts
- Tests:           user-profile.spec.ts  (.spec suffix only)
- Same base name for TS + HTML + CSS: user-profile.ts / user-profile.html / user-profile.css

Architecture:
- Standalone components only (no NgModules)
- Feature-based folder structure (core / shared / features)
- Lazy-loaded feature routes
- All components use ChangeDetectionStrategy.OnPush

Project Root Folder:
  frontend/
  └── [SHORT_NAME]-web-app/            # Angular project root (ng new [SHORT_NAME]-web-app)
      ├── angular.json                 # e.g. vft-web-app for "Vehicles Fleet Tracker"
      ├── package.json
      ├── tsconfig.json
      ├── tsconfig.app.json
      ├── tsconfig.spec.json
      ├── tailwind.config.js
      ├── vitest.config.ts
      └── src/

Folder Structure:
  frontend/[SHORT_NAME]-web-app/src/
  ├── app/
  │   ├── core/                        # Singletons: guards, interceptors, layout
  │   │   ├── http/
  │   │   │   ├── api-path.ts          # centralized API URI constants (includes /api/v1/*)
  │   │   │   └── service/
  │   │   │       └── api.ts           # generic ApiService<T> wrapper around HttpClient
  │   │   ├── auth/
  │   │   │   ├── component/           # login.ts, login.html, login.css
  │   │   │   ├── service/             # auth.ts (AuthService)
  │   │   │   ├── store/               # auth.ts (AuthStore — NgRx Signal Store)
  │   │   │   ├── mapper/              # auth.mapper.ts (API ↔ frontend model)
  │   │   │   └── model/               # auth.model.ts (interfaces/types)
  │   │   ├── interceptors/
  │   │   │   ├── auth.ts              # JWT injector
  │   │   │   └── error.ts             # global error handler
  │   │   ├── guards/
  │   │   │   └── auth.ts              # functional route guard
  │   │   └── layout/
  │   │       ├── shell/               # shell.ts, shell.html
  │   │       ├── sidebar/             # sidebar.ts, sidebar.html
  │   │       └── header/              # header.ts, header.html
  │   ├── features/                    # One sub-folder per route/feature
  │   │   ├── [feature-name]/          # e.g. vehicles, dashboard, requests …
  │   │   │   ├── component/           # feature-name.ts + .html + .css
  │   │   │   ├── service/             # feature-name.ts (FeatureService)
  │   │   │   ├── store/               # feature-name.ts (FeatureStore)
  │   │   │   ├── mapper/              # feature-name.mapper.ts
  │   │   │   └── model/               # feature-name.model.ts (interfaces/types)
  │   │   └── …                        # other features follow same structure
  │   ├── shared/                      # Reusable UI components + pipes + utils
  │   │   ├── ui/
  │   │   │   ├── data-table/          # data-table.ts, data-table.html
  │   │   │   ├── modal/               # modal.ts
  │   │   │   ├── badge/               # badge.ts
  │   │   │   ├── form-field/          # form-field.ts
  │   │   │   └── toast/               # toast.ts
  │   │   ├── pipes/
  │   │   └── utils/
  │   ├── app.ts                       # root component (was app.component.ts)
  │   ├── app.routes.ts                # root route config (was app-routing.module.ts)
  │   └── app.config.ts                # provideRouter, provideHttpClient, etc.
  ├── environments/
  │   ├── environment.ts               # dev
  │   ├── environment.uat.ts
  │   └── environment.prod.ts
  └── main.ts

Path Aliases (tsconfig.json + vitest moduleNameMapper):
- @core/*     → src/app/core/*
- @features/* → src/app/features/*
- @shared/*   → src/app/shared/*
- @env/*      → src/environments/*
- Example: import { AuthStore } from '@core/auth/store/auth';

Modern Angular 21 APIs:
- Use inject() function for dependency injection (no constructor injection)
- Signal-based inputs/outputs: input(), output(), model() instead of @Input()/@Output()
- Use @defer blocks for lazy rendering of heavy UI sections
- Use resource() / httpResource() for async data fetching where applicable

Environments:
- environment.{dev,sit,uat,prod}.ts files
- angular.json build configurations with fileReplacements per environment
- Build commands: ng build --configuration=sit|uat|production

State Management — NgRx Signal Store:
- One SignalStore per feature (e.g., VehiclesStore, AuthStore)
- withState, withComputed, withMethods, withHooks
- Devtools integration

HTTP & Auth:
- Environment-based API host configuration (base URL only, e.g. https://api.domain.com)
- Do NOT hardcode endpoint strings inside feature services/components
- Centralize backend route constants in core/http/api-path.ts
  e.g. API_PATH.vehicles.base = '/api/v1/vehicles'
- Create a generic core/http/service/api.ts with typed methods:
  get<T>(), post<T, B>(), put<T, B>(), delete<T>()
- Feature services must call ApiService + API_PATH constants (never raw HttpClient URL strings)
- HTTP interceptor for JWT Bearer token injection
- HTTP interceptor for global error handling
- Auth guard + functional route guards

UI / Styling:
- Tailwind CSS utility-first, fully responsive (mobile-first)
- Shared UI components: DataTable, Modal, FormField, Badge, Toast
- Angular Reactive Forms with cross-field validators
- Loading skeleton / spinner states

Accessibility — Angular CDK a11y (@angular/cdk/a11y):
- FocusTrap in modals and dialogs (keyboard navigation stays inside)
- LiveAnnouncer for status messages (e.g., "Vehicle saved", "Request approved")
- FocusMonitor on buttons/interactive elements
- Add aria-label, aria-live, role attributes on all data tables and badges
- Package: @angular/cdk (install with: npm install @angular/cdk)

Testing:
- Unit tests with Vitest + Angular Testing Library (@analogjs/vitest-angular)
- vitest.config.ts with path alias resolution matching tsconfig paths
- setup-vitest.ts for global test environment bootstrap
- Test files co-located with source: feature-name.spec.ts inside component/ or service/
- At least one test per component, store, and service

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. AWS INFRASTRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Region: us-east-2

Observability Stack (add to docker-compose for dev/sit):
- Zipkin: image zipkin:latest, port 9411 — distributed trace UI
- Prometheus: scrapes /actuator/prometheus from all Spring Boot services
- Grafana: dashboards for latency, error rate, circuit breaker state
- All services expose: /actuator/health, /actuator/info, /actuator/metrics, /actuator/prometheus

Backend (per environment: sit / uat / prod):
- EC2 Ubuntu instance running Docker
- Nginx as reverse proxy (HTTP → Spring Boot container on port 8080)
- SSL/TLS termination via AWS ACM + (ALB or Let's Encrypt for single instance)
- Spring Boot Docker container pulled from AWS ECR

Database:
- AWS RDS PostgreSQL (sit/uat/prod)
- Local Docker PostgreSQL (dev only)
- RDS connection string injected via AWS Secrets Manager

Frontend:
- Angular build output deployed to AWS S3 bucket (static website hosting)
- AWS CloudFront distribution in front of S3 (CDN + HTTPS)
- Separate S3 bucket + CloudFront per environment

Security:
- EC2 Security Group: allow 80/443 inbound, 22 from trusted IPs only
- RDS Security Group: allow 5432 from EC2 only (no public access)
- IAM Role on EC2 for Secrets Manager access (no hardcoded AWS keys)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. CI/CD — GitHub Actions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Separate workflow per environment: dev, sit, uat, prod
- Pipeline stages: build → test → docker build → push to ECR → deploy
- Quality gate: fail pipeline if any backend module has missing tests or coverage below threshold
- Secrets injected via GitHub Actions environment secrets
  (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, EC2_HOST, EC2_SSH_KEY)
- Backend deploy:
  1. Maven build + unit/integration tests
  2. docker build + push to AWS ECR
  3. SSH into EC2 → docker pull from ECR → docker compose up
- Frontend deploy:
  1. npm install + ng test + ng build --configuration={env}
  2. aws s3 sync dist/ to S3 bucket
  3. aws cloudfront create-invalidation (cache bust)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DELIVERABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Full project directory tree
2. Every source file with complete, runnable code
3. README.md with local setup instructions (per environment)
4. List of all API endpoints (method, path, auth required, description)
5. Environment variable reference table (all required env vars per environment)
6. Test matrix covering all three backend services (unit/integration/controller/exception)
7. JaCoCo coverage report and summary (line + branch) per backend module