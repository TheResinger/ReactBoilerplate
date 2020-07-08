import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Todos from './Components/Todos';

function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/todos" component={ Todos } />
    </Router>
  );
}

export default App;
