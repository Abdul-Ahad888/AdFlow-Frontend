import React, { useState } from "react";
import { User, Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Connection refused. Is the server online?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 relative overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>

      <div className="max-w-md w-full z-10">
        {/* Logo/Brand Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-14 w-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-blue-200">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
            AD<span className="text-blue-600">FLOW</span>
          </h1>
          <p className="text-slate-500 font-bold mt-2 tracking-wide uppercase text-[10px]">
            Precision Campaign Management
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
          <div className="mb-8">
            <h2 className="text-3xl text-slate-800 tracking-tight">Sign In</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Access your agency dashboard</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3 text-red-700 text-sm animate-pulse">
              <AlertCircle size={18} className="shrink-0" />
              <p className="font-semibold">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-2 ml-1">
                Account Username
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-blue-600 transition-colors">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="e.g. admin_pro"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-2 ml-1">
                Security Password
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center py-4 px-6 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all bg-slate-900 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.95] disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-3">
                {loading ? "Verifying..." : "Enter System"}
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}