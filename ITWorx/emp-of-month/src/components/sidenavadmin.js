import React from 'react';
import logo from './logo.jpeg';
import profilePic from './IMG_5739.JPG';

const SideNavAdmin = () => {
  return (
    <aside
    style={{
      float: 'left',
      width: 150,
      marginLeft: 20,
      marginTop: 40,
      height: 600,
    }}
  >
    <ul className="nav flex-column">
      <li className="nav-item">
        <a
          className="nav-link active text-black fw-bold border-bottom border-1 border-dark"
          aria-current="page"
          href="#"
        >
          Nominations
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link text-black fw-bold border-bottom border-1 border-dark"
          href="localhost:3000/votes"
        >
          Voting
        </a>
      </li>
  <li class="nav-item">
    <a
      class="nav-link text-black fw-bold border-bottom border-1 border-dark"
      href=""
      >Results</a
    >
  </li>
  <li class="nav-item">
    <a
      class="nav-link text-black fw-bold border-bottom border-1 border-dark"
      href="#"
      >Settings</a
    >
  </li>
</ul>


</aside>
  );
};

export default SideNavAdmin;