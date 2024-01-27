// AddSong.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './AxiosInstance';

export default function AddSong() {
  const [file, setFile] = useState(null);
  const [songDetails, setSongDetails] = useState({
    songTitle: '',
    artist: '',
    genre: '',
    isFavorited: false,
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSongDetails(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axiosInstance.post('/api/songs/addFile', formData, {
      params: songDetails,
    })
    .then(response => {
      console.log('File uploaded successfully:', response.data);
  
      // Show success toast message
      toast.success('File uploaded successfully', {
        autoClose: 3000, // milliseconds
      });
  
      // Reset the form
      setFile(null);
      setSongDetails({
        songTitle: '',
        artist: '',
        genre: '',
        isFavorited: true,
      });
    })
    .catch(error => {
      console.error('Error uploading file:', error);
  
      // Show error toast message
      toast.error(`Error uploading file: ${error.message}`, {
        autoClose: 5000, // milliseconds
      });
    });
  };

  return (
    <div className="contentArea">
      <h2>Add Song Page</h2>
      <p>Add your favorite songs here!</p>
      <form className='addSong'>
        <fieldset >
          <div className="mb-3">
            <label htmlFor="songTitle" className="form-label">Song Title:</label>
            <input type="text" id="songTitle" className="form-control" name="songTitle" value={songDetails.songTitle} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="artist" className="form-label">Artist:</label>
            <input type="text" id="artist" className="form-control" name="artist" value={songDetails.artist} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">Genre:</label>
            <input type="text" id="genre" className="form-control" name="genre" value={songDetails.genre} onChange={handleInputChange} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" id="isFavorited" className="form-check-input" name="isFavorited" checked={songDetails.isFavorited} onChange={handleInputChange} />
            <label className="form-check-label" htmlFor="isFavorited">Is Favorited</label>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">Choose File:</label>
            <input type="file" id="file" className="form-control" onChange={handleFileChange} />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleFileUpload}>Upload File</button>
        </fieldset>
      </form>
    </div>
  );
}
