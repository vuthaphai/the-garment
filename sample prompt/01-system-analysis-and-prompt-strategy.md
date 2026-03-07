# HR Time Attendance & Payroll System — Prompt Strategy Guide

## System Name: The Garment HR System
**Date Created:** 2026-03-07  
**Tech Stack:** Java Spring Boot Microservice + Angular 21 + PostgreSQL

---

## PART 1: SYSTEM ANALYSIS FROM SCREENS

### Screens Identified & Modules Mapped

| Screen | Module | Service |
|--------|--------|---------|
| Login (username/password/language) | Auth | auth-service |
| Logoff confirmation dialog | Auth | auth-service |
| Company Information (Company Rule tab) | Settings | hr-service |
| Employee Information | Human Resource | hr-service |
| Nationality List | HR Setup | hr-service |
| Position List | HR Setup | hr-service |
| Group Position (Extra payment, Annual Leave, Seniority Bonus) | HR Setup | hr-service |
| Type of Contract | HR Setup | hr-service |
| Holiday List | HR Setup | hr-service |
| Shift Management | Time Attendance | attendance-service |
| Controller Management (machines/IP) | Time Attendance | attendance-service |
| Download Data (from biometric machines) | Time Attendance | attendance-service |
| Control Daily Data (attendance view) | Time Attendance | attendance-service |
| Record Permission (leave requests) | Time Attendance | attendance-service |

### Menu Structure Observed
```
File | Human Resource | Time Attendance | Payroll | Reports | Settings | Help
```

### Top Toolbar
```
Close | Download data | Control data | Validate data | Control validated data
```

---

## PART 2: MICROSERVICES ARCHITECTURE

```
                    ┌─────────────────┐
                    │   API Gateway   │  :8080
                    │ (Spring Cloud)  │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
   ┌──────▼──────┐   ┌──────▼──────┐  ┌────────▼────────┐
   │auth-service │   │  hr-service │  │attendance-service│
   │   :8081     │   │   :8082     │  │     :8083        │
   └─────────────┘   └─────────────┘  └─────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    │  dbTheGarment   │
                    └─────────────────┘
```

### Port Assignments
| Service | Port |
|---------|------|
| api-gateway | 8080 |
| auth-service | 8081 |
| hr-service | 8082 |
| attendance-service | 8083 |
| payroll-service | 8084 |
| report-service | 8085 |
| Angular Frontend | 4200 |

---

## PART 3: PROMPT TECHNIQUES & STRATEGIES

### Prompt Technique 1: "Context-First Architecture Prompt"
Always start by describing the SYSTEM, not just the feature.

**Template:**
```
You are building [SYSTEM NAME], a [DOMAIN] system.
Tech: [BACKEND] + [FRONTEND] + [DATABASE]
Current module: [MODULE NAME]
Existing context: [what's already built]
Task: Build [SPECIFIC FEATURE]
Requirements: [bullet list from screen analysis]
```

**Example:**
```
You are building "The Garment HR System", a garment factory HR management system.
Tech: Java Spring Boot Microservice + Angular 21 + PostgreSQL
Current module: HR Service
Task: Build the Employee entity with JPA, repository, service, and REST controller
Requirements:
- Fields: emp_card_no, native_name, foreign_name, date_of_birth, nationality, sex
- Contract tab: type_of_contract, contract_start, duration
- Line tab: group_position, group, position, date_joined, salary
```

---

### Prompt Technique 2: "Layer-by-Layer Building"
Build one technical layer at a time across ALL entities.

**Order:**
1. Database Schema (SQL DDL)
2. JPA Entities
3. Repositories
4. DTOs (Request/Response)
5. Service interfaces
6. Service implementations
7. REST Controllers
8. Frontend models (TypeScript interfaces)
9. Frontend services (HttpClient)
10. Frontend components (list + form)

**Why this works:** Each layer builds on the previous; easier to debug; clear separation.

---

### Prompt Technique 3: "Screen-to-API Mapping"
For each screen, explicitly map UI fields → DTO fields → Entity fields → DB columns.

**Example for Employee:**
```
UI Field         | DTO Field        | Entity Field    | DB Column
Native Name      | nativeName       | nativeName      | native_name
Date of Birth    | dateOfBirth      | dateOfBirth     | date_of_birth  
Nationality      | nationalityId    | nationality.id  | nationality_id
Group Position   | groupPositionId  | groupPosition.id| group_position_id
```

---

### Prompt Technique 4: "Incremental Service Building"
Build microservices in this order (each depends on the previous):

