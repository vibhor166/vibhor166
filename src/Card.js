import React, { Component } from 'react';
import './Card.css';
export class Card extends Component {
  render() {
    return (
      <div className='card'>
        <img src={this.props.imgSrc} alt={this.props.imgAlt} />
      </div>
    );
  }
}

export default Card;
