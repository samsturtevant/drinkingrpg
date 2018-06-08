export function d4() {
    return Math.ceil((Math.random() * 4))
}

export const MOVES = [
    {
        targets: ["enemy", "self", "ally", "enemy"],
        move1: function() { // trade deal
            return {
                targets: "enemy",
                roll: d4(),
                singleDamage: "1",
                selfHealing: "1"
            }
        }
    }
]