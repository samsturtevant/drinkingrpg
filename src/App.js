import React, { Component } from 'react';
import MajorSelect from './components/MajorSelect';
import Game from './components/Game';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false
    };
  }

  startGame(p) {
    this.setState(() => {
      return {gameStarted: true, players: p};
    });
  }

  render() {
    return (
      this.state.gameStarted ? <Game players={this.state.players}/> : <MajorSelect onGameStart={this.startGame.bind(this)} />
    );
  }
}

export default App;
