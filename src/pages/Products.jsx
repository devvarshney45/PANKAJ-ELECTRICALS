import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const { company } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");

  const brands = ["All", "LUMINOUS", "MICROTEK", "LIVGUARD", "EASTMAN"];

  // 🔥 Fetch products
  useEffect(() => {
    setLoading(true);
    fetch("https://solar-shop-85m7.onrender.com/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // 🔗 Sync URL param
  useEffect(() => {
    if (company) setBrand(company);
    else setBrand("All");
  }, [company]);

  function handleBrandChange(e) {
    const selected = e.target.value;
    setBrand(selected);

    if (selected === "All") navigate("/products");
    else navigate(`/products/${selected}`);
  }

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchBrand =
      brand === "All" ||
      item.brand.toLowerCase() === brand.toLowerCase();

    return matchSearch && matchBrand;
  });

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-amber-500/30">
      <Navbar />

      <main className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-down">
          <p className="text-amber-500 font-bold uppercase tracking-widest mb-2">Inventory</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">Our Product Range</h2>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Search + Filter */}
        <div className="glass border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row gap-6 mb-16 items-center shadow-premium" data-aos="fade-up">
          <div className="relative w-full md:w-2/3">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by product name..."
              className="bg-white/5 border border-white/10 px-12 py-4 rounded-2xl w-full outline-none focus:border-amber-500/50 transition-all text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/3">
            <select
              className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl w-full outline-none focus:border-amber-500/50 transition-all text-sm appearance-none cursor-pointer"
              value={brand}
              onChange={handleBrandChange}
            >
              {brands.map((b) => (
                <option key={b} value={b} className="bg-slate-900">{b} Brand</option>
              ))}
            </select>
          </div>
        </div>

        {/* 🟢 Loading UI */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading high-quality products...</p>
          </div>
        )}

        {/* 🟢 Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" data-aos="fade-up">
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}

        {/* 🟢 No products Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-500 text-lg">No products match your search criteria.</p>
            <button 
              onClick={() => { setSearch(""); setBrand("All"); }}
              className="mt-6 text-amber-500 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
