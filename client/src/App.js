import React from "react";
import AppRouter from './components/AppRouter';
import './pages/css/index.css';
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
