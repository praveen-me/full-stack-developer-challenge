import React, { Component, lazy, Suspense } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import sass
import './scss/app.scss';

import Header from './components/Header';

const Stories = lazy(() => import('./components/Stories'));
const Login = lazy(() => import('./components/auth/Login'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const CreateStory = lazy(() => import('./components/story/CreateStory'));
const Profile = lazy(() => import('./components/Profile'));



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Suspense fallback={'Loading...'}>
              <Route path='/' exact component={Stories} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route path='/profile/drafts/create' component={CreateStory}/>
              <Route path='/profile' exact component={Profile}/>
              <Route path='/edit/:id' component={CreateStory}/>
            </Suspense>
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
