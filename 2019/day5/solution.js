const raw_input = require("../util").readInput("day5/input.txt");
const IntComputer = require("../IntComputer");

const input = raw_input
    .split(",")
    .filter(line => !!line)
    .map(opcode => parseInt(opcode, 10));

module.exports.part1 = async () => {
    const opcodes = Object.assign([], input);

    const computer = new IntComputer(opcodes, [1]);
    computer.run();
    return computer.output;
};

module.exports.part2 = async () => {
    const opcodes = Object.assign([], input);

    const computer = new IntComputer(opcodes, [5]);
    computer.run();
    return computer.output;
};
