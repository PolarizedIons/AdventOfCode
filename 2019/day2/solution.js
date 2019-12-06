const IntComputer = require("../IntComputer");
const raw_input = require("../util").readInput("day2/input.txt");
// const raw_input = "1,9,10,3,2,3,11,0,99,30,40,50";
const input = raw_input
    .split(",")
    .filter(line => !!line)
    .map(opcode => parseInt(opcode, 10));

module.exports.part1 = async () => {
    const opcodes = Object.assign([], input);
    opcodes[1] = 12;
    opcodes[2] = 2;
    const computer = new IntComputer(opcodes);
    computer.run();
    return computer.output;
};

module.exports.part2 = async () => {
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            const opcodes = Object.assign([], input);
            opcodes[1] = noun;
            opcodes[2] = verb;
            const computer = new IntComputer(opcodes);
            computer.run();
            if (computer.output === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
};
