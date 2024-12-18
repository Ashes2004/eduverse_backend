# Eduverse Backend

Welcome to the backend repository for **Eduverse**, the AI-powered educational platform. This backend provides APIs and functionalities to support the platform's features such as AI-powered tools, user management, and data storage.

## Features

- **User Management**: Handles authentication, user roles, and permissions.
- **AI-Powered Tools**: Integrates AI capabilities via the Gemini API.
- **Database Integration**: Manages and stores data using MongoDB.
- **RESTful API**: Ensures seamless communication with the frontend.

## Getting Started

Follow these steps to set up and run the backend server locally.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashes2004/eduverse_backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd eduverse_backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3001
   MONGO_URI='mongodb://localhost:27017/eduverse'
   GEMINI_API_KEY=''
   ```

5. Start the development server:
   ```bash
   npm start
   ```
   The server will start at [http://localhost:3001](http://localhost:3001).

### Environment Variables

The following environment variables are required for the backend:

- `PORT`: The port on which the backend server runs.
- `MONGO_URI`: MongoDB connection string.
- `GEMINI_API_KEY`: API key for integrating AI capabilities.

## Scripts

### `npm start`
Runs the server in production mode.

### `npm run dev`
Runs the server in development mode with live reload enabled.

### `npm test`
Runs the test suite to ensure functionality.

## API Documentation

Detailed API documentation can be found in the `docs` directory or accessed via the API endpoint `/api-docs` when the server is running.

## Deployment

To deploy the backend, ensure the environment variables are set appropriately in the production environment. Use process managers like PM2 or Docker for better stability and scalability.

## Learn More

- [Node.js Documentation](https://nodejs.org/en/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Express.js Documentation](https://expressjs.com/)

---

Thank you for exploring the Eduverse backend! Let us know if you encounter any issues or have suggestions for improvement.
