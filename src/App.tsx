import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import Tasks from './components/Tasks/tasks';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Tasks />
      </div>
    </Provider>
  );
}

export default App