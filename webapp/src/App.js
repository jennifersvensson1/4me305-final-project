import './App.css';
import Navbar from "./comps/Layout/Navbar";
import Header from "./comps/Layout/Header";

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
