import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    compiledFromTheArtist: '',
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      compiledFromTheArtist: result.slice(1),
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      artworkUrl100: result[0].artworkUrl100,
    });
  }

  render() {
    const {
      compiledFromTheArtist,
      artistName,
      collectionName,
      artworkUrl100,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ artworkUrl100 } alt={ collectionName } />
        <span data-testid="album-name">{ collectionName }</span>
        <span data-testid="artist-name">{ artistName }</span>
        { compiledFromTheArtist.length > 0 && compiledFromTheArtist.map((music) => (
          <li key={ music.trackId }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          </li>)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: Props.shape({
    params: Props.shape({
      id: Props.number,
    }),
  }),
}.isRequired;

export default Album;
