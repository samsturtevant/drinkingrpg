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
            players: [
                MAJORS[this.props.players[0]], 
                MAJORS[this.props.players[1]], 
                MAJORS[this.props.players[2]], 
                MAJORS[this.props.players[3]]
            ],
            order: [
                MAJORS[this.props.players[0]],
                MAJORS[this.props.players[1]],
                MAJORS[this.props.players[2]],
                MAJORS[this.props.players[3]],
                this.props.enemies
            ],
            currentUnit: MAJORS[this.props.players[0]],
            enemies: this.props.enemies,
            showMoves: false,
            showTargets: false
        };
        this.chooseTarget = this.chooseTarget.bind(this)
        this.showMoves = this.showMoves.bind(this)
    }

    componentDidMount() {
        this.setState({currentUnit: this.state.order[this.state.turn]}, function() {
            this.startTurn(this.state.currentUnit);
        })
    }

    startTurn(currentUnit) {
        if (currentUnit.majorName) {
            this.showMoves(currentUnit);
        }
    }

    showMoves(currentUnit) {
        this.setState({
            showMoves: true,
            currentMoves: MOVES[currentUnit.majorIndex],
            currentUnit: currentUnit
        }, () => { 
            //
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
            this.setState({showTargets: false, showMoves: false})
            this.distributeResults(this.state.currentMoves.move1(), target);
        }
    }

    distributeResults(results, target) {
        let roll = results.roll;
        if (results.singleDamage) {
            let e = this.state.enemies;
            e[target].hp = e[target].hp - roll * results.singleDamage - this.state.players[this.state.turn].attack
            this.setState({enemies: e})
        }
        if (results.selfHealing) {
            let p = this.state.players[this.state.turn];
            p.hp = p.hp + roll * results.selfHealing
        }
        this.setState({turn: this.state.turn++, currentUnit: this.state.order[this.state.turn]})
        // if (this.state.turn > this.state.order.length + 1) {
        //     this.setState({turn: 0})
        // }
        this.startTurn(this.state.order[this.state.turn]);
    }

    render() {
        return (
            <div>
                <div className="battle">
                    <div className="partyBattle">
                        <div className="playerBattle" style={{marginLeft: "14rem"}}>
                            <div className="stats">
                                <h4>HP: {this.state.players[0].hp}</h4>
                                <h4>ATK: {this.state.players[0].attack}</h4>
                                <h4>DEF: {this.state.players[0].defense}</h4>
                                <h4>SPD: {this.state.players[0].speed}</h4>
                            </div>
                            <AnimatedSpriteSheet
                                filename={MAJORS[this.props.players[0]].idleSpritePath}
                                initialFrame={0}
                                frame={{width: 120, height: 160}}
                                bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                speed={200}
                            />
                        </div>
                        <div className="playerBattle" style={{marginLeft: "10rem"}}>
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
                        <div className="playerBattle" style={{marginLeft: "6rem"}}>
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
                                <h4>ATK: {this.props.enemies[0].attack}</h4>
                                <h4>DEF: {this.props.enemies[0].defense}</h4>
                                <h4>SPD: {this.props.enemies[0].speed}</h4>
                            </div>
                    </button>
                </div>
                <div className="battleHUD">
                    {this.state.showMoves ? 
                    <div className="flex">
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.target.bind(this, 0)}>{this.state.currentUnit.move1.moveName}</button> : null}
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.target.bind(this, 1)}>{this.state.currentUnit.move2.moveName}</button> : null}
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.target.bind(this, 2)}>{this.state.currentUnit.move3.moveName}</button> : null}
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.target.bind(this, 3)}>{this.state.currentUnit.move4.moveName}</button> : null}
                    </div>
                    : null}
                </div>
            </div>
        )
    }
}