#  FEC Sales & Marketing — AI-assisted Demo

This project is a **Sales & Marketing System powered by AI** built using the **MERN stack**.  
It helps sell arcade/VR products to **Family Entertainment Center (FEC) owners** by managing leads, scoring them with AI, and generating personalized sales suggestions (email & call scripts).  

---

##  Features
- Add and manage leads with details (contact, center, email, size, budget, interest, notes).
- AI-powered **Lead Scoring** and **Sales Suggestions**.
- Suggested **Email Templates** & **Call Scripts** for sales outreach.
- Interactive and modern **React frontend** with TailwindCSS.
- Backend API built with **Express & Node.js**.
- **MongoDB database** for storing leads and stats.
- Deployment-ready for **Netlify (frontend)** & **Render/Heroku (backend)**.

---

## 🛠 Tech Stack
- **Frontend:** React, TailwindCSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **AI/Logic:** Custom scoring and suggestion system
- **Deployment:** Netlify (Frontend) + Render/Heroku (Backend)

---

##  Project Structure
/frontend → React app (Netlify)
/backend → Express.js API + MongoDB (Render/Heroku)

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/fec-salesai.git
cd fec-sales-ai
2. Backend Setup (Express + MongoDB)
cd backend
npm install
Run Backend:
npm run dev
Backend will run at: http://localhost:5000

3. Frontend Setup (React + Vite)
cd ../frontend
npm install
VITE_API_URL=http://localhost:5000
Run Frontend:
npm run dev
Frontend will run at: http://localhost:5173

Netlify for frontend links ---   https://jazzy-pegasus-3d8022.netlify.app/

