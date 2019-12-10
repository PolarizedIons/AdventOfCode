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
    let maxThrust = -1;

    for (const phaseSettings of permute([5, 6, 7, 8, 9])) {
        const ampA = new IntComputer(Object.assign([], input), [
            phaseSettings[0],
        ]);
        const ampB = new IntComputer(Object.assign([], input), [
            phaseSettings[1],
        ]);
        const ampC = new IntComputer(Object.assign([], input), [
            phaseSettings[2],
        ]);
        const ampD = new IntComputer(Object.assign([], input), [
            phaseSettings[3],
        ]);
        const ampE = new IntComputer(Object.assign([], input), [
            phaseSettings[4],
        ]);

        ampA.running = true;
        ampB.running = true;
        ampC.running = true;
        ampD.running = true;
        ampE.running = true;

        let ampInput = 0;
        while (ampE.running) {
            // AMP A
            while (
                ampA.running &&
                ampA.inputs.length !== 0 &&
                ampA.cursorInt !== 3
            ) {
                ampA.step();
            }
            ampA.inputs.push(ampInput);
            while (ampA.running && ampA.outputs.length === 0) {
                ampA.step();
            }

            // AMP B
            while (
                ampB.running &&
                ampA.inputs.length !== 0 &&
                ampB.cursorInt !== 3
            ) {
                ampB.step();
            }
            ampB.inputs.push(ampA.output);
            ampA.outputs = [];
            while (ampB.running && ampB.outputs.length === 0) {
                ampB.step();
            }

            // AMP C
            while (
                ampC.running &&
                ampA.inputs.length !== 0 &&
                ampC.cursorInt !== 3
            ) {
                ampC.step();
            }
            ampC.inputs.push(ampB.output);
            ampB.outputs = [];
            while (ampC.running && ampC.outputs.length === 0) {
                ampC.step();
            }

            // AMP D
            while (
                ampD.running &&
                ampA.inputs.length !== 0 &&
                ampD.cursorInt !== 3
            ) {
                ampD.step();
            }
            ampD.inputs.push(ampC.output);
            ampC.outputs = [];
            while (ampD.running && ampD.outputs.length === 0) {
                ampD.step();
            }

            // AMP E
            while (
                ampE.running &&
                ampA.inputs.length !== 0 &&
                ampE.cursorInt !== 3
            ) {
                ampE.step();
            }
            ampE.inputs.push(ampD.output);
            ampD.outputs = [];
            while (ampE.running && ampE.outputs.length === 0) {
                ampE.step();
            }

            ampInput = ampE.output;
            ampE.outputs = [];
        }

        maxThrust = Math.max(maxThrust, ampInput);
    }

    return maxThrust;
};
