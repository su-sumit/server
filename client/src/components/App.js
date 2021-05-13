import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Header from './Header';
import Dashboard from './Dashboard';
import Home from './Home';
import NewSurvey from './NewSurvey';

import axios from 'axios';
window.axios = axios;
class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
          <BrowserRouter>
              <div>
                <Header />
                <Route exact path ="/" component ={ Home } />
                <Route exact path ="/surveys" component ={ Dashboard } />
                <Route path ="/surveys/new" component ={ NewSurvey } />
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
