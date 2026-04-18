import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="space-y-6" data-aos="fade-up">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-gradient-accent uppercase">PANKAJ ELECTRICALS</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your trusted partner for high-quality electrical and solar solutions. Authorized distributor of leading brands with over 20 years of excellence in energy solutions.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/10 group">
              <FiFacebook className="group-hover:scale-110" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/10 group">
              <FiInstagram className="group-hover:scale-110" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/10 group">
              <FiTwitter className="group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div data-aos="fade-up" data-aos-delay="100">
          <h4 className="text-white font-bold mb-6 pt-2 uppercase tracking-widest text-xs">Quick Navigation</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-amber-500 transition-colors">Shop Products</Link></li>
            <li><Link to="/cart" className="hover:text-amber-500 transition-colors">View Cart</Link></li>
            <li><Link to="/login" className="hover:text-amber-500 transition-colors">Client login</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h4 className="text-white font-bold mb-6 pt-2 uppercase tracking-widest text-xs">Partner Brands</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link to="/products/LUMINOUS" className="hover:text-amber-500 transition-colors uppercase">Luminous</Link></li>
            <li><Link to="/products/MICROTEK" className="hover:text-amber-500 transition-colors uppercase">Microtek</Link></li>
            <li><Link to="/products/EASTMAN" className="hover:text-amber-500 transition-colors uppercase">Eastman</Link></li>
            <li><Link to="/products/LIVGUARD" className="hover:text-amber-500 transition-colors uppercase">Livguard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div data-aos="fade-up" data-aos-delay="300">
          <h4 className="text-white font-bold mb-6 pt-2 uppercase tracking-widest text-xs">Get In Touch</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <FiMapPin className="text-amber-500 mt-1 shrink-0" />
              <span>PANKAJ ELECTRICALS,<br /> Main Market wazirganj, UP</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="text-amber-500 shrink-0" />
              <span>+91 63970 03690</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="text-amber-500 shrink-0" />
              <span>support@pankajelectricals.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-10 text-center">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Pankaj Electricals. All rights reserved. <br className="md:hidden" />
          Designed for Excellence in Energy.
        </p>
      </div>
    </footer>
  );
}