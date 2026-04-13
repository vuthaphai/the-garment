-- liquibase formatted sql

-- changeset tg:006-seed-data

-- Default admin user (password: Admin@123 — BCrypt)
INSERT INTO
    users (
        username,
        password,
        full_name,
        role,
        language,
        active,
        enabled
    )
VALUES (
        'admin',
        '$2a$12$ZtpWTEifDNp9du9qcwWk0ewBbyAxAdlvnlstA7qYQFheMB8vDoHXa',
        'System Administrator',
        'ADMIN',
        'en',
        TRUE,
        TRUE
    );

-- Default company settings
INSERT INTO
    company_settings (
        company_name,
        work_days_per_week,
        hours_per_day
    )
VALUES ('The Garment Factory', 6, 8);

-- Sample nationalities
INSERT INTO
    nationalities (native_name, foreign_name)
VALUES ('ខ្មែរ', 'Cambodian');

INSERT INTO
    nationalities (native_name, foreign_name)
VALUES ('ចិន', 'Chinese');

INSERT INTO
    nationalities (native_name, foreign_name)
VALUES ('Korean', 'កូរ៉េ');

INSERT INTO
    nationalities (native_name, foreign_name)
VALUES ('Japanese', 'ជប៉ុន');

-- Sample cities
INSERT INTO
    cities (native_name, foreign_name)
VALUES (
        'រាជធានីភ្នំពេញ',
        'Phnom Penh'
    );

INSERT INTO
    cities (native_name, foreign_name)
VALUES ('ខេត្តកណ្តាល', 'Kandal');

INSERT INTO
    cities (native_name, foreign_name)
VALUES ('ខេត្តតាកែវ', 'Takeo');

-- Sample groups
INSERT INTO groups (group_name) VALUES ('CH');

-- Sample contract types
INSERT INTO
    contract_types (contract_name, months)
VALUES ('3 Month Contract', 3);

INSERT INTO
    contract_types (contract_name, months)
VALUES ('6 Month Contract', 6);

INSERT INTO
    contract_types (contract_name, months)
VALUES ('1 Year Contract', 12);

INSERT INTO
    contract_types (contract_name)
VALUES ('Unlimited Duration');

-- Default controller
INSERT INTO
    controllers (controller_name, ip_address)
VALUES ('K300', '192.168.1.100');
