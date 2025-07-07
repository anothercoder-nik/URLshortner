# URL Shortener

A modern, full-stack URL shortening service built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- ✂️ Shorten long URLs with a single click
- 🔗 Create custom short URLs (for registered users)
- 📊 Track click statistics for your shortened links
- 👤 User authentication system
- 📱 Responsive design for desktop and mobile devices
- 🔒 Secure API with JWT authentication

## Tech Stack

### Frontend
- React 19
- Redux Toolkit for state management
- TanStack Router for routing
- TanStack Query for data fetching
- Tailwind CSS for styling
- Vite for fast development and building

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/anothercoder-nik/URLshortner.git
cd URLshortner
```

2. Install backend dependencies
```bash
cd Backend
npm install
```

3. Set up environment variables
Create a `.env` file in the Backend directory with the following variables:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:3000/
```

4. Install frontend dependencies
```bash
cd ../Frontend
npm install
```

5. Start the development servers

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## Usage

### Shortening a URL
1. Enter a long URL in the input field
2. Click "Shorten URL"
3. Copy the shortened URL to share

### Creating a Custom URL (Registered Users)
1. Log in to your account
2. Enter a long URL in the input field
3. Enter your desired custom slug
4. Click "Shorten URL"

### Viewing Statistics
1. Log in to your account
2. View your dashboard to see all your shortened URLs and their click counts

## API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | /api/create | Create a new short URL | Optional |
| GET | /:id | Redirect to the original URL | None |
| POST | /api/auth/register | Register a new user | None |
| POST | /api/auth/login | Log in a user | None |
| POST | /api/user/urls | Get all URLs for a user | Required |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Nanoid](https://github.com/ai/nanoid) for generating unique IDs
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [React](https://reactjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the backend framework