```
Step 1: Database Schema (foundation)
Step 2: Auth Service (security — all others depend on this)
Step 3: HR Service (master data — attendance depends on this)
Step 4: Attendance Service (depends on HR data)
Step 5: Payroll Service (depends on both HR + Attendance)
Step 6: Report Service (consumes all other services via API)
Step 7: API Gateway (ties everything together)
```

---

### Prompt Technique 5: "Component Scaffold Prompt"
For Angular components, always include: list view + form/dialog pattern.

**Template:**
```
Build Angular 21 component for [FEATURE] with:
- List component: displays [COLUMNS] in table with pagination
- Form component: create/edit dialog with [FIELDS]
- Service: HttpClient calls to [ENDPOINT]
- Model: TypeScript interface matching [DTO]
- Route: lazy loaded at [PATH]
- Style: TailwindCSS + SCSS
```

---

### Prompt Technique 6: "Security-First Prompt"
Always include security requirements explicitly.

**Template:**
```
Add the following security to [FEATURE]:
- JWT Bearer token authentication via HTTP interceptor
- Role-based access control: [ROLES] can [ACTIONS]
- Input validation on both frontend (reactive forms) and backend (Bean Validation)
- CORS configured for Angular at localhost:4200
- SQL injection protection via JPA parameterized queries
```

---

## PART 4: STEP-BY-STEP BUILD PROMPTS

### Step 1: Database Schema
```
Create PostgreSQL schema for HR Time Attendance Payroll system
with tables: users, nationalities, positions, group_positions, 
group_position_leave_increase, seniority_bonus, contract_types, employees,
employee_contracts, shifts, controllers, machines, attendance_raw,
attendance_daily, leave_permissions, holidays, company_settings, cities, groups
Include: primary keys, foreign keys, indexes on frequently queried columns,
audit fields (created_at, updated_at), default values matching business rules.
```

### Step 2: Auth Service
```
Build Spring Boot auth-service microservice:
- Spring Security 6 + JWT (JJWT library)
- POST /api/auth/login → returns JWT token
- POST /api/auth/logout → invalidates token  
- GET /api/auth/me → returns current user info
- User entity with: id, username, password (BCrypt), full_name, role, language, active
- Role enum: ADMIN, HR_MANAGER, PAYROLL, VIEWER
- JWT expiry: 8 hours
- Refresh token support
```

### Step 3: HR Service
```
Build Spring Boot hr-service microservice:
- Entity: Nationality (id, native_name, foreign_name, description)
  CRUD: GET /api/hr/nationalities, POST, PUT/{id}, DELETE/{id}
  
- Entity: Position (id, native_name, foreign_name, description)
  CRUD: GET /api/hr/positions, POST, PUT/{id}, DELETE/{id}

- Entity: GroupPosition with child tables AnnualLeaveIncrease, SeniorityBonus
  CRUD: GET /api/hr/group-positions, POST, PUT/{id}, DELETE/{id}

- Entity: ContractType (id, contract_name, auto_rule, is_auto, duration, warning)
  CRUD: GET /api/hr/contract-types, POST, PUT/{id}, DELETE/{id}

- Entity: Employee (complex form - see Employee Information screen)
  CRUD: GET /api/hr/employees (paginated, searchable), POST, PUT/{id}, DELETE/{id}
  GET /api/hr/employees/{id}/contracts
```

### Step 4: Attendance Service
```
Build Spring Boot attendance-service microservice:
- Shift CRUD with: periods (First/Second), OT1/OT2/OT3, rates, food allowance
  CRUD: GET /api/attendance/shifts, POST, PUT/{id}, DELETE/{id}

- Controller + Machine management
  CRUD: GET /api/attendance/controllers (tree), POST, PUT/{id}
  Machine: POST, PUT/{id}, DELETE/{id}

- Download Data: POST /api/attendance/download/{controllerId}
  Returns: list of download log records

- Control Daily Data: GET /api/attendance/daily
  Params: dateFrom, dateTo, empCardNo, group
  Returns: paginated attendance records

- Leave Permission: POST /api/attendance/permissions
  GET /api/attendance/permissions?empCardNo&from&to
```

### Step 5: Settings
```
In hr-service, add:
- CompanySettings CRUD: GET/PUT /api/settings/company
- Holiday CRUD: GET /api/settings/holidays?year=, POST, PUT/{id}, DELETE/{id}
- City list: GET /api/hr/cities
- Group list: GET /api/hr/groups
```

