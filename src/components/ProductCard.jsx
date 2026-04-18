import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="glass border border-white/5 rounded-2xl p-5 hover-lift shadow-premium group transition-all hover:border-amber-500/30">
      <div className="relative overflow-hidden rounded-xl h-52 bg-slate-950/50">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-xl">
          New Arrival
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-1">{product.brand}</p>
        <h2 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors line-clamp-1">{product.name}</h2>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-black text-white">₹{product.price}</p>
          <button 
            onClick={() => addToCart(product)}
            className="bg-white/5 hover:bg-amber-500 text-white hover:text-slate-900 p-3 rounded-xl transition-all shadow-xl group/btn"
          >
            <FiShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
