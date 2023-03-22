import React from "react";
import AppRouter from './components/AppRouter';
import './pages/css/index.css';
import { BrowserRouter, useHistory } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import { IsAuthCheck } from './utils/IsAuthCheck';
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

function App() {
  const dispatch = useDispatch()
  const store = useSelector(store => store)
  const token = localStorage.getItem("token");
  if (token === null) {
    store.Auth.status = false
  }
  else {
    store.Auth.status = true
    store.Auth.user = jwtDecode(token)
  }
  const history = useHistory()


  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
