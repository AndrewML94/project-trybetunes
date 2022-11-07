import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: true,
    isButtonDisable: true,
    load: false,
  };

  async componentDidMount() {
    const information = await getUser();
    this.setState({
      name: information.name,
      email: information.email,
      image: information.image,
      description: information.description,
      isLoading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clickButton = () => {
    const { name, email, description, image } = this.state;
    updateUser({ name, email, image, description });
    this.setState({ load: true });
  };

  render() {
    const {
      name,
      email,
      image,
      description,
      isLoading,
      isButtonDisable,
      load } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="edit-input-name"
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                data-testid="edit-input-email"
                type="text"
                id="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                data-testid="edit-input-description"
                type="textarea"
                id="description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="image">
              Imagem:
              <input
                data-testid="edit-input-image"
                type="text"
                id="image"
                name="image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ name.length > 0
                && email.length > 0
                && image.length > 0
                && description.length > 0 ? false : isButtonDisable }
              onClick={ this.clickButton }
            >
              Salvar
            </button>
            { load && <Redirect to="/profile" /> }
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
