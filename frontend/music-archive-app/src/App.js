// App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import AddSong from './components/AddSong';
// import Sidebar from './components/Sidebar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Navbar title="SanGeet" />
        {/* <Sidebar/> */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-song" element={<AddSong />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
