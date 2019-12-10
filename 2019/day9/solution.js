const IntComputer = require("../IntComputer");
const raw_input = require("../util").readInput("day9/input.txt");
// const raw_input = "1102,34915192,34915192,7,4,7,99";
// const raw_input = "104,1125899906842624,99";

const input = raw_input
    .split(",")
    .filter(line => !!line)
    .map(opcode => parseInt(opcode, 10));

module.exports.part1 = async () => {
    const computer = new IntComputer(Object.assign([], input), [1]);
    computer.run();
    return computer.output;
};

module.exports.part2 = async () => {
    const computer = new IntComputer(Object.assign([], input), [2]);
    computer.run();
    return computer.output;
};
