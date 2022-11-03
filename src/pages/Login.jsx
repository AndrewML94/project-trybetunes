import React, { Component } from 'react';
import Header from '../components/Header';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <Header />
        <h2>Login</h2>
      </div>
    );
  }
}

export default Login;
