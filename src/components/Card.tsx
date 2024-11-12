import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  letter: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ letter, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <motion.div
      className="relative w-full aspect-[3/4] max-w-[120px] cursor-pointer"
      whileHover={{ scale: isMatched ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div
        className={`absolute w-full h-full rounded-2xl transition-all duration-300 transform preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Back of card (shown when not flipped) */}
        <div className="absolute w-full h-full backface-hidden">
          <div 
            className="w-full h-full rounded-2xl border-4 border-pink-400 bg-gradient-to-br from-blue-400 to-pink-400 shadow-lg overflow-hidden"
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px',
                opacity: 0.8
              }}
            />
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)'
              }}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                <span className="text-white font-bold text-2xl" style={{ fontFamily: 'Bangers' }}>ABC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Front of card (shown when flipped) */}
        <div
          className="absolute w-full h-full backface-hidden rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className={`w-full h-full rounded-2xl border-4 ${
            isMatched 
              ? 'bg-gradient-to-br from-green-200 to-green-300 border-green-400' 
              : 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400'
          } shadow-lg flex items-center justify-center`}>
            <span 
              className={`text-6xl ${isMatched ? 'text-green-600' : 'text-pink-500'}`}
              style={{ fontFamily: 'Bangers' }}
            >
              {letter}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}