import React from 'react';
import { siteContent } from '../../content/siteContent';

const RecordOfSoulHero = () => {
  const { title, description, note, episodesCount, minutes, backgroundImage } = siteContent.recordOfSoul;

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-black"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-50 mix-blend-multiply"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-orange-500 drop-shadow-lg mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl">
          {description}
        </p>
        
        <div className="flex items-center space-x-8 mb-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-yellow-400">{episodesCount}</p>
            <p className="text-sm uppercase tracking-widest">Episodes</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-yellow-400">{minutes}</p>
            <p className="text-sm uppercase tracking-widest">Minutes</p>
          </div>
        </div>

        <p className="text-sm text-yellow-300 bg-black bg-opacity-50 px-4 py-2 rounded">
          {note}
        </p>
      </div>

      {/* Bottom Geometric Shapes */}
      <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none">
        <div 
          className="absolute bottom-0 left-0 w-full h-full bg-red-900"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 20%)' }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/2 w-3/4 h-32 bg-gray-200 opacity-30"
          style={{ transform: 'translateX(-50%)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
        ></div>
         <div 
          className="absolute bottom-0 left-1/2 w-1/2 h-20 bg-gray-300 opacity-40"
          style={{ transform: 'translateX(-50%)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
        ></div>
      </div>
    </section>
  );
};

export default RecordOfSoulHero;
