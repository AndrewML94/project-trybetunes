import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    artistsName: '',
    targetLetters: '',
    isButtonDisable: true,
    loading: false,
    load: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      artistsName: target.value,
      targetLetters: target.value,
    });
  };

  handleButton = async () => {
    const { artistsName } = this.state;
    this.setState({
      loading: true,
    });
    this.setState({
      artistsName: await searchAlbumsAPI(artistsName),
      loading: false,
      load: true,
    });
  };

  render() {
    const { artistsName, targetLetters, isButtonDisable, loading, load } = this.state;
    const MIN_CHARACTERS = 2;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
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
              disabled={ artistsName.length >= MIN_CHARACTERS ? false : isButtonDisable }
              onClick={ this.handleButton }
            >
              Pesquisar
            </button>
          </form>)}
        { load && <h3>{`Resultado de álbuns de: ${targetLetters}`}</h3> }
        { artistsName.length === 0 ? <p>Nenhum álbum foi encontrado</p>
          : load && artistsName.map((artist) => (
            <div key={ artist.collectionId }>
              <Link
                data-testid={ `link-to-album-${artist.collectionId}` }
                to={ `/album/${artist.collectionId}` }
              >
                <li key={ artist.collectionId }>
                  <img src={ artist.artworkUrl100 } alt={ artist.collectionName } />
                  <span>{ artist.collectionName }</span>
                  <span>{ artist.artistName }</span>
                </li>
              </Link>
            </div>
          )) }
      </div>
    );
  }
}

export default Search;
