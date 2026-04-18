import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function HeroSlider() {
  const images = [
    "https://lumprodblobcdn.azureedge.net/Banners/e16afcfb-fde6-4e35-9b03-dfaac91263f4_21st.jpg?w=1688&h=520&q=60&format=webp",
    "https://lumprodblobcdn.azureedge.net/Banners/14978cc1-62d0-4c16-b39b-805afb8e3ace_1fc14800-42c1-4ecc-9385-ed5bf76bb233_P1200DesktopBanner_11zon.jpg?w=1688&h=520&q=60&format=webp",
    "https://livguard.b-cdn.net/livguard/home/1/solar-homepage-banner-desktp.jpg?quality=85&width=1366",
    "/solar1.jpg",
    "/solar2.jpg",
    "https://amaze-india.com/data/banner/amaze-banner/home-banner-2.webp",
    "/solar3.jpg",
    "/a.jpeg",
    "/b.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzIQDHzfZxWMLSOoAuKiNSuaPKEoDeM9E1NA&s",
    "/c.jpeg",
    "/d.jpeg",
    "https://5.imimg.com/data5/GLADMIN/VideoImage/2023/9/345723478/VD/AB/XZ/119389252/eastman-tall-tubular-inverter-batteries-500x500.jpg",
    "/e.jpeg",
    "/f.jpeg",
    "/g.jpeg",
    '/h.jpeg',
    "/i.jpeg",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9e407ea0-cda6-4401-8cd4-86087cbb79ad.__CR0,0,970,600_PT0_SX970_V1___.png",
    "/j.jpeg",
    "/k.jpeg",
    "/l.jpeg",
    "/m.jpeg",
    "/o.jpeg",
    "/p.jpeg",
    "/q.jpeg",
    "/r.jpeg"
  ];

  return (
   <div className="relative group">
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      className="w-full overflow-hidden h-[400px] md:h-[600px] lg:h-[700px]"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="relative w-full h-full">
            <img src={img} className="w-full h-full object-cover" alt="Banner" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent flex items-center px-10 md:px-20">
              <div className="max-w-2xl" data-aos="fade-right">
                <p className="text-amber-500 font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base">Premium Electrical Solutions</p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                  {i % 2 === 0 ? "Powering Your Future with Solar" : "Advanced Inverters & Batteries"}
                </h1>
                <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed hidden md:block">
                  Authorized distributor of Luminous, Microtek, and Eastman products. Get the best deals on sustainable energy solutions today.
                </p>
                <div className="flex gap-4">
                  <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-accent">
                    Shop Now
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 font-bold px-8 py-4 rounded-full transition-all">
                    View Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
   </div>
  );
}