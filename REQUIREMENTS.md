## API Endpoints
#### Products
- Index
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create [token required]

#### Orders
- Current Order by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- username
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)