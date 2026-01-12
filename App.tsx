import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
      <h1 className="text-5xl font-black text-orange-500 mb-6">Digital Starter Kit</h1>
      <p className="text-lg text-gray-400 text-center max-w-xl">
        Modal 20rb siap cuan! Website sudah berhasil deploy dan React berjalan.
      </p>
      <button className="mt-8 bg-orange-500 hover:bg-orange-400 text-black py-4 px-8 rounded-3xl font-black uppercase">
        Ambil Promo Sekarang
      </button>
    </div>
  );
};

export default App;
