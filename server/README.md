# Portfolio Server

Backend API for the MERN portfolio example.

Setup (PowerShell):

```powershell
cd server
npm install
cp .env.example .env
# Edit .env to set MONGO_URI
npm run seed    # seed example projects
npm run dev     # start with nodemon
```

API endpoints:
- `GET /api/projects` - returns seeded projects
- `POST /api/contact` - accepts `{ name, email, message }`
