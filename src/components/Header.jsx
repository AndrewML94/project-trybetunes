import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  getName = async () => {
    const name = await getUser();
    this.setState({
      userName: name.name,
      loading: false,
    });
  };

  render() {
    this.getName();
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{ loading ? <Loading /> : userName }</span>
        <h1>TrybeTunes</h1>
        <Link to="/search">Search</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/profile/edit">Profile Edit</Link>
      </header>
    );
  }
}

export default Header;
