# Netflix Clone

A full-stack Netflix clone with React, Tailwind CSS, Express, and MongoDB.

## Features

- **User Authentication**: Register, login, and secure routes
- **Content Browsing**: Browse movies and TV shows by category
- **User Profiles**: Personalized user experience
- **My List**: Add/remove content to your personal list
- **Watch History**: Keep track of what you've watched
- **Responsive Design**: Works on mobile, tablet, and desktop

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- RESTful API

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- Bun (optional but recommended)
- MongoDB (local or Atlas)

### Frontend Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd netflix-clone
   ```

2. Install dependencies
   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. The frontend should now be running on `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory
   ```bash
   cd netflix-clone/server
   ```

2. Install dependencies
   ```bash
   bun install
   # or
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/netflix-clone
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Seed the database with sample data (optional)
   ```bash
   bun run seed
   # or
   node utils/seedDb.js -i
   ```

5. Start the server
   ```bash
   bun run dev
   # or
   npm run dev
   ```

6. The backend should now be running on `http://localhost:5000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user

### Content Endpoints
- `GET /api/content` - Get all content (with filtering/pagination)
- `GET /api/content/trending` - Get trending content
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/category/:categoryId` - Get content by category

### User Endpoints
- `GET /api/user/my-list` - Get user's My List
- `POST /api/user/my-list/:contentId` - Add content to My List
- `DELETE /api/user/my-list/:contentId` - Remove content from My List
- `GET /api/user/watch-history` - Get user's watch history
- `POST /api/user/watch-history/:contentId` - Update watch history
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/update-password` - Update password

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
