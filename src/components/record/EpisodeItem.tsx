import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Episode } from '../../content/siteContent';

const EpisodeItem: React.FC<Episode> = ({ fileNumber, title, abstract, keyFeatures, videoLength, youtubeLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-8 border-b border-gray-700 last:border-b-0">
      <p className="text-purple-400 font-mono text-lg">{fileNumber}</p>
      <h3 className="text-2xl font-semibold text-yellow-300 mt-1 mb-4">{title}</h3>

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 mb-4"
      >
        <span className="font-bold">Abstract & Key features</span>
        <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="transform">
          ▶
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-400">
              <p className="mb-2">{abstract}</p>
              {keyFeatures && <p className="font-semibold text-gray-300 mt-2">{keyFeatures}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {youtubeLink && (
        <a 
          href={youtubeLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 my-4"
        >
          See On Youtube
        </a>
      )}

      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(parseInt(videoLength) / 942) * 100}%` }}></div>
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">length: {videoLength}</p>
    </div>
  );
};

export default EpisodeItem;
