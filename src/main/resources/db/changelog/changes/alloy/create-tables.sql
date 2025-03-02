-- liquibase formatted sql

-- changeset rewedigital:1

CREATE TABLE persons
(
    id         UUID                        NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    version    BIGINT,
    first_name VARCHAR(255)                NOT NULL,
    last_name  VARCHAR(255)                NOT NULL,
    email      VARCHAR(255)                NOT NULL,
    CONSTRAINT pk_persons PRIMARY KEY (id)
);

CREATE TABLE transactions
(
    id         UUID                        NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    version    BIGINT,
    currency   VARCHAR(255)                NOT NULL,
    amount     DECIMAL                     NOT NULL,
    type       VARCHAR(255)                NOT NULL,
    wallet_id  UUID                        NOT NULL,
    CONSTRAINT pk_transactions PRIMARY KEY (id)
);

CREATE TABLE wallets
(
    id         UUID                        NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    version    BIGINT,
    name       VARCHAR(255)                NOT NULL,
    balance    DECIMAL                     NOT NULL,
    currency   VARCHAR(255)                NOT NULL,
    person_id  UUID                        NOT NULL,
    CONSTRAINT pk_wallets PRIMARY KEY (id)
);

ALTER TABLE persons
    ADD CONSTRAINT uc_persons_email UNIQUE (email);

ALTER TABLE transactions
    ADD CONSTRAINT FK_TRANSACTIONS_ON_WALLET FOREIGN KEY (wallet_id) REFERENCES wallets (id);

ALTER TABLE wallets
    ADD CONSTRAINT FK_WALLETS_ON_PERSON FOREIGN KEY (person_id) REFERENCES persons (id);

CREATE INDEX idx_wallets_person_id ON wallets (person_id);