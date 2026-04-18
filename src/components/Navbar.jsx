import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleSearch(e) {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/products/${search.toUpperCase()}`);
      setSearch("");
    }
  }

  return (
    <div className="glass-dark border-b border-white/10 text-white sticky top-0 z-50 px-4 md:px-8">
      <div className="flex items-center justify-between py-4 max-w-7xl mx-auto">

        {/* ✅ Logo + Text */}
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <img 
            src="/kkkkkk.png"
            alt="Pankaj Electricals"
            className="h-10 w-auto"
          />
          <span className="hidden sm:block text-xl md:text-2xl font-extrabold tracking-tighter text-gradient-accent">
            PANKAJ ELECTRICALS
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 ml-auto mr-8 focus-within:border-amber-400/50 transition-all w-full max-w-md">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products or brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-6 items-center">

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <FiShoppingCart size={22} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
            <div className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              0
            </div>
          </Link>

          {/* User */}
          {!user ? (
            <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-accent">
              Login
            </Link>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 pr-3 hover:bg-white/10 transition-all"
              >
                <div className="bg-amber-500 text-slate-900 h-8 w-8 rounded-full flex items-center justify-center font-bold">
                  {user.name[0]}
                </div>
                <span className="text-sm font-medium hidden sm:block">{user.name.split(' ')[0]}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 glass-dark rounded-2xl shadow-2xl p-4 z-50 overflow-hidden border border-white/10">
                  <div className="mb-4">
                    <p className="font-bold text-sm text-white">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>

                  <div className="space-y-1">
                    <Link 
                      to="/my-orders"
                      className="flex items-center gap-2 p-2 rounded-xl text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                      onClick={() => setOpen(false)}
                    >
                      <FiSearch size={16} /> My Orders
                    </Link>

                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 p-2 rounded-xl text-sm text-green-400 hover:bg-green-400/10 transition-all"
                        onClick={() => setOpen(false)}
                      >
                        <FiUser size={16} /> Admin Panel
                      </Link>
                    )}

                    <hr className="my-2 border-white/5"/>

                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 rounded-xl text-sm text-red-400 hover:bg-red-400/10 w-full text-left transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}