
import './App.css';
import React from 'react';
import Header from "./comps/Layout/Header";
import Navbar from "./comps/Layout/Navbar";

function App() {
  return (
    <div className="container-body">
      <Navbar />
      
      <div className="container-main">
        <Header />
      </div>
    </div>
  );
}

export default App;
