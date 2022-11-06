import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    favoriteSongs: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      musics: result.slice(1),
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      artworkUrl100: result[0].artworkUrl100,
      favoriteSongs,
    });
  }

  render() {
    const {
      musics,
      artistName,
      collectionName,
      artworkUrl100,
      favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ artworkUrl100 } alt={ collectionName } />
        <span data-testid="album-name">{ collectionName }</span>
        <span data-testid="artist-name">{ artistName }</span>
        { musics.map((music) => {
          const favoriteMusics = favoriteSongs
            .find((element) => element.trackId === music.trackId);
          return (<MusicCard
            favoriteMusics={ favoriteMusics }
            trackId={ music.trackId }
            previewUrl={ music.previewUrl }
            key={ music.trackId }
            trackName={ music.trackName }
          />);
        })}
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
