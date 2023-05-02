import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Page imports
import Home from './Pages/Home';
import Pantry from './Pages/Pantry';
import Recipes from './Pages/Recipes';
import Cookbook from './Pages/Cookbook';
import RecipeFullPage from './Pages/RecipeFullPage';

//Component imports
import NavBar from './Components/Structural/NavBar';

import CounterTop from './img/CounterTop.jpeg'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="" 
      // style={{ backgroundImage: `url(${CounterTop})`, backgroundSize: "cover" }}
      >
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/full-recipe/:recipeId" element={<RecipeFullPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
