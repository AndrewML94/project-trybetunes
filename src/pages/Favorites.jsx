import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteSongs });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Músicas favoritas:</h3>
        { isLoading ? <Loading /> : favoriteSongs.map((music) => (
          <MusicCard
            trackId={ music.trackId }
            previewUrl={ music.previewUrl }
            key={ music.trackId }
            trackName={ music.trackName }
          />))}
      </div>
    );
  }
}

export default Favorites;
