import React from 'react';
import ReactDOM from 'react-dom';
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
            showTargets: false,
            rolling: 0,
            roll: 0,
            damaged: -1
        };
        this.chooseTarget = this.chooseTarget.bind(this)
        this.showMoves = this.showMoves.bind(this)
        this.distributeResults = this.distributeResults.bind(this)
        this.endRound = this.endRound.bind(this)
        this.showMoves = this.showMoves.bind(this)
        this.enemyRoll = this.enemyRoll.bind(this)
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
        setTimeout(() => {
        if (!currentUnit) {
            this.endRound();
        } else if (currentUnit.majorName) {
            this.showMoves(currentUnit);
        } else if (currentUnit.name) {
            this.enemyRoll(currentUnit.moves[Math.floor(Math.random() * (currentUnit.moves.length))](), currentUnit)
        }
        }, 1000)
    }

    showMoves(currentUnit) {
        var i = 0;
        var index = 0;
        this.state.players.forEach(p => {
            if (p.majorName === currentUnit.majorName) {
                index = i;
            }
            i++;
        });
        this.setState({
            showMoves: true,
            currentMoves: MOVES[currentUnit.majorIndex],
            currentUnit: currentUnit,
            currentPlayer: index
        }, () => { 
            this.getMovePosition()
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
        } else if (t === "target") {
            this.setState({
                moveUsed: move,
                showTargets: "all"
            });
        }
    }

    chooseTarget(target, player) {
        this.setState({showTargets: false, showMoves: false, rolling: 1})
        if (this.state.moveUsed === 0) {
            this.roll(this.state.currentMoves.move1(), target, player);
        } else if (this.state.moveUsed === 1) {
            this.roll(this.state.currentMoves.move2(), target, player);
        } else if (this.state.moveUsed === 2) {
            this.roll(this.state.currentMoves.move3(), target, player);
        } else if (this.state.moveUsed === 3) {
            this.roll(this.state.currentMoves.move4(), target, player);
        }
    }

    roll(results, target, player) {
        let output = this.refs.dice;
        output.style.display = "block";
        let roll = results.roll
        let started = new Date().getTime();
        let animationTimer = setInterval(function() {
            // If the value is what we want, stop animating
            // or if the duration has been exceeded, stop animating
            if (new Date().getTime() - started > 1000) {
                clearInterval(animationTimer);
                this.distributeResults(results, target, player, parseInt(output.innerHTML))
            } else {
                // Generate a random string to use for the next animation step
                output.innerHTML = Math.ceil(Math.random() * roll);
            }
        }.bind(this), 50);
        setTimeout(function() {
            output.style.display = "none";
        }, 2000)
    }

    enemyRoll(results, currentUnit) {
        var i = 0;
        var index = 0;
        this.state.enemies.forEach(e => {
            if (e.name === this.state.currentUnit.name) {
                index = i;
            }
            i++;
        });
        var enemies = this.state.enemies
        if (currentUnit.stun) {
            console.log("stun")
            currentUnit.stun = 0;
            enemies[index] = currentUnit
            this.setState({enemies: enemies, turn: this.state.turn + 1, currentUnit: this.state.order[this.state.turn]}, () => {
                this.startTurn(this.state.order[this.state.turn]);
            })
        } else {
            let output = this.refs.dice;
            output.style.display = "block";
            let roll = results.roll
            let started = new Date().getTime();
            let animationTimer = setInterval(function() {
                // If the value is what we want, stop animating
                // or if the duration has been exceeded, stop animating
                if (new Date().getTime() - started > 1000) {
                    clearInterval(animationTimer);
                    this.enemyMove(results, parseInt(output.innerHTML), currentUnit)
                } else {
                    // Generate a random string to use for the next animation step
                    output.innerHTML = Math.ceil(Math.random() * roll);
                }
            }.bind(this), 50);
            setTimeout(function() {
                output.style.display = "none";
            }, 2000)
        }
    }

    enemyMove(results, roll, currentUnit) {
        var p = this.state.players
        results.roll = roll;
        if (results.playerDamage) {
            let rp = Math.floor(Math.random() * 4)
            this.setState({damaged: rp})
            var damage = roll + currentUnit.attack - p[rp].defense
            if (this.state.strawman && p[rp].majorName === "Philosophy") {
                let strawman = this.state.strawman - (damage + p[rp].defense)
                damage = 0;
                if (strawman < 0) {
                    strawman = 0;
                }
                this.setState({strawman: strawman})
            } else if (p[rp].block) {
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
        setTimeout(() => {
            this.setState({damaged: -1})
        }, 500)
    }

    distributeResults(results, target, player, r) {
        let roll = r;
        var i = 0;
        var index = 0;
        this.state.players.forEach(p => {
            if (p.majorName === this.state.currentUnit.majorName) {
                index = i;
            }
            i++;
        });
        let p = this.state.players
        let e = this.state.enemies
        if (results.special === "charge") {
            if (roll % 2 == 0) {
                this.setState({charge: true})
            }
        } else if (results.special === "hasCharge" && this.state.charge) {
            if (results.multipleDamage) {
                e.forEach(enemy => {
                    enemy.stun = 1
                });
            } else {
                e[target].stun = 1
            }
            this.setState({enemies: e, charge: false})
        } else if (results.special === "magnet") {
            if (roll == 20) {
                p.forEach(player => {
                    player.block = player.block + 20
                });
            } else {
                p[index].block =  p[index].block + roll
            }
        } else if (results.special === "hack" && roll % 2 == 0) {
            let temp = e[target].attack
            e[target].attack = e[target].defense
            e[target].defense = temp
            this.setState({enemies: e})
        } else if (results.special === "debug" && roll % 2 == 0) {
            if (target >= 0) {
                let e = JSON.parse(JSON.stringify(this.state.enemies))
                let hp = e[target].hp
                e[target] = this.props.enemies[target]
                e[target].hp = hp
                e[target].stun = 0
                e[target].block = 0
                this.setState({enemies: e})
            } else {
                let hp = p[player].hp
                p[player] = JSON.parse(JSON.stringify(MAJORS[this.props.players[player]]))
                p[player].hp = hp
                p[player].stun = 0
                p[player].block = 0
                this.setState({players: p})
            }
        } else if (results.special === "contemplation") {
            if (roll == 1) {
                p[index].hp = p[index].hp - 1;
            } else {
                p[index].attack += roll;
                p[index].defense += roll;
            }
            this.setState({players: p})
        } else if (results.special === "strawman") {
            this.setState({strawman: roll})
        }
        if (results.singleDamage) {
            let damage = roll * results.singleDamage - e[target].defense + this.state.currentUnit.attack;
            if (damage < 0) {
                damage = 0;
            }
            e[target].hp = e[target].hp - (damage)
            this.setState({enemies: e})
        }
        if (results.multipleDamage) {
            e.forEach(enemy => {
                let damage = roll * results.multipleDamage - e[target].defense + this.state.currentUnit.attack;
                console.log(roll * results.multipleDamage - e[target].defense + this.state.currentUnit.attack)
                if (damage < 0) {
                    damage = 0;
                }
                enemy.hp = enemy.hp - damage 
            });
            this.setState({enemies: e})
        }
        if (results.selfHealing) {
            p[index].hp = p[index].hp + roll * results.selfHealing;
            if (p[index].hp > MAJORS[[p[index].majorIndex]].hp) {
                p[index].hp = MAJORS[[p[index].majorIndex]].hp;
            }
            this.setState({players: p})
        }
        if (results.selfAttack) {
            p[player].attack = p[player].attack + roll * results.selfAttack;
            this.setState({players: p})
        }
        if (results.allyAttack) {
            p[target * -1 - 1].attack = p[target * -1 - 1].attack + roll * results.allyAttack;
            this.setState({players: p})
        }
        if (roll == 20) { // critical success
            if (results.special === "overtime") {
                return this.startTurn(this.state.currentUnit);
            } else if (results.special === "execute") {
                e[target].hp = 0;
                this.setState({enemies: e})
            }
        } else if (roll == 1) { // critical fail
            if (results.special === "overtime" || results.special === "execute") {
                p[player].hp = 0
                this.setState({players: p})
            }
        }
        this.setState({turn: this.state.turn + 1, currentUnit: this.state.order[this.state.turn]}, () => {
            this.startTurn(this.state.order[this.state.turn]);
        })
    }

    getMovePosition() {
        let p = this.state.currentPlayer;
        let l = 0;
        let t = 0;
        if (p == 0) {
            l = ReactDOM.findDOMNode(this.refs.player1).getBoundingClientRect().right
            t = ReactDOM.findDOMNode(this.refs.player1).getBoundingClientRect().top
        } else if (p == 1) {
            l = ReactDOM.findDOMNode(this.refs.player2).getBoundingClientRect().right
            t = ReactDOM.findDOMNode(this.refs.player2).getBoundingClientRect().top
        } else if (p == 2) {
            l = ReactDOM.findDOMNode(this.refs.player3).getBoundingClientRect().right
            t = ReactDOM.findDOMNode(this.refs.player3).getBoundingClientRect().top
        } else {
            l = ReactDOM.findDOMNode(this.refs.player4).getBoundingClientRect().right
            t = ReactDOM.findDOMNode(this.refs.player4).getBoundingClientRect().top
        }
        this.setState({moveLeft: l, moveTop: t})
    }

    render() {
        return (
            <div>
                <div className="battle">
                    <div className="partyBattle">

                        <div className="playerBattle" style={{marginLeft: "14rem"}}>
                            <div className="status">
                                {this.state.players[0].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[0].block? <h4>Block ({this.state.players[0].block})</h4> : null}
                            </div>
                            <div className="stats">
                                <h4>{this.state.players[0].hp} / {MAJORS[this.props.players[0]].hp}</h4>
                                <h4>ATK: {this.state.players[0].attack}</h4>
                                <h4>DEF: {this.state.players[0].defense}</h4>
                                <h4>SPD: {this.state.players[0].speed}</h4>
                            </div>
                            <button ref="player1"
                            className={(this.state.showTargets === this.state.players[0] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[0] || this.state.showTargets === "all" ? "activeTarget " :
                            "inactiveTarget ") + (this.state.currentUnit && this.state.players[0].majorName === this.state.currentUnit.majorName ? "activeMove" : null)}
                            onClick={() => this.state.showTargets === this.state.players[0] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[0] || this.state.showTargets === "all" ? this.chooseTarget(-1, 0) : false }>
                                {this.state.damaged == 0 ? 
                                <img src={MAJORS[this.props.players[0]].damagedSpritePath} height={160} width={120} /> :
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[0]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />}
                            </button>
                            {this.state.strawman && this.state.players[0].majorName === "Philosophy" ? <div>
                                <h4>Strawman ({this.state.strawman})</h4>
                                <img height={83} src={require("../Assets/strawman.png")}/>
                            </div> : null}
                        </div>

                        <div className="playerBattle" style={{marginLeft: "10rem"}}>
                            <div className="status">
                                {this.state.players[1].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[1].block? <h4>Block ({this.state.players[1].block})</h4> : null}
                            </div>
                            <div className="stats">
                                <h4>{this.state.players[1].hp} / {MAJORS[this.props.players[1]].hp}</h4>
                                <h4>ATK: {this.state.players[1].attack}</h4>
                                <h4>DEF: {this.state.players[1].defense}</h4>
                                <h4>SPD: {this.state.players[1].speed}</h4>
                            </div>
                            <button ref="player2"
                            className={(this.state.showTargets === this.state.players[1] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[1] || this.state.showTargets === "all" ? "activeTarget " :
                            "inactiveTarget ") + (this.state.currentUnit && this.state.players[1].majorName === this.state.currentUnit.majorName ? "activeMove" : null)}
                            onClick={() => this.state.showTargets === this.state.players[1] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[1] || this.state.showTargets === "all" ? this.chooseTarget(-2, 1) : false }>
                                {this.state.damaged == 1 ? 
                                <img src={MAJORS[this.props.players[0]].damagedSpritePath} height={160} width={120} /> :
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[1]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />}
                            </button>
                            {this.state.strawman && this.state.players[1].majorName === "Philosophy" ? <div>
                                <h4>Strawman ({this.state.strawman})</h4>
                                <img height={83} src={require("../Assets/strawman.png")}/>
                            </div> : null}
                        </div>

                        <div className="playerBattle" style={{marginLeft: "6rem"}}>
                            <div className="status">
                                {this.state.players[2].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[2].block? <h4>Block ({this.state.players[2].block})</h4> : null}
                            </div>
                            <div className="stats">
                                <h4>{this.state.players[2].hp} / {MAJORS[this.props.players[2]].hp}</h4>
                                <h4>ATK: {this.state.players[2].attack}</h4>
                                <h4>DEF: {this.state.players[2].defense}</h4>
                                <h4>SPD: {this.state.players[2].speed}</h4>
                            </div>
                            <button ref="player3"
                            className={(this.state.showTargets === this.state.players[2] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[2] || this.state.showTargets === "all" ? "activeTarget " :
                            "inactiveTarget ") + (this.state.currentUnit && this.state.players[2].majorName === this.state.currentUnit.majorName ? "activeMove" : null)}
                            onClick={() => this.state.showTargets === this.state.players[2] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[2] || this.state.showTargets === "all" ? this.chooseTarget(-3, 2) : false }>
                                {this.state.damaged == 2 ? 
                                <img src={MAJORS[this.props.players[0]].damagedSpritePath} height={160} width={120} /> :
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[2]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />}
                            </button>
                            {this.state.strawman && this.state.players[2].majorName === "Philosophy" ? <div>
                                <h4>Strawman ({this.state.strawman})</h4>
                                <img height={83} src={require("../Assets/strawman.png")}/>
                            </div> : null}
                        </div>

                        <div className="playerBattle">
                            <div className="status">
                                {this.state.players[3].majorName === "Electrical Eng." && this.state.charge ? <h4>Charge</h4> : null}
                                {this.state.players[3].block? <h4>Block ({this.state.players[3].block})</h4> : null}
                            </div>
                            <div className="stats">
                                <h4>{this.state.players[3].hp} / {MAJORS[this.props.players[3]].hp}</h4>
                                <h4>ATK: {this.state.players[3].attack}</h4>
                                <h4>DEF: {this.state.players[3].defense}</h4>
                                <h4>SPD: {this.state.players[3].speed}</h4>
                            </div>
                            <button ref="player4"
                            className={(this.state.showTargets === this.state.players[3] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[3] || this.state.showTargets === "all" ? "activeTarget " :
                            "inactiveTarget ") + (this.state.currentUnit && this.state.players[3].majorName === this.state.currentUnit.majorName ? "activeMove" : null)}
                            onClick={() => this.state.showTargets === this.state.players[3] || this.state.showTargets === "ally" && this.state.currentUnit != this.state.players[3] || this.state.showTargets === "all" ? this.chooseTarget(-4, 3) : false }>
                                {this.state.damaged == 3 ? 
                                <img src={MAJORS[this.props.players[0]].damagedSpritePath} height={160} width={120} /> :
                                <AnimatedSpriteSheet
                                    filename={MAJORS[this.props.players[3]].idleSpritePath}
                                    initialFrame={0}
                                    frame={{width: 120, height: 160}}
                                    bounds={{x: 0, y: 0, width: 5040, height: 160}}
                                    speed={200}
                                />}
                            </button>
                            {this.state.strawman && this.state.players[3].majorName === "Philosophy" ? <div>
                                <h4>Strawman ({this.state.strawman})</h4>
                                <img height={83} src={require("../Assets/strawman.png")}/>
                            </div> : null}
                        </div>

                    </div>
                    <div>
                        <button className="enemyBattle"
                        className={this.state.showTargets === "enemy" || this.state.showTargets === "all" ?
                        "activeTarget" : "inactiveTarget"}
                        onClick={() => this.state.showTargets === "enemy" || this.state.showTargets === "all" ? this.chooseTarget(0) : false }>
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
                        className={this.state.showTargets === "enemy" || this.state.showTargets === "all" ?
                        "activeTarget" : "inactiveTarget"}
                        onClick={() => this.state.showTargets === "enemy" || this.state.showTargets === "all" ? this.chooseTarget(1) : false }>
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
                <div style={{display: "flex"}} className="battleHUD">
                    {this.state.showMoves ? 
                    <div style={{left: this.state.moveLeft, top: this.state.moveTop}} className="flex moveButtonContainer">
                        <div className="moveRow">
                            {this.state.currentUnit && this.state.showMoves ? <button className="moveButton" onClick={this.showTargets.bind(this, 0)}>{this.state.currentUnit.move1.moveName}</button> : null}
                            {this.state.currentUnit && this.state.showMoves ? <button className="moveButton" onClick={this.showTargets.bind(this, 1)}>{this.state.currentUnit.move2.moveName}</button> : null}
                        </div>
                        <div className="moveRow">
                            {this.state.currentUnit && this.state.showMoves ? <button className="moveButton" onClick={this.showTargets.bind(this, 2)}>{this.state.currentUnit.move3.moveName}</button> : null}
                            {this.state.currentUnit && this.state.showMoves ? <button className="moveButton" onClick={this.showTargets.bind(this, 3)}>{this.state.currentUnit.move4.moveName}</button> : null}
                        </div>
                    </div>
                    : null}
                    <div className="rollContainer">
                        <p className="dice" style={this.state.rolling ? {display: "block"} : {display: "none"}} ref="dice"></p>
                    </div>
                </div>
            </div>
        )
    }
}