# Real-Time Collaboration Tool

A **full-stack real-time collaborative document editing platform** built using **React**, **Redux**, **Express.js**, **Socket.io**, and **Y.js (CRDT)**.  
It allows multiple users to collaboratively edit, share, and manage documents simultaneously with **instant updates**, **conflict-free synchronization**, and **secure user authentication**.

---

## Features

- **Real-Time Collaboration** — Multiple users can edit a document simultaneously.
- **Conflict-Free Editing** — Implemented with **Y.js (CRDT)** for consistent state across all clients.
- **Live Updates** — Powered by **Socket.io** for low-latency, bi-directional communication.
- **User Authentication** — Secure login and registration system using JWT.
- **Dashboard** — Manage, create, and join documents with a clean interface.
- **Collaborator Support** — Invite users to collaborate on the same document.
- **Profile Management** — Update username, password, and email.
- **State Management** — Efficient global state handled via **Redux Toolkit**.

---

## Tech Stack

**Frontend:** React, Redux Toolkit, Vite, Axios, Socket.io-client  
**Backend:** Node.js, Express.js, Socket.io, Y.js, MongoDB, JWT  
**Architecture:** RESTful APIs + WebSocket-based real-time updates  

---

## Project Structure

### **Backend**
```
Backend/
├── src/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── index.js
```

### **Frontend**
```
Frontend/
├── src/
│ ├── api/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ └── services/
```

---

## Installation & Setup

### 1️. Clone the repository
```bash
git clone https://github.com/Preet-Singh-Rana-123/Collaboration-Tool.git
cd Collaboration-Tool
```
### 2️. Setup Backend
```
cd Backend
npm install
```
#### Create a .env file with the following variables:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
#### Run the server:
```
npm start
```
### 3️. Setup Frontend
```
cd ../Frontend
npm install
npm run dev
```
---
## How It Works
- When a user edits a document, Y.js handles CRDT-based synchronization to merge concurrent changes conflict-free.
- Socket.io propagates changes to all connected clients in real time.
- The backend manages document storage, user sessions, and socket communication.
- Redux Toolkit keeps local state synchronized across UI components.
---
## Security & Authentication
- Passwords are hashed using bcrypt.
- Authenticated routes are protected using JWT middleware.
- Socket connections are verified for authenticated users.
---
## Author
- Preet Rana
- [preetrana1263@gmail.com]
- [www.linkedin.com/in/preet-rana-64235b292]
---
## License
- This project is licensed under the MIT License – feel free to use and modify it.
