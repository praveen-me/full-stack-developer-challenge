import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Stories from './components/Stories';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route path='/' exact component={Stories} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
