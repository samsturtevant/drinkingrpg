import React from 'react';
import ReactTooltip from 'react-tooltip';
import { AnimatedSpriteSheet } from 'react-spritesheet';
import '../App.css';

import { MAJORS } from './majors.js';

export default class Party extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="partyContainer">
                <div className="party">
                    <AnimatedSpriteSheet
                        filename={MAJORS[this.props.players[0]].idleSpritePath}
                        initialFrame={0}
                        frame={{width: 120, height: 160}}
                        bounds={{x: 0, y: 0, width: 5040, height: 160}}
                        speed={200}
                    />
                    <AnimatedSpriteSheet
                        filename={MAJORS[this.props.players[1]].idleSpritePath}
                        initialFrame={0}
                        frame={{width: 120, height: 160}}
                        bounds={{x: 0, y: 0, width: 5040, height: 160}}
                        speed={200}
                    />
                    <AnimatedSpriteSheet
                        filename={MAJORS[this.props.players[2]].idleSpritePath}
                        initialFrame={0}
                        frame={{width: 120, height: 160}}
                        bounds={{x: 0, y: 0, width: 5040, height: 160}}
                        speed={200}
                    />
                    <AnimatedSpriteSheet
                        filename={MAJORS[this.props.players[3]].idleSpritePath}
                        initialFrame={0}
                        frame={{width: 120, height: 160}}
                        bounds={{x: 0, y: 0, width: 5040, height: 160}}
                        speed={200}
                    />
                </div>
                <div>
                    <h3 className="partyStatus">Party Level: 1</h3>
                    <h3 className="partyStatus" style={{color: "aqua"}}>EXP: 0/100</h3>
                    <h3 className="partyStatus" style={{color: "yellow"}}>Gold: 0</h3>
                </div>
            </div>
        )
    }
}
