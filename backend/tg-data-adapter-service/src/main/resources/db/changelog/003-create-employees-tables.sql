-- liquibase formatted sql

-- changeset tg:003-employees

CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    emp_card_no VARCHAR(50) UNIQUE NOT NULL,
    serial_card_no VARCHAR(50),
    native_name VARCHAR(100),
    foreign_name VARCHAR(100),
    date_of_birth DATE,
    nationality_id BIGINT REFERENCES nationalities (id),
    sex VARCHAR(1) NOT NULL DEFAULT 'F',
    social_security VARCHAR(50),
    election_card VARCHAR(50),
    place_of_birth VARCHAR(255),
    city_id BIGINT REFERENCES cities (id),
    marital_status VARCHAR(20),
    spouse_name VARCHAR(100),
    children_count INTEGER NOT NULL DEFAULT 0,
    email VARCHAR(100),
    current_address TEXT,
    description TEXT,
    tel VARCHAR(20),
    driver_license VARCHAR(50),
    health_check_up BOOLEAN NOT NULL DEFAULT FALSE,
    work_book BOOLEAN NOT NULL DEFAULT FALSE,
    finger_print INTEGER NOT NULL DEFAULT 0,
    family_list_num VARCHAR(50),
    anl_old_used INTEGER NOT NULL DEFAULT 0,
    group_position_id BIGINT REFERENCES group_positions (id),
    group_id BIGINT REFERENCES groups (id),
    position_id BIGINT REFERENCES positions (id),
    date_joined DATE,
    date_resigned DATE,
    payment_type VARCHAR(20) NOT NULL DEFAULT 'Month',
    currency VARCHAR(10) NOT NULL DEFAULT '$',
    salary DECIMAL(10, 2),
    photo_path VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_employees_emp_card_no ON employees (emp_card_no);

CREATE INDEX idx_employees_group_pos ON employees (group_position_id);

CREATE INDEX idx_employees_active ON employees (active);

CREATE TABLE employee_contracts (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL REFERENCES employees (id) ON DELETE CASCADE,
    contract_type_id BIGINT REFERENCES contract_types (id),
    from_date DATE,
    to_date DATE,
    months INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_emp_contracts_employee ON employee_contracts (employee_id);
