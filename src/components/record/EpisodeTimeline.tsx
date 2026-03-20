import React from 'react';
import { siteContent } from '../../content/siteContent';
import EpisodeItem from './EpisodeItem';

const EpisodeTimeline = () => {
  const { timeline } = siteContent.recordOfSoul;

  return (
    <div className="bg-gray-900 text-white p-4 md:p-8">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-700"></div>
        {timeline.map((episode, index) => (
          <div key={episode.fileNumber} className="relative pl-12">
            <div className="absolute left-4 top-8 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white"></div>
            <EpisodeItem {...episode} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeTimeline;
