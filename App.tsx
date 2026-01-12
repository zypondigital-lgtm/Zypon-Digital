import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingCart, CheckCircle2, Clock, MessageCircle, ArrowRight, 
  ShieldCheck, Zap, Lock, Unlock, TrendingUp, BookOpen, 
  AlertCircle, ChevronDown, UserCheck, Star, Sparkles, X 
} from 'lucide-react';
import { 
  WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CATEGORIES, ROADMAP, FAQ, CHECKOUT_NAMES 
} from './constants';
import { CountdownTime } from './types';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ hours: 4, minutes: 0, seconds: 0 });
  const [notification, setNotification] = useState<typeof CHECKOUT_NAMES[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // WhatsApp Redirect
  const handleWhatsAppClick = useCallback(() => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  }, []);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          if (minutes > 0) { minutes--; seconds = 59; }
          else {
            if (hours > 0) { hours--; minutes = 59; seconds = 59; }
            else return { hours: 4, minutes: 0, seconds: 0 };
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Checkout Notification
  useEffect(() => {
    const showNotification = () => {
      const randomIndex = Math.floor(Math.random() * CHECKOUT_NAMES.length);
      setNotification(CHECKOUT_NAMES[randomIndex]);
      setTimeout(() => setNotification(null), 5000);
    };
    const interval = setInterval(showNotification, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0 grid-pattern overflow-x-hidden selection:bg-orange-500/30">
      
      {/* Notification Pop-up */}
      {notification && (
        <div className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-[100] animate-notification">
          <div className="glass-dark border border-orange-500/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.2)] flex items-center gap-4 max-w-xs">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
              <UserCheck className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight"><span className="text-orange-500">{notification.name}</span> baru saja membeli!</p>
              <p className="text-xs text-gray-400">{notification.city} • {notification.time}</p>
            </div>
            <button onClick={() => setNotification(null)} className="ml-2 text-gray-500 hover:text-white">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[60%] -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-orange-500 w-6 h-6 fill-orange-500" />
            <span className="font-black text-xl tracking-tighter italic uppercase">ZYPON<span className="text-orange-500"> DIGITAL</span></span>
          </div>
          <button onClick={handleWhatsAppClick} className="hidden md:block bg-orange-500 hover:bg-orange-400 text-black px-6 py-2 rounded-xl font-black transition-all">
            AMBIL PROMO 20K
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-6 tracking-tighter italic">
            STOP JUALAN WAKTU.<br />
            <span className="text-orange-500 text-glow-orange">MULAI JUALAN ASET.</span>
          </h1>
          <p className="text-lg md:text-2xl font-bold text-gray-400 max-w-3xl mx-auto mb-10 leading-snug">
            Cuma modal Rp 20rb, dapet 1500+ produk digital siap jual. <span className="text-white underline decoration-orange-500">Ubah HP lo jadi mesin duit</span> mulai hari ini!
          </p>
          <button onClick={handleWhatsAppClick} className="w-full md:w-auto bg-orange-500 hover:bg-orange-400 text-black py-6 px-10 rounded-3xl font-black text-xl shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all">
            🔥 KLIK UNTUK AKSES SEKARANG
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          © 2024 ZYPON DIGITAL. ALL RIGHTS RESERVED.
        </div>
      </footer>

      <style>{`
        @keyframes slideInUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-notification { animation: slideInUp 0.5s ease-out forwards; }
        .text-glow-orange { text-shadow: 0 0 10px rgba(249,115,22,0.5); }
      `}</style>
    </div>
  );
};

export default App;
