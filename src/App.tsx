import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Announcements from './components/Announcements/Announcements';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/announcement">
            <Announcements/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App