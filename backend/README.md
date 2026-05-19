🛒 Mini E‑Commerce Backend
This backend powers the God Particles technical assessment mini e‑commerce app. It includes:

User authentication (JWT, bcrypt)

Admin authentication + product management

Cart + checkout flow

Razorpay test integration for mock payments

🚀 Tech Stack
Node.js + Express.js

MongoDB (Mongoose ODM)

JWT for authentication

Razorpay SDK (test mode)

⚙️ Setup Instructions

1. Clone & Install
   bash
   git clone https://github.com/your-repo-url.git
   cd your-repo-folder
   npm install
2. Environment Variables
   Create a .env file in the root:

Code
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_here

RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
🔑 Razorpay test keys can be generated from Razorpay Dashboard.

3. Run Server
   bash
   npm start
   Server runs at:
   http://localhost:5000

📦 API Endpoints
🔹 Auth
POST /api/user/auth/register → Register user

POST /api/user/auth/login → Login user

POST /api/admin/auth/register → Register admin

POST /api/admin/auth/login → Login admin

🔹 Products (Admin only)
GET /api/admin/products → List products

POST /api/admin/products → Create product

PUT /api/admin/products/:id → Update product

DELETE /api/admin/products/:id → Delete product

🔹 Cart (User only)
POST /api/user/cart/add → Add product to cart

PUT /api/user/cart/update → Update quantity

DELETE /api/user/cart/remove → Remove product

GET /api/user/cart → Get user cart

🔹 Checkout (User only)
POST /api/user/checkout → Create Razorpay order + DB order

POST /api/user/checkout/verify → Verify payment signature

💳 Razorpay Test Flow
User adds items to cart.

Calls POST /api/user/checkout → backend creates Razorpay order.

Frontend opens Razorpay checkout widget with returned orderId.

On success, Razorpay returns razorpay_payment_id + razorpay_signature.

Frontend calls POST /api/user/checkout/verify → backend verifies signature and marks order as paid.

✅ Notes
Use Razorpay test mode only.

Orders default to pending until payment verification.

Cart clears after checkout.

Uploaded images served via /uploads.
