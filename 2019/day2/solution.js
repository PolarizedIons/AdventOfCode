const raw_input = require("../util").readInput("day2/input.txt");
// const raw_input = "1,9,10,3,2,3,11,0,99,30,40,50";
const input = raw_input
    .split(",")
    .filter(line => !!line)
    .map(opcode => parseInt(opcode, 10));

const runIntcode = opcodes => {
    let cursor = 0;

    while (true) {
        const numPos1 = opcodes[cursor + 1];
        const numPos2 = opcodes[cursor + 2];
        const storePos = opcodes[cursor + 3];

        if (opcodes[cursor] === 1) {
            opcodes[storePos] = opcodes[numPos1] + opcodes[numPos2];
        } else if (opcodes[cursor] === 2) {
            opcodes[storePos] = opcodes[numPos1] * opcodes[numPos2];
        } else if (opcodes[cursor] === 99) {
            break;
        } else {
            throw new Error(
                "Unknown opcode " + opcodes[cursor] + " at position " + cursor
            );
        }

        cursor += 4;
    }

    return opcodes[0];
};

module.exports.part1 = async () => {
    const opcodes = Object.assign([], input);
    opcodes[1] = 12;
    opcodes[2] = 2;
    return runIntcode(opcodes);
};

module.exports.part2 = async () => {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const opcodes = Object.assign([], input);
            opcodes[1] = noun;
            opcodes[2] = verb;
            if (runIntcode(opcodes) === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
};
