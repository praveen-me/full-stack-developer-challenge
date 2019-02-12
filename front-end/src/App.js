import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Stories from './components/Stories';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CreateStory from './components/story/CreateStory';
import Profile from './components/Profile';


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
            <Route path='/profile/drafts/create' component={CreateStory}/>
            <Route path='/profile' component={Profile}/>
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
