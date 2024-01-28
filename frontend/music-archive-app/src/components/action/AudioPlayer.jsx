import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import axiosInstance from '../AxiosInstance';

const AudioPlayer = ({ songId }) => {
  const [audioSrc, setAudioSrc] = useState(''); // Added audioSrc state
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/songs/play/${songId}`, { responseType: 'blob' }) // Specify blob response
      .then(response => {
        const url = URL.createObjectURL(response.data);
        setAudioSrc(url);
        console.log('Response from play song API:', response); // Log response after setting URL
      })
      .catch(error => {
        console.error('Error fetching audio:', error);
      });
  }, [songId]);


  return (
    <div className="audio-player-container">
      <ReactAudioPlayer
        src={audioSrc} // Use audioSrc from useEffect
        style={{ width: '540px', height: '40px' }} // Optional inline styles
        autoPlay={false}
        controls
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)} // Reset playing state on end
        loop={false} // Adjust loop as needed
        playing={playing}
      />

      {/* <div className="controls">
        <button onClick={handlePlayPause}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <progress value={currentTime} max={duration} onChange={handleSeek} />
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} />
      </div> */}

      {/* <div className="time-info">
        <span>Current time: {formatTime(currentTime)}</span>
        <span>Total duration: {formatTime(duration)}</span>
      </div> */}
    </div>
  );
};

export default AudioPlayer;








//////////////////////////////////////////// Test Code ///////////////////////////////////////////////////////////////







//   useEffect(() => {
//   // Fetch audio using axiosInstance
//   axiosInstance
//     .get(`/api/songs/play/${songId}`, { responseType: 'blob' })
//     .then(response => {
//       const url = URL.createObjectURL(response.data);
//       setAudioSrc(url);
//       setDuration(response.data.size / 1024); // Assuming duration in KB
//     })
//     .catch(error => {
//       console.error('Error fetching audio:', error);
//     });

//   // Handle initial song loading using useRef
//   const initialAudio = audioRef.current;
//   initialAudio.load();

//   // Add event listeners for ended and error events
//   audioRef.current.addEventListener('ended', handleNextSong);
//   audioRef.current.addEventListener('error', () => {
//     console.error('Audio playback error');
//     // Handle error gracefully, e.g., display an error message
//   });
// }, [songId]);



// const formatTime = (seconds) => {
//   const minutes = Math.floor(seconds / 60);
//   const secondsRemaining = Math.floor(seconds % 60);
//   return `${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
// };


// const handlePlayPause = () => {
//   setPlaying(!playing);
//   if (playing) {
//     audioRef.current.play();
//   } else {
//     audioRef.current.pause();
//   }
// };


// const handleSeek = (event) => {
//   const seekTime = event.target.value;
//   setCurrentTime(seekTime);
//   audioRef.current.currentTime = seekTime;
// };


// const handleVolumeChange = (event) => {
//   setVolume(event.target.value);
//   audioRef.current.volume = event.target.value;
// };

// const handleNextSong = () => {
//   let nextIndex = currentSongIndex + 1;
//   if (isShuffleOn) {
//     nextIndex = getRandomSongIndex(songsList.length);
//   } else if (nextIndex >= songsList.length) {
//     if (repeatEnabled) {
//       nextIndex = 0;
//     } else {
//       return; // Prevent going beyond playlist
//     }
//   }
//   setCurrentSongIndex(nextIndex);
//   setAudioSrc(songsList[nextIndex].audioUrl);
//   setDuration(songsList[nextIndex].duration); // Assuming duration is available in song data
//   audioRef.current.load(); // Load the new song
// };

// const handlePreviousSong = () => {
//   let prevIndex = currentSongIndex - 1;
//   if (isShuffleOn) {
//     prevIndex = getRandomSongIndex(songsList.length);
//   } else if (prevIndex < 0) {
//     if (repeatEnabled) {
//       prevIndex = songsList.length - 1;
//     } else {
//       return; // Prevent going beyond playlist
//     }
//   }
//   setCurrentSongIndex(prevIndex);
//   setAudioSrc(songsList[prevIndex].audioUrl);
//   setDuration(songsList[prevIndex].duration); // Assuming duration is available in song data
//   audioRef.current.load(); // Load the new song
// };

// const handleShuffleToggle = () => {
//   setIsShuffleOn(!isShuffleOn);
// };

// const handleRepeatToggle = () => {
//   setRepeatEnabled(!repeatEnabled);
// };
// return (
// <div className="audio-player">
//   <div className="song-info">
//     <h3>{songsList[currentSongIndex].title}</h3>
//     <p>{songsList[currentSongIndex].artist}</p>
//   </div>
//   <div className="controls">
//     {/* ... controls buttons */}
//   </div>
//   <ReactAudioPlayer
//     src={audioSrc}
//     playing={playing}
//     onPlay={() => setPlaying(true)}
//     onPause={() => setPlaying(false)}
//     onTimeUpdate={(time) => setCurrentTime(time.currentTime)}
//     volume={volume}
//     loop={repeatEnabled} // Enable loop if repeat is toggled on
//     playFromPosition={currentTime} // Start playback from the current time
//     // Additional optional props:
//     autoplay
//     controls
//     muted
//     playbackRate
//     // Refer to ReactAudioPlayer's documentation for more: https://www.npmjs.com/package/react-audio-player
//   />
// </div>
// );