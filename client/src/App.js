import React from "react";
import AppRouter from './components/AppRouter';
import './pages/css/index.css';
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import { IsAuthCheck } from './utils/IsAuthCheck';

function App() {
  return (
    <BrowserRouter>
      {IsAuthCheck()}
      <Navbar/>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
