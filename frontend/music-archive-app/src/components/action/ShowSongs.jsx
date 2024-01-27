import React, { useState, useEffect } from 'react';
import axiosInstance from '../AxiosInstance'; // Import your axiosInstance
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowSongs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch all songs using axiosInstance when the component mounts
    axiosInstance.get('/api/songs/all')
      .then(response => {
        setSongs(response.data);
        // Show success toast
        toast.success('Songs fetched successfully');
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
        // Show error toast
        toast.error(`Error fetching songs: ${error.message}`);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="contentArea">
      <h1>Songs</h1>
      <ul>
        {songs.map(song => (
          <li key={song.id}>{song.songTitle} by {song.artist}</li>
        ))}
      </ul>
    </div>
  );
}

