const raw_input = require("../util").readInput("day6/input.txt");
// const raw_input = "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L";
// const raw_input = "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN";

const input = raw_input
    .split("\n")
    .filter(line => !!line)
    .map(orbit => orbit.split(")"));

const parseTree = orbits => {
    const rawMap = {};
    for (const orbit of orbits) {
        if (!rawMap[orbit[0]]) {
            rawMap[orbit[0]] = [];
        }
        rawMap[orbit[0]].push(orbit[1]);
    }

    return buildTree(rawMap, "COM", null, 0);
};

const buildTree = (map, orbitName, parent) => {
    if (!map[orbitName]) {
        return new TreeNode(parent, orbitName);
    }

    const node = new TreeNode(parent, orbitName);
    for (const orbit of map[orbitName]) {
        node.children.push(buildTree(map, orbit, node));
    }

    return node;
};

class TreeNode {
    constructor(parent, name) {
        this.parent = parent;
        this.name = name;
        this.children = [];
    }
}

const findLeaves = tree => {
    if (tree.children.length === 0) {
        return [tree];
    }

    let leaves = [];
    for (const node of tree.children) {
        leaves = leaves.concat(findLeaves(node));
    }
    return leaves;
};

const flattenTree = (map, tree) => {
    for (const child of tree.children) {
        flattenTree(map, child);
    }

    map.push(tree);

    return map;
};

module.exports.part1 = async () => {
    const tree = parseTree(input);

    const flatTree = flattenTree([], tree);
    const bridgeTable = {};
    for (let node of flatTree) {
        while (node.parent) {
            if (!bridgeTable[node.parent.name]) {
                bridgeTable[node.parent.name] = [];
            }

            bridgeTable[node.parent.name].push(node);
            node = node.parent;
        }
    }

    let total = 0;
    for (let node of Object.values(bridgeTable)) {
        total += node.length;
    }

    return total;
};

const findPath = (from, target, map = []) => {
    if (!map.find(node => node.name === from.name)) {
        map.push(from);
    }

    if (from.name === target.name) {
        return map;
    }

    const possibleSteps = [from.parent, ...from.children].filter(
        node => !!node && !map.find(mapNode => node.name === mapNode.name)
    );

    for (const node of possibleSteps) {
        const path = findPath(node, target, [...map, node]);
        if (path) {
            return path;
        }
    }
};

module.exports.part2 = async () => {
    const tree = parseTree(input);
    const flatTree = flattenTree([], tree);
    const ME = flatTree.find(node => node.name === "YOU");
    const SANTA = flatTree.find(node => node.name === "SAN");

    const steps = findPath(ME, SANTA);
    return steps.length - 3; // -2 for YOU & SAN, -1 for pairs
};
