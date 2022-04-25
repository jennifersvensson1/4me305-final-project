import './App.css';
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
        <Posts />
        <AddPost />
      </div>
    </div>
  );
}


export default App;
