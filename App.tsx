
import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, CheckCircle2, Clock, MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, BENEFITS, PAIN_POINTS } from './constants';
import { CountdownTime } from './types';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ hours: 4, minutes: 0, seconds: 0 });

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
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              // Reset to 4 hours if it reaches zero to keep the urgency active
              return { hours: 4, minutes: 0, seconds: 0 };
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">DigitalKit<span className="text-cyan-500">.</span></span>
          </div>
          <button 
            onClick={handleWhatsAppClick}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Beli Sekarang
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-cyan-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block bg-cyan-100 text-cyan-600 px-4 py-1 rounded-full text-sm font-bold mb-6 animate-bounce">
              🔥 SPECIAL PROMO TERBATAS!
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Modal 20 Ribu, Dapet <span className="text-gradient">1500+ Produk Digital</span> Siap Cuan! 🚀
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Ga perlu skill dewa, ga perlu stok barang. Kita bimbing sampe kamu paham cara jualannya. Cocok buat mahasiswa & karyawan yang butuh cuan tambahan!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={handleWhatsAppClick}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                🔥 AKSES SEKARANG (Rp 20.000)
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Akses Selamanya</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Bimbingan 1-on-1</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <img 
              src="https://picsum.photos/seed/digital-kit/800/600" 
              alt="Digital Product Mockup" 
              className="relative rounded-3xl shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform duration-500"
            />
            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 glass p-4 rounded-2xl shadow-lg border border-white/50 animate-float">
              <p className="text-2xl font-bold text-cyan-600">1500++</p>
              <p className="text-xs font-semibold text-gray-500">Ebook Premium</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Jujur deh, kamu pasti pernah ngerasain ini...</h2>
          <div className="grid gap-6">
            {PAIN_POINTS.map((point, index) => (
              <div key={index} className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-cyan-200 transition-colors group">
                <span className="text-4xl group-hover:scale-110 transition-transform">{point.emoji}</span>
                <p className="text-left text-lg font-medium text-gray-700">{point.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 glass rounded-3xl border-2 border-dashed border-cyan-200">
            <p className="text-xl font-semibold italic text-gray-600">
              "Kalo jawaban kamu <span className="text-cyan-500">IYA</span>, berarti kamu ada di tempat yang tepat. Kita punya solusinya buat kamu!"
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-[100px] opacity-20 -ml-32 -mb-32"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Kenapa Harus Punya <span className="text-gradient">Digital Starter Kit</span>?</h2>
            <p className="text-gray-600">Investasi receh, hasil kece. Ini yang bakal kamu dapetin:</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="glass p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="text-4xl mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Clock className="w-5 h-5 animate-spin-slow" />
            <span className="font-bold text-sm tracking-wider">KESEMPATAN TERAKHIR!</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
            Promo Harga 20k Hangus dalam waktu:
          </h2>
          
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 max-w-lg mx-auto">
            <div className="bg-white text-blue-900 p-4 md:p-6 rounded-3xl shadow-2xl">
              <span className="block text-3xl md:text-5xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-xs font-bold uppercase text-blue-500">Jam</span>
            </div>
            <div className="bg-white text-blue-900 p-4 md:p-6 rounded-3xl shadow-2xl">
              <span className="block text-3xl md:text-5xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-xs font-bold uppercase text-blue-500">Menit</span>
            </div>
            <div className="bg-white text-blue-900 p-4 md:p-6 rounded-3xl shadow-2xl">
              <span className="block text-3xl md:text-5xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-xs font-bold uppercase text-blue-500">Detik</span>
            </div>
          </div>

          <div className="p-8 bg-white/10 rounded-3xl border border-white/20 mb-8">
            <p className="text-2xl font-bold line-through opacity-50 mb-2">Harga Normal: Rp 199.000</p>
            <p className="text-5xl font-black text-yellow-300 animate-pulse">CUMA RP 20.000!</p>
          </div>

          <button 
            onClick={handleWhatsAppClick}
            className="w-full md:w-auto bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-yellow-300 hover:text-blue-900 transition-all flex items-center justify-center gap-4 mx-auto"
          >
            🔥 SAYA INGIN AKSES SEKARANG!
          </button>
          
          <p className="mt-8 text-sm opacity-80 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Garansi akses aman & bimbingan sampai bisa.
          </p>
        </div>
      </section>

      {/* Social Proof Placeholder */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Udah Banyak Yang <span className="text-gradient">Mulai Duluan</span>...</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-200">
                    <img src={`https://picsum.photos/seed/${i + 10}/100/100`} className="rounded-full" alt="avatar" />
                  </div>
                  <div>
                    <h4 className="font-bold">Anak Muda Cuan {i}</h4>
                    <div className="flex text-yellow-400">{'⭐'.repeat(5)}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"Gila sih ini, modal cuma 20rb tapi dapetnya aset sebanyak ini. Baru 3 hari jualan udah balik modal berkali-kali lipat!"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-cyan-400 w-6 h-6" />
              <span className="font-bold text-2xl tracking-tight">DigitalKit<span className="text-cyan-400">.</span></span>
            </div>
            <p className="text-gray-400 max-w-md">
              Membantu ribuan pemuda Indonesia punya penghasilan mandiri dari produk digital. Gabung sekarang sebelum harga kembali normal.
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 mb-4">&copy; 2024 Digital Starter Kit. All rights reserved.</p>
            <div className="flex justify-center md:justify-end gap-6 text-gray-400">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-200 z-50 md:hidden">
        <button 
          onClick={handleWhatsAppClick}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          AMBIL PROMO 20RB (WA)
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
