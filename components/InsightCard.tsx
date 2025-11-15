'use client';

import { useState, useEffect } from 'react';

const businessTypes = ['coffee shops', 'retailers', 'salons', 'bakeries'];

export default function InsightCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % businessTypes.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[975px] bg-white rounded-[10px] shadow-lg overflow-hidden">
      {/* Background Image - Left Side */}
      <div className="absolute left-0 top-0 w-[50%] h-full overflow-hidden">
        <img
          src="/coffee-machine.png"
          alt="Coffee machine"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Card - Right Side */}
      <div className="absolute right-0 top-0 w-[749px] h-full bg-white rounded-[10px] overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[589px] flex flex-col items-center gap-10">
          {/* Square Logo */}
          <div className="w-[106px] h-[45px]">
            <img
              src="/square-logo.svg"
              alt="Square"
              className="w-full h-full"
            />
          </div>

          {/* Heading */}
          <div className="w-full text-center">
            <div className="overflow-hidden">
              <p
                className={`font-serif text-[48px] leading-[1.1] tracking-tight-2 text-[#959595] mb-0 transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'
                }`}
              >
                Most {businessTypes[currentIndex]} think
              </p>
            </div>
            <p className="font-serif text-[48px] leading-[1.1] tracking-tight-2 text-black">
              lunch hour drives the highest order value.
            </p>
          </div>

          {/* CTA Button */}
          <button className="bg-black text-white px-10 py-6 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors">
            See what the data reveals
          </button>
        </div>
      </div>
    </div>
  );
}
