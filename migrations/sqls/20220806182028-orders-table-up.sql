CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100),
    quantity INTEGER,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    status VARCHAR(50)
);