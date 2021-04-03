import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './app/store';
import { GroupManagement } from './components/groupManagement/groupManagement';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <GroupManagement />
      </div>
    </Provider>
  );
}

export default App