# 📝 Notes Backend API

A professional REST API for managing notes with intelligent features including smart updates, intelligent search, rate limiting, and comprehensive validation.

## 🏗️ Architecture

```
src/
├── controllers/
│   └── notesController.js    # Business logic & request handlers
├── middleware/
│   ├── validation.js          # Input validation rules
│   ├── rateLimiter.js         # Rate limiting configuration
│   └── errorHandler.js        # Global error handling
├── models/
│   └── Note.js                # Data model & repository pattern
├── routes/
│   └── notes.js               # API route definitions
├── app.js                     # Express application setup
└── server.js                  # Server entry point
```

## ✨ Features

- ✅ **RESTful API** - 4 clean endpoints following REST principles
- 🧠 **Smart Update Detection** - Only updates timestamp when data actually changes
- 🔍 **Intelligent Search** - Case-insensitive partial matching
- ⚡ **Rate Limiting** - 5 note creations per minute per IP
- 🛡️ **Comprehensive Validation** - Input validation with meaningful error messages
- 🧹 **Auto-Sanitization** - Automatic whitespace trimming
- 📊 **Sorted Results** - Notes sorted by most recently updated
- 🎯 **MVC Pattern** - Clean separation of concerns

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will start on `http://localhost:3000`

### 3. Test the API

```bash
# Create a note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"First Note","content":"This is my first note"}'

# Get all notes
curl http://localhost:3000/notes

# Search notes
curl "http://localhost:3000/notes/search?q=first"
```

## 📡 API Endpoints

### 1. Create a Note

**Endpoint:** `POST /notes`

**Rate Limit:** 5 requests per minute

**Request:**
```json
{
  "title": "Meeting Notes",
  "content": "Discussed hiring plan and deadlines"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "id": "l9x2k4m3n5",
    "title": "Meeting Notes",
    "content": "Discussed hiring plan and deadlines",
    "created_at": "2024-02-02T10:30:00.000Z",
    "updated_at": "2024-02-02T10:30:00.000Z"
  }
}
```

**Validation Rules:**
- `title` is required and cannot be empty
- `content` is required and cannot be empty
- Whitespace is automatically trimmed

---

### 2. Get All Notes

**Endpoint:** `GET /notes`

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "l9x2k4m3n5",
      "title": "Meeting Notes",
      "content": "Discussed hiring plan",
      "created_at": "2024-02-02T10:30:00.000Z",
      "updated_at": "2024-02-02T11:45:00.000Z"
    },
    {
      "id": "m5n8p2q7r1",
      "title": "Project Ideas",
      "content": "Build a note app",
      "created_at": "2024-02-02T09:15:00.000Z",
      "updated_at": "2024-02-02T09:15:00.000Z"
    }
  ]
}
```

**Features:**
- Notes sorted by `updated_at` (most recent first)
- Includes total count

---

### 3. Update a Note

**Endpoint:** `PUT /notes/:id`

**Partial Updates Allowed:**
```json
{
  "title": "Updated Title"
}
```

**Response - Changes Made (200):**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "wasUpdated": true,
  "data": {
    "id": "l9x2k4m3n5",
    "title": "Updated Title",
    "content": "Original content",
    "created_at": "2024-02-02T10:30:00.000Z",
    "updated_at": "2024-02-02T12:00:00.000Z"
  }
}
```

**Response - No Changes (200):**
```json
{
  "success": true,
  "message": "No changes detected. Note remains unchanged.",
  "wasUpdated": false,
  "data": { /* unchanged note */ }
}
```

**Intelligence:**
- Detects if update actually changes data
- Only updates `updated_at` when changes occur
- Compares values after sanitization

---

### 4. Search Notes

**Endpoint:** `GET /notes/search?q=meeting`

**Response (200):**
```json
{
  "success": true,
  "query": "meeting",
  "count": 2,
  "data": [
    /* matching notes sorted by updated_at */
  ]
}
```

**Search Features:**
- Searches in both `title` and `content`
- Case-insensitive matching
- Partial matching ("meet" matches "meeting")
- Results sorted by most recently updated

---

## 🎯 Intelligent Features

