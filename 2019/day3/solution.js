const raw_input = require("../util").readInput("day3/input.txt");
// const raw_input = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83";

const input = raw_input
    .split("\n")
    .filter(wire => !!wire)
    .map(wire =>
        wire.split(",").map(dirLeng => ({
            direction: dirLeng[0],
            length: parseInt(dirLeng.substring(1), 10),
        }))
    );

const runWire = (map, wire, wireNum) => {
    let pos = [0, 0];
    let length = 1;
    for (const instruction of wire) {
        for (let i = 0; i < instruction.length; i++) {
            if (instruction.direction === "U") {
                pos = [pos[0], pos[1] + 1];
            } else if (instruction.direction === "D") {
                pos = [pos[0], pos[1] - 1];
            } else if (instruction.direction === "L") {
                pos = [pos[0] - 1, pos[1]];
            } else if (instruction.direction === "R") {
                pos = [pos[0] + 1, pos[1]];
            } else {
                throw new Error("Unknown direction " + instruction.direction);
            }
            if (!map[pos]) {
                map[pos] = { wires: [], steps: {} };
            }
            map[pos].wires.push(wireNum);
            if (!map[pos].steps[wireNum]) {
                map[pos].steps[wireNum] = length;
            }
            length += 1;
        }
    }
};
module.exports.part1 = async () => {
    const map = {};
    runWire(map, input[0], 0);
    runWire(map, input[1], 1);

    let nearest = Number.MAX_SAFE_INTEGER;
    for (let pos in map) {
        const wires = map[pos].wires;
        pos = pos.split(",").map(num => parseInt(num, 10));

        if (wires.indexOf(0) > -1 && wires.indexOf(1) > -1) {
            if (!pos[0] !== 0 && pos[1] !== 0) {
                nearest = Math.min(
                    Math.abs(pos[0]) + Math.abs(pos[1]),
                    nearest
                );
            }
        }
    }

    return nearest;
};

module.exports.part2 = async () => {
    const map = {};
    runWire(map, input[0], 0);
    runWire(map, input[1], 1);

    let nearestWire1 = Number.MAX_SAFE_INTEGER;
    let nearestWire2 = Number.MAX_SAFE_INTEGER;

    for (let pos in map) {
        const steps = map[pos].steps;
        pos = pos.split(",").map(num => parseInt(num, 10));

        if (!pos[0] !== 0 && pos[1] !== 0 && "0" in steps && "1" in steps) {
            if (steps[0] + steps[1] < nearestWire1 + nearestWire2) {
                nearestWire1 = steps[0];
                nearestWire2 = steps[1];
            }
        }
    }

    return nearestWire1 + nearestWire2;
};
