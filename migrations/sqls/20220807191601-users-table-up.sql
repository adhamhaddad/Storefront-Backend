CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    username VARCHAR(255) UNIQUE,
    password VARCHAR
);