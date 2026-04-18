import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Total price with quantity
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Place COD Order
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
    <div className="bg-[#081426] min-h-screen text-white p-8">

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Items Summary */}
      <div className="bg-[#0f1f33] p-5 rounded">
        {cart.map((item,i)=>(
          <div 
            key={i} 
            className="flex justify-between border-b border-gray-600 py-2"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-400">
                {item.brand} × {item.quantity}
              </p>
            </div>
            <p>₹ {item.price * item.quantity}</p>
          </div>
        ))}

        {/* Total */}
        <h2 className="mt-4 text-xl font-bold">
          Total: ₹ {total}
        </h2>

        {/* COD Button */}
        <button 
          onClick={placeOrder}
          className="mt-6 bg-green-600 px-6 py-3 rounded w-full"
        >
          Place Order (Pay at Shop)
        </button>
      </div>
    </div>
  );
}