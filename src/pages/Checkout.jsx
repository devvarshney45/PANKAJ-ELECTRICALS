import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiCreditCard, FiCheckCircle } from "react-icons/fi";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function placeOrder() {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined") {
      alert("⚠️ Please login to place an order.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://solar-shop-85m7.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: total,
          paymentMethod: "COD"
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Order Placed Successfully! Pay at Shop.");
        clearCart();
        navigate("/");
      } else {
        alert(`❌ Order Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("❌ Network error. Please check your connection.");
    }
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-amber-500/30">
      <Navbar />

      <main className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-down">
          <p className="text-amber-500 font-bold uppercase tracking-widest mb-2">Final Step</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Complete Your Order</h2>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Order Summary */}
          <div data-aos="fade-right">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <FiCheckCircle className="text-amber-500" /> Review Items
            </h3>
            <div className="glass border border-white/5 rounded-3xl overflow-hidden">
              <div className="max-h-[500px] overflow-y-auto p-6 space-y-4">
                {cart.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-lg flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{item.name}</p>
                        <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest leading-none">
                          {item.brand} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-white">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 p-6 border-t border-white/10">
                 <div className="flex justify-between items-center text-xl font-black text-white">
                    <span>Total Amount Due</span>
                    <span className="text-amber-500">₹{total}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div data-aos="fade-left">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <FiCreditCard className="text-amber-500" /> Payment Method
            </h3>
            
            <div className="space-y-6">
              <div className="glass border-2 border-amber-500/50 p-6 rounded-3xl relative group cursor-pointer bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 text-slate-950 p-3 rounded-xl">
                    <FiCheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Cash on Delivery (Pay at Shop)</h4>
                    <p className="text-slate-400 text-sm">Pay when you pick up or receive your products.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-white/5 bg-white/5 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-700 text-slate-400 p-3 rounded-xl">
                    <FiCreditCard size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-300">Online Payment (Coming Soon)</h4>
                    <p className="text-slate-500 text-sm">Secured credit/debit card and UPI payments.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={placeOrder}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-5 rounded-2xl font-black text-base uppercase tracking-widest transition-all shadow-accent mt-8"
              >
                Place Secure Order
              </button>
              
              <p className="text-center text-[10px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                By clicking "Place Secure Order", you agree to our Terms of Service and Privacy Policy regarding electrical safety.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}