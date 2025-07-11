# BlogApp - Full Stack MERN Application

A complete blog application built with MongoDB, Express.js, React, and Node.js.

## Features

- ✅ Create, Read, Update, Delete blog posts
- ✅ Responsive design with custom CSS
- ✅ MongoDB Atlas database integration
- ✅ Real-time data synchronization
- ✅ Image support for blog posts
- ✅ Category-based blog organization

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios for API calls
- Material-UI components
- Custom CSS styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- RESTful API design

## Installation & Setup

### Backend Setup
```bash
cd Backend
npm install
node index.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /get` - Fetch all blogs
- `POST /add` - Create new blog
- `PUT /update/:id` - Update blog by ID
- `DELETE /delete/:id` - Delete blog by ID

## Database Schema

```javascript
{
  title: String (required),
  content: String (required),
  img_url: String (required),
  timestamps: true
}
```

## Environment

- Backend runs on auto-detected available port (starting from 3001)
- Frontend runs on http://localhost:5173
- Database: MongoDB Atlas

## Usage

1. Start the backend server
2. Start the frontend development server
3. Navigate to http://localhost:5173
4. Create, view, edit, and delete blog posts

## Contributing

Feel free to fork this project and submit pull requests for any improvements.