import { FiBattery, FiZap, FiSun, FiSettings } from "react-icons/fi";

export default function Services() {
  const services = [
    { title: "Battery Sales", icon: <FiBattery />, desc: "High-performance batteries from Luminous, Microtek, and more." },
    { title: "Inverter Sales", icon: <FiZap />, desc: "Reliable power backup solutions for homes and industrial needs." },
    { title: "Solar Installation", icon: <FiSun />, desc: "Expert solar panel mounting and grid integration services." },
    { title: "Maintenance & Repair", icon: <FiSettings />, desc: "dedicated support and AMC for all electrical equipment." },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="services">
      <div className="text-center mb-16" data-aos="fade-down">
        <p className="text-amber-500 font-bold uppercase tracking-widest mb-2">Expertise</p>
        <h2 className="text-4xl md:text-5xl font-black text-white">Our Services</h2>
        <div className="h-1.5 w-24 bg-amber-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {services.map((s, idx) => (
          <div 
            key={idx} 
            data-aos="fade-up" 
            data-aos-delay={idx * 100}
            className="glass border border-white/5 rounded-3xl p-8 hover-lift shadow-premium group hover:bg-white/5"
          >
            <div className="bg-amber-500 text-slate-950 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-accent group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{s.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}