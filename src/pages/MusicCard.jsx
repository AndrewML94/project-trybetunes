import React, { Component } from 'react';
import Props from 'prop-types';
import Loading from '../components/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    const { favoriteMusics } = props;
    this.state = {
      check: favoriteMusics,
      isLoading: false,
    };
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    this.setState({
      check: checked,
    });
    this.setState({ isLoading: true });
    if (checked) await addSong(this.props);
    if (!checked) await removeSong(this.props);
    this.setState({ isLoading: false });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId } = this.props;
    const {
      check,
      isLoading,
    } = this.state;

    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { isLoading ? <Loading /> : (
          <form>
            <label htmlFor={ trackId }>
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id={ trackId }
                checked={ check }
                onChange={ this.handleChange }
              />
              Favorita
            </label>
          </form>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: Props.string.isRequired,
  previewUrl: Props.string.isRequired,
  trackId: Props.number.isRequired,
  favoriteMusics: Props.shape({
    trackName: Props.string.isRequired,
    previewUrl: Props.string.isRequired,
    trackId: Props.number.isRequired,
  }).isRequired,
};

export default MusicCard;
