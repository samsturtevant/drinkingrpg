export function d4() {
    return Math.ceil((Math.random() * 4))
}

export function d6() {
    return Math.ceil((Math.random() * 6))
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
                roll: d4(),
                singleDamage: "1",
                selfHealing: "1"
            }
        },
        move2: function() { // confidence
            return {
                roll: d4(),
                selfAttack: "1"
            }
        },
        move3: function() { // management
            return {
                roll: d6(),
                allyAttack: "1"
            }
        },
        move4: function() { // overtime
            return {
                roll: d20(),
                singleDamage: "1",
                special: "overtime"
            }
        }
    },
    { // electrical eng.
        targets: ["enemy", "self", "enemies", "self"],
        move1: function() { // spark
            return {
                roll: d6(),
                singleDamage: "1",
                special: "hasCharge"
            }
        },
        move2: function() { // charge
            return {
                roll: d4(),
                special: "charge"
            }
        },
        move3: function() { // circuit
            return {
                roll: d4(),
                multipleDamage: "1",
                special: "hasCharge"
            }
        },
        move4: function() { // magnetic field
            return {
                roll: d20(),
                special: "magnet"
            }
        }
    }
]