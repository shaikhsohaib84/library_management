import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { AddBookComponent } from "./components/AddBookComponent";
import { EditBook } from "./components/EditBook";
import { HomeComponent } from "./components/HomeComponent";
import { ListAllComponent } from "./components/ListAllComponent";
import { LoginComponent } from "./components/LoginComponent";
import { LogoutComponent } from "./components/LogoutComponent";
import { SignupComponent } from "./components/SignupComponent";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/logout" exact component={LogoutComponent} />
          <Route path="/signup" exact component={SignupComponent} />
          <Route path="/listallbook" exact component={ListAllComponent} />
          <Route path="/addbook" exact component={AddBookComponent} />
          <Route path="/editbook" exact component={EditBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
