-- liquibase formatted sql

-- changeset tg:002-hr-master

CREATE TABLE nationalities (
    id BIGSERIAL PRIMARY KEY,
    native_name VARCHAR(100) NOT NULL,
    foreign_name VARCHAR(100),
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE cities (
    id BIGSERIAL PRIMARY KEY,
    native_name VARCHAR(100) NOT NULL,
    foreign_name VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE positions (
    id BIGSERIAL PRIMARY KEY,
    native_name VARCHAR(100) NOT NULL,
    foreign_name VARCHAR(100),
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE groups (
    id BIGSERIAL PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE group_positions (
    id BIGSERIAL PRIMARY KEY,
    native_name VARCHAR(100) NOT NULL,
    foreign_name VARCHAR(100),
    description TEXT,
    ot1 BOOLEAN NOT NULL DEFAULT FALSE,
    ot2 BOOLEAN NOT NULL DEFAULT FALSE,
    ot3 BOOLEAN NOT NULL DEFAULT FALSE,
    pay_for_ot1_food BOOLEAN NOT NULL DEFAULT FALSE,
    pay_for_ot2_food BOOLEAN NOT NULL DEFAULT FALSE,
    pay_for_ot3_food BOOLEAN NOT NULL DEFAULT FALSE,
    pay_for_saturday BOOLEAN NOT NULL DEFAULT FALSE,
    pay_for_sunday BOOLEAN NOT NULL DEFAULT FALSE,
    pay_for_holiday BOOLEAN NOT NULL DEFAULT FALSE,
    shift_allowance BOOLEAN NOT NULL DEFAULT FALSE,
    never_absence BOOLEAN NOT NULL DEFAULT FALSE,
    allow_ot_half_hour BOOLEAN NOT NULL DEFAULT FALSE,
    attendance_allowance DECIMAL(10, 2) NOT NULL DEFAULT 0,
    go_home_percent DECIMAL(5, 2) NOT NULL DEFAULT 0,
    pregnant_day_allowed INTEGER NOT NULL DEFAULT 0,
    end_contract_percent DECIMAL(5, 2) NOT NULL DEFAULT 0,
    pregnant_rate DECIMAL(5, 2) NOT NULL DEFAULT 0,
    annual_leave_day_allowed INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE group_position_leave_increase (
    id BIGSERIAL PRIMARY KEY,
    group_position_id BIGINT NOT NULL REFERENCES group_positions (id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    days INTEGER NOT NULL DEFAULT 0,
    UNIQUE (group_position_id, year)
);

CREATE INDEX idx_gpli_group ON group_position_leave_increase (group_position_id);

CREATE TABLE seniority_bonus (
    id BIGSERIAL PRIMARY KEY,
    group_position_id BIGINT NOT NULL REFERENCES group_positions (id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    percent DECIMAL(5, 2) NOT NULL DEFAULT 0,
    UNIQUE (group_position_id, year)
);

CREATE INDEX idx_sb_group ON seniority_bonus (group_position_id);

CREATE TABLE contract_types (
    id BIGSERIAL PRIMARY KEY,
    contract_name VARCHAR(100) NOT NULL,
    months INTEGER,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
