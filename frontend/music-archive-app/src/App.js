// App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import AddSong from './components/action/AddSong';
import ShowSongs from './components/action/ShowSongs';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Navbar title="SanGeet" />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-song" element={<AddSong />} />
          <Route path='/show-songs' element={<ShowSongs />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
