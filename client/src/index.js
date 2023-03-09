import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { IsAuthCheck } from './utils/IsAuthCheck';

const root = ReactDOM.createRoot(document.getElementById('root'));

const globalStore = {
  status: false,
  user: {}
}
const reducer = (state = globalStore, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, status: true, user: action.payload }
    case "LOGOUT":
      return { ...state, status: false, user: action.payload }
    default:
      return state
  }
}
const store = createStore(reducer);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {IsAuthCheck()}
      <App />
    </BrowserRouter>
  </Provider>

);

