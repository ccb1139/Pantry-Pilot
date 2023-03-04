import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Page imports
import Home from './Pages/Home';
import Pantry from './Pages/Pantry';

//Component imports
import NavBar from './Components/Structural/NavBar';

function App() {
  return (
    <BrowserRouter> 
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pantry" element={<Pantry />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
