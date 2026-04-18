import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiPackage, FiCalendar, FiClock } from "react-icons/fi";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://solar-shop-85m7.onrender.com/api/orders/my", {
          headers: {
            "Authorization": "Bearer " + token
          }
        });

        const data = await res.json();
        if(res.ok) setOrders(data);
      } catch (err) {
        console.error("Fetch orders failed", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-amber-500/30">
      <Navbar />

      <main className="py-20 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12" data-aos="fade-right">
          <FiPackage className="text-amber-500 text-4xl" />
          <h1 className="text-4xl font-black text-white">Order History</h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500">Retrieving your order history...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 glass border border-dashed border-white/10 rounded-3xl" data-aos="zoom-in">
            <p className="text-slate-400 text-lg mb-6">No orders found yet. Start your energy journey today!</p>
            <Link to="/products" className="text-amber-500 font-bold hover:underline">Browse our catalog</Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <div 
                key={order._id} 
                data-aos="fade-up"
                data-aos-delay={idx * 50}
                className="glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Order Header */}
                <div className="bg-white/5 p-6 border-b border-white/10 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <FiCalendar className="text-amber-500" />
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <FiClock className="text-amber-500" />
                      <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status:</span>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 
                      order.status === 'Pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Info List */}
                <div className="p-8">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-150 transition-transform"></div>
                          <span className="text-slate-200 font-medium">{item.name}</span>
                          <span className="text-slate-500 text-xs">× {item.quantity}</span>
                        </div>
                        <span className="text-white font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <p className="text-slate-400 text-sm">Amount Paid / COD Total</p>
                    <p className="text-2xl font-black text-amber-500">₹{order.totalAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}