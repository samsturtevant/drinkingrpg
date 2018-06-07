import React from 'react';
import ReactTooltip from 'react-tooltip';
import { AnimatedSpriteSheet } from 'react-spritesheet';
import '../App.css';

const MAJORS = [
    {
        majorName: "Business",
        majorType: "Damage",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Trade Deal",
            moveTip: "Take d4 health from an enemy and heal yourself for that amount."
        },
        move2: {
            moveName: "Confidence",
            moveTip: "Increase your attack by d4."
        },
        move3: {
            moveName: "Management",
            moveTip: "Inspire a party member, increasing their attack by d6."
        },
        move4: {
            moveName: "Overtime",
            moveTip: "Deal d20 damage to an enemy. Critical success allows you to attack again. Critical fail self-inflicts 5 damage."
        }
    },
    {
        majorName: "Electrical Eng.",
        majorType: "Damage",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Spark",
            moveTip: "Zap an enemy for d6 damage."
        },
        move2: {
            moveName: "Charge",
            moveTip: "Roll a d4 to give your next electric attack a chance to stun (1 = 25%, 2 = 50%, 3 = 75%, 4 = 100%)."
        },
        move3: {
            moveName: "Circuit",
            moveTip: "Zap all enemies for d4 damage."
        },
        move4: {
            moveName: "Magnetic Field",
            moveTip: "Roll a d20 to create a personal shield that blocks all damage for the next turn. Critical success creates a shield for the entire party."
        }
    },
    {
        majorName: "Comp-Sci",
        majorType: "Damage",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Cord Whip",
            moveTip: "Hit the enemy with a power cord for d8 damage."
        },
        move2: {
            moveName: "Hack",
            moveTip: "Roll a d6 to switch the enemy's attack and defense."
        },
        move3: {
            moveName: "Debug",
            moveTip: "Roll a d4. If even, remove all buffs, debuffs, and status effects from the target."
        },
        move4: {
            moveName: "Execute",
            moveTip: "Roll a d20 and deal that much damage to the enemy. Critical success instantly kills them. Critical fail instantly kills you."
        }
    },
    {
        majorName: "Philosophy",
        majorType: "Damage",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Ad Hominem",
            moveTip: "Roll a d6 and deal that much damage to the enemy."
        },
        move2: {
            moveName: "Contemplation",
            moveTip: "Roll a d4 to boost attack and defense by 1. If the roll is a 1, self-inflict 1 damage instead."
        },
        move3: {
            moveName: "Straw Man",
            moveTip: "Create a replacement decoy with d4 health."
        },
        move4: {
            moveName: "Ubermensch",
            moveTip: "Roll a d20 and do that much damage to the enemy. Critical success restores 10 health."
        }
    },
    {
        majorName: "Geology",
        majorType: "Tank",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Rock Throw",
            moveTip: "Throw a rock, dealing d4 damage to an enemy. If the battlefield has been surveyed, apply a debuff based on the results."
        },
        move2: {
            moveName: "Foundation",
            moveTip: "Increase the party's defense by d4."
        },
        move3: {
            moveName: "Survey",
            moveTip: "Study the geology of the battlefield, boosting your rock throw ability. Roll d4 to determine results."
        },
        move4: {
            moveName: "Natural Disaster",
            moveTip: "Roll a d20. If ≤ 10, a landslide damages ground enemies for that amount. If > 10, an earthquake damages ground enemies for that amount. If critical success, a volcano damages all enemies for that amount plus one turn of burn damage."
        }
    },
    {
        majorName: "Civil Eng.",
        majorType: "Tank",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Prosecute",
            moveTip: "Use evidence to inflict 2 damage."
        },
        move2: {
            moveName: "Rebuttal",
            moveTip: "Choose a target. If an enemy attacks them during the next turn, return the same amount of damage to the enemy."
        },
        move3: {
            moveName: "Objection",
            moveTip: "Skip the target's turn."
        },
        move4: {
            moveName: "Convict",
            moveTip: "Deal half of the damage that the target has dealt during the fight."
        }
    },
    {
        majorName: "Law",
        majorType: "Tank",
        idleSpritePath: require("../Assets/law-idle.png"),
        move1: {
            moveName: "Prosecute",
            moveTip: "Use evidence to inflict d6 damage to an enemy."
        },
        move2: {
            moveName: "Objection",
            moveTip: "Roll a d4. If even, skip the target's next turn."
        },
        move3: {
            moveName: "Rebuttal",
            moveTip: "Roll a d4, targeting the corresponding party member. If an enemy attacks them during the next turn, block the attack and return the same amount of damage to the enemy."
        },
        move4: {
            moveName: "Convict",
            moveTip: "Roll 4d20. This number will act as a percentage, inflicting a portion of the enemy's total damage dealt during the fight. Critical success inflicts the enemy's total damage."
        }
    },
    {
        majorName: "Theater",
        majorType: "Tank",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Prosecute",
            moveTip: "Use evidence to inflict 2 damage."
        },
        move2: {
            moveName: "Rebuttal",
            moveTip: "Choose a target. If an enemy attacks them during the next turn, return the same amount of damage to the enemy."
        },
        move3: {
            moveName: "Objection",
            moveTip: "Skip the target's turn."
        },
        move4: {
            moveName: "Convict",
            moveTip: "Deal half of the damage that the target has dealt during the fight."
        }
    },
    {
        majorName: "Music",
        majorType: "Utility",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Power Chord",
            moveTip: "Deal d6 damage to an enemy."
        },
        move2: {
            moveName: "Tune",
            moveTip: "Boost an ally's attack power by d4."
        },
        move3: {
            moveName: "Rhythm",
            moveTip: "Roll a d4, targeting the corresponding party member. Set the tempo for them and increase their speed."
        },
        move4: {
            moveName: "Harmony",
            moveTip: "Roll a d20, randomly distributing it to the party as attack and defense. Critical success increases party attack and defense by 3 each."
        }
    },
    {
        majorName: "Photography",
        majorType: "Utility",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Tripod",
            moveTip: "Extend your tripod into a weapon, striking an enemy for d4 damage."
        },
        move2: {
            moveName: "Snapshot",
            moveTip: "Take a picture of an enemy, lowering their defense by d4."
        },
        move3: {
            moveName: "Flash",
            moveTip: "Roll a d10, an enemy's hit chance (1 = -10%, 2 = -20%, etc.)."
        },
        move4: {
            moveName: "Photoshop",
            moveTip: "Roll a d20 and randomly distribute to the party, increasing attack, defense, and speed."
        }
    },
    {
        majorName: "Chemistry",
        majorType: "Utility",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Prosecute",
            moveTip: "Use evidence to inflict 2 damage."
        },
        move2: {
            moveName: "Rebuttal",
            moveTip: "Choose a target. If an enemy attacks them during the next turn, return the same amount of damage to the enemy."
        },
        move3: {
            moveName: "Objection",
            moveTip: "Skip the target's turn."
        },
        move4: {
            moveName: "Convict",
            moveTip: "Deal half of the damage that the target has dealt during the fight."
        }
    },
    {
        majorName: "Design",
        majorType: "Utility",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Prosecute",
            moveTip: "Use evidence to inflict 2 damage."
        },
        move2: {
            moveName: "Rebuttal",
            moveTip: "Choose a target. If an enemy attacks them during the next turn, return the same amount of damage to the enemy."
        },
        move3: {
            moveName: "Objection",
            moveTip: "Skip the target's turn."
        },
        move4: {
            moveName: "Convict",
            moveTip: "Deal half of the damage that the target has dealt during the fight."
        }
    },
    {
        majorName: "Pre-Med",
        majorType: "Restoration",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Incision",
            moveTip: "Slice an enemy for d4 health and an additional turn of bleed damage."
        },
        move2: {
            moveName: "Cure",
            moveTip: "Use modern medicine to heal an ally for d6 health."
        },
        move3: {
            moveName: "Medicate",
            moveTip: "Prescribe an ally amphetamines, giving them attack priority for the next d4 turns."
        },
        move4: {
            moveName: "Vaccinate",
            moveTip: "Inject your party with a live vaccine, randomly distributing d20 defense to the entire party. Critical success also restores party health fully. Critical failure inflicts 3 turns of disease damage to the entire party."
        }
    },
    {
        majorName: "Religion",
        majorType: "Restoration",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Thumb",
            moveTip: "Whack an enemy with a sacred text, dealing d4 damage."
        },
        move2: {
            moveName: "Prayer",
            moveTip: "Ask for divine assistance, healing an ally for d8 health when the next turn begins."
        },
        move3: {
            moveName: "Karma",
            moveTip: "All healing and damage effects are reciprocated to the user for d4 turns."
        },
        move4: {
            moveName: "Resurrection",
            moveTip: "Revive a fallen party member with d20 health. Critical success restores health fully."
        }
    },
    {
        majorName: "Psychology",
        majorType: "Restoration",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Pavlov's Dog",
            moveTip: "Ring a bell and inflict d4 damage to an enemy."
        },
        move2: {
            moveName: "Counsel",
            moveTip: "Help the target consider their best move, healing them for d4 and increasing their attack by the same amount."
        },
        move3: {
            moveName: "Psychoanalyze",
            moveTip: "Identify the target's weakness by understanding their childhood trauma, lowering their defense by d6."
        },
        move4: {
            moveName: "Group Therapy",
            moveTip: "Help your party process their feelings, randomly distributing d20 health to the party. Critical success fully restores party health."
        }
    },
    {
        majorName: "Ecology",
        majorType: "Restoration",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Whack",
            moveTip: "Strike an enemy with a stick, dealing d4 damage."
        },
        move2: {
            moveName: "Remedy",
            moveTip: "Use plant medicine to heal an ally for d6 health."
        },
        move3: {
            moveName: "Sustain",
            moveTip: "Fortify an ally for the next turn. If they take fatal damage, they survive with d4 health."
        },
        move4: {
            moveName: "Regrowth",
            moveTip: "Party restores 1 health per turn for d20 turns. Critical success restores 2 health per turn."
        }
    },
]

export default class MajorSelectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMajor: Math.round(Math.random() * 15)
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
            console.log("previous value: " + this.state.currentMajor)
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
                        frame={{width: 240, height: 320}}
                        bounds={{x: 0, y: 0, width: 10080, height: 320}}
                        speed={200}
                    />
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
