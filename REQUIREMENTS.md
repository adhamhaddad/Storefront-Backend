## API Endpoints
- users [get]
- products [get]
- orders [get]
- order-products [get]

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