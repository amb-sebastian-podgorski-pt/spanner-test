-- liquibase formatted sql

-- changeset rewedigital:1

CREATE TABLE persons
(
    id         STRING(36)  NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version    INT64,
    first_name STRING(50)  NOT NULL,
    last_name  STRING(50)  NOT NULL,
    email      STRING(100) NOT NULL
) PRIMARY KEY (id);

CREATE TABLE wallets
(
    id         STRING(36) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version    INT64,
    name       STRING(36) NOT NULL,
    balance    NUMERIC    NOT NULL,
    currency   STRING(36) NOT NULL,
    person_id  STRING(36) NOT NULL
) PRIMARY KEY (id);

CREATE TABLE transactions
(
    id         STRING(36) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version    INT64,
    amount     NUMERIC    NOT NULL,
    currency   STRING(36) NOT NULL,
    person_id  STRING(36) NOT NULL,
    wallet_id  STRING(36) NOT NULL
) PRIMARY KEY (id);

CREATE UNIQUE INDEX uc_persons_email ON persons (email);
ALTER TABLE wallets ADD FOREIGN KEY (person_id) REFERENCES persons (id);
CREATE INDEX idx_wallets_person_id ON wallets (person_id);

ALTER TABLE transactions ADD FOREIGN KEY (person_id) REFERENCES persons (id);
ALTER TABLE transactions ADD FOREIGN KEY (wallet_id) REFERENCES wallets (id);