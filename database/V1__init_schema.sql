-- ============================================================
-- The Garment HR Time Attendance & Payroll System
-- Database: dbTheGarment
-- PostgreSQL Schema – Version 1 (Flyway Migration)
-- ============================================================
SET client_encoding = 'UTF8';

-- ============================================================
-- AUTH MODULE
-- ============================================================
CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    username    VARCHAR(50)  UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,   -- BCrypt hashed
    full_name   VARCHAR(100),
    role        VARCHAR(30)  NOT NULL DEFAULT 'VIEWER',  -- ADMIN, HR_MANAGER, PAYROLL, VIEWER
    language    VARCHAR(10)  NOT NULL DEFAULT 'en',
    active      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);

-- ============================================================
-- HR MASTER DATA
-- ============================================================

CREATE TABLE nationalities (
    id           BIGSERIAL PRIMARY KEY,
    native_name  VARCHAR(100) NOT NULL,
    foreign_name VARCHAR(100),
    description  VARCHAR(255),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE cities (
    id           BIGSERIAL PRIMARY KEY,
    native_name  VARCHAR(100) NOT NULL,
    foreign_name VARCHAR(100),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE positions (
    id           BIGSERIAL PRIMARY KEY,
    native_name  VARCHAR(100) NOT NULL,
    foreign_name VARCHAR(100),
    description  VARCHAR(255),
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE groups (
    id          BIGSERIAL PRIMARY KEY,
    group_name  VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE group_positions (
    id                        BIGSERIAL PRIMARY KEY,
    native_name               VARCHAR(100) NOT NULL,
    foreign_name              VARCHAR(100),
    description               TEXT,
    -- OT eligibility flags
    ot1                       BOOLEAN      NOT NULL DEFAULT FALSE,
    ot2                       BOOLEAN      NOT NULL DEFAULT FALSE,
    ot3                       BOOLEAN      NOT NULL DEFAULT FALSE,
    pay_for_ot1_food          BOOLEAN      NOT NULL DEFAULT FALSE,
    pay_for_ot2_food          BOOLEAN      NOT NULL DEFAULT FALSE,
    pay_for_ot3_food          BOOLEAN      NOT NULL DEFAULT FALSE,
    -- Day type flags
    pay_for_saturday          BOOLEAN      NOT NULL DEFAULT FALSE,
    pay_for_sunday            BOOLEAN      NOT NULL DEFAULT FALSE,
    pay_for_holiday           BOOLEAN      NOT NULL DEFAULT FALSE,
    -- Allowance flags
    shift_allowance           BOOLEAN      NOT NULL DEFAULT FALSE,
    never_absence             BOOLEAN      NOT NULL DEFAULT FALSE,
    allow_ot_half_hour        BOOLEAN      NOT NULL DEFAULT FALSE,
    -- Numeric allowances
    attendance_allowance      DECIMAL(10,2) NOT NULL DEFAULT 0,
    go_home_percent           DECIMAL(5,2)  NOT NULL DEFAULT 0,
    pregnant_day_allowed      INTEGER       NOT NULL DEFAULT 0,
    end_contract_percent      DECIMAL(5,2)  NOT NULL DEFAULT 0,
    pregnant_rate             DECIMAL(5,2)  NOT NULL DEFAULT 0,
    annual_leave_day_allowed  INTEGER       NOT NULL DEFAULT 0,
    created_at                TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at                TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE group_position_leave_increase (
    id                BIGSERIAL PRIMARY KEY,
    group_position_id BIGINT  NOT NULL REFERENCES group_positions(id) ON DELETE CASCADE,
    year              INTEGER NOT NULL,
    days              INTEGER NOT NULL DEFAULT 0,
    UNIQUE (group_position_id, year)
);

CREATE INDEX idx_gpli_group ON group_position_leave_increase(group_position_id);

CREATE TABLE seniority_bonus (
    id                BIGSERIAL PRIMARY KEY,
    group_position_id BIGINT         NOT NULL REFERENCES group_positions(id) ON DELETE CASCADE,
    year              INTEGER        NOT NULL,
    amount            DECIMAL(10,2)  NOT NULL DEFAULT 0,
    percent           DECIMAL(5,2)   NOT NULL DEFAULT 0,
    UNIQUE (group_position_id, year)
);

CREATE INDEX idx_sb_group ON seniority_bonus(group_position_id);

CREATE TABLE contract_types (
    id            BIGSERIAL PRIMARY KEY,
    contract_name VARCHAR(100) NOT NULL,
    auto_rule     VARCHAR(100),
    is_auto       BOOLEAN      NOT NULL DEFAULT FALSE,
    duration      INTEGER,   -- months
    warning       INTEGER,   -- days before expiry to warn
    created_at    TIMESTAMP  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- EMPLOYEE
-- ============================================================
CREATE TABLE employees (
    id                BIGSERIAL PRIMARY KEY,
    emp_card_no       VARCHAR(50)  UNIQUE NOT NULL,
    serial_card_no    VARCHAR(50),
    native_name       VARCHAR(100),
    foreign_name      VARCHAR(100),
    date_of_birth     DATE,
    nationality_id    BIGINT REFERENCES nationalities(id),
    sex               VARCHAR(1)   NOT NULL DEFAULT 'F',   -- M / F
    social_security   VARCHAR(50),
    election_card     VARCHAR(50),
    place_of_birth    VARCHAR(255),
    city_id           BIGINT REFERENCES cities(id),
    marital_status    VARCHAR(20),    -- Single, Married, Divorced, Widowed
    spouse_name       VARCHAR(100),
    children_count    INTEGER      NOT NULL DEFAULT 0,
    email             VARCHAR(100),
    current_address   TEXT,
    description       TEXT,
    tel               VARCHAR(20),
    driver_license    VARCHAR(50),
    health_check_up   BOOLEAN      NOT NULL DEFAULT FALSE,
    work_book         BOOLEAN      NOT NULL DEFAULT FALSE,
    finger_print      INTEGER      NOT NULL DEFAULT 0,
    family_list_num   VARCHAR(50),
    anl_old_used      INTEGER      NOT NULL DEFAULT 0,
    group_position_id BIGINT REFERENCES group_positions(id),
    group_id          BIGINT REFERENCES groups(id),
    position_id       BIGINT REFERENCES positions(id),
    date_joined       DATE,
    date_resigned     DATE,
    payment_type      VARCHAR(20)  NOT NULL DEFAULT 'Month',  -- Month / Day / Hour
    currency          VARCHAR(10)  NOT NULL DEFAULT '$',
    salary            DECIMAL(10,2),
    photo_path        VARCHAR(500),
    active            BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_employees_emp_card_no    ON employees(emp_card_no);
CREATE INDEX idx_employees_group_pos      ON employees(group_position_id);
CREATE INDEX idx_employees_position       ON employees(position_id);
CREATE INDEX idx_employees_active         ON employees(active);

CREATE TABLE employee_contracts (
    id               BIGSERIAL PRIMARY KEY,
    employee_id      BIGINT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    contract_type_id BIGINT REFERENCES contract_types(id),
    from_date        DATE,
    to_date          DATE,
    months           INTEGER,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_emp_contracts_employee ON employee_contracts(employee_id);

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE holidays (
    id           BIGSERIAL PRIMARY KEY,
    holiday_date DATE         NOT NULL,
    native_name  VARCHAR(100),
    foreign_name VARCHAR(100),
    description  VARCHAR(255),
    year         INTEGER      NOT NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_holidays_year ON holidays(year);
CREATE INDEX idx_holidays_date ON holidays(holiday_date);

CREATE TABLE company_settings (
    id                          BIGSERIAL PRIMARY KEY,
    company_name                VARCHAR(200),
    working_day_per_month       INTEGER      NOT NULL DEFAULT 26,
    working_hour_per_day        INTEGER      NOT NULL DEFAULT 8,
    check_attendance_type       INTEGER      NOT NULL DEFAULT 1,
    allow_check_before_payroll  INTEGER      NOT NULL DEFAULT 999,
    round_riel                  INTEGER      NOT NULL DEFAULT 0,
    attendance_allowance_type   VARCHAR(20)  NOT NULL DEFAULT 'Month',   -- Month / Day
    saturday_working            BOOLEAN      NOT NULL DEFAULT TRUE,
    saturday_hours              INTEGER      NOT NULL DEFAULT 8,
    set_holiday_by_group        BOOLEAN      NOT NULL DEFAULT FALSE,
    download_data_from          VARCHAR(20)  NOT NULL DEFAULT 'Machine', -- Machine / File
    cut_attendance              BOOLEAN      NOT NULL DEFAULT TRUE,
    cut_prim                    INTEGER      NOT NULL DEFAULT 0,
    work_under_14_days          INTEGER      NOT NULL DEFAULT 3,
    work_from_14_days_up        INTEGER      NOT NULL DEFAULT 6,
    created_at                  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TIME ATTENDANCE MODULE
-- ============================================================
CREATE TABLE shifts (
    id                           BIGSERIAL PRIMARY KEY,
    native_name                  VARCHAR(100) NOT NULL,
    foreign_name                 VARCHAR(100),
    authorization_before         INTEGER      NOT NULL DEFAULT 0,  -- minutes
    authorization_after          INTEGER      NOT NULL DEFAULT 0,  -- minutes
    shift_type                   VARCHAR(20)  NOT NULL DEFAULT 'IN_TWO', -- IN_ONCE / IN_TWO
    -- Work periods
    first_start                  TIME,
    first_end                    TIME,
    second_start                 TIME,
    second_end                   TIME,
    -- OT periods
    ot1_start                    TIME,
    ot1_end                      TIME,
    ot2_start                    TIME,
    ot2_end                      TIME,
    ot3_start                    TIME,
    ot3_end                      TIME,
    -- OT rates (%)
    ot1_rate                     DECIMAL(5,2)  NOT NULL DEFAULT 150,
    ot2_rate                     DECIMAL(5,2)  NOT NULL DEFAULT 150,
    ot3_rate                     DECIMAL(5,2)  NOT NULL DEFAULT 0,
    saturday_rate                DECIMAL(5,2)  NOT NULL DEFAULT 0,
    sunday_rate                  DECIMAL(5,2)  NOT NULL DEFAULT 200,
    holiday_rate                 DECIMAL(5,2)  NOT NULL DEFAULT 200,
    shift_bonus                  DECIMAL(5,2)  NOT NULL DEFAULT 0,
    -- Food allowances
    food_allowance_ot1           DECIMAL(10,2) NOT NULL DEFAULT 0,
    food_allowance_ot2_slot1     DECIMAL(10,2) NOT NULL DEFAULT 0,  -- 18:30-20:30
    food_allowance_ot2_slot2     DECIMAL(10,2) NOT NULL DEFAULT 0,  -- 20:30-22:00
    food_allowance_ot3           DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at                   TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at                   TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE controllers (
    id              BIGSERIAL PRIMARY KEY,
    controller_name VARCHAR(100) NOT NULL,
    created_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE machines (
    id            BIGSERIAL PRIMARY KEY,
    controller_id BIGINT       NOT NULL REFERENCES controllers(id) ON DELETE CASCADE,
    machine_name  VARCHAR(50),
    ip_address    VARCHAR(15),
    machine_type  VARCHAR(50),
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_machines_controller ON machines(controller_id);

CREATE TABLE attendance_raw (
    id            BIGSERIAL PRIMARY KEY,
    emp_card_no   VARCHAR(50)  NOT NULL,
    machine_id    BIGINT REFERENCES machines(id),
    scan_datetime TIMESTAMP    NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_att_raw_emp_card ON attendance_raw(emp_card_no);
CREATE INDEX idx_att_raw_datetime ON attendance_raw(scan_datetime);

CREATE TABLE attendance_daily (
    id             BIGSERIAL PRIMARY KEY,
    emp_card_no    VARCHAR(50) NOT NULL,
    scan_date      DATE        NOT NULL,
    t1             TIME,
    t2             TIME,
    t3             TIME,
    t4             TIME,
    t5             TIME,
    t6             TIME,
    t7             TIME,
    t8             TIME,
    working_hours  DECIMAL(5,2),
    work_day_type  VARCHAR(20),   -- Normal / Saturday / Sunday / Holiday
    leave_hours    DECIMAL(5,2),
    leave_type     VARCHAR(50),
    ot1            DECIMAL(5,2),
    ot2            DECIMAL(5,2),
    ot3            DECIMAL(5,2),
    created_at     TIMESTAMP   NOT NULL DEFAULT NOW(),
    UNIQUE (emp_card_no, scan_date)
);

CREATE INDEX idx_att_daily_emp    ON attendance_daily(emp_card_no);
CREATE INDEX idx_att_daily_date   ON attendance_daily(scan_date);

CREATE TABLE leave_permissions (
    id              BIGSERIAL PRIMARY KEY,
    emp_card_no     VARCHAR(50) NOT NULL,
    permission_type VARCHAR(50) NOT NULL,   -- Annual Leave, Sick Leave, Unpaid, etc.
    from_date       DATE        NOT NULL,
    to_date         DATE        NOT NULL,
    description     TEXT,
    leave_hours     DECIMAL(5,2),
    created_at      TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leave_perm_emp  ON leave_permissions(emp_card_no);
CREATE INDEX idx_leave_perm_date ON leave_permissions(from_date, to_date);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Default admin user (password: Admin@123 — BCrypt)
INSERT INTO users (username, password, full_name, role, language)
VALUES ('admin', '$2a$12$ZtpWTEifDNp9du9qcwWk0ewBbyAxAdlvnlstA7qYQFheMB8vDoHXa', 'System Administrator', 'ADMIN', 'en');

-- Default company settings
INSERT INTO company_settings (company_name, working_day_per_month, working_hour_per_day)
VALUES ('The Garment Factory', 26, 8);

-- Sample nationalities
INSERT INTO nationalities (native_name, foreign_name) VALUES ('ភ្នំពេញ', 'Cambodian');
INSERT INTO nationalities (native_name, foreign_name) VALUES ('ចិន', 'Chinese');
INSERT INTO nationalities (native_name, foreign_name) VALUES ('Korean', ' កូរ៉េ');
INSERT INTO nationalities (native_name, foreign_name) VALUES ('Japanes', 'ជប៉ុន');
INSERT INTO nationalities (native_name, foreign_name) VALUES ('Malaysia', 'ម៉ាលេស្យូ');

-- Sample cities
INSERT INTO cities (native_name, foreign_name) VALUES ('រាជធានីភ្នំពេញ', 'Phnom Penh');
INSERT INTO cities (native_name, foreign_name) VALUES ('ខេត្តកណ្តាល', 'Kandal');
INSERT INTO cities (native_name, foreign_name) VALUES ('ខេត្តតាកែវ', 'Takeo');

-- Sample groups
INSERT INTO groups (group_name) VALUES ('CH');

-- Sample contract types
INSERT INTO contract_types (contract_name, is_auto, duration, warning) VALUES ('3 Month Contract', FALSE, 3, 30);
INSERT INTO contract_types (contract_name, is_auto, duration, warning) VALUES ('6 Month Contract', FALSE, 6, 30);
INSERT INTO contract_types (contract_name, is_auto, duration, warning) VALUES ('1 Year Contract', FALSE, 12, 60);
INSERT INTO contract_types (contract_name, is_auto, duration, warning) VALUES ('Unlimited Duration', FALSE, NULL, NULL);

-- Default controller
INSERT INTO controllers (controller_name) VALUES ('K300');
