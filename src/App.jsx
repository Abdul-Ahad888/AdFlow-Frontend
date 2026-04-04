import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreativeBreifBuilder from "./pages/CreativeBreifBuilder"
import Settings from "./components/Settings";
import Client from "./components/Clients"
import Campaigns from "./components/Campaigns"
import CreativeEngine from "./pages/CreativeEngine"
import ProtectedRoute from "./components/ProtectedRoute";

function getInitialRoute() {
  const token = localStorage.getItem("token");
  return token ? "/dashboard" : "/login";
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-brief" element={<ProtectedRoute><CreativeBreifBuilder /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Client /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/creative-engine" element={<ProtectedRoute><CreativeEngine /></ProtectedRoute>} />
        {/* Redirect root to dashboard if logged in, otherwise login */}
        <Route path="/" element={<Navigate to={getInitialRoute()} />} />
      </Routes>
    </BrowserRouter>
  );
}