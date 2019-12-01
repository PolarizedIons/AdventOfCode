const input = require("../util").readInput("day1/input.txt");

const calculateFuelRequirement = mass => {
  return Math.floor(mass / 3) - 2;
};

const processInput = input => {
  const inputs = [];

  input = input.split("\n");
  for (const mass of input) {
    if (mass) {
      inputs.push(calculateFuelRequirement(parseInt(mass, 10)));
    }
  }

  return inputs;
};

module.exports.part1 = async () => {
  const processedInput = processInput(input);
  return processedInput.reduce((sum, fuel) => (sum += fuel), 0);
};

module.exports.part2 = async () => {
  return "NOT IMPLEMENTED";
};
