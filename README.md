# Fashion E-Commerce

A full-stack Fashion E-Commerce web application developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application allows users to register, log in, browse products, add products to the cart, place orders, and manage their shopping experience.

## Features

### User Authentication
- User Registration
- User Login
- Password Encryption using bcrypt
- JWT Authentication

### Product Management
- Add Product
- View All Products
- View Product Details
- Delete Product


### Cart Management
- Add to Cart
- View Cart
- Remove from Cart
- Update Product Quantity

### Order Management
- Place Order
- View Orders
- Cancel Order


## Technologies Used

### Frontend
- React.js
- React Router
- CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- cors

## Project Structure

```
Fashion-Ecommerce/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/vamsinallagorla/Fashion-Ecommerce-
```

### Backend Setup

```bash
cd backend
npm install
```


Start the backend server.

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`



## Team Members

### Nallagorla Vamsi
- Backend Development
- MongoDB Integration
- Authentication
- Product APIs
- Cart APIs
- Order APIs

### Shaik Sharief
- Frontend Development
- React Components
- User Interface
- API Integration
- Styling



## License

This project is developed for learning and educational purposes.