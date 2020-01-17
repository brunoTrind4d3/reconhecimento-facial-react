import React, {useState} from 'react';
import LoginPage from './LoginPage'
import AppPage from './AppPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from './services/history'; 


function App() {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/appPage' component={AppPage}/>
      </Switch>
    </Router>
  );
}

export default App;
