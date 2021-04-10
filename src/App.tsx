import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import ProjectInfo from './components/ProjectsPage/ProjectInfo';
import ProjectsPage from './components/ProjectsPage/ProjectsPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/projects">
            <ProjectsPage />
          </Route>
          <Route path="/projects/:projectId">
            <ProjectInfo />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App