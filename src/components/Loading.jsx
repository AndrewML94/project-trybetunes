import React, { Component } from 'react';
import loading from '../image/loading-gif.gif';

class Loading extends Component {
  render() {
    return (
      <div>
        <img src={ loading } alt="carregando" />
        <span>Carregando...</span>
      </div>
    );
  }
}

export default Loading;
