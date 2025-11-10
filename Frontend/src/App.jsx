import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditorPage from "./pages/EditorPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/editor/:id" element={<EditorPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
