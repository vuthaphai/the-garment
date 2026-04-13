-- liquibase formatted sql

-- changeset tg:005-attendance

CREATE TABLE attendance_raw (
    id BIGSERIAL PRIMARY KEY,
    emp_card_no VARCHAR(50) NOT NULL,
    machine_id BIGINT REFERENCES machines (id),
    scan_datetime TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_att_raw_emp_card ON attendance_raw (emp_card_no);

CREATE INDEX idx_att_raw_datetime ON attendance_raw (scan_datetime);

CREATE TABLE attendance_daily (
    id BIGSERIAL PRIMARY KEY,
    emp_card_no VARCHAR(50) NOT NULL,
    attendance_date DATE NOT NULL,
    time_in TIME,
    time_out TIME,
    working_minutes INTEGER NOT NULL DEFAULT 0,
    late_minutes INTEGER NOT NULL DEFAULT 0,
    early_minutes INTEGER NOT NULL DEFAULT 0,
    ot1_minutes INTEGER NOT NULL DEFAULT 0,
    ot2_minutes INTEGER NOT NULL DEFAULT 0,
    ot3_minutes INTEGER NOT NULL DEFAULT 0,
    absent BOOLEAN NOT NULL DEFAULT FALSE,
    leave BOOLEAN NOT NULL DEFAULT FALSE,
    holiday BOOLEAN NOT NULL DEFAULT FALSE,
    weekend BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (emp_card_no, attendance_date)
);

CREATE INDEX idx_att_daily_emp ON attendance_daily (emp_card_no);

CREATE INDEX idx_att_daily_date ON attendance_daily (attendance_date);

CREATE TABLE leave_permissions (
    id BIGSERIAL PRIMARY KEY,
    emp_card_no VARCHAR(50) NOT NULL,
    leave_date DATE NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    minutes INTEGER NOT NULL DEFAULT 0,
    reason TEXT,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leave_perm_emp ON leave_permissions (emp_card_no);

CREATE INDEX idx_leave_perm_date ON leave_permissions (leave_date);
