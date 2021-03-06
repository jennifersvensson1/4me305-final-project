import React, { Component } from "react";

// Initiates navbar
export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <a className="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a className="signOut" href="#signOut">Sign Out</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;