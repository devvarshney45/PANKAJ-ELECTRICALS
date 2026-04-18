import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  function handleChange(e){
    setForm({...form, [e.target.name]: e.target.value});
  }

  async function handleSubmit(e){
    e.preventDefault();

    const res = await fetch("https://solar-shop-85m7.onrender.com/api/auth/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if(res.ok){
      login(data);   // 🔥 Context login

      if(data.user.isAdmin) navigate("/admin");
      else navigate("/");
    } else {
      alert(data.message || "Login failed");
    }
  }

  async function handleGoogleSuccess(response){
    const res = await fetch("https://solar-shop-85m7.onrender.com/api/auth/google",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ token: response.credential })
    });

    const data = await res.json();

    if(res.ok){
      login(data);   // 🔥 Context login

      if(data.user.isAdmin) navigate("/admin");
      else navigate("/");
    } else {
      alert("Google Login Failed");
    }
  }

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-6 selection:bg-amber-500/30">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
      
      <form onSubmit={handleSubmit}
        className="glass border border-white/5 p-10 rounded-3xl w-full max-w-md shadow-2xl relative z-10"
        data-aos="zoom-in"
      >
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-black tracking-tighter text-gradient-accent uppercase mb-2 block">
            PANKAJ ELECTRICALS
          </Link>
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest text-sm">Welcome Back</h2>
        </div>

        <div className="space-y-4 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              name="email"
              type="email"
              placeholder="name@company.com"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-500/50 transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-500/50 transition-all text-sm"
              required
            />
          </div>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-accent mb-6">
          Sign In
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">or continue with</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <div className="flex justify-center mb-8">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={()=> alert("Google Login Failed")}
            theme="filled_black"
            shape="pill"
          />
        </div>

        <p className="text-sm text-center text-slate-400">
          New to Pankaj Electricals? 
          <Link to="/signup" className="text-amber-500 font-bold hover:underline ml-1"> Create an account</Link>
        </p>
      </form>
    </div>
  );
}