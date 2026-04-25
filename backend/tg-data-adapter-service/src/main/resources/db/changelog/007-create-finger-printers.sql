-- liquibase formatted sql

-- changeset tg:007-finger-printers

CREATE TABLE finger_printers (
    id BIGSERIAL PRIMARY KEY,
    finger_print_name VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    port INTEGER NOT NULL DEFAULT 4370,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_finger_printers_ip ON finger_printers (ip_address);