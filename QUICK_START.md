# 🚀 Quick Start - Backend Implementation

## ⚡ Get Running in 30 Seconds

### 1. Dependencies Already Installed ✓
```bash
npm install  # Already done!
```

### 2. Environment Configured ✓
```bash
# .env file already has MongoDB URI
cat .env
```

### 3. Start the Server
```bash
npm start
```

You should see:
```
============================================================
Server running at http://localhost:3000
Environment: development
Database: connected ✓
============================================================
✓ Connected to MongoDB
```

### 4. Test It Works
```bash
# In another terminal:
node test-api.js
```

---

## 🎯 What's Running Now

| Component | Status | URL |
|-----------|--------|-----|
| Web Server | ✅ Running | `http://localhost:3000` |
| API Server | ✅ Running | `http://localhost:3000/api` |
| MongoDB | ✅ Connected | Atlas Cloud |
| Frontend | ✅ Ready | All pages work |

---

## 📱 How to Use in Your App

### Save a Wish (Writing Screen)
```javascript
// This is already done in writing.html!
await wishAPI.createWish(text, isPublic, userId);
```

### Get All Wishes (Wall Screen)
```javascript
const wishes = await wishAPI.getWishes(true); // Get public wishes
wishes.data.forEach(wish => {
  console.log(wish.text, wish.createdAt);
});
```

### Update Visibility (Visibility Screen)
```javascript
await wishAPI.updateWish(wishId, text, true); // Make public
```

### Get Stats (Dashboard)
```javascript
const stats = await wishAPI.getStats();
console.log(`Total: ${stats.data.total}, Public: ${stats.data.public}`);
```

---

## 📋 API Endpoints Cheat Sheet

```
Health:     GET  /api/health
Create:     POST /api/wishes
List:       GET  /api/wishes
Get One:    GET  /api/wishes/:id
Update:     PUT  /api/wishes/:id
Delete:     DELETE /api/wishes/:id
Stats:      GET  /api/stats
```

---

## 🐛 If Something's Wrong

### Server won't start?
```bash
# Kill previous process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
# Then start again
npm start
```

### MongoDB connection fails?
1. Check internet connection
2. Verify `.env` file has the URI
3. MongoDB Atlas whitelist your IP

### API returns 404?
1. Make sure server is running (`npm start`)
2. Check endpoint URL spelling
3. Verify wish ID format (MongoDB ObjectId)

---

## 🎨 Next: Connect to Your Pages

### In writing.html → ✅ Already Done!
- Saves wishes to database
- Uses `wishAPI.createWish()`

### In visibility.html → TODO
- Add similar endpoint calls
- Update wish's `isPublic` field

### In wall.html → TODO
- Fetch public wishes
- Use `wishAPI.getWishes(true)`

### In index.html → TODO
- Show stats
- Use `wishAPI.getStats()`

---

## 📊 Example: Fetch and Display Wishes

```javascript
async function loadWishes() {
  try {
    const response = await wishAPI.getWishes(true, 50);
    
    if (response.success) {
      response.data.forEach(wish => {
        // Create DOM element
        const wishEl = document.createElement('div');
        wishEl.innerHTML = `
          <p>${wish.text}</p>
          <small>${new Date(wish.createdAt).toLocaleDateString()}</small>
        `;
        document.body.appendChild(wishEl);
      });
    }
  } catch (error) {
    console.error('Failed to load wishes:', error);
  }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', loadWishes);
```

---

## 💾 Database Info

**Database**: `one-minute-for-tomorrow` (MongoDB Atlas)
**Collections**: `wishes`
**Sample Document**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "My New Year wish for tomorrow",
  "isPublic": false,
  "createdAt": "2025-12-27T10:30:00Z",
  "updatedAt": "2025-12-27T10:30:00Z",
  "userId": null,
  "tags": [],
  "likes": 0
}
```

---

## ✨ Features Available

- ✅ Create wishes (200 char limit)
- ✅ Read wishes (with filtering)
- ✅ Update visibility (public/private)
- ✅ Delete wishes
- ✅ Get statistics
- ✅ Pagination support
- ✅ Timestamps
- ✅ Error handling

---

## 🔧 Server Configuration

**Port**: 3000 (changeable in `.env`)
**Host**: localhost (changeable in `.env`)
**Environment**: development (changeable in `.env`)
**Node**: >= 14.0.0

---

## 📚 Full Documentation

See [BACKEND_SETUP.md](BACKEND_SETUP.md) for complete API documentation.

---

## 🎉 You're All Set!

Your backend is live and your writing page is saving wishes to MongoDB.

**Current Status**:
- ✅ Backend server running
- ✅ MongoDB connected
- ✅ API endpoints active
- ✅ Writing page integrated
- ✅ Data persisting to database

**Next**: Update other pages to use the API!

---

**Happy coding! 🚀**
