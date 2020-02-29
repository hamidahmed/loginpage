import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Frontpage from "./pages/Frontpage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <MenuBar />
      <Route exact path="/" component={Frontpage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
}

export default App;
