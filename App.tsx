
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingCart, CheckCircle2, Clock, MessageCircle, ArrowRight, 
  ShieldCheck, Zap, Lock, Unlock, TrendingUp, BookOpen, 
  AlertCircle, ChevronDown, UserCheck, Star, Sparkles, X 
} from 'lucide-react';
import { 
  WHATSAPP_NUMBER, WHATSAPP_MESSAGE, BENEFITS, 
  PAIN_POINTS, CATEGORIES, ROADMAP, FAQ, CHECKOUT_NAMES 
} from './constants';
import { CountdownTime } from './types';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ hours: 4, minutes: 0, seconds: 0 });
  const [notification, setNotification] = useState<typeof CHECKOUT_NAMES[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // WhatsApp Redirect Handler
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

  // Checkout Notification Logic
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
      {/* Real-time Checkout Notification Pop-up */}
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
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border-2 border-orange-500 bg-black/50 mb-8 animate-pulse">
            <AlertCircle className="text-orange-500 w-5 h-5" />
            <span className="text-sm md:text-lg font-black tracking-widest italic uppercase">ZYPON <span className="text-orange-500">DIGITAL</span></span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-6 tracking-tighter italic">
            STOP JUALAN WAKTU.<br />
            <span className="text-orange-500 text-glow-orange">MULAI JUALAN ASET.</span>
          </h1>

          <p className="text-lg md:text-2xl font-bold text-gray-400 max-w-3xl mx-auto mb-10 leading-snug">
            Cuma modal Rp 20rb, dapet 1500+ produk digital siap jual. <span className="text-white underline decoration-orange-500">Ubah HP lo jadi mesin duit</span> mulai hari ini!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="glass-dark border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="text-green-500" /> <span className="font-bold">Tanpa Stok Barang</span>
            </div>
            <div className="glass-dark border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="text-green-500" /> <span className="font-bold">Keuntungan 100%</span>
            </div>
            <div className="glass-dark border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="text-green-500" /> <span className="font-bold">Mentor Bimbingan</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-dark p-8 rounded-[40px] border border-white/10">
                   <div className="flex justify-between items-start mb-10">
                      <div className="p-4 bg-orange-500/20 rounded-2xl border border-orange-500/30">
                         <Unlock className="w-10 h-10 text-orange-500" />
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-gray-500 uppercase">Status Akses</p>
                         <p className="text-green-500 font-bold">READY TO UNLOCK</p>
                      </div>
                   </div>
                   <div className="space-y-6 text-left">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-black text-orange-500 border border-white/10">01</div>
                         <div>
                            <p className="font-black uppercase italic">1500++ Vault Ebook</p>
                            <p className="text-xs text-gray-500">Niche: Bisnis, Crypto, Design, Diet, dll.</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-black text-orange-500 border border-white/10">02</div>
                         <div>
                            <p className="font-black uppercase italic">Master Mentoring</p>
                            <p className="text-xs text-gray-500">Strategi jualan 0 - 100jt per bulan.</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-black text-orange-500 border border-white/10">03</div>
                         <div>
                            <p className="font-black uppercase italic">Marketing Kit</p>
                            <p className="text-xs text-gray-500">Banner, Copywriting, & Video Ads.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="text-left space-y-8">
                <h2 className="text-3xl md:text-5xl font-black uppercase italic leading-tight">
                  Investasi <span className="text-orange-500 underline underline-offset-8">Sekali</span>, Cuan <span className="text-cyan-400">Berkali-kali</span>.
                </h2>
                <p className="text-gray-400 font-medium">
                  Bayangkan kamu punya ribuan aset yang bisa dijual kapanpun tanpa modal tambahan lagi. Gak perlu ijazah, gak perlu interview kerja yang ribet.
                </p>
                <div className="p-6 bg-orange-500/5 border-l-4 border-orange-500 rounded-r-3xl">
                   <p className="italic font-bold text-lg">"Gue mahasiswa, modal 20rb iseng beli. Eh seminggu kemudian udah dapet 1.5jt cuma dari jualan ulang ebook diet & bisnis. GOKIL!" - Rian (21th)</p>
                </div>
                <button onClick={handleWhatsAppClick} className="w-full bg-orange-500 hover:bg-orange-400 text-black py-6 rounded-3xl font-black text-xl shadow-[0_0_40px_rgba(249,115,22,0.4)] flex items-center justify-center gap-4 transition-all">
                  🔥 KLIK UNTUK AKSES SEKARANG
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-16">Pilih Jalur <span className="text-orange-500">Masa Depanmu</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-dark p-10 rounded-[40px] border border-white/5 opacity-60">
               <h3 className="text-2xl font-black mb-8 italic uppercase">Jalur Konvensional</h3>
               <ul className="space-y-4 text-left">
                  <li className="flex items-center gap-3 text-red-400"><X className="shrink-0" /> Kerja 8-10 jam per hari</li>
                  <li className="flex items-center gap-3 text-red-400"><X className="shrink-0" /> Gaji pas-pasan (Fixed Income)</li>
                  <li className="flex items-center gap-3 text-red-400"><X className="shrink-0" /> Berangkat pagi pulang malem</li>
                  <li className="flex items-center gap-3 text-red-400"><X className="shrink-0" /> Gak punya waktu buat keluarga</li>
               </ul>
            </div>
            <div className="neon-border-orange bg-black/60 p-10 rounded-[40px] relative">
               <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-500 text-black px-6 py-1 rounded-full font-black text-sm uppercase">REKOMENDASI</div>
               <h3 className="text-2xl font-black mb-8 italic uppercase text-orange-500">Jalur Digital Kit</h3>
               <ul className="space-y-4 text-left">
                  <li className="flex items-center gap-3 text-cyan-400"><CheckCircle2 className="shrink-0" /> Kerja kapan aja sesuka hati</li>
                  <li className="flex items-center gap-3 text-cyan-400"><CheckCircle2 className="shrink-0" /> Profit UNLIMITED (Skala Global)</li>
                  <li className="flex items-center gap-3 text-cyan-400"><CheckCircle2 className="shrink-0" /> Sambil rebahan bisa dapet duit</li>
                  <li className="flex items-center gap-3 text-cyan-400"><CheckCircle2 className="shrink-0" /> Aset digital jualan 24/7</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inside the Vault Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">ISI <span className="text-orange-500">BRANKAS</span> DIGITAL</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest">Ribuan Niche Siap Jual - 100% Hak Milik Kamu</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="glass-dark border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-500 transition-colors group">
                   <div className="w-10 h-10 bg-orange-500/10 rounded-xl mb-3 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-colors">
                      <Sparkles size={20} />
                   </div>
                   <span className="font-black text-[10px] md:text-xs uppercase italic">{cat}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Mentoring Roadmap Section */}
      <section className="py-24 px-4 bg-orange-500/5 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-center mb-20 tracking-tighter">ROADMAP <span className="text-orange-500">CUAN</span> 10JT PERTAMA</h2>
          <div className="grid md:grid-cols-4 gap-8">
             {ROADMAP.map((item, i) => (
               <div key={i} className="relative">
                  <div className="text-8xl font-black text-white/5 absolute -top-10 left-0 leading-none">{item.step}</div>
                  <div className="relative z-10 pt-10">
                     <h4 className="text-2xl font-black italic uppercase text-orange-500 mb-4">{item.title}</h4>
                     <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-10 leading-none">WAKTU TERUS <span className="text-red-500">BERJALAN...</span></h2>
          
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16 max-w-lg mx-auto">
            {['hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="bg-black border-2 border-orange-500 p-6 rounded-[32px] shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <span className="block text-4xl md:text-6xl font-black text-orange-500">
                  {timeLeft[unit as keyof CountdownTime].toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{unit}</span>
              </div>
            ))}
          </div>

          <div className="glass-dark border-4 border-dashed border-orange-500/50 p-12 rounded-[50px] mb-12 transform hover:scale-105 transition-transform">
             <div className="mb-4">
                <p className="text-xl font-bold line-through text-white/30 italic uppercase">HARGA NORMAL: Rp 199.000</p>
                <div className="flex items-center justify-center gap-4">
                   <p className="text-6xl md:text-8xl font-black text-orange-500 tracking-tighter">Rp 20.000</p>
                </div>
             </div>
             <p className="text-cyan-400 font-black text-lg italic animate-pulse">DISKON GILA 90% KHUSUS HARI INI!</p>
          </div>

          <button onClick={handleWhatsAppClick} className="w-full bg-white text-black py-8 rounded-[32px] font-black text-2xl md:text-3xl shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:bg-orange-500 transition-all uppercase italic flex items-center justify-center gap-4 group">
            🚀 AMBIL SEKARANG SEBELUM NAIK!
          </button>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-black uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-500" /> Payment Aman</span>
            <span className="flex items-center gap-2"><Lock size={16} className="text-cyan-500" /> Akses Privat</span>
            <span className="flex items-center gap-2"><TrendingUp size={16} className="text-orange-500" /> Jaminan Bimbingan</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black italic uppercase text-center mb-16">PERTANYAAN <span className="text-orange-500">UMUM</span></h2>
          <div className="space-y-4">
             {FAQ.map((item, i) => (
               <div key={i} className="glass-dark rounded-2xl border border-white/5 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <span className="font-black italic uppercase tracking-tight">{item.q}</span>
                    <ChevronDown className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-6 pt-0 text-gray-400 font-medium leading-relaxed border-t border-white/5">
                      {item.a}
                    </div>
                  )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final Social Proof */}
      <section className="py-24 px-4 text-center">
         <div className="max-w-4xl mx-auto">
            <div className="flex justify-center -space-x-4 mb-8">
               {[...Array(5)].map((_, i) => (
                 <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-16 h-16 rounded-full border-4 border-zinc-950" alt="user" />
               ))}
               <div className="w-16 h-16 rounded-full border-4 border-zinc-950 bg-orange-500 flex items-center justify-center font-black text-black">10K+</div>
            </div>
            <h3 className="text-2xl font-black uppercase italic mb-4">Gabung bersama 10.000+ member lainnya</h3>
            <p className="text-gray-500 font-bold mb-10">Jangan biarkan peluang ini diambil orang lain. Masa depanmu ada di tanganmu sendiri.</p>
            <div className="flex justify-center items-center gap-2 text-yellow-500 mb-12">
               {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
               <span className="text-white font-black ml-2 text-xl italic">4.9/5 Rating</span>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Zap className="text-orange-500 w-8 h-8 fill-orange-500" />
              <span className="font-black text-2xl tracking-tighter italic uppercase">ZYPON<span className="text-orange-500"> DIGITAL</span></span>
            </div>
            <p className="text-gray-500 max-w-sm font-medium">
              Membangun kemandirian finansial pemuda Indonesia melalui produk digital berkualitas.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 font-bold mb-6 italic uppercase tracking-widest">© 2024 ZYPON DIGITAL. ALL RIGHTS RESERVED.</p>
            <div className="flex justify-center md:justify-end gap-10 text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-[60] md:hidden">
        <button 
          onClick={handleWhatsAppClick}
          className="w-full bg-orange-500 text-black py-5 rounded-2xl font-black shadow-[0_0_40px_rgba(249,115,22,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-all uppercase italic text-lg"
        >
          <MessageCircle className="w-6 h-6 fill-black" />
          AMBIL PROMO Rp 20rb (WA)
        </button>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
