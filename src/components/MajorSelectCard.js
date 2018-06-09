import React from 'react';
import ReactTooltip from 'react-tooltip';
import { AnimatedSpriteSheet } from 'react-spritesheet';
import '../App.css';

import { MAJORS } from './majors.js';

export default class MajorSelectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMajor: 0 // Math.round(Math.random() * 15)
        };
    }

    componentDidMount() {
        this.props.onMajorChange(this.state.currentMajor);
    }

    selectLeft() {
        this.setState((prev) => {
            var n = this.state.currentMajor - 1
            if (n < 0) {
                n = 15;
            }
            this.props.onMajorChange(n);
            return {currentMajor: n};
        });
    }

    selectRight() {
        this.setState((prev) => {
            var n = this.state.currentMajor + 1
            if (n > 15) {
                n = 0;
            }
            this.props.onMajorChange(n);
            return {currentMajor: n};
        });
    }

    render() {
        return (
            <div className="majorSelect card">
                <ReactTooltip className="tip" />
                <div className="selectMajor">
                    <button onClick={() => this.selectLeft()} className="selectMajorLeft selectMajorButton">←</button>
                    <div>
                        <h3 className="majorTitle">{MAJORS[this.state.currentMajor].majorName}</h3>
                        <p className="majorSubtitle">{MAJORS[this.state.currentMajor].majorType}</p>
                    </div>
                    <button onClick={() => this.selectRight()} className="selectMajorRight selectMajorButton">→</button>
                </div>
                <div className="flex">
                    <AnimatedSpriteSheet
                        filename={MAJORS[this.state.currentMajor].idleSpritePath}
                        initialFrame={0}
                        frame={{width: 120, height: 160}}
                        bounds={{x: 0, y: 0, width: 5040, height: 160}}
                        speed={200}
                    />
                </div>
                <div className="statRow">
                    <h4 className="cursor stat" data-tip="Health determines the amount of damage you can take before fainting.">HP: {MAJORS[this.state.currentMajor].hp}</h4>
                    <h4 className="cursor stat statRight" data-tip="Attack determines how much additional damage you deal.">ATK: {MAJORS[this.state.currentMajor].attack}</h4>
                </div>
                <div className="statRow">
                    <h4 className="cursor stat" data-tip="Defense determines the amount of damage you mitigate.">DEF: {MAJORS[this.state.currentMajor].defense}</h4>
                    <h4 className="cursor stat statRight" data-tip="Speed determines what order you attack in.">SPD: {MAJORS[this.state.currentMajor].speed}</h4>
                </div>
                <div className="moveSet">
                    <h4 className="cursor move" data-tip={MAJORS[this.state.currentMajor].move1.moveTip}>{MAJORS[this.state.currentMajor].move1.moveName}</h4>
                    <h4 className="cursor move" data-tip={MAJORS[this.state.currentMajor].move2.moveTip}>{MAJORS[this.state.currentMajor].move2.moveName}</h4>
                    <h4 className="cursor move" style={{color: "gray"}} data-tip={MAJORS[this.state.currentMajor].move3.moveTip + " (This move is unlocked at level 2)"}>{MAJORS[this.state.currentMajor].move3.moveName}</h4>
                    <h4 className="cursor move" style={{color: "gray"}} data-tip={MAJORS[this.state.currentMajor].move4.moveTip + " (This move is unlocked at level 3)"}>{MAJORS[this.state.currentMajor].move4.moveName}</h4>
                </div>
            </div>
        )
    }
}
