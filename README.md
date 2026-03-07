# The Garment — HR Time Attendance & Payroll System

A modern web rewrite of a garment factory HR desktop application.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21.2.x · Angular Material · TailwindCSS v4 · SCSS |
| API Gateway | Spring Cloud Gateway (port 8080) |
| Backend | Java 21 · Spring Boot 3.2.3 (6 microservices) |
| Database | PostgreSQL 16 |
| Containerization | Docker · Docker Compose |

---

## Architecture

```
Browser (4200)
    │
    ▼
[ Nginx / dev-server ]  → proxy /api/* →  [ API Gateway :8080 ]
                                                    │
                          ┌─────────────────────────┼────────────────────┐
                          ▼          ▼              ▼          ▼         ▼
                  auth:8081  hr:8082  attendance:8083  payroll:8084  report:8085
                          │          │              │          │         │
                          └──────────┴──────────────┴──────────┴─────────┘
                                                    │
                                            [ PostgreSQL :5432 ]
```

**Security flow:** JWT issued by `auth-service`, validated by `api-gateway` JwtAuthFilter. Gateway forwards `X-User-Id` + `X-User-Role` headers to downstream services. No JWT re-validation downstream.

---

## Service Ports

| Service | Port |
|---------|------|
| Angular (dev) | 4200 |
| API Gateway | 8080 |
| auth-service | 8081 |
| hr-service | 8082 |
| attendance-service | 8083 |
| payroll-service | 8084 |
| report-service | 8085 |
| PostgreSQL | 5432 |

---

## Database

- **Host**: localhost:5432
- **Database**: `dbTheGarment`
- **User**: `postgres` / `Vp123456`
- Schema: `database/V1__init_schema.sql`
- Default admin: `admin` / `Admin@123`

---

## Running Locally (without Docker)

### 1. Create the database
```bash
psql -U postgres -c "CREATE DATABASE \"dbTheGarment\";"
psql -U postgres -d dbTheGarment -f database/V1__init_schema.sql
```

### 2. Start backend services (in separate terminals)
```bash
# From each service directory:
cd backend/api-gateway && mvn spring-boot:run
cd backend/auth-service && mvn spring-boot:run
cd backend/hr-service && mvn spring-boot:run
cd backend/attendance-service && mvn spring-boot:run
cd backend/payroll-service && mvn spring-boot:run
cd backend/report-service && mvn spring-boot:run
```

### 3. Start frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm start          # http://localhost:4200
```

---

## Running with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Background mode
docker-compose up -d --build

# Stop
docker-compose down

# Stop and remove volumes (resets database)
docker-compose down -v
```

Access the app at **http://localhost:4200**

---

## Module Overview

### HR Module (`/hr`)
- **Nationality** — CRUD with search
- **Position** — CRUD with search
- **Contract Type** — CRUD (with isAuto flag)
- **Group & Position** — Nested CRUD with payment rules, leave increases, seniority bonus
- **Employees** — Paginated list + multi-tab form (personal, work, contracts)

### Attendance Module (`/attendance`)
- **Shift** — Shift setup with OT rates, food allowances
- **Controller** — Biometric controller + machine management
- **Download Data** — Pull attendance records from controllers
- **Daily Attendance** — Paginated view with date/card filters
- **Leave Permission** — CRUD with type/date filtering

### Settings Module (`/settings`)
- **Company Settings** — Working time rules, payroll calculation parameters
- **Holidays** — Year-based holiday list

### Payroll Module (`/payroll`)
- *(Under development)*

### Reports Module (`/reports`)
- *(Under development)*

---

## Project Structure

```
the-garment/
├── backend/
│   ├── pom.xml                  # Parent POM
│   ├── api-gateway/
│   ├── auth-service/
│   ├── hr-service/
│   ├── attendance-service/
│   ├── payroll-service/
│   └── report-service/
├── database/
│   └── V1__init_schema.sql
├── docs/
│   └── Screens/
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── core/            # services, models, guards, interceptors
│   │       ├── features/        # feature modules (hr, attendance, payroll, reports, settings)
│   │       ├── layout/          # sidebar, main-layout
│   │       └── shared/          # confirm-dialog, etc.
│   ├── Dockerfile
│   └── nginx.conf
├── sample prompt/
│   └── 01-system-analysis-and-prompt-strategy.md
├── docker-compose.yml
└── README.md
```

---

## API Endpoints (Summary)

### Auth (`/api/auth`)
| Method | Path | Description |
|--------|------|-------------|
| POST | /login | Login → JWT token |
| POST | /logout | Invalidate token |
| GET | /me | Current user info |

### HR (`/api/hr`)
| Method | Path | Description |
|--------|------|-------------|
| GET/POST | /nationalities | List / Create |
| PUT/DELETE | /nationalities/{id} | Update / Delete |
| GET/POST | /positions | List / Create |
| GET/POST | /contract-types | List / Create |
| GET/POST | /group-positions | List / Create |
| GET/POST/PUT/DELETE | /employees | Employee CRUD (paginated) |

### Attendance (`/api/attendance`)
| Method | Path | Description |
|--------|------|-------------|
| GET/POST | /shifts | Shift CRUD |
| GET/POST | /controllers | Controller CRUD |
| POST | /download/{controllerId} | Trigger download |
| GET | /daily | Daily records (paginated) |
| GET/POST | /leave-permissions | Leave / permission CRUD |

### Settings (`/api/settings`)
| Method | Path | Description |
|--------|------|-------------|
| GET/PUT | /company | Company settings |
| GET/POST | /holidays | Holiday list / create |
| PUT/DELETE | /holidays/{id} | Update / Delete holiday |
