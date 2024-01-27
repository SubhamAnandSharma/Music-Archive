import React from 'react';

const Sidebar = () => {
  return (
    // <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark fixed-end ms-auto" style={{ width: '280px' }}>
    <div className="d-flex flex-column flex-shrink-0 p-3 text-black bg-light fixed-end ms-auto" style={{ width: '250px',height: '700px' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg className="bi me-2" width="0" height="12"><use xlinkHref="#bootstrap"/></svg>
        <span className="fs-4">Songs List</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <i className="bi bi-house-door-fill"></i> Favourite 
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="bi bi-speedometer2"></i> Playlist 1
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Sidebar;