### 1. Smart Update Detection

```javascript
// Example: Updating with same values
PUT /notes/abc123
{
  "title": "Same Title",  // No change from current
  "content": "Same Content"  // No change from current
}

// Response
{
  "wasUpdated": false,
  "message": "No changes detected. Note remains unchanged.",
  "data": { /* note with UNCHANGED updated_at */ }
}
```

### 2. Intelligent Search

```javascript
// Search query: "MEET"
// Matches notes containing:
// - "Meeting" (case-insensitive)
// - "meet" (exact match)
// - "We'll meet tomorrow" (partial match)

GET /notes/search?q=MEET
```

### 3. Auto-Sanitization

```javascript
// Input
{
  "title": "  Hello World  ",
  "content": "  Content  "
}

// Stored as
{
  "title": "Hello World",
  "content": "Content"
}
```

---

## 🛡️ Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

**Example Errors:**

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Title cannot be empty or contain only spaces"
  ]
}
```

**Rate Limit (429):**
```json
{
  "success": false,
  "error": "Too many notes created. Maximum 5 note creations per minute allowed.",
  "retryAfter": "1 minute"
}
```

**Note Not Found (404):**
```json
{
  "success": false,
  "error": "Note not found"
}
```

---

## 🧪 Testing Examples

### Using cURL

```bash
# Health check
curl http://localhost:3000/

# Create note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Test content"}'

# Get all notes
curl http://localhost:3000/notes

# Update note (replace ID)
curl -X PUT http://localhost:3000/notes/YOUR_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Search
curl "http://localhost:3000/notes/search?q=test"

# Test rate limit (run 6 times quickly)
for i in {1..6}; do
  curl -X POST http://localhost:3000/notes \
    -H "Content-Type: application/json" \
    -d "{\"title\":\"Note $i\",\"content\":\"Content $i\"}"
done
```

### Using JavaScript/Fetch

```javascript
// Create a note
const createNote = async () => {
  const response = await fetch('http://localhost:3000/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'My Note',
      content: 'Note content here'
    })
  });
  const data = await response.json();
  console.log(data);
};

// Search notes
const searchNotes = async (query) => {
  const response = await fetch(`http://localhost:3000/notes/search?q=${query}`);
  const data = await response.json();
  console.log(data);
};
```

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",           // Web framework
  "express-rate-limit": "^7.1.5",  // Rate limiting
  "express-validator": "^7.0.1",   // Input validation
  "dotenv": "^16.3.1"              // Environment variables
}
```

---

## 🔧 Configuration

### Environment Variables (`.env`)

```env
PORT=3000
NODE_ENV=development
```

**Available Options:**
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

---

## 📚 Code Structure Explained

### Models (`src/models/Note.js`)
- `Note` class: Represents a note with validation
- `NoteRepository` class: Data access layer (CRUD operations)
- In-memory storage (replace with database in production)

### Controllers (`src/controllers/notesController.js`)
- Handles HTTP requests
- Calls repository methods
- Returns formatted responses

### Middleware (`src/middleware/`)
- **validation.js**: Input validation using express-validator
- **rateLimiter.js**: Rate limiting configuration
- **errorHandler.js**: Global error handling

### Routes (`src/routes/notes.js`)
- Defines API endpoints
- Applies middleware in correct order
- Maps routes to controller methods

### App (`src/app.js`)
- Configures Express application
- Sets up middleware stack
- Mounts routes

### Server (`src/server.js`)
- Application entry point
- Starts HTTP server
- Handles graceful shutdown

---

## 🚀 Production Considerations

### Database Integration
Replace in-memory storage with a database:

```javascript
// Example with MongoDB
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});

const Note = mongoose.model('Note', noteSchema);
```

### Security Enhancements
- Add authentication (JWT, sessions)
- Implement authorization
- Add CORS configuration
- Use helmet.js for security headers
- Implement input sanitization against XSS

### Performance
- Add database indexing
- Implement caching (Redis)
- Use connection pooling
- Add pagination for large datasets

---

## 📝 License

ISC

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

**Built with ❤️ using Node.js and Express**
