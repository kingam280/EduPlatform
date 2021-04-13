import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ChangeForm from "./components/Authorization/ChangeForm"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/authorization">
            <ChangeForm />
          </Route> 
        </Switch>
      </Router>
    </div>
  );
}

export default App