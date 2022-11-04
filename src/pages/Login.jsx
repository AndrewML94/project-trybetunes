import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
    isButtonDisable: true,
    loading: false,
    load: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      userName: target.value,
    });
  };

  handleButton = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      loading: false,
      load: true,
    });
  };

  render() {
    const { userName, isButtonDisable, loading, load } = this.state;
    const MIN_CHARACTERS = 3;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ userName.length >= MIN_CHARACTERS ? false : isButtonDisable }
              onClick={ this.handleButton }
            >
              Entrar
            </button>
          </form>)}
        { load && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
