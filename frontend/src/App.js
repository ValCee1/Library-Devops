import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
// src/App.js

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchBooks from "./components/SearchBooks";
import BorrowBooks from "./components/BorrowBooks";
import ReturnBooks from "./components/ReturnBooks";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={SearchBooks} />
          <Route path="/borrow" component={BorrowBooks} />
          <Route path="/return" component={ReturnBooks} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
