# Backend Implementation Guide

## Overview
The project now has a full-featured backend with MongoDB integration, Express.js API, and frontend API client.

## Setup Completed

### 1. **MongoDB Database**
- Connected to: `mongodb+srv://razafimahefaphilibert7_db_user:N7LxKYpa3IRMex9B@cluster0.t3imw8n.mongodb.net/one-minute-for-tomorrow`
- Database: `one-minute-for-tomorrow`
- Mongoose is handling schema validation and data modeling

### 2. **Dependencies Installed**
```
- express: ^4.18.2 - Web framework
- mongoose: ^7.5.0 - MongoDB ODM
- dotenv: ^16.3.1 - Environment variables
- cors: ^2.8.5 - Cross-Origin Resource Sharing
- body-parser: ^1.20.2 - Request body parsing
```

### 3. **File Structure**
```
project-root/
├── server.js                 # Main Express server with MongoDB
├── .env                      # Environment variables (MongoDB URI)
├── config/
│   ├── models.js            # Mongoose Wish schema and model
│   └── api-routes.js        # REST API endpoints
└── src/
    └── js/
        ├── api.js           # Frontend API client
        └── app.js           # Existing app utilities
```

## API Endpoints

### Base URL: `http://localhost:3000/api`

### 1. **Health Check**
- **GET** `/health`
- Returns server and database status
```json
{
  "status": "ok",
  "message": "Server is running",
  "mongodb": "connected"
}
```

### 2. **Get All Wishes**
- **GET** `/wishes?isPublic=true&limit=50&skip=0`
- Query Parameters:
  - `isPublic` (optional): Filter by public/private status
  - `limit` (optional): Number of results (default: 50)
  - `skip` (optional): Pagination offset (default: 0)
- Response:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 50,
    "skip": 0
  }
}
```

### 3. **Get Single Wish**
- **GET** `/wishes/:id`
- Returns a specific wish by MongoDB _id

### 4. **Create New Wish** ⭐
- **POST** `/wishes`
- Required Body:
```json
{
  "text": "Your wish text (max 200 chars)",
  "isPublic": false,
  "userId": null
}
```
- Response includes the created wish with MongoDB _id

### 5. **Update Wish**
- **PUT** `/wishes/:id`
- Body (partial update):
```json
{
  "text": "Updated text",
  "isPublic": true
}
```

### 6. **Delete Wish**
- **DELETE** `/wishes/:id`
- Returns the deleted wish

### 7. **Get Statistics**
- **GET** `/stats`
- Returns count of total, public, and private wishes
```json
{
  "success": true,
  "data": {
    "total": 100,
    "public": 45,
    "private": 55
  }
}
```

## Frontend API Usage

The `src/js/api.js` file provides a `WishAPI` class for easy API communication:

```javascript
// Create a wish
await wishAPI.createWish('My wish text', false, null);

// Get all wishes
await wishAPI.getWishes(true, 50, 0);

// Get single wish
await wishAPI.getWish('wishId');

// Update wish
await wishAPI.updateWish('wishId', 'Updated text', true);

// Delete wish
await wishAPI.deleteWish('wishId');

// Get stats
await wishAPI.getStats();

// Check health
await wishAPI.healthCheck();
```

## Database Schema

### Wish Model
```javascript
{
  _id: ObjectId,              // MongoDB ID
  text: String,               // Required, max 200 chars
  isPublic: Boolean,          // Default: false
  createdAt: Date,            // Auto-set to current time
  updatedAt: Date,            // Auto-updated on save
  userId: String,             // Optional, for future authentication
  tags: [String],             // Optional, for categorization
  likes: Number               // Default: 0
}
```

## Environment Variables

The `.env` file contains:
```
MONGODB_URI=mongodb+srv://razafimahefaphilibert7_db_user:N7LxKYpa3IRMex9B@cluster0.t3imw8n.mongodb.net/one-minute-for-tomorrow
NODE_ENV=development
PORT=3000
HOST=localhost
```

## How Data Flows

1. **User writes wish** → Writing page
2. **Clicks "Done"** → `submitWish()` calls `wishAPI.createWish()`
3. **API request sent** → POST `/api/wishes`
4. **Server validates** → Mongoose schema validation
5. **MongoDB saves** → Document stored in database
6. **Response returned** → Wish with `_id` sent back
7. **Navigate to visibility** → User chooses to make public/private
8. **Update wish** → PUT `/api/wishes/{id}` with `isPublic` flag
9. **Store in DB** → Updated document persisted

## Running the Server

```bash
# Start the server
npm start

# The server will:
# 1. Connect to MongoDB
# 2. Start listening on http://localhost:3000
# 3. Serve static files and API routes
```

## Error Handling

All API endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Error details (only in development)"
}
```

## Next Steps

1. **Implement visibility toggle** - Use the update endpoint to toggle `isPublic`
2. **Add wall feature** - Query public wishes with GET `/wishes?isPublic=true`
3. **Add user authentication** - Store userId with wishes
4. **Add image/file uploads** - Extend schema to support media
5. **Add wish interactions** - Like/comment features
6. **Analytics** - Track wishes per day, top themes, etc.

## Testing the API

You can test the API using curl, Postman, or the browser console:

```javascript
// In browser console:
await wishAPI.createWish('Test wish', false);
await wishAPI.getWishes();
await wishAPI.getStats();
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in `.env` is correct
- Check network access in MongoDB Atlas (whitelist your IP)
- Ensure username/password are URL-encoded if they contain special characters

### CORS Errors
- CORS is enabled for all origins (can be restricted in production)
- Modify `app.use(cors())` in server.js if needed

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using port 3000: `netstat -ano | findstr :3000`

## Production Deployment Considerations

1. Set `NODE_ENV=production` in environment
2. Restrict CORS to specific domains
3. Add API rate limiting
4. Implement authentication/authorization
5. Use environment-specific MongoDB databases
6. Enable MongoDB authentication
7. Add request validation middleware
8. Implement logging and monitoring
9. Use HTTPS
10. Add database backups
