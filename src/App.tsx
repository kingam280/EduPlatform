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
import ChangeForm from "./components/Authorization/ChangeForm";
import { useSelector } from 'react-redux';
import { RootState } from './app/rootReducer';
import Announcements from './components/Announcements/Announcements';

function App() {

  const token = useSelector((state:RootState) => state.authorization.token);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Menu />
          {token ? (
            <Switch>
              <Route exact path="/projects">
                <ProjectsPage />
              </Route>
              <Route path="/projects/:projectId">
                <ProjectCard />
                <Tasks />
              </Route>
              <Route exact path="/announcements">
            <Announcements/>
          </Route>
            </Switch>
          ) 
          : ( <Route exact path="/">
                <ChangeForm />
              </Route> 
          )}
        </Router>
      </div>
    </Provider>
  );
}

export default App