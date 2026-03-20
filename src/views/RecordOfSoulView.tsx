import React from 'react';
import RecordOfSoulHero from '../components/record/RecordOfSoulHero';
import EpisodeTimeline from '../components/record/EpisodeTimeline';

const RecordOfSoulView = () => {
  return (
    <div className="bg-gray-900">
      <RecordOfSoulHero />
      <EpisodeTimeline />
    </div>
  );
};

export default RecordOfSoulView;
