import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'

function App() {
  return (
      <Switch>
          <Route exact path="/" component={Navbar} />
      </Switch>
  );
}

export default App;
