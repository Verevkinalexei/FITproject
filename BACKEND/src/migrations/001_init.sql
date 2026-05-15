-- src/migrations/001_init.sql
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Equipment (
    id INTEGER PRIMARY KEY,
    itemCode TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS CheckoutRequests (
    id INTEGER PRIMARY KEY,
    userId INTEGER NOT NULL,
    equipmentId INTEGER NOT NULL,
    dateFrom TEXT NOT NULL,
    dateTo TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('New', 'Approved', 'Returned', 'Rejected')),
    comment TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (equipmentId) REFERENCES Equipment(id) ON DELETE RESTRICT
);