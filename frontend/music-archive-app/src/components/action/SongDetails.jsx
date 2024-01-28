import React from 'react';
import AudioPlayer from './AudioPlayer';

const SongDetails = ({ song }) => {
  // Assuming your song object has an 'id' property
  const id = "65b513a47c2f83328909b20e";
  const songTitle = "Ishq wala love";
  const artist = "Neeti Mohan";
  
  return (
    <div>
      <h3>{songTitle} by {artist}</h3>
      <AudioPlayer songId={id} />
    </div>
  );
};

export default SongDetails;
