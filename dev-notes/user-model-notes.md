User Models
-users
-shopping cart
-shopping cart item
-past orders

Users
  first
  last
  email *** must be unique
  password
  isAdmin
  address
  phone number
  payment info
  shopping cart [{shopping cart id ref}]
  past orders: [order ref]

Shopping Cart
id
  user or session id
  shopping cart [{shopping cart item ref}]

Shopping Cart Items
  { product ID
  price: get from ref? populate?
  quantity }
***virtual that gets product id and the input quantity, adds it to the shopping cart array?

Past Orders *** must belong to a user OR guest session (authenticated vs unauthenticated)
  order id
  user or session id
  order items [{order item ref}]
  date
  status: shipped? not shipped?
***virtual or method?: change product's stockAmt here
***virtual: total amount?

Order Items
  { product ID
  price - save from item model when created
  quantity }
***virtual that gets product id and the input quantity, adds it to the shopping cart array?