### Step 6: Angular Setup
```
Create Angular 21 project with:
- Standalone components (no NgModule)
- Signal-based state management
- TailwindCSS v4 + SCSS
- Angular Material for tables, dialogs, date pickers
- Reactive Forms throughout
- HTTP interceptor for JWT
- Auth guards with canActivate
- Lazy-loaded feature routes
- Environment files for dev/prod
```

### Step 7: Angular Features
```
Build Angular feature for [MODULE]:
- Route: /[path]
- List page with:
  * Search/filter bar
  * Data table (Angular CDK or Material table)
  * Action buttons: New, Edit, Delete
  * Pagination
- Form dialog/page with:
  * Reactive form with validators
  * Save/Cancel/Close buttons
- Service calling API Gateway at http://localhost:8080
- TypeScript model matching backend DTO
```

---

## PART 5: DATABASE ENTITIES & RELATIONSHIPS

```
users (id, username, password, role, language)

nationalities (id, native_name, foreign_name)
positions (id, native_name, foreign_name)
cities (id, native_name, foreign_name)
groups (id, group_name)

group_positions (id, native_name, foreign_name, ...payment_flags, allowances)
  ↳ group_position_leave_increase (year, days)
  ↳ seniority_bonus (year, amount, percent)

contract_types (id, contract_name, duration, is_auto, auto_rule, warning)

employees (id, emp_card_no, native_name, foreign_name, nationality_id→, 
           position_id→, group_position_id→, group_id→, salary, ...)
  ↳ employee_contracts (contract_type_id→, from_date, to_date, months)

holidays (id, date, native_name, foreign_name, year)
company_settings (id, working_days, hours, rules...)

controllers (id, controller_name)
  ↳ machines (id, controller_id→, ip_address, machine_type)

attendance_raw (emp_card_no, machine_id→, scan_datetime)
attendance_daily (emp_card_no, scan_date, t1..t8, working_hours, ot1/2/3)
leave_permissions (emp_card_no, permission_type, from_date, to_date)
```

---

## PART 6: ANGULAR FOLDER STRUCTURE (Angular 21 Best Practice)

```
frontend/src/app/
├── core/                        # Singleton — imported once in AppModule
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   └── models/user.model.ts
│   ├── interceptors/
│   │   ├── jwt.interceptor.ts   # Adds Bearer token
│   │   └── error.interceptor.ts # Global error handling
│   └── services/
│       └── api.service.ts       # Base HTTP service
│
├── shared/                      # Reusable components/pipes/directives
│   ├── components/
│   │   ├── data-table/
│   │   ├── confirm-dialog/
│   │   ├── page-header/
│   │   └── form-field/
│   ├── pipes/
│   └── models/
│       └── api-response.model.ts
│
├── layout/                      # App shell
│   ├── main-layout/
│   │   ├── main-layout.component.ts
│   │   ├── sidebar/
│   │   └── topbar/
│   └── auth-layout/
│       └── auth-layout.component.ts
│
├── features/                    # Feature areas (lazy loaded)
│   ├── auth/
│   │   └── login/
│   ├── hr/
│   │   ├── employees/
│   │   ├── nationality/
│   │   ├── position/
│   │   ├── group-position/
│   │   └── contract-type/
│   ├── attendance/
│   │   ├── shift/
│   │   ├── controller/
│   │   ├── download/
│   │   ├── control-data/
│   │   └── permission/
│   ├── payroll/
│   ├── reports/
│   └── settings/
│       ├── company/
│       └── holiday/
│
├── app.routes.ts               # Root routes with lazy loading
├── app.config.ts               # App configuration (standalone)
└── app.component.ts
```

---

## PART 7: KEY DESIGN DECISIONS

| Decision | Choice | Reason |
|----------|--------|--------|
| Auth | JWT (stateless) | Microservice-friendly |
| API Communication | REST JSON | Standard, tool support |
| Frontend State | Angular Signals | Modern Angular 21 approach |
| Forms | Reactive Forms | Complex validation needed |
| UI Framework | TailwindCSS + Angular Material | Rapid dev + rich components |
| ORM | Spring Data JPA + Hibernate | Standard Java ORM |
| Migration | Flyway | Database versioning |
| API Docs | SpringDoc OpenAPI (Swagger) | Self-documenting APIs |
| Validation | Bean Validation (JSR-380) | Standard Java validation |
| Exception Handling | @ControllerAdvice GlobalExceptionHandler | Consistent error responses |

---

*This document serves as the master reference for building The Garment HR System step by step.*
