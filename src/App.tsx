import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ChangeForm from "./components/Authorization/ChangeForm"
<<<<<<< HEAD
import {Provider, useSelector} from 'react-redux';
=======
import {Provider} from 'react-redux';
>>>>>>> 27554a75ef36dca2472de076353523efb0acee8f
import store from './app/store';
import ProjectCard from './components/ProjectsPage/ProjectCard';
import ProjectsPage from './components/ProjectsPage/ProjectsPage';
import Tasks from './components/Tasks/tasks';
import Menu from './components/Navigation/menu';
<<<<<<< HEAD
import { RootState } from './app/rootReducer';
=======
>>>>>>> 27554a75ef36dca2472de076353523efb0acee8f
import Announcements from './components/Announcements/Announcements';
import MentorGroupManagement from './components/groupManagement/mentorGroupManagement';
import './App.css'

function App() {

  const [token, setToken] = useState<string | null>(null)
	
  useEffect(() => {
      setToken(localStorage.getItem("token"))
  }, [])

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
              <Route path="/groupMentor">
                <MentorGroupManagement />
              </Route>
              <Route path="/groupMentor">
                <MentorGroupManagement />
              </Route>
            </Switch>
          ) 
          : ( <Switch>
              <Route exact path="/">
                <ChangeForm />
              </Route> 
              
              </Switch>
          )}
        </Router>
      </div>
    </Provider>
  ); 
}

export default App; 
