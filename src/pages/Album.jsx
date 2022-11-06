import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: '',
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    checked: [],
    isLoading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      musics: result.slice(1),
      artistName: result[0].artistName,
      collectionName: result[0].collectionName,
      artworkUrl100: result[0].artworkUrl100,
    });
  }

  handleChange = ({ target }) => {
    const { checked } = target;
    this.setState((prevState) => ({
      checked: [...prevState.checked, checked],
    }));
    if (checked) {
      this.setState({ isLoading: true }, async () => {
        const { trackId } = this.state;
        await addSong(trackId);
        this.setState({ isLoading: false });
      });
    }
  };

  render() {
    const {
      musics,
      artistName,
      collectionName,
      artworkUrl100,
      checked,
      isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading && <Loading /> }
        <img src={ artworkUrl100 } alt={ collectionName } />
        <span data-testid="album-name">{ collectionName }</span>
        <span data-testid="artist-name">{ artistName }</span>
        { musics.length > 0 && musics.map((music) => (
          <span key={ music.trackId }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              checked={ checked[musics.trackName] }
              handleChange={ this.handleChange }
            />
          </span>
        )) }
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
