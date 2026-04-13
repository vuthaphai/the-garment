-- liquibase formatted sql

-- changeset tg:004-settings

CREATE TABLE holidays (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    holiday_date DATE NOT NULL,
    year INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_holidays_year ON holidays (year);

CREATE INDEX idx_holidays_date ON holidays (holiday_date);

CREATE TABLE company_settings (
    id BIGSERIAL PRIMARY KEY,
    company_name VARCHAR(200),
    address TEXT,
    tel VARCHAR(50),
    fax VARCHAR(50),
    email VARCHAR(100),
    logo_path VARCHAR(500),
    work_days_per_week INTEGER NOT NULL DEFAULT 6,
    hours_per_day INTEGER NOT NULL DEFAULT 8,
    fiscal_year_start DATE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shifts (
    id BIGSERIAL PRIMARY KEY,
    shift_name VARCHAR(100) NOT NULL,
    working_minutes INTEGER NOT NULL DEFAULT 480,
    time_in TIME,
    time_out TIME,
    break_time_in TIME,
    break_time_out TIME,
    ot1_start TIME,
    ot1_end TIME,
    ot2_start TIME,
    ot2_end TIME,
    ot3_start TIME,
    ot3_end TIME,
    food_ot1 DECIMAL(10, 2) NOT NULL DEFAULT 0,
    food_ot2 DECIMAL(10, 2) NOT NULL DEFAULT 0,
    food_ot3 DECIMAL(10, 2) NOT NULL DEFAULT 0,
    late_grace INTEGER NOT NULL DEFAULT 0,
    early_grace INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE controllers (
    id BIGSERIAL PRIMARY KEY,
    controller_name VARCHAR(100) NOT NULL,
    ip_address VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE machines (
    id BIGSERIAL PRIMARY KEY,
    controller_id BIGINT NOT NULL REFERENCES controllers (id) ON DELETE CASCADE,
    machine_name VARCHAR(100),
    ip_address VARCHAR(20),
    machine_type VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_machines_controller ON machines (controller_id);
