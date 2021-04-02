import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Navbar1 from './Navbar1'

export default function Home() {
  return (
    <div className="App">
        <Navbar1/>
        <div className="text-center mt-3">
       <h1 className="text-center mt-2">Now renting a thing becomes sooo easy...</h1>  
       <h2>SignUp to get equipments on rent quickly.</h2>
       </div>
    </div>
  );
}

