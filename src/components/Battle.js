import React from 'react';
import ReactTooltip from 'react-tooltip';
import { AnimatedSpriteSheet } from 'react-spritesheet';
import '../App.css';

import { MAJORS } from './majors.js';
import { MOVES } from './moves.js';

export default class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: 0,
            players: [
                JSON.parse(JSON.stringify(MAJORS[this.props.players[0]])), 
                JSON.parse(JSON.stringify(MAJORS[this.props.players[1]])), 
                JSON.parse(JSON.stringify(MAJORS[this.props.players[2]])), 
                JSON.parse(JSON.stringify(MAJORS[this.props.players[3]]))
            ],
            enemies: [
                this.props.enemies[0], 
                this.props.enemies[1], 
                this.props.enemies[2], 
                this.props.enemies[3]
            ].filter(Boolean),
            order: [],
            currentUnit: MAJORS[this.props.players[0]],
            showMoves: false,
            showTargets: false
        };
        this.chooseTarget = this.chooseTarget.bind(this)
        this.showMoves = this.showMoves.bind(this)
    }

    componentDidMount() {
        this.sortOrder()
        this.setState({currentUnit: this.state.order[0]}, () => {
            this.startTurn(this.state.currentUnit);
        })
    }

    sortOrder() {
        // var newOrder = this.state.order;
        var newOrder = [];
        newOrder = newOrder.concat(this.state.players)
        newOrder = newOrder.concat(this.state.enemies)
        newOrder.sort((a, b) => {
            if (a.speed > b.speed) {
                return -1;
            }
            if (a.speed < b.speed) {
                return 1;
            } else {
                return 0;
            }
        });
        this.setState({order: newOrder.filter(Boolean), currentUnit: newOrder[0]});
    }

    endRound() {
        this.sortOrder()
        this.setState({turn: 0, currentUnit: this.state.order[this.state.turn]}, function() {
            this.startTurn(this.state.currentUnit)
        })
    }

    startTurn(currentUnit) {
        if (!currentUnit) {
            this.endRound();
        } else if (currentUnit.majorName) {
            this.showMoves(currentUnit);
        } else if (currentUnit.name) {
            this.enemyMove(currentUnit.moves[Math.floor(Math.random() * (currentUnit.moves.length))]())
        }
    }

    showMoves(currentUnit) {
        this.setState({
            showMoves: true,
            currentMoves: MOVES[currentUnit.majorIndex],
            currentUnit: currentUnit
        }, () => { 
            
        });
    }

    showTargets(move) {
        var t = this.state.currentMoves.targets[move]
        if (t === "enemy" || t === "enemies") {
            this.setState({
                showTargets: "enemy",
                moveUsed: move
            });
        } else if (t === "self") {
            var i = 0;
            var index = 0;
            this.state.players.forEach(p => {
                if (p.majorName === this.state.currentUnit.majorName) {
                    index = i;
                }
                i++;
            });
            this.setState({
                moveUsed: move,
                showTargets: this.state.players[index]
            });
        } else if (t === "ally") {
            this.setState({
                moveUsed: move,
                showTargets: "ally"
            }, () => {
                
            });
        }
    }

    chooseTarget(target, player) {
        this.setState({showTargets: false, showMoves: false})
        if (this.state.moveUsed === 0) {
            this.distributeResults(this.state.currentMoves.move1(), target, player);
        } else if (this.state.moveUsed === 1) {
            this.distributeResults(this.state.currentMoves.move2(), target, player);
        } else if (this.state.moveUsed === 2) {
            this.distributeResults(this.state.currentMoves.move3(), target, player);
        } else if (this.state.moveUsed === 3) {
            this.distributeResults(this.state.currentMoves.move4(), target, player);
        }
    }

    enemyMove(results) {
        var p = this.state.players
        if (results.playerDamage) {
            let rp = Math.floor(Math.random() * 4)
            var damage = Math.ceil(Math.random() * results.roll) + this.state.currentUnit.attack - p[rp].defense
            if (p[rp].block) {
                let d = damage
                damage = damage - p[rp].block
                p[rp].block = p[rp].block - d
                if (p[rp].block < 0) {
                    p[rp].block = 0
                }
            }
            if (damage < 0) {
                damage = 0
            }
            p[rp].hp = p[rp].hp - (damage)
        }
        this.setState({players: p, turn: this.state.turn + 1, currentUnit: this.state.order[this.state.turn]}, () => {
            this.startTurn(this.state.order[this.state.turn]);
        })
    }

    distributeResults(results, target, player) {
        var i = 0;
        var index = 0;
        this.state.players.forEach(p => {
            if (p.majorName === this.state.currentUnit.majorName) {
                index = i;
            }
            i++;
        });
        let roll = results.roll;
        if (results.special === "charge") {
            let r = Math.ceil(Math.random() * roll)
            if (r == 4) {
                this.setState({charge: true})
            }
        } else if (results.special === "hasCharge" && this.state.charge) {
            let e = this.state.enemies;
            e[target].stun = 1
            this.setState({enemies: e})
        }
        if (results.special === "magnet") {
            let p = this.state.players;
            if (roll == 20) {
                p.forEach(player => {
                    player.block = player.block + 20
                });
            } else {
                p[index].block =  p[index].block + roll
            }
        }
        if (results.singleDamage) {
            let e = this.state.enemies;
            let damage = roll * results.singleDamage - e[target].defense + this.state.currentUnit.attack;
            if (damage < 0) {
                damage = 0;
            }
            e[target].hp = e[target].hp - (damage)
            this.setState({enemies: e})
        }
        if (results.multipleDamage) {
            let e = this.state.enemies;
            console.log(e)
            e.forEach(enemy => {
                let damage = roll * results.multipleDamage - e[target].defense  + this.state.currentUnit.attack;
                if (damage < 0) {
                    damage = 0;
                }
                enemy.hp = enemy.hp - damage 
            });
            this.setState({enemies: e})
        }
        if (results.selfHealing) {
            let p = this.state.players;
            var i = 0;
            var index = 0;
            p[index].hp = p[index].hp + roll * results.selfHealing;
            if (p[index].hp > MAJORS[[p[index].majorIndex]].hp) {
                p[index].hp = 20;
            }
            this.setState({players: p})
        }
        if (results.selfAttack) {
            let p = this.state.players;
            p[player].attack = p[player].attack + roll * results.selfAttack;
            this.setState({players: p})
        }
        if (results.allyAttack) {
            let p = this.state.players;
            p[target * -1 - 1].attack = p[target * -1 - 1].attack + roll * results.allyAttack;
            this.setState({players: p})
        }
        if (roll == 20) { // critical success
            if (results.special === "overtime") {
                return this.startTurn(this.state.currentUnit);
            }
        }
        this.setState({turn: this.state.turn + 1, currentUnit: this.state.order[this.state.turn]}, () => {
            this.startTurn(this.state.order[this.state.turn]);
        })
    }

    render() {
        return (
            <div>
                <div className="battle">
                    <div className="partyBattle">
                        <div className="playerBattle" style={{marginLeft: "14rem"}}>
                            <div className="stats">
                                <h4>{this.state.players[0].hp} / {MAJORS[this.props.players[0]].hp}</h4>
                                <h4>ATK: {this.state.players[0].attack}</h4>
                                <h4>DEF: {this.state.players[0].defense}</h4>
                                <h4>SPD: {this.state.players[0].speed}</h4>
                            </div>
                            <button 
                            className={this.state.showTargets === this.state.players[0] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[0] ?
                            "activeTarget" :
                            "inactiveTarget"}
                            onClick={() => this.state.showTargets === this.state.players[0] ? this.chooseTarget(-1, 0) : false }>
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[0]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />
                            </button>
                            <div className="status">
                                {this.state.players[0].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[0].block? <h4>Block ({this.state.players[0].block})</h4> : null}
                            </div>
                        </div>
                        <div className="playerBattle" style={{marginLeft: "10rem"}}>
                            <div className="stats">
                                <h4>{this.state.players[1].hp} / {MAJORS[this.props.players[1]].hp}</h4>
                                <h4>ATK: {this.state.players[1].attack}</h4>
                                <h4>DEF: {this.state.players[1].defense}</h4>
                                <h4>SPD: {this.state.players[1].speed}</h4>
                            </div>
                            <button 
                            className={this.state.showTargets === this.state.players[1] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[1] ?
                            "activeTarget" :
                            "inactiveTarget"}
                            onClick={() => this.state.showTargets === this.state.players[1] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[1] ? this.chooseTarget(-2, 1) : false }>
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[1]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />
                            </button>
                            <div className="status">
                                {this.state.players[1].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[1].block? <h4>Block ({this.state.players[1].block})</h4> : null}
                            </div>
                        </div>
                        <div className="playerBattle" style={{marginLeft: "6rem"}}>
                            <div className="stats">
                                <h4>{this.state.players[2].hp} / {MAJORS[this.props.players[2]].hp}</h4>
                                <h4>ATK: {this.state.players[2].attack}</h4>
                                <h4>DEF: {this.state.players[2].defense}</h4>
                                <h4>SPD: {this.state.players[2].speed}</h4>
                            </div>
                            <button 
                            className={this.state.showTargets === this.state.players[2] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[2] ?
                            "activeTarget" :
                            "inactiveTarget"}
                            onClick={() => this.state.showTargets === this.state.players[2] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[2] ? this.chooseTarget(-3, 2) : false }>
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[2]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />
                            </button>
                            <div className="status">
                                {this.state.players[2].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[2].block? <h4>Block ({this.state.players[2].block})</h4> : null}
                            </div>
                        </div>
                        <div className="playerBattle">
                            <div className="stats">
                                <h4>{this.state.players[3].hp} / {MAJORS[this.props.players[3]].hp}</h4>
                                <h4>ATK: {this.state.players[3].attack}</h4>
                                <h4>DEF: {this.state.players[3].defense}</h4>
                                <h4>SPD: {this.state.players[3].speed}</h4>
                            </div>
                            <button 
                            className={this.state.showTargets === this.state.players[3] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[3] ?
                            "activeTarget" :
                            "inactiveTarget"}
                            onClick={() => this.state.showTargets === this.state.players[3] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[3] ? this.chooseTarget(-4, 3) : false }>
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[3]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />
                            </button>
                            <div className="status">
                                {this.state.players[3].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[3].block? <h4>Block ({this.state.players[3].block})</h4> : null}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="enemyBattle"
                        className={this.state.showTargets === "enemy" ?
                        "activeTarget" : "inactiveTarget"}
                        onClick={() => this.state.showTargets === "enemy" ? this.chooseTarget(0) : false }>
                        <div className="status">
                            {this.state.enemies[0].stun ? <h4>STUN ({this.state.enemies[0].stun})</h4> : null}
                        </div>
                        <div className="stats">
                                    <h4>HP: {this.state.enemies[0].hp}</h4>
                                    <h4>ATK: {this.state.enemies[0].attack}</h4>
                                    <h4>DEF: {this.state.enemies[0].defense}</h4>
                                    <h4>SPD: {this.state.enemies[0].speed}</h4>
                                </div>
                        </button>
                    </div>
                    <div>
                        <button className="enemyBattle"
                        className={this.state.showTargets === "enemy" ?
                        "activeTarget" : "inactiveTarget"}
                        onClick={() => this.state.showTargets === "enemy" ? this.chooseTarget(1) : false }>
                        <div className="status">
                            {this.state.enemies[1].stun ? <h4>STUN ({this.state.enemies[1].stun})</h4> : null}
                        </div>
                        <div className="stats">
                                    <h4>HP: {this.state.enemies[1].hp}</h4>
                                    <h4>ATK: {this.state.enemies[1].attack}</h4>
                                    <h4>DEF: {this.state.enemies[1].defense}</h4>
                                    <h4>SPD: {this.state.enemies[1].speed}</h4>
                                </div>
                        </button>
                    </div>
                </div>
                <div className="battleHUD">
                    {this.state.showMoves ? 
                    <div className="flex">
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.showTargets.bind(this, 0)}>{this.state.currentUnit.move1.moveName}</button> : null}
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.showTargets.bind(this, 1)}>{this.state.currentUnit.move2.moveName}</button> : null}
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.showTargets.bind(this, 2)}>{this.state.currentUnit.move3.moveName}</button> : null}
                        {this.state.currentUnit && this.state.showMoves ? <button onClick={this.showTargets.bind(this, 3)}>{this.state.currentUnit.move4.moveName}</button> : null}
                    </div>
                    : null}
                </div>
            </div>
        )
    }
}