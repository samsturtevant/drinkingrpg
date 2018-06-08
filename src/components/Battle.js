import React from 'react';
import ReactTooltip from 'react-tooltip';
import { AnimatedSpriteSheet } from 'react-spritesheet';
import '../App.css';

import { MAJORS } from './majors.js';
import { MOVES, d4 } from './moves.js';

export default class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: 0,
            order: [
                MAJORS[this.props.players[0]],
                MAJORS[this.props.players[1]],
                MAJORS[this.props.players[2]],
                MAJORS[this.props.players[3]],
                this.props.enemies
            ],
            enemies: this.props.enemies,
            showMoves: false,
            showTargets: false
        };
        this.chooseTarget = this.chooseTarget.bind(this)
    }

    componentDidMount() {
        this.startTurn(this.state.order[this.state.turn]);
    }

    startTurn(currentUnit) {
        if (currentUnit.majorName) {
            this.showMoves(currentUnit);
        }
    }

    showMoves() {
        this.setState({
            showMoves: true,
            currentMoves: MOVES[this.state.order[this.state.turn].majorIndex]
        });
    }

    target(move) {
        var t = this.state.currentMoves.targets[move]
        if (t === "enemy") {
            this.setState({
                showTargets: "enemy",
                moveUsed: move
            });
        }
    }

    chooseTarget(target) {
        if (this.state.moveUsed === 0) {
            this.distributeResults(this.state.currentMoves.move1(), target);
        }
    }

    distributeResults(results, target) {
        let roll = results.roll;
        this.setState({showTargets: "no"})
        if (results.singleDamage) {
            let e = this.state.enemies;
            e[target].hp = e[target].hp - roll * results.singleDamage
            console.log(e)
            this.setState({enemies: e})
        }
    }

    render() {
        return (
            <div>
                <div className="battle">
                    <div className="partyBattle">
                        <div className="playerBattle">
                            <div className="stats">
                                <h4>HP: 20</h4>
                                <h4>ATK: 5</h4>
                                <h4>DEF: 3</h4>
                                <h4>SPD: 6</h4>
                            </div>
                            <AnimatedSpriteSheet
                                filename={MAJORS[this.props.players[0]].idleSpritePath}
                                initialFrame={0}
                                frame={{width: 120, height: 160}}
                                bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                speed={200}
                            />
                        </div>
                        <div className="playerBattle">
                            <div className="stats">
                                <h4>HP: 20</h4>
                                <h4>ATK: 5</h4>
                                <h4>DEF: 3</h4>
                                <h4>SPD: 6</h4>
                            </div>
                            <AnimatedSpriteSheet
                                filename={MAJORS[this.props.players[1]].idleSpritePath}
                                initialFrame={0}
                                frame={{width: 120, height: 160}}
                                bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                speed={200}
                            />
                        </div>
                        <div className="playerBattle">
                            <div className="stats">
                                <h4>HP: 20</h4>
                                <h4>ATK: 5</h4>
                                <h4>DEF: 3</h4>
                                <h4>SPD: 6</h4>
                            </div>
                            <AnimatedSpriteSheet
                                filename={MAJORS[this.props.players[2]].idleSpritePath}
                                initialFrame={0}
                                frame={{width: 120, height: 160}}
                                bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                speed={200}
                            />
                        </div>
                        <div className="playerBattle">
                            <div className="stats">
                                <h4>HP: 20</h4>
                                <h4>ATK: 5</h4>
                                <h4>DEF: 3</h4>
                                <h4>SPD: 6</h4>
                            </div>
                            <AnimatedSpriteSheet
                                filename={MAJORS[this.props.players[3]].idleSpritePath}
                                initialFrame={0}
                                frame={{width: 120, height: 160}}
                                bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                speed={200}
                            />
                        </div>
                    </div>
                    <button className="enemyBattle"
                    style={this.state.showTargets === "enemy" ?
                    {backgroundColor: "green"} :
                    {backgroundColor: "black"}}
                    onClick={() => this.state.showTargets === "enemy" ? this.chooseTarget(0) : false }>
                    <div className="stats">
                                <h4>HP: {this.props.enemies[0].hp}</h4>
                                <h4>ATK: 5</h4>
                                <h4>DEF: 3</h4>
                                <h4>SPD: 6</h4>
                            </div>
                    </button>
                </div>
                <div className="battleHUD">
                    {this.state.showMoves ? 
                    <div className="flex">
                        <button onClick={this.target.bind(this, 0)}>{this.state.order[this.state.turn].move1.moveName}</button>
                        <button onClick={this.target.bind(this, 1)}>{this.state.order[this.state.turn].move2.moveName}</button>
                        <button onClick={this.target.bind(this, 2)}>{this.state.order[this.state.turn].move3.moveName}</button>
                        <button onClick={this.target.bind(this, 3)}>{this.state.order[this.state.turn].move4.moveName}</button>
                    </div>
                    : null}
                </div>
            </div>
        )
    }
}