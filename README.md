# The Garment — HR Time Attendance & Payroll System

A reactive microservices rewrite of a garment factory HR desktop application.
Built with **Spring WebFlux / R2DBC** on the backend and **Angular 21 + NgRx Signal Store** on the frontend.

---

## Architecture

```
Browser ─► tg-bff-service (8080) ─► tg-data-adapter-service (8082) ─► PostgreSQL
```

| Service                   | Port | Responsibility                                 |
| ------------------------- | ---- | ---------------------------------------------- |
| `tg-bff-service`          | 8080 | JWT auth, CORS gateway, proxy to data-adapter  |
| `tg-data-adapter-service` | 8082 | R2DBC reactive DB access, Liquibase migrations |
| `tg-frontend`             | 80   | Angular SPA served by Nginx                    |

---

## Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| Frontend     | Angular 21.2 · NgRx Signal Store · Tailwind CSS v4 · Standalone components |
| BFF          | Spring Boot 3.3.4 · WebFlux · Spring Security (JWT via JJWT 0.12.6)        |
| Data Adapter | Spring Boot 3.3.4 · WebFlux · R2DBC · PostgreSQL · Liquibase 4.27.0        |
| Infra        | Docker Compose · PostgreSQL 16 · GitHub Actions CI/CD                      |

---

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Java 21 (for local dev)
- Node 20 (for frontend dev)

### Run everything with Docker Compose

```bash
# Copy and edit env vars
cp .env.example .env

# Start all services
docker compose up --build

# App: http://localhost
# BFF API: http://localhost:8080
# Swagger: http://localhost:8080/swagger-ui.html
```

Postgres creates the application database from [database/init.sql](database/init.sql) on first container initialization. Liquibase then creates tables and seed data when `tg-data-adapter-service` starts.

Default credentials: **admin / Admin@123**

---

## Running Locally (without Docker)

### 1. Start PostgreSQL

```bash
docker run -d --name tg-pg \
  -e POSTGRES_PASSWORD=postgres \
  -v "$PWD/database/init.sql:/docker-entrypoint-initdb.d/01-init.sql:ro" \
  -p 5432:5432 postgres:16-alpine
```

### 2. Start data-adapter (Liquibase runs migrations automatically)

```bash
cd backend
mvn -pl tg-data-adapter-service spring-boot:run
```

### 3. Start BFF

```bash
mvn -pl tg-bff-service spring-boot:run
```

### 4. Start frontend

```bash
cd frontend/the-garment-web-app
npm ci
npm start   # http://localhost:4200
```

---

## Environment Variables

| Variable             | Service               | Description                             |
| -------------------- | --------------------- | --------------------------------------- |
| `DB_HOST`            | data-adapter          | PostgreSQL host                         |
| `DB_NAME`            | data-adapter          | Database name                           |
| `DB_USERNAME`        | data-adapter          | DB user                                 |
| `DB_PASSWORD`        | data-adapter, compose | DB password                             |
| `DATA_ADAPTER_URL`   | bff                   | URL of tg-data-adapter                  |
| `JWT_SECRET`         | bff                   | HS256 secret (min 32 chars)             |
| `JWT_ACCESS_EXPIRY`  | bff                   | Access token TTL ms (default 3600000)   |
| `JWT_REFRESH_EXPIRY` | bff                   | Refresh token TTL ms (default 86400000) |

---

## API Reference

### Auth — `POST /api/v1/auth/login`

```json
{ "username": "admin", "password": "Admin@123" }
```

Returns `{ "accessToken": "...", "refreshToken": "...", "expiresIn": 3600, "username": "admin", "role": "ADMIN" }`

### Auth — `POST /api/v1/auth/refresh`

```json
{ "refreshToken": "..." }
```

All other endpoints require `Authorization: Bearer <accessToken>`.

Full Swagger UI: **http://localhost:8080/swagger-ui.html**

---

## Project Structure

```
the-garment/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Build + Test on push/PR
│       └── cd.yml              # Deploy to AWS on merge to main
├── backend/
│   ├── pom.xml                 # Parent POM (Java 21, Spring Boot 3.3.4)
│   ├── tg-bff-service/         # Port 8080 — JWT, security, proxy
│   └── tg-data-adapter-service/ # Port 8082 — R2DBC + Liquibase
├── frontend/
│   └── the-garment-web-app/
│       ├── src/app/
│       ├── Dockerfile
│       └── nginx.conf
├── docker-compose.yml
└── README.md
```

---

## Module Overview

Database schema and seed data are managed by Liquibase in
`backend/tg-data-adapter-service/src/main/resources/db/changelog/`.
Database creation for Docker-based local development is bootstrapped by
`database/init.sql`.

### HR (`/hr`)

Nationality · City · Position · Group · Group-Position (leave increase + seniority bonus) · Contract Type · Employees

### Attendance (`/attendance`)

Shift · Controller · Download Data · Daily Attendance · Leave Permission

### Settings (`/settings`)

Company Settings · Holidays

### Payroll (`/payroll`) _(planned in frontend only)_

---

## CI/CD

- **ci.yml** — triggers on every push/PR to `main`/`develop`; runs Maven build+test with JaCoCo coverage + Angular build + Vitest
- **cd.yml** — triggers on merge to `main`; builds Docker images, pushes to ECR, deploys to EC2 via SSH, deploys frontend to S3/CloudFront

Required GitHub secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ACCOUNT_ID`, `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`
| GET | /me | Current user info |

### HR (`/api/hr`)

| Method              | Path                | Description               |
| ------------------- | ------------------- | ------------------------- |
| GET/POST            | /nationalities      | List / Create             |
| PUT/DELETE          | /nationalities/{id} | Update / Delete           |
| GET/POST            | /positions          | List / Create             |
| GET/POST            | /contract-types     | List / Create             |
| GET/POST            | /group-positions    | List / Create             |
| GET/POST/PUT/DELETE | /employees          | Employee CRUD (paginated) |

### Attendance (`/api/attendance`)

| Method   | Path                     | Description               |
| -------- | ------------------------ | ------------------------- |
| GET/POST | /shifts                  | Shift CRUD                |
| GET/POST | /controllers             | Controller CRUD           |
| POST     | /download/{controllerId} | Trigger download          |
| GET      | /daily                   | Daily records (paginated) |
| GET/POST | /leave-permissions       | Leave / permission CRUD   |

### Settings (`/api/settings`)

| Method     | Path           | Description             |
| ---------- | -------------- | ----------------------- |
| GET/PUT    | /company       | Company settings        |
| GET/POST   | /holidays      | Holiday list / create   |
| PUT/DELETE | /holidays/{id} | Update / Delete holiday |
