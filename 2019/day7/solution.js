const IntComputer = require("../IntComputer");
const raw_input = require("../util").readInput("day7/input.txt");

const input = raw_input
    .split(",")
    .filter(line => !!line)
    .map(opcode => parseInt(opcode, 10));

// https://stackoverflow.com/a/37580979
function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1,
        k,
        p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

module.exports.part1 = async () => {
    let maxOutput = -1;
    for (const phaseSettings of permute([0, 1, 2, 3, 4])) {
        let ampInput = 0;
        for (let i = 0; i < 5; i++) {
            const computer = new IntComputer(Object.assign([], input), [
                phaseSettings[i],
                ampInput,
            ]);
            computer.run();
            ampInput = computer.output;
        }

        maxOutput = Math.max(maxOutput, ampInput);
    }

    return maxOutput;
};

module.exports.part2 = async () => {
    return "NOT IMPLEMENTED";
};
