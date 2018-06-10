export function d4() {
    return Math.ceil((Math.random() * 4))
}

export function d6() {
    return Math.ceil((Math.random() * 6))
}

export function d8() {
    return Math.ceil((Math.random() * 8))
}

export function d20() {
    // return 20;
    return Math.ceil((Math.random() * 20))
}

export const MOVES = [
    { // business
        targets: ["enemy", "self", "ally", "enemy"],
        move1: function() { // trade deal
            return {
                roll: 4,
                singleDamage: "1",
                selfHealing: "1"
            }
        },
        move2: function() { // confidence
            return {
                roll: 4,
                selfAttack: "1"
            }
        },
        move3: function() { // management
            return {
                roll: 6,
                allyAttack: "1"
            }
        },
        move4: function() { // overtime
            return {
                roll: 20,
                singleDamage: "1",
                special: "overtime"
            }
        }
    },
    { // electrical eng.
        targets: ["enemy", "self", "enemies", "self"],
        move1: function() { // spark
            return {
                roll: 6,
                singleDamage: "1",
                special: "hasCharge"
            }
        },
        move2: function() { // charge
            return {
                roll: 4,
                special: "charge"
            }
        },
        move3: function() { // circuit
            return {
                roll: 4,
                multipleDamage: "1",
                special: "hasCharge"
            }
        },
        move4: function() { // magnetic field
            return {
                roll: 20,
                special: "magnet"
            }
        }
    },
    { // comp-sci
        targets: ["enemy", "enemy", "target", "enemy"],
        move1: function() { // cord whip
            return {
                roll: 8,
                singleDamage: "1"
            }
        },
        move2: function() { // hack
            return {
                roll: 6,
                special: "hack"
            }
        },
        move3: function() { // debug
            return {
                roll: 4,
                special: "debug"
            }
        },
        move4: function() { // execute
            return {
                roll: 20,
                singleDamage: 1,
                special: "execute"
            }
        }
    },
    { // philosophy
        targets: ["enemy", "self", "target", "enemy"],
        move1: function() { // ad hominem
            return {
                roll: 6,
                singleDamage: "1"
            }
        },
        move2: function() { // contemplation
            return {
                roll: 4,
                special: "contemplation"
            }
        },
        move3: function() { // strawman
            return {
                roll: 4,
                special: "strawman"
            }
        },
        move4: function() { // execute
            return {
                roll: 20,
                singleDamage: 1,
                special: "execute"
            }
        }
    }
]