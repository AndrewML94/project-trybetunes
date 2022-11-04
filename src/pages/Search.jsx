import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    userName: '',
    isButtonDisable: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      userName: target.value,
    });
  };

  // handleButton = async () => {
  //   const { userName } = this.state;
  //   this.setState({
  //     loading: true,
  //   });
  //   await createUser({ name: userName });
  //   this.setState({
  //     loading: false,
  //     load: true,
  //   });
  // };

  render() {
    const { userName, isButtonDisable } = this.state;
    const MIN_CHARACTERS = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ userName.length >= MIN_CHARACTERS ? false : isButtonDisable }
            onClick={ this.handleButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
