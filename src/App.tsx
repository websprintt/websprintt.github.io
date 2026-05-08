/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Zap, Smartphone, Search, Globe, Lock, Layers, 
  MessageSquare, Paintbrush, ChevronRight, Check, AlertTriangle, 
  Clock, Rocket, Shield, ArrowRight, Star
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'motion/react';

// --- Components ---

const SectionHeader = ({ tag, title, description, light = false }: { tag: string, title: string | React.ReactNode, description: string, light?: boolean }) => (
  <div className="max-w-3xl mb-20">
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 font-display text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${light ? 'text-white/60' : 'text-[var(--primary)]'}`}
    >
      <span className={`w-8 h-[1px] ${light ? 'bg-white/20' : 'bg-[var(--primary)]/30'}`}></span>
      {tag}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`headline-lg mb-6 ${light ? 'text-white' : 'text-[var(--on-surface)]'}`}
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`text-lg md:text-xl leading-relaxed ${light ? 'text-white/60' : 'text-[var(--secondary)]'}`}
    >
      {description}
    </motion.p>
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const logoUrl = "https://raw.githubusercontent.com/websprintt/websprintt.github.io/e7fc2c370ab1c9abfa7933ea04e7f4683121fb86/im%C3%A1genes/Logo_sin-fondo_.webp";
  
  // Security: Phone Obfuscation
  const encodedPhone = "MzQ3NDIwOTA5OTE="; // Base64 for 34742090991
  const getWaLink = (message?: string) => {
    const phone = atob(encodedPhone);
    const base = `https://wa.me/${phone}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "Servicios", href: "#servicios" },
    { label: "Método", href: "#metodo" },
    { label: "Precios", href: "#precios" },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* ProgressBar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--primary)] z-[1000] origin-left" style={{ scaleX }} />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className="container">
          <motion.div 
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'glass-card' : 'bg-transparent'}`}
          >
            <a href="#" className="flex items-center group">
              <motion.img 
                src={logoUrl} 
                alt="Websprint" 
                className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-8' : 'h-12 md:h-16 brightness-0 invert'}`}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a key={item.label} href={item.href} className={`nav-link ${scrolled ? '' : 'text-white/80 hover:text-white'}`}>{item.label}</a>
              ))}
              <a 
                href={getWaLink("Hola Websprint! Quiero información para mi proyecto.")} 
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary btn-shine px-6 py-2.5 text-xs uppercase tracking-widest"
              >
                Contacto
              </a>
            </nav>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${scrolled ? 'bg-[var(--surface-container)]' : 'bg-white/10 text-white'}`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-6 right-6 p-8 glass-card rounded-[32px] md:hidden z-[110]"
            >
              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-display font-bold">{item.label}</a>
                ))}
                <a 
                  href={getWaLink("Hola! Vengo desde el menú móvil.")} 
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary h-14 w-full text-lg mt-4"
                >
                  Hablar por WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black text-white">
        {/* Full Image Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://raw.githubusercontent.com/websprintt/websprintt.github.io/4b6367f5e69885cba8d0f526a4fab056a2199d5f/im%C3%A1genes/banner-ok.webp" 
            alt="Web Sprint Banner" 
            className="w-full h-full object-cover object-right opacity-70 transition-opacity duration-1000"
          />
          {/* Fading to black from left to right */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 grid-pattern opacity-5 mask-radial"></div>
        </div>

        <div className="container relative z-10 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Ejecución en 48 Horas Garantizada</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="headline-xl mb-8 text-white"
            >
              Tu negocio en línea <br />
              <span className="text-[var(--primary)] italic relative inline-block">
                antes de 48h.
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-4 left-0 h-2 bg-[var(--primary)]/20 -z-10"
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 leading-relaxed"
            >
              Diseñamos, programamos y lanzamos tu web de alto rendimiento. Sin esperas infinitas, sin procesos lentos. Tu motor de ventas, hoy.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <a 
                href={getWaLink("¡Hola! Quiero activar mi proyecto ahora.")} 
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary btn-shine h-16 px-10 text-lg group w-full sm:w-auto"
              >
                Impulsar mi negocio ahora
                <Zap size={20} className="ml-2 group-hover:scale-125 transition-transform" fill="currentColor" />
              </a>
              <div className="flex -space-x-3 items-center">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[var(--surface-container)] flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="pl-6">
                  <div className="flex gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" className="text-orange-400" />)}
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[var(--secondary)]">+50 clientes activos</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--on-surface)] to-transparent"></div>
        </motion.div>
      </section>

      {/* Trust Ticker (Refined) */}
      <section className="py-2 border-y border-[var(--surface-container-high)] bg-white overflow-hidden relative">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 pr-16"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                {[
                  { text: "Electricistas", icon: Zap },
                  { text: "Cerrajeros", icon: Lock },
                  { text: "Fontaneros", icon: Smartphone },
                  { text: "Reformas", icon: Layers },
                  { text: "Autónomos", icon: Check },
                  { text: "Mudanzas", icon: Rocket },
                  { text: "Pintores", icon: Paintbrush },
                  { text: "Climatización", icon: Shield }
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 grayscale opacity-30 hover:opacity-100 transition-opacity cursor-default group">
                    <item.icon size={18} className="text-[var(--primary)]" />
                    <span className="font-display font-black text-lg tracking-tighter uppercase">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="servicios" className="section-padding bg-[var(--surface-container-low)]">
        <div className="container">
          <SectionHeader 
            tag="Tecnología de Vanguardia"
            title={<>No solo una web bonita. <br />Una <span className="text-[var(--primary)]">máquina de captar.</span></>}
            description="Hemos optimizado cada línea de código para que tu web sea la más rápida de tu ciudad."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Bento Item */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="md:col-span-2 bg-white p-10 md:p-14 rounded-[40px] border border-[var(--surface-container-high)] relative overflow-hidden group shadow-sm"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(252,14,48,0.25)]">
                    <Smartphone size={32} className="text-white" />
                  </div>
                  <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                    <p className="text-[10px] font-black uppercase text-green-600 tracking-wider">PageSpeed</p>
                    <p className="text-xl font-display font-black text-green-700">99/100</p>
                  </div>
                </div>
                <h3 className="headline-lg text-3xl md:text-5xl mb-6">Mobile First + Ultra Fast</h3>
                <p className="text-lg text-[var(--secondary)] max-w-lg mb-10 leading-relaxed">
                  El 90% de tus clientes potenciales buscarán tus servicios desde el móvil. Tu web está diseñada para ellos: carga instantánea en menos de 0.8s y llamada en 1 tap.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "React 18 Engine", icon: Zap },
                    { label: "Click-to-call direct", icon: Check },
                    { label: "Maps Integration", icon: Globe },
                    { label: "PWA Ready", icon: Smartphone }
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 text-sm font-bold text-[var(--on-surface)] bg-[var(--surface-container-low)] p-3 rounded-2xl">
                      <item.icon size={16} className="text-[var(--primary)]" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
              {/* Blurred background image */}
              <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tech bg" 
                  className="w-full h-full object-cover blur-[4px]"
                />
              </div>
            </motion.div>

            {/* Sidebar Bento Column */}
            <div className="flex flex-col gap-6">
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-[var(--inverse-surface)] p-10 rounded-[40px] text-white overflow-hidden relative group"
              >
                <div className="relative z-10">
                  <Rocket size={32} className="text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-2xl font-bold mb-4">Ultra Velocidad</h4>
                  <p className="text-white/60 text-sm leading-relaxed">Puntaje máximo en Google PageSpeed. Tu competencia no sabrá qué les pasó.</p>
                </div>
                {/* Blurred image */}
                <div className="absolute inset-0 opacity-10 grayscale group-hover:scale-125 transition-transform duration-[2000ms]">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" 
                    alt="Space bg" 
                    className="w-full h-full object-cover blur-[2px]"
                  />
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-[40px] border border-[var(--surface-container-high)] shadow-sm relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <Shield size={32} className="text-[var(--primary)] mb-6" />
                  <h4 className="text-2xl font-bold mb-4">Seguridad SSL</h4>
                  <p className="text-[var(--secondary)] text-sm leading-relaxed">Conexión cifrada y protección contra ataques. Tu negocio está a salvo.</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--primary)]/10 transition-colors"></div>
                {/* Blurred image */}
                <div className="absolute inset-0 opacity-[0.02] grayscale group-hover:scale-110 transition-transform duration-1000">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                    alt="Shield bg" 
                    className="w-full h-full object-cover blur-[8px]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bottom Row Bento */}
            {[
              { icon: Search, title: "SEO Local", desc: "Aparece antes que nadie cuando busquen tu oficio.", img: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20e?q=80&w=1000&auto=format&fit=crop" },
              { icon: MessageSquare, title: "Botón WhatsApp", desc: "Conversión de visita a chat en un segundo.", img: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1000&auto=format&fit=crop" },
              { icon: Layers, title: "Diseño único", desc: "Personalidad propia que genera autoridad.", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-[40px] border border-[var(--surface-container-high)] shadow-sm group hover:border-[var(--primary)] transition-colors relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[var(--surface-container-low)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)]/10 transition-colors">
                    <card.icon size={24} className="text-[var(--primary)]" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{card.title}</h4>
                  <p className="text-[var(--secondary)] text-sm leading-relaxed">{card.desc}</p>
                </div>
                {/* Blurred image highlight */}
                <div className="absolute inset-0 opacity-[0.015] grayscale group-hover:scale-110 transition-transform duration-1000">
                  <img 
                    src={card.img} 
                    alt="Section bg" 
                    className="w-full h-full object-cover blur-[10px]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodo" className="section-padding bg-white overflow-hidden">
        <div className="container relative">
          <SectionHeader 
            tag="El Método Websprint"
            title={<>De 0 a 100 <br/>en <span className="text-[var(--primary)]">48 horas.</span></>}
            description="Un proceso refinado para que tú te dediques a tu negocio mientras nosotros construimos tu presencia."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Steps Connector */}
            <div className="hidden md:block absolute top-[15%] left-0 right-0 h-[2px] bg-dashed bg-gray-100 -z-10"></div>
            
            {[
              { 
                step: "01", icon: MessageSquare, label: "Diagnóstico", 
                desc: "Un análisis rápido de 10 minutos por WhatsApp para definir objetivos." 
              },
              { 
                step: "02", icon: Paintbrush, label: "Desarrollo", 
                desc: "Sprint de 48h donde diseñamos, redactamos y programamos." 
              },
              { 
                step: "03", icon: Rocket, label: "Lanzamiento", 
                desc: "Web publicada, SEO activo y tú recibiendo las primeras consultas." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="w-20 h-20 bg-white border-2 border-[var(--surface-container-high)] rounded-[28px] flex items-center justify-center mb-8 relative z-10 group-hover:border-[var(--primary)] group-hover:shadow-2xl group-hover:shadow-[var(--primary-glow)] transition-all">
                  <item.icon size={32} className="text-[var(--primary)]" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--on-surface)] text-white text-[10px] font-black flex items-center justify-center border-4 border-white">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.label}</h3>
                <p className="text-[var(--secondary)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison/Conflict Section */}
      <section className="section-padding bg-[var(--on-surface)] text-white overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-20 items-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
          >
            <div className="p-8 rounded-[40px] bg-white text-[var(--on-surface)] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <X size={16} className="text-white" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-[var(--secondary)]">Situación Actual</span>
              </div>
              <ul className="space-y-6 mb-10">
                {[
                  "Tu negocio no existe en Google.",
                  "Pierdes presupuestos cada día.",
                  "Imagen antigua o inexistente.",
                  "Dependes del 'boca a boca' limitado."
                ].map((item) => (
                  <li key={item} className="flex gap-4 items-start border-b border-gray-100 pb-4 last:border-0">
                    <div className="mt-1 w-1.5 h-1.5 bg-gray-300 rounded-full flex-shrink-0" />
                    <p className="text-sm font-medium leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-100 p-6 rounded-3xl text-center"
              >
                <p className="text-xs uppercase font-black text-gray-400">Resultado</p>
                <p className="text-2xl font-bold">Estancamiento</p>
              </motion.div>
            </div>
          </motion.div>

          <div>
             <SectionHeader 
                tag="El Gran Cambio"
                title={<>No dejes <br/>dinero sobre <span className="text-[var(--primary)]">la mesa.</span></>}
                description="Mientras tú lo piensas, un negocio con menos experiencia pero mejor web se está llevando a tus clientes. Es hora de recuperar tu territorio digital."
                light
             />
             <div className="space-y-8 mb-12">
                {[
                  { label: "Atención al Cliente", val: "Automatizada vía WhatsApp" },
                  { label: "Captación", val: "Activa 24/7/365" },
                  { label: "Autoridad", val: "Líder en tu zona" }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-6">
                    <span className="text-white/60 text-sm font-bold uppercase tracking-widest">{row.label}</span>
                    <span className="text-white font-bold">{row.val}</span>
                  </div>
                ))}
             </div>
             <a href={getWaLink("¡Hola! He visto la comparativa y quiero el cambio.")} className="btn bg-white text-[var(--on-surface)] h-16 px-10 text-lg w-full sm:w-auto hover:bg-[var(--primary)] hover:text-white">
                Solicitar mi web profesional
                <ArrowRight size={20} className="ml-2" />
             </a>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="precios" className="section-padding bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
             <span className="text-[var(--primary)] font-black uppercase text-[10px] tracking-[0.2em]">Inversión Transparente</span>
             <h2 className="headline-lg">Tarifas que se pagan solas.</h2>
             <p className="text-[var(--secondary)]">Con solo 1 o 2 servicios nuevos recuperarás toda la inversión.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Basic Plan */}
             <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[var(--surface-container-low)] p-10 rounded-[48px] border border-[var(--surface-container-high)] flex flex-col justify-between"
             >
                <div>
                   <div className="flex justify-between items-center mb-8">
                      <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-white rounded-full">Base</span>
                      <Zap size={24} className="text-gray-300" />
                   </div>
                   <div className="flex items-baseline gap-2 mb-10">
                      <span className="text-5xl font-display font-black leading-none">80€</span>
                   </div>
                   <ul className="space-y-4 mb-10">
                      {["Web corporativa 1 página", "Optimización Móvil", "Enlace WhatsApp", "SSL Gratuito"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm font-semibold opacity-60">
                           <Check size={16} className="text-[var(--primary)]" strokeWidth={3} />
                           {item}
                        </li>
                      ))}
                   </ul>
                </div>
                <a href={getWaLink("Hola! Me interesa el plan Base de 80€.")} className="btn btn-outline h-14 w-full">Elegir Plan Base</a>
             </motion.div>

             {/* Premium Plan */}
             <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[var(--on-surface)] p-12 rounded-[48px] text-white flex flex-col justify-between relative shadow-2xl overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-4">
                   <div className="bg-[var(--primary)] text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">Recomendado</div>
                </div>
                <div>
                   <div className="flex justify-between items-center mb-8">
                      <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full">Pro Sprint</span>
                      <Rocket size={24} className="text-[var(--primary)]" />
                   </div>
                   <div className="flex items-baseline gap-2 mb-10">
                      <span className="text-7xl font-display font-black leading-none">150€</span>
                   </div>
                   <ul className="space-y-5 mb-10">
                      {["Web Multipágina (Servicios)", "SEO Local Intensivo", "Acompañamiento 48h", "Integración completa Google", "Priority Support"].map(item => (
                        <li key={item} className="flex items-center gap-4 text-sm font-bold">
                           <div className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--primary-glow)]">
                              <Check size={12} className="text-white" strokeWidth={4} />
                           </div>
                           {item}
                        </li>
                      ))}
                   </ul>
                </div>
                <a href={getWaLink("¡Hola! Quiero el plan PRO de 150€. Quiero volar.")} className="btn btn-primary btn-shine h-16 w-full text-lg">Activar Pro Sprint</a>
             </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--surface-container)] text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 mask-radial" />
        <div className="container relative z-10">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-4xl mx-auto"
           >
              <h2 className="headline-xl mb-8">El futuro no espera. <br />Tu <span className="text-[var(--primary)]">web nueva</span> tampoco.</h2>
              <p className="text-xl text-[var(--secondary)] mb-12 max-w-xl mx-auto">Únete a la liga de los negocios que dominan internet. Entrega garantizada antes del fin de semana.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <a href={getWaLink("¡Acepto el reto! Empecemos ya.")} className="btn btn-primary btn-shine h-20 px-14 text-xl group shadow-2xl">
                    Agendar Inicio Proyecto
                    <Rocket size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
                 </a>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="container">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="md:col-span-1">
                 <img src={logoUrl} alt="Websprint" className="h-12 w-auto mb-8" />
                 <p className="text-sm text-[var(--secondary)] leading-relaxed mb-8">Construimos la presencia digital de los que hacen el trabajo duro. Calidad élite en tiempo récord.</p>
                 <div className="flex gap-4">
                    {[Zap, Globe, Shield].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[var(--primary)] transition-colors cursor-pointer">
                        <Icon size={18} />
                      </div>
                    ))}
                 </div>
              </div>
              
              <div>
                 <h5 className="font-bold uppercase tracking-widest text-xs mb-8">Directorio</h5>
                 <ul className="space-y-4 text-sm font-semibold text-[var(--secondary)]">
                    <li><a href="#servicios" className="hover:text-[var(--primary)] transition-colors">Servicios</a></li>
                    <li><a href="#metodo" className="hover:text-[var(--primary)] transition-colors">Método 48h</a></li>
                    <li><a href="#precios" className="hover:text-[var(--primary)] transition-colors">Precios</a></li>
                    <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Aviso Legal</a></li>
                 </ul>
              </div>

              <div>
                 <h5 className="font-bold uppercase tracking-widest text-xs mb-8">Especialidades</h5>
                 <ul className="space-y-4 text-sm font-semibold text-[var(--secondary)]">
                    <li className="flex items-center gap-2"><Smartphone size={14} className="text-[var(--primary)]" /> Web Móvil</li>
                    <li className="flex items-center gap-2"><Search size={14} className="text-[var(--primary)]" /> SEO Local</li>
                    <li className="flex items-center gap-2"><Shield size={14} className="text-[var(--primary)]" /> Seguridad WCAG</li>
                 </ul>
              </div>

              <div>
                 <h5 className="font-bold uppercase tracking-widest text-xs mb-8">Unidad Móvil</h5>
                 <div className="bg-[var(--surface-container-low)] p-6 rounded-3xl border border-[var(--surface-container-high)]">
                    <p className="text-xs font-bold uppercase text-[var(--secondary)] tracking-widest mb-4">WhatsApp Directo</p>
                    <a href={getWaLink()} className="text-xl font-bold hover:text-[var(--primary)] transition-colors">
                      {atob(encodedPhone).replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4")}
                    </a>
                    <div className="flex items-center gap-2 mt-4 text-[10px] uppercase font-black text-green-500">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                       En línea ahora
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-gray-50 text-[var(--secondary)] text-[10px] font-bold uppercase tracking-[0.2em]">
              <p>© 2026 Websprint Digital Agency. Reservados todos los derechos.</p>
              <div className="flex gap-8">
                 <span className="flex items-center gap-2"><Clock size={12} /> Cero Retrasos</span>
                 <span className="flex items-center gap-2 text-[var(--primary)]"><Zap size={12} fill="currentColor" /> Potenciado por IA</span>
              </div>
           </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a 
         href={getWaLink("Hola! Necesito ayuda para una web nueva.")}
         target="_blank" rel="noopener noreferrer"
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}
         className="fixed bottom-10 right-10 w-16 h-16 bg-[#25D366] text-white rounded-2xl shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center z-[500] group"
      >
         <MessageSquare size={32} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
      </motion.a>
    </div>
  );
}
