import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';

import Payments from './Payment';

class Header extends Component{
  renderContent(){
    switch(this.props.auth){
      case null:
        return(
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button className="ui secondary loading button">Loading</Button>
            </Menu.Item>
          </Menu.Menu>
        );
      case false:
        return(
          <Menu.Menu position='right'>
            <Menu.Item>
              <a href="auth/google" className="ui google plus button">
                <i className="google plus icon"></i>
                Google+
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="auth/github" className="ui github button">
                <i className="github icon"></i>
                Github
              </a>
            </Menu.Item>
          </Menu.Menu>
        );
      default:
        return(
          <Menu.Menu position='right'>
            <Menu.Item>
              Credits: {this.props.auth.credits}
            </Menu.Item>
            <Menu.Item>
              <Payments />
            </Menu.Item>
            <Menu.Item>
              <a href="/api/logout" className="ui animated button">
                <div className="visible content">Sign Out</div>
                <div className="hidden content">
                  <i className="sign out icon"></i>
                </div>
              </a>
            </Menu.Item>
          </Menu.Menu>
        );
    }
  }
  render(){
    return(
        <Menu size='large'>
        <Link to={this.props.user ? '/surveys' : '/'}>
          <Menu.Item name='Feedback'/>
        </Link>

        {this.renderContent()}
      </Menu>
    );
  }
}

function mapStateToProps({auth}){
  return { auth };
}

export default connect(mapStateToProps)(Header);
