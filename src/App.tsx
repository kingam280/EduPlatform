import React from 'react';
import './App.css';
import TaskList from './components/Tasks/taskList';
import AddTask from './components/Tasks/addTask';
import {Provider} from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AddTask />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App