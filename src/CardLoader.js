import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

export class CardLoader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      deck: '',
      id: '',
      cardInfo: '',
      primed: false,
      myArr: []
    };
  }
  async componentDidMount() {
    let res = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle'
    );
    this.setState({
      deck: res.data,
      id: res.data.deck_id
    });
    let res2 = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.id}/draw/`
    );
    this.setState({
      cardInfo: res2.data.cards[0]
    });
  }
  async handleClick() {
    this.setState({ primed: true });
    let res2 = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.id}/draw/`
    );
    this.setState({
      cardInfo: res2.data.cards[0],
      myArr: [...this.state.myArr, this.state.cardInfo]
    });
  }
  render() {
    let cards;
    if (this.state.myArr.length <= 52) {
      cards = this.state.myArr.map(card => {
        return <Card key={uuidv4()} imgSrc={card.image} imgAlt={card.code} />;
      });
    } else {
      alert('Cards finished');
    }

    return (
      <div>
        <button onClick={this.handleClick}>Draw a Card</button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.primed && cards}
        </div>
      </div>
    );
  }
}

export default CardLoader;
