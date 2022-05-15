import React from "react";
import Navbar from "./comps/Layout/Navbar";
import Header from "./comps/Layout/Header";
import Posts from "./comps/Posts";
import AddPost from "./comps/AddPost";

function App() {
  return (
    <div className="container-body">
      <Navbar />
      
      <div className="container-main">
        <Header />
        <AddPost />
        <Posts />
      </div>
    </div>
  );
}

export default App;
