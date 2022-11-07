import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    profile: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const information = await getUser();
    this.setState({ isLoading: false, profile: information });
  }

  render() {
    const { profile, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <div key={ profile.name }>
            <img
              data-testid="profile-image"
              src={ profile.image }
              alt={ profile.name }
            />
            <Link to="/profile/edit">Editar perfil</Link>
            <span>{ profile.name }</span>
            <span>{ profile.email }</span>
            <span>{ profile.description }</span>
          </div>)}
      </div>
    );
  }
}

export default Profile;
