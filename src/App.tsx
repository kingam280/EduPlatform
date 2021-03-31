import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import ProjectsPage from './components/ProjectsPage/ProjectsPage'
import { fetchProjects } from './components/ProjectsPage/ProjectsPageSlice';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProjects())
        
  }, [dispatch])
  return (
    <div className="App">
      <ProjectsPage />
    </div>
  );
}

export default App;
