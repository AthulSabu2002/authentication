# Authentication System

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring both traditional email/password authentication and OAuth integration.

## 🚀 Features

### Current Features
- User registration and login with email/password
- Secure password hashing using bcrypt
- MongoDB for user data storage
- Modern React frontend with Tailwind CSS
- Form validation and error handling
- Protected routes and authorized API endpoints
- OAuth 2.0 integration (Google)
- Password reset functionality
- Email verification
- Session management

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- Cors for cross-origin resource sharing

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/AthulSabu2002/authentication.git
cd auth-system
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In backend directory, create a .env file
MONGODB_URI=your_mongodb_connection_string
PORT=3000

# In frontend directory, create a .env file
REACT_APP_API_URL=http://localhost:5173
```

4. Start the development servers
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

## 🔧 Configuration

### Database Configuration
The application uses MongoDB as its database. Make sure to:
1. Create a MongoDB database (local or Atlas)
2. Update the MONGODB_URI in your .env file
3. Ensure your IP address is whitelisted if using MongoDB Atlas

## 📁 Project Structure
```
auth-system/
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
└── README.md
```

## 🔒 API Endpoints

### Authentication Routes
```
POST /api/users/signup - Register a new user
POST /api/users/login - Login user
POST /api/users/logout - Logout user
GET /api/users/dashboard - Get user profile (protected)
GET /api/users/google - Google OAuth
```

## 🔐 Security Features

- Password hashing using bcrypt
- JWT for secure authentication
- Protected API endpoints
- Input validation and sanitization
- CORS configuration
- HTTP-only cookies
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author

Your Name
- GitHub: [@AthulSabu2002](https://github.com/AthulSabu2002)

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
