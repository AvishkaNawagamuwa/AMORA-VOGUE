import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'DISCOVER YOUR EVERYDAY ELEGANCE • AMORA VOGUE',
  'ISLANDWIDE DELIVERY AVAILABLE ACROSS SRI LANKA',
  'NEW STYLES JUST LANDED • ORDER VIA WHATSAPP',
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-olive text-ivory py-2 px-4 text-center text-[10px] md:text-xs tracking-widestPlus uppercase transition-all duration-500 font-medium border-b border-olive/20">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <span className="transition-opacity duration-300">
          {MESSAGES[index]}
        </span>
      </div>
    </div>
  );
};
