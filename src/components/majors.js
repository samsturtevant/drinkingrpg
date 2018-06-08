export const MAJORS = [
    {
        majorIndex: 0,
        majorName: "Business",
        majorType: "Damage",
        idleSpritePath: require("../Assets/business-idle.png"),
        hp: 20,
        attack: 5,
        defense: 3,
        speed: 5,
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
            moveTip: "Deal d20 damage to an enemy. Critical success allows you to attack again. Critical fail causes you to faint."
        }
    },
    {
        majorIndex: 1,
        majorName: "Electrical Eng.",
        majorType: "Damage",
        idleSpritePath: require("../Assets/ee-idle.png"),
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
        majorIndex: 2,
        majorName: "Comp-Sci",
        majorType: "Damage",
        idleSpritePath: require("../Assets/cs-idle.png"),
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
        majorIndex: 3,
        majorName: "Philosophy",
        majorType: "Damage",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Ad Hominem",
            moveTip: "Roll a d6 and deal that much damage to an enemy."
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
        majorIndex: 4,
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
        majorIndex: 5,
        majorName: "Civil Eng.",
        majorType: "Tank",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Safety Violation",
            moveTip: "Damage an enemy for d4, with a chance to stun them (1 = 25%, 2 = 50%, etc.)."
        },
        move2: {
            moveName: "Structure",
            moveTip: "Fortify an ally by building a structure which has d6 health."
        },
        move3: {
            moveName: "Hard Hat",
            moveTip: "Support an ally by giving them a hard hat, boosting their defense by d4."
        },
        move4: {
            moveName: "Steamroller",
            moveTip: "Flatten the opposition, distributing d20 damage across all enemies. Critical success greatly lowers enemies' speed."
        }
    },
    {
        majorIndex: 6,
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
        majorIndex: 7,
        majorName: "Theater",
        majorType: "Tank",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Break a Leg",
            moveTip: "Attack an enemy, dealing d4 damage and lowering their speed by the same amount."
        },
        move2: {
            moveName: "Spotlight",
            moveTip: "Taunt an enemy, forcing it to attack you for d4 turns."
        },
        move3: {
            moveName: "Stage Presence",
            moveTip: "Roll a d4, lowering all enemies' defense by that amount."
        },
        move4: {
            moveName: "Encore",
            moveTip: "Roll a d20, dealing that much damage to an enemy. If the enemy faints, attack again."
        }
    },
    {
        majorIndex: 8,
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
        majorIndex: 9,
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
            moveTip: "Roll a d20 and randomly alter the party's stats, increasing attack, defense, and speed."
        }
    },
    {
        majorIndex: 10,
        majorName: "Chemistry",
        majorType: "Utility",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Acidic Solution",
            moveTip: "Douse an enemy in an acidic solution, inflicting d6 damage."
        },
        move2: {
            moveName: "Concoction",
            moveTip: "Create a mystery solution which boosts a party member's attack or defense by d4."
        },
        move3: {
            moveName: "Catalyst",
            moveTip: "Roll a d4. If even, double the effect of your next chemical solution."
        },
        move4: {
            moveName: "Reaction",
            moveTip: "Create an explosive solution which randomly distributes d20 damage across all enemies. Critical success inflicts 2 turns of burn damage. Critical failure self-inflicts 5 damage."
        }
    },
    {
        majorIndex: 11,
        majorName: "Design",
        majorType: "Utility",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Prototype",
            moveTip: "Damage an enemy with a prototype weapon for d6 damage."
        },
        move2: {
            moveName: "Research",
            moveTip: "Study an enemy to find their weakness, lowering their defense by d4."
        },
        move3: {
            moveName: "Brainstorm",
            moveTip: "Collaborate with an ally to boost both of your defenses by d4."
        },
        move4: {
            moveName: "User Testing",
            moveTip: "Test a design with your allies, distributing d20 attack across the party. Critical success also boosts defense. Critical failure lowers party attack by 2."
        }
    },
    {
        majorIndex: 12,
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
        majorIndex: 13,
        majorName: "Religion",
        majorType: "Restoration",
        idleSpritePath: require("../Assets/ce-idle.png"),
        move1: {
            moveName: "Thump",
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
        majorIndex: 14,
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
        majorIndex: 15,
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