// Home.jsx
import React from 'react';
import SongDetails from './action/SongDetails';

export default function Home() {
  return (
    
    <div className="contentArea">
      <h2>Home Page</h2>
      <p>Welcome to the Home page of our React App!</p>
      <br />
      <SongDetails/>
    </div>
  );
}
