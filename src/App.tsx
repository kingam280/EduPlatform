import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import ProjectCard from './components/ProjectsPage/ProjectCard';
import ProjectsPage from './components/ProjectsPage/ProjectsPage';
import Tasks from './components/Tasks/tasks';
import Menu from './components/Navigation/menu';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Menu />
          <Switch>
            <Route exact path="/projects">
              <ProjectsPage />
            </Route>
            <Route path="/projects/:projectId">
              <ProjectCard />
              <Tasks />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App