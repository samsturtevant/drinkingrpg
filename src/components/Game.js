import React from 'react';
import ReactTooltip from 'react-tooltip';
import Party from './Party.js'
import Battle from './Battle.js'
import '../App.css';

import { MAJORS } from './majors.js';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enemies: [
                {
                    name: "steve",
                    hp: 20,
                    attack: 5,
                    defense: 3,
                    speed: 2
                }
            ]
        };
    }

    render() {
        return (
            <div>
                {/* <Party players={this.props.players}/> */}
                <Battle players={this.props.players} enemies={this.state.enemies}/>
            </div>
        )
    }
}
