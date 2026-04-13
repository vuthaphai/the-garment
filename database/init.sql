-- Create the application database during first-time Postgres initialization.
-- Liquibase will create tables and seed data after tg-data-adapter starts.
SELECT 'CREATE DATABASE "dbTheGarment_dev"'
WHERE NOT EXISTS (
    SELECT 1
    FROM pg_database
    WHERE datname = 'dbTheGarment_dev'
)\gexec

GRANT ALL PRIVILEGES ON DATABASE "dbTheGarment_dev" TO postgres;