# MERN Stack Personal Portfolio

A complete full-stack portfolio website built with React (Vite), Node.js, Express, and MongoDB.

## Features

✅ **Frontend**: Responsive UI with React, Tailwind CSS, and Framer Motion animations  
✅ **Backend**: RESTful API with Express, input validation (Joi), and MongoDB (Mongoose)  
✅ **Projects Page**: Dynamically fetches projects from backend API  
✅ **Contact Form**: Submits messages to backend with success/error toasts  
✅ **Experience/Education**: Timeline component  
✅ **Modular Structure**: Clean folder organization for scalability  

---

## 📂 Project Structure

```
portfoliopro/
├── server/
│   ├── config/         # Database connection
│   ├── models/         # Mongoose models (Project, Message)
│   ├── routes/         # API routes
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Error handler
│   ├── server.js       # Entry point
│   ├── seed.js         # Seed sample projects
│   ├── package.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── components/ # Navbar, Footer, Layout
│   │   ├── pages/      # Home, About, Projects, Experience, Contact
│   │   ├── main.jsx    # React entry
│   │   └── index.css   # Tailwind imports
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   └── package.json
└── README.md
```

---

## 🚀 Setup & Run Instructions (PowerShell)

### Prerequisites

- Node.js (v16+)
- MongoDB (local instance or MongoDB Atlas URI)

### 1️⃣ Install Dependencies

```powershell
# Server
cd server
npm install

# Client (open a new terminal)
cd client
npm install
```

### 2️⃣ Configure Environment

The `.env` file is already created in `server/`. Update `MONGO_URI` if needed:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio_db
```

### 3️⃣ Seed Database

```powershell
cd server
npm run seed
```

### 4️⃣ Start Backend

```powershell
cd server
npm run dev
```

Server runs on `http://localhost:5000`

### 5️⃣ Start Frontend (new terminal)

```powershell
cd client
npm run dev
```

Client runs on `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/api/projects`   | Fetch all projects              |
| POST   | `/api/contact`    | Submit contact form message     |
| GET    | `/api/health`     | Health check                    |

---

## 🎨 Tech Stack

**Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Axios, React Router  
**Backend**: Node.js, Express, Mongoose, Joi, CORS  
**Database**: MongoDB  

---

## 🧪 Testing

- Visit `http://localhost:3000` to view the frontend
- Test the contact form (submissions stored in MongoDB `messages` collection)
- Projects page fetches data from backend API

---

## 📝 Customization

- Update `client/src/pages/Home.jsx` to change hero text
- Edit `server/seed.js` to add more sample projects
- Modify `client/src/components/Footer.jsx` for social links

---

## 🤝 Contributing

Feel free to fork and submit PRs!

---

## 📄 License

MIT
