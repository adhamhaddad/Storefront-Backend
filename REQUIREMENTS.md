## API Endpoints
- users
- products
- orders
- order-products

- URL

<http://localhost:3000/users>
<http://localhost:3000/products>
<http://localhost:3000/orders>
<http://localhost:3000/order-products>

- Method:
`GET` | `POST` | `PATCH` | `DELETE`

- URL Params
<http://localhost:3000/users/1>
<http://localhost:3000/products/1>
<http://localhost:3000/orders/1>
<http://localhost:3000/order-products/1/products>

#### Users
- createUser [token required]
- getAllUsers [token required]
- getUser [token required]
- updateUser [token required]
- deleteUser [token required]
#### Products
- createProduct [token required]
- getAllProducts
- getProduct
- updateProduct [token required]
- deleteProduct [token required]
#### Orders
- Current Order by user (args: user id)[token required]

## Data Shapes
#### User
- id
- firstname
- lastname
- username
- password
#### Product
- id
- name
- price
#### Orders
- id
- status
- user_id
#### Order_Products
- id
- quantity
- product_id
- order_id

#### Users Schema
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);
```

#### Products Schema
```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);
```

#### Order Schema
```
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    user_id BIGINT REFERENCES users(id)
);
```

#### Order-Products Schema
```
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id)
);
```