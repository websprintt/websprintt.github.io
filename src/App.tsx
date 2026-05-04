/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Menu, X, Send, ChevronRight, AlertTriangle, Layers, Smartphone, 
  Zap, Search, Globe, Lock, Users, Check, MessageSquare, Paintbrush, 
  Key, Droplet, Home, Truck, Palette 
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const logoUrl = "https://raw.githubusercontent.com/websprintt/websprintt.github.io/e7fc2c370ab1c9abfa7933ea04e7f4683121fb86/im%C3%A1genes/Logo_sin-fondo_.webp";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const industries = [
    { icon: Zap, label: "Electricistas" },
    { icon: Key, label: "Cerrajeros" },
    { icon: Droplet, label: "Fontaneros" },
    { icon: Home, label: "Reformas" },
    { icon: Truck, label: "Mudanzas" },
    { icon: Paintbrush, label: "Pintores" },
    { icon: Palette, label: "Arquitectos" },
    { icon: Smartphone, label: "Comercios" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--primary)] z-[100] origin-left"
        style={{ scaleX }}
      />
      {/* Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[1000] focus:bg-[var(--primary)] focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-bold">
        Saltar al contenido principal
      </a>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-[var(--surface-container-high)] py-2 shadow-md' : 'bg-transparent py-4'}`}>
        <div className={`container flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-40'}`}>
          <a href="#" className="flex items-center transition-transform hover:scale-105">
            <img src={logoUrl} alt="Websprint Logo" className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-12' : 'h-32'}`} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              <li><a href="#servicios" className="nav-link">Servicios</a></li>
              <li><a href="#proceso" className="nav-link">Proceso</a></li>
              <li><a href="#precios" className="nav-link">Precios</a></li>
            </ul>
            <a href="https://wa.me/34742090991" target="_blank" rel="noopener noreferrer" className="btn btn-primary !h-11 !px-5 !text-xs !tracking-widest uppercase">
              Contacto
            </a>
          </nav>
          {/* ... resto del header ... */}

          {/* Mobile Toggle */}
          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-lg text-[var(--on-surface)]"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-[var(--surface-container-high)] p-6 shadow-xl md:hidden"
            >
              <ul className="flex flex-col gap-2">
                <li><a href="#servicios" onClick={() => setIsMenuOpen(false)} className="nav-link w-full">Servicios</a></li>
                <li><a href="#proceso" onClick={() => setIsMenuOpen(false)} className="nav-link w-full">Proceso</a></li>
                <li><a href="#precios" onClick={() => setIsMenuOpen(false)} className="nav-link w-full">Precios</a></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-[var(--surface-container-high)]">
                <a href="https://wa.me/34742090991" className="btn btn-primary w-full">
                  Contacto por WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-white">
          <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none mask-radial" aria-hidden="true"></div>
          
          <div className="container relative z-10 max-w-4xl">
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 md:right-0 opacity-10 pointer-events-none">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Layers size={120} className="text-[var(--primary)]" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-[var(--primary)] text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 shadow-[0_4px_12px_rgba(252,14,48,0.2)]">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                Servicio Express: 48h
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              Consigue más clientes con una web en <span className="text-[var(--primary)]">48 horas</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--secondary)] leading-relaxed mb-10 max-w-2xl"
            >
              Creamos páginas web simples, rápidas y optimizadas para que tu negocio empiece a captar clientes desde el primer minuto. Sin fricción, sin esperas.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="https://wa.me/34742090991" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-shine group !h-14 !px-8 text-lg">
                Activar mi proyecto ahora
                <Zap className="transition-transform group-hover:scale-125" size={20} fill="currentColor" />
              </a>
              <a href="#proceso" className="btn btn-outline !h-14 !px-8 text-lg">
                Ver método
              </a>
            </motion.div>
          </div>
        </section>

        {/* Industry Marquee */}
        <div className="bg-white py-6 border-b border-[var(--surface-container-high)] overflow-hidden relative">
          <div className="flex overflow-hidden">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap px-4"
            >
              {[...industries, ...industries, ...industries].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-[var(--secondary)] font-bold text-sm uppercase tracking-widest grayscale hover:grayscale-0 transition-all cursor-default">
                  <item.icon size={20} className="text-[var(--primary)]" />
                  {item.label}
                  <span className="ml-8 text-[var(--surface-container-highest)]">/</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Problem Section */}
        <section className="section bg-white border-y border-[var(--surface-container-high)]">
          <div className="container grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-[var(--error)] mb-6">
                <AlertTriangle size={20} />
                <span className="label-bold">Urgencia Digital</span>
              </div>
              <h2 className="headline-lg mb-8">
                Cada hora que pasas offline es un <span className="text-[var(--primary)]">cliente perdido.</span>
              </h2>
              <p className="body-lg text-[var(--secondary)] mb-8">
                En el sector servicios, la velocidad lo es todo. Si un cliente busca "electricista" o "reformas" ahora mismo y no apareces, llamará al siguiente en la lista. 
              </p>
              <div className="grid grid-cols-2 gap-6 p-6 bg-[var(--surface-container-low)] rounded-2xl border border-[var(--surface-container-high)]">
                <div>
                  <div className="text-3xl font-bold text-[var(--primary)] mb-1">94%</div>
                  <p className="text-xs text-[var(--secondary)] uppercase tracking-wider font-bold">Confían en webs profesionales</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--primary)] mb-1">0.05s</div>
                  <p className="text-xs text-[var(--secondary)] uppercase tracking-wider font-bold">Tiempo en crear una impresión</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-8 md:p-12 relative overflow-hidden border border-[var(--surface-container-high)] shadow-sm group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] blur-[120px] opacity-10 -mr-32 -mt-32 group-hover:opacity-20 transition-opacity"></div>
              
              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[var(--surface-container-high)]">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <X className="text-white" size={20} />
                </div>
                <span className="text-[var(--on-surface)] font-bold tracking-widest uppercase text-xs">Lo que te frena</span>
              </div>

              <ul className="space-y-8 mb-12">
                {[
                  "Tu competencia se lleva el 80% de los presupuestos online.",
                  "Das una imagen 'amateur' sin una web optimizada.",
                  "Pierdes tiempo explicando cosas que tu web ya debería decir."
                ].map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0"></div>
                    <span className="text-[var(--secondary)] font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <a href="https://wa.me/34742090991" target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full shadow-lg">
                Cambiar esto hoy mismo
              </a>
            </motion.div>
          </div>
        </section>

        {/* Features Section (Bento Grid Style) */}
        <section id="servicios" className="section bg-[var(--surface-container-low)]">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-20"
            >
              <span className="text-[var(--primary)] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Potencial Tecnológico</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">Arquitectura de alto rendimiento para tu negocio.</h2>
              <p className="text-xl text-[var(--secondary)]">No solo es una web bonita. Es una herramienta de captación calibrada.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
              {/* Main Feature - Large */}
              <motion.div 
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-6 lg:col-span-8 bg-white p-8 rounded-[32px] border border-[var(--surface-container-high)] flex flex-col justify-between group overflow-hidden relative shadow-sm"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[var(--primary)] rounded-2xl flex items-center justify-center mb-6 shadow-[0_8px_16px_rgba(252,14,48,0.2)]">
                    <Zap className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Conversión Inmediata con WhatsApp</h3>
                  <p className="text-[var(--secondary)] max-w-md mb-8">Convertimos las visitas en chats reales en segundos. Sin formularios infinitos que nadie rellena.</p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--surface-container)] rounded-full group-hover:scale-110 transition-transform duration-500 opacity-50"></div>
                <div className="mt-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">Máxima velocidad de respuesta</span>
                </div>
              </motion.div>

              {/* Smaller features */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                className="md:col-span-6 lg:col-span-4 bg-[var(--inverse-surface)] p-8 rounded-[32px] text-white flex flex-col justify-between"
              >
                <Smartphone size={32} className="text-[var(--primary)] mb-8" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Mobile First</h3>
                  <p className="text-white/60 text-sm">El 90% de tus clientes te buscarán desde el móvil. Optimizamos esa experiencia primero.</p>
                </div>
              </motion.div>

              {[
                { icon: Search, title: "Google Ready", text: "Estructura SEO optimizada.", cols: "lg:col-span-3" },
                { icon: Lock, title: "100% Segura", text: "SSL y seguridad máxima.", cols: "lg:col-span-3" },
                { icon: Globe, title: "Fast Hosting", text: "Carga en milisegundos.", cols: "lg:col-span-3" },
                { icon: Layers, title: "Diseño Único", text: "Nada de plantillas clónicas.", cols: "lg:col-span-3" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className={`${feature.cols} bg-white p-6 rounded-[24px] border border-[var(--surface-container-high)] hover:border-[var(--primary)] transition-colors group`}
                >
                  <feature.icon className="text-[var(--primary)] mb-4 transition-transform group-hover:scale-110" size={24} />
                  <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-[var(--secondary)]">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="proceso" className="section bg-white overflow-hidden">
          <div className="container relative">
            <div className="max-w-2xl mb-24">
              <span className="text-[var(--primary)] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block">Hoja de ruta</span>
              <h2 className="headline-lg mb-6">Tu negocio en línea, <span className="text-[var(--primary)]">paso a paso.</span></h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-16">
              {[
                { 
                  step: "01", 
                  title: "Briefing Relámpago", 
                  text: "Hablamos 10 minutos por WhatsApp. Capturamos la esencia de tu negocio y servicios estrella.",
                  icon: MessageSquare 
                },
                { 
                  step: "02", 
                  title: "Construcción", 
                  text: "Trabajamos en paralelo: diseño, desarrollo y textos de venta en un sprint de máximo 48 horas.",
                  icon: Paintbrush 
                },
                { 
                  step: "03", 
                  title: "Lanzamiento", 
                  text: "Revisas la web, hacemos los ajustes finales y ¡BOOM! Estás captando clientes en Google.",
                  icon: Zap 
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative"
                >
                  <div className="text-[120px] font-display font-black text-[var(--surface-container)] absolute -top-20 -left-4 -z-10 select-none opacity-40">
                    {item.step}
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-16 h-16 bg-white border border-[var(--surface-container-high)] rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:border-[var(--primary)] group-hover:shadow-[0_0_20px_rgba(252,14,48,0.3)] transition-all duration-300"
                  >
                    <item.icon size={28} className="text-[var(--primary)]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="body-md text-[var(--secondary)] leading-relaxed">{item.text}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-7 left-full w-full h-[1px] bg-dashed bg-[var(--surface-container-high)] -z-20 ml-8"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="precios" className="section bg-[var(--inverse-surface)] text-white overflow-hidden relative">
          <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" aria-hidden="true"></div>
          <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2px] bg-[var(--primary)]"></div>
                <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs">Inversión Inteligente</span>
              </div>
              <h2 className="headline-lg text-white mb-8 leading-tight">Recupera tu inversión <br/><span className="text-[var(--primary)]">en tiempo récord.</span></h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">No es un gasto, es el motor de tu negocio. Una tarifa única, transparente y sin sorpresas finales.</p>
              
              <div className="flex items-center gap-6 text-white/50">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-tight">80€</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest">Base</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white tracking-tight">150€</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest">Premium</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[40px] p-8 md:p-14 relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] group"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--primary)]"></div>
              
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-[var(--on-surface)] text-2xl font-bold mb-2">Proyecto Web Completo</h3>
                  <p className="text-[var(--secondary)] text-sm">Todo incluido, listo para facturar.</p>
                </div>
                <Zap size={32} className="text-[var(--primary)] animate-pulse" />
              </div>

              <ul className="space-y-5 mb-12">
                {[
                  "Diseño exclusivo y optimizado",
                  "Entrega relámpago en 48 horas",
                  "Dominio y Hosting (gestión total)",
                  "Botones de acción directa (WhatsApp)",
                  "Integración con Google Maps"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-[var(--on-surface)] font-semibold">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="text-[var(--primary)]" size={14} strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="https://wa.me/34742090991" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-shine w-full !h-16 text-lg group">
                Reservar mi turno ahora
                <ChevronRight className="transition-transform group-hover:translate-x-2" size={20} />
              </a>
              
              <p className="text-center mt-6 text-xs text-[var(--secondary)] font-medium">
                * Slots limitados por semana para garantizar la velocidad de entrega.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section bg-white text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none mask-radial" aria-hidden="true"></div>
          <div className="container max-w-3xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="headline-lg mb-8 leading-tight">¿Listos para llevar tu negocio <br/><span className="text-[var(--primary)] text-6xl md:text-8xl">al siguiente nivel?</span></h2>
              <p className="body-lg text-[var(--secondary)] mb-12 max-w-xl mx-auto">La velocidad es una ventaja competitiva. Mientras lo piensas, tu competencia ya está pidiendo su presupuesto.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="https://wa.me/34742090991" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-shine !h-16 !px-12 text-lg group">
                  <Zap size={24} fill="currentColor" className="mr-3" />
                  Hablar con un experto ahora
                </a>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale">
                <Smartphone size={24} />
                <Globe size={24} />
                <Zap size={24} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--inverse-surface)] py-20 text-white/60">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <a href="#" className="inline-block mb-6 transition-transform hover:scale-105">
                <img src={logoUrl} alt="Websprint Logo" className="h-20 w-auto brightness-0 invert" />
              </a>
              <p className="text-sm leading-relaxed mb-6">
                Ayudamos a pequeños negocios y autónomos a dar el salto digital con webs de alto rendimiento entregadas en tiempo récord.
              </p>
              <div className="flex gap-4">
                {[MessageSquare, Globe, Zap].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -3, color: '#fc0e30' }}
                    href="#" 
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center transition-colors hover:bg-white/10"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Servicios</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#servicios" className="hover:text-[var(--primary)] transition-colors">Diseño Web</a></li>
                <li><a href="#servicios" className="hover:text-[var(--primary)] transition-colors">Optimización Móvil</a></li>
                <li><a href="#servicios" className="hover:text-[var(--primary)] transition-colors">SEO para Negocios</a></li>
                <li><a href="#proceso" className="hover:text-[var(--primary)] transition-colors">Hosting Express</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Compañía</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#proceso" className="hover:text-[var(--primary)] transition-colors">Método 48h</a></li>
                <li><a href="#precios" className="hover:text-[var(--primary)] transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Aviso Legal</a></li>
                <li><a href="#" className="hover:text-[var(--primary)] transition-colors">Privacidad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contacto Directo</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-[var(--primary)]" />
                  <a href="https://wa.me/34742090991" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">34 742 090 991</a>
                </li>
                <li className="flex items-center gap-3">
                  <Zap size={16} className="text-[var(--primary)]" />
                  <span>Atención 24/7 vía WhatsApp</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe size={16} className="text-[var(--primary)]" />
                  <span>Servicio en toda España</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-xs">© 2024 Websprint. Todos los derechos reservados. Diseño y ejecución a máxima velocidad.</p>
            <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest opacity-40">
              <span>Hecho con <Zap size={10} className="inline mb-0.5" fill="currentColor"/> en 48h</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/34742090991" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl z-[100] hover:scale-110 transition-transform active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        <MessageSquare size={28} fill="currentColor" />
      </a>
    </div>
  );
}
