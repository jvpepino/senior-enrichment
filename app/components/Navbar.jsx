'use strict';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <div>
      <div>
        <h2><Link to="/">HOME</Link></h2>
      </div>
      <div>
        <h2><Link to="/students">STUDENTS</Link></h2>
      </div>
      <div>
        <h2><Link to="/">CAMPUSES</Link></h2>
      </div>
      <div>
        <h2><Link to="/students/add">ADD STUDENT</Link></h2>
      </div>
      <div>
        <h2><Link to="/campuses/add">ADD CAMPUS</Link></h2>
      </div>
    </div>
  );
}

