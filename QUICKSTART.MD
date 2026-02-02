# 🚀 Quick Start Guide

Get your Notes API running in 3 simple steps!

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- express-rate-limit (rate limiting)
- express-validator (input validation)
- dotenv (environment variables)
- nodemon (development auto-reload)

## Step 2: Start the Server

**Option A: Production Mode**
```bash
npm start
```

**Option B: Development Mode (auto-reload)**
```bash
npm run dev
```

You should see:
```
===========================================================
🚀 NOTES API SERVER STARTED
===========================================================
📡 Port:        3000
🌍 Environment: development
⏰ Started at:  2024-02-02T10:30:00.000Z
===========================================================

📝 Available Endpoints:
   POST   http://localhost:3000/notes
   GET    http://localhost:3000/notes
   PUT    http://localhost:3000/notes/:id
   GET    http://localhost:3000/notes/search?q=query

⚡ Features:
   • Rate Limiting: 5 note creations per minute
   • Smart Updates: Detects actual changes
   • Intelligent Search: Case-insensitive partial matching
   • Auto-Sanitization: Trims whitespace automatically
===========================================================
```

## Step 3: Test the API

### Using cURL

**Create a note:**
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Note","content":"This is awesome!"}'
```

**Get all notes:**
```bash
curl http://localhost:3000/notes
```

**Search notes:**
```bash
curl "http://localhost:3000/notes/search?q=first"
```

**Update a note (replace YOUR_ID with the ID from create response):**
```bash
curl -X PUT http://localhost:3000/notes/YOUR_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

### Using the Test Script

We've included a comprehensive test script:

```bash
./test-api.sh
```

This will run all tests including:
- Health check
- Create notes
- Get all notes
- Update notes (with and without changes)
- Search notes
- Validation errors
- Rate limiting

## 🎯 Quick Examples

### Example 1: Complete Workflow

```bash
# 1. Create a note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Shopping List","content":"Milk, Eggs, Bread"}'

# Response will include the note ID
# {
#   "success": true,
#   "message": "Note created successfully",
#   "data": {
#     "id": "l9x2k4m3n5",
#     ...
#   }
# }

# 2. Update the note (use the ID from above)
curl -X PUT http://localhost:3000/notes/l9x2k4m3n5 \
  -H "Content-Type: application/json" \
  -d '{"content":"Milk, Eggs, Bread, Butter"}'

# 3. Search for it
curl "http://localhost:3000/notes/search?q=shopping"

# 4. Get all notes
curl http://localhost:3000/notes
```

### Example 2: Testing Smart Features

**Smart Update Detection:**
```bash
# Create note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Content"}'

# Update with SAME values - will return wasUpdated: false
curl -X PUT http://localhost:3000/notes/YOUR_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
```

**Intelligent Search:**
```bash
# Search is case-insensitive and supports partial matching
curl "http://localhost:3000/notes/search?q=SHOP"  # Finds "shopping"
curl "http://localhost:3000/notes/search?q=milk"  # Finds notes with "milk"
```

**Rate Limiting:**
```bash
# Try creating 6 notes quickly (6th will be rate limited)
for i in {1..6}; do
  curl -X POST http://localhost:3000/notes \
    -H "Content-Type: application/json" \
    -d "{\"title\":\"Note $i\",\"content\":\"Content $i\"}"
done
```

## 📱 Using Postman

1. Import the collection file (if available)
2. Set base URL to `http://localhost:3000`
3. Test all endpoints

Or create requests manually:

**POST /notes**
- Method: POST
- URL: `http://localhost:3000/notes`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "title": "My Note",
    "content": "Note content"
  }
  ```

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in .env file
echo "PORT=3001" > .env
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Server not responding:**
```bash
# Check if server is running
curl http://localhost:3000/

# Check server logs for errors
```

## 📚 Next Steps

- Read the full [README.md](README.md) for complete documentation
- Explore the code in `src/` directory
- Customize the API for your needs
- Add database integration (MongoDB, PostgreSQL)
- Add authentication and authorization

## 🎉 You're All Set!

Your Notes API is now running and ready to use. 
