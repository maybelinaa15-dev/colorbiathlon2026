/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  Music,
  Droplets,
  Gift,
  ShoppingBag,
  Utensils,
  Camera,
  Star,
  MessageCircle,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const COLORS = [
  'bg-holi-cyan',
  'bg-holi-magenta',
  'bg-holi-yellow',
  'bg-holi-orange',
  'bg-holi-green'
];

const HOLI_COLORS = ['#00AEEF', '#EC008C', '#FFF200', '#F7941D', '#8DC63F'];

function HoliParticles() {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    containerRef.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 8 + 2;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.globalAlpha = this.opacity;
        context.fillStyle = this.color;
        context.fill();
        context.globalAlpha = 1;
      }
    }

    const resize = () => {
      canvas.width = containerRef.offsetWidth;
      canvas.height = containerRef.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.contains(canvas)) {
        containerRef.removeChild(canvas);
      }
    };
  }, [containerRef]);

  return <div ref={setContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-05-29T08:00:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    setTimeLeft(calculateTime());

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activities = [
    { icon: <Award className="w-6 h-6" />, title: "Premiaciones", color: "text-holi-cyan" },
    { icon: <Music className="w-6 h-6" />, title: "Animación", color: "text-holi-magenta" },
    { icon: <Droplets className="w-6 h-6" />, title: "Hidratación", color: "text-holi-yellow" },
    { icon: <Gift className="w-6 h-6" />, title: "Obsequios", color: "text-holi-orange" },
    { icon: <ShoppingBag className="w-6 h-6" />, title: "Venta de Productos", color: "text-holi-green" },
    { icon: <Utensils className="w-6 h-6" />, title: "Venta de Hamburguesas", color: "text-holi-cyan" },
  ];

  const scrollToContact = () => {
    const section = document.getElementById('contacto');
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-holi-magenta selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-2xl tracking-tighter text-gradient leading-none">

            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#info" className="hover:text-holi-magenta transition-colors">Información</a>
            <a href="#patrocinio" className="hover:text-holi-magenta transition-colors">Patrocinio</a>
            <button
              onClick={scrollToContact}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:bg-slate-800 transition-all active:scale-95"
            >
              ¡Inscríbete!
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-t p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              <a href="#info" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2">Información</a>
              <a href="#patrocinio" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold py-2">Patrocinio</a>
              <button
                onClick={scrollToContact}
                className="bg-holi-magenta text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-holi-magenta/20"
              >
                ¡Inscríbete Ahora!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative">
        <HoliParticles />
        {/* Section: Hero */}
        <section className="relative pt-32 pb-20 md:pt-28 md:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-holi-cyan/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-holi-magenta/10 blur-[120px] rounded-full" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6"
              >
                Segunda Edición
              </motion.div>

              <motion.img
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                src="img/colorbi.png"
                alt="Color Biathlon 2026 Logo"
                className="w-full max-w-3xl h-auto mb-8 drop-shadow-2xl"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:flex items-center justify-center gap-4 md:gap-8 mb-12"
              >
                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-holi-cyan/10 flex items-center justify-center text-holi-cyan">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha</p>
                    <p className="font-display font-bold text-lg">29 de Mayo</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-holi-magenta/10 flex items-center justify-center text-holi-magenta">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hora</p>
                    <p className="font-display font-bold text-lg">8:00 am</p>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/PtNc7Yqn9WVAbXQw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-holi-green/10 flex items-center justify-center text-holi-green">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lugar</p>
                    <p className="font-display font-bold text-lg">QSI International School of El Tigre</p>
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex gap-3 md:gap-4 mb-12"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black text-holi-magenta">
                    {timeLeft.days}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">Días</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black text-holi-cyan">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">Hrs</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black text-holi-orange">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">Min</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 glass rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black text-holi-green">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">Seg</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={scrollToContact}
                className="group relative bg-holi-magenta text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-holi-magenta/30 hover:scale-105 transition-all active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                ¡Inscríbete Ahora!
              </motion.button>
            </div>
          </div>
        </section>

        {/* Section: Info & Activities */}
        <section id="info" className="py-24 bg-white relative overflow-hidden">
          {/* Decorative splatter background */}
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96">
              <path fill="#EC008C" d="M44.7,-76.4C58.1,-69.2,71.1,-59.1,79.6,-45.8C88.1,-32.5,92.1,-16.2,91.8,-0.1C91.6,15.9,87,31.9,78.5,45.2C70,58.5,57.5,69.1,43.2,76.5C28.9,84,14.4,88.2,-1.1,90.2C-16.7,92.1,-33.4,91.8,-48.1,84.7C-62.8,77.7,-75.6,63.9,-83,48C-90.4,32.2,-92.4,14.2,-90.4,-3.4C-88.5,-21,-82.6,-38.2,-71.4,-50.7C-60.2,-63.2,-43.8,-71.1,-28.9,-77.2C-13.9,-83.3,-0.5,-87.6,13.6,-85.2C27.6,-82.8,44.7,-73.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black">
                Diseñado para <span className="text-holi-cyan">toda la familia</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="space-y-6 mb-12">
                  <div className="flex gap-4 p-6 glass rounded-3xl border-l-8 border-holi-orange hover:translate-x-2 transition-transform">
                    <div className="p-3 bg-holi-orange/10 rounded-2xl text-holi-orange h-fit">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Categorías</h3>
                      <p className="text-slate-600 font-medium leading-relaxed">
                        Abierto a <span className="font-bold text-slate-900">Niños y Adultos</span>.
                        Este evento une a la comunidad escolar y al público en general para una mañana llena de color.
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-4 mb-10">
                    <div class="bg-white p-6 rounded-2xl shadow-md border-l-8 border-cyan-500 flex-1">
                      <div class="text-4xl mb-2">👦👧</div>
                      <h4 class="text-xl font-black">Niños</h4>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-md border-l-8 border-yellow-500 flex-1">
                      <div class="text-4xl mb-2">👨👩</div>
                      <h4 class="text-xl font-black">Adultos</h4>
                    </div>
                  </div>
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activities.map((activity, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <div className={`p-2 rounded-lg ${activity.color.replace('text-', 'bg-')}/10 ${activity.color}`}>
                        {activity.icon}
                      </div>
                      <span className="font-bold text-slate-700">{activity.title}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative group">
                  <img
                    src="children_holi_fun_1777772870614.png"
                    alt="Niños divirtiéndose con colores"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-white text-3xl font-black tracking-tight mb-2">¡Mucho color y diversión!</p>
                  </div>
                </div>

                {/* Floating tags */}
                <div className="absolute -top-6 -right-6 glass p-4 rounded-3xl shadow-xl animate-bounce z-20">
                  <p className="text-holi-magenta font-black">¡FIESTA DE ESPUMA!</p>
                </div>
                <div className="absolute -bottom-6 -left-6 glass p-4 rounded-3xl shadow-xl z-20">
                  <p className="text-holi-cyan font-black">#ColorBiathlonQSI2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Sponsorship */}
        <section id="patrocinio" className="py-24 bg-blue-900 text-white relative overflow-hidden">
          <div class="max-w-6xl mx-auto px-4">
            <div class="text-center mb-12">
              <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
                Tú puedes ser <span className="text-gradient">patrocinante</span>
              </h2>
              <p class="text-lg text-blue-200 max-w-2xl mx-auto">Esta sección está dedicada a empresas y marcas locales que desean visibilidad. Conoce nuestro paquete de patrocinio único y cómo tu marca puede ser parte de esta gran celebración deportiva y familiar.</p>
            </div>

            <div class="max-w-3xl mx-auto glass !bg-white/10 !border-white/20 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
              <div class="absolute top-0 right-0 bg-pink-500 text-white font-black py-2 px-10 transform translate-x-8 translate-y-6 rotate-45">
                ÚNICO PAGO
              </div>

              <h3 class="text-6xl font-black text-yellow-400 mb-6">100$</h3>
              <p class="text-xl mb-8 leading-relaxed">Tu marca puede participar en nuestro evento y conectar directamente con cientos de familias y deportistas de la comunidad.</p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                <div class="bg-blue-800 bg-opacity-50 p-4 rounded-xl">
                  <div class="text-2xl mb-2">📢</div>
                  <h4 class="font-bold text-yellow-300">Menciones</h4>
                  <p class="text-sm text-blue-100">Durante toda la animación del evento.</p>
                </div>
                <div class="bg-blue-800 bg-opacity-50 p-4 rounded-xl">
                  <div class="text-2xl mb-2">📸</div>
                  <h4 class="font-bold text-pink-300">Podium</h4>
                  <p class="text-sm text-blue-100">Marca impresa en nuestro podium de premiación.</p>
                </div>
                <div class="bg-blue-800 bg-opacity-50 p-4 rounded-xl">
                  <div class="text-2xl mb-2">🎟️</div>
                  <h4 class="font-bold text-cyan-300">Entradas</h4>
                  <p class="text-sm text-blue-100">Obsequio de dos (2) entradas para el evento.</p>
                </div>
              </div>

              <p class="text-sm text-blue-200 italic mb-8">*Recibimos todo el material publicitario que tengas disponible para impulsar tu marca el día del evento.</p>

              <a href="https://wa.me/+584147745993" class="inline-block bg-white text-blue-900 font-black px-10 py-4 rounded-full text-lg hover:bg-yellow-400 hover:text-blue-900 transition shadow-xl">
                ¡Quiero Patrocinar!
              </a>
            </div>

            <div class="mt-16 text-center">
              <p class="text-blue-300 font-bold mb-6 tracking-widest uppercase">Marcas Aliadas</p>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <a href="https://www.sepolca.com" target="_blank" rel="noreferrer" className="w-64 h-64 rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/SERVICIOS_POLEO.png" alt="Servicios Poleo" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="w-64 h-64  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/radum.png" alt="Radum" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <a href="https://www.saviaflowers.com" target="_blank" rel="noreferrer" className="w-56 h-56 rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/savia.svg" alt="Savia Flowers" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="w-64 h-64  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/pepe.png" alt="Bodedon de Pepe" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/degustos.png" alt="Degustos" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/fleteando.png" alt="Fleteando" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/rianda.png" alt="Rianda" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/sercolenca.jpeg" alt="Serconleca" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/tigres.png" alt="Savia" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/velanmax.png" alt="Radum" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/labolivera.png" alt="Savia" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/sermapaca.png" alt="Savia" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/trudy.png" alt="Trudy" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/agrodelca.png" alt="Agrodelca" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/tracoserga.png" alt="Tracoserga" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <a href="https://saber-energia.com/" target="_blank" rel="noreferrer" className="w-56 h-56 rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/saber.webp" alt="Saber energia" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="https://electronicalagloria.com/" target="_blank" rel="noreferrer" className="w-64 h-64 rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/lagloria.webp" alt="Electronica La Gloria" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/savinerca.png" alt="Savinerca" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-56 h-56  rounded-lg flex items-center justify-center p-2 group hover:bg-white/20 transition-all">
                  <img src="img/gp.png" alt="GP Servicios Integrales" className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Final CTA/Contact */}
        <section id="contacto" className="py-24 bg-holi-magenta text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-6">¿Listo para la acción?</h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-90 max-w-2xl mx-auto">
              Contáctanos para inscripciones, patrocinios o cualquier duda que tengas sobre el evento.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a
                href="https://wa.me/+584147745993"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-holi-magenta px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-all"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp Inscripciones
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-4 bg-slate-50 border-t border-slate-50 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img src="img/qsi.png" alt="QSI Logo" className="h-16 w-auto" />
          </div>
          <div className="flex flex-col text-center">
            <p className="text-gray-400 text-sm">© 2026 Color Biathlon. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            {/* <a href="#" className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-holi-magenta transition-colors">
              <Camera className="w-5 h-5" />
            </a> */}
            <a
              href="https://maps.app.goo.gl/PtNc7Yqn9WVAbXQw5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-holi-magenta transition-colors"
            >
              <MapPin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/+584147745993"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-5 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 font-bold">
          Chatea con nosotros
        </span>
      </motion.a>
    </div>
  );
}
