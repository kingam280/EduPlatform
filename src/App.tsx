import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { useAppDispatch } from './app/hooks';
import ProjectInfo from './components/ProjectsPage/ProjectInfo';
import ProjectsPage from './components/ProjectsPage/ProjectsPage'
import { fetchProjects } from './components/ProjectsPage/ProjectsPageSlice';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProjects())
        
  }, [dispatch])
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

export default App;
