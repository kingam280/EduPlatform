import React from 'react';
import './App.css';
import TaskList from './components/Tasks/taskList';
import AddTask from './components/Tasks/addTask';
import TasksStatus from './components/Tasks/taskStatus';
import {Provider} from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TasksStatus />
        <AddTask />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App