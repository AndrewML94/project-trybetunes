import React, { Component } from 'react';
import Props from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      checked,
      handleChange } = this.props;
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
        <form>
          <label htmlFor={ trackId }>
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              checked={ checked }
              onChange={ handleChange }
            />
            Favorita
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: Props.string.isRequired,
  previewUrl: Props.string.isRequired,
  trackId: Props.number.isRequired,
  checked: Props.bool.isRequired,
  handleChange: Props.func.isRequired,
};

export default MusicCard;
