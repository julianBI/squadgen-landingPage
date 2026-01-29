import React from 'react';
import { Brain, Scale, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import HeroSequence from './components/HeroSequence';

function App() {
  return (
    <div className="bg-brand-dark text-white min-h-screen selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3">
          <div className="text-2xl font-extrabold tracking-tight">
            Squad<span className="text-blue-500">Gen</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
            <a href="#caracteristicas" className="hover:text-blue-400 transition-colors">Características</a>
          </div>
          <div>
            <a href="https://julianbi.github.io/squadgen-balancer/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-all text-sm font-semibold inline-block">
              Lanzar App
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section with 3D Sequence */}
        <div className="relative">
          <HeroSequence frameCount={240} />

          <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none -mt-[100vh]">
            <div className="max-w-4xl pointer-events-auto">
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-600 text-white text-xs font-bold tracking-widest uppercase">
                Powered by Google Gemini AI
              </span>
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-tight text-white" style={{ textShadow: '2px 2px 30px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.9)' }}>
                Equipos Perfectos.<br />
                <span className="text-blue-400" style={{ textShadow: '2px 2px 30px rgba(0,0,0,1), 0 0 40px rgba(59,130,246,0.5)' }}>Sin Discusiones.</span>
              </h1>
              <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 15px rgba(0,0,0,1)' }}>
                Deja de perder tiempo equilibrando equipos. SquadGen analiza estadísticas y tácticas con Google Gemini para crear el partido más justo de tu vida en segundos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="https://julianbi.github.io/squadgen-balancer/" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition-all flex items-center gap-2 text-white shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                  EMPEZAR AHORA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Section Spacer to allow scrolling through the animation */}
          <div className="h-[150vh]" />
        </div>

        {/* Value Section */}
        <section id="caracteristicas" className="py-32 px-6 relative z-10 bg-brand-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="glass p-8 rounded-3xl hover:border-blue-500/30 transition-all border border-transparent group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                  <Brain className="text-blue-500 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Motor Gemini</h3>
                <p className="text-slate-400 leading-relaxed">
                  No es solo un algoritmo, es un Director Técnico virtual que analiza compatibilidad, roles y química de equipo.
                </p>
              </div>
              {/* Card 2 */}
              <div className="glass p-8 rounded-3xl hover:border-blue-500/30 transition-all border border-transparent group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                  <Scale className="text-blue-500 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Balance Real</h3>
                <p className="text-slate-400 leading-relaxed">
                  Adiós a los partidos desiguales. Equilibra basándote en nivel, edad y posición real de cada jugador automáticamente.
                </p>
              </div>
              {/* Card 3 */}
              <div className="glass p-8 rounded-3xl hover:border-blue-500/30 transition-all border border-transparent group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                  <ShieldCheck className="text-blue-500 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-4">Privacidad Total</h3>
                <p className="text-slate-400 leading-relaxed">
                  Tus datos no salen de tu celular. Rápido, offline y privado gracias a nuestra arquitectura PWA moderna.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="py-32 px-6 text-center relative overflow-hidden bg-brand-dark">
          <div className="absolute inset-0 bg-blue-900/10 -z-10 blur-[100px]" />
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 italic">¿Listo para el próximo partido?</h2>
            <p className="text-slate-400 mb-12">
              Únete a los capitanes que ya no pierden tiempo discutiendo en el chat de WhatsApp.
            </p>
            <a href="https://julianbi.github.io/squadgen-balancer/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand-dark font-black rounded-2xl hover:bg-slate-200 transition-all shadow-xl hover:scale-105">
              LANZAR SQUADGEN
              <Zap className="w-5 h-5 fill-current" />
            </a>
            <div className="mt-20 pt-10 border-t border-white/5 text-slate-500 text-sm">
              &copy; 2026 SquadGen AI. Todos los derechos reservados. | Powered by <span className="text-blue-400 font-semibold">JALC</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
