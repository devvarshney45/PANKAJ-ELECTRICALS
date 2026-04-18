import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-amber-500/30">
      <Navbar />

      <main className="py-20 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12" data-aos="fade-right">
          <FiShoppingBag className="text-amber-500 text-4xl" />
          <h1 className="text-4xl font-black text-white">Your Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 glass border border-dashed border-white/10 rounded-3xl" data-aos="zoom-in">
            <p className="text-slate-400 text-lg mb-6">Your cart feels a bit light. Let's power it up!</p>
            <Link to="/products" className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-3 rounded-full font-bold transition-all shadow-accent inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <div 
                  key={item._id} 
                  data-aos="fade-up"
                  data-aos-delay={idx * 50}
                  className="glass border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-amber-500/20 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-900 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div>
                      <h2 className="font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">{item.name}</h2>
                      <p className="text-xs font-bold text-amber-500/70 uppercase tracking-widest mt-1">{item.brand}</p>
                      <p className="text-slate-400 text-sm mt-1">₹{item.price} × {item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <p className="font-black text-xl text-white">₹{item.price * item.quantity}</p>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-slate-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-all"
                      title="Remove Item"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="glass border border-white/10 p-8 rounded-3xl sticky top-28 shadow-premium" data-aos="fade-left">
                <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between text-white font-black text-2xl">
                    <span>Total</span>
                    <span className="text-amber-500">₹{total}</span>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full">
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-accent">
                    Proceed to Checkout
                  </button>
                </Link>
                <p className="text-center text-[10px] text-slate-500 mt-4 leading-relaxed">
                  Taxes and discounts calculated at checkout. Secured with 256-bit encryption.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}