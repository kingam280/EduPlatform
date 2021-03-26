import React from 'react';
import './App.css';
import TaskList from './components/Tasks/taskList';
import {Provider} from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
