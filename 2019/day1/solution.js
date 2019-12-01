const raw_input = require("../util").readInput("day1/input.txt");
const input = raw_input
  .split("\n")
  .filter(mass => !!mass)
  .map(mass => parseInt(mass, 10));

const calculateFuelRequirement = mass => {
  return Math.floor(mass / 3) - 2;
};

const calculateFinalFuelRequirement = mass => {
  let fuelMass = calculateFuelRequirement(mass);
  let totalFuelMass = 0;
  while (fuelMass > 0) {
    totalFuelMass += fuelMass;
    fuelMass = calculateFuelRequirement(fuelMass);
  }
  return totalFuelMass;
};

module.exports.part1 = async () => {
  return input
    .map(calculateFuelRequirement)
    .reduce((sum, fuel) => (sum += fuel), 0);
};

module.exports.part2 = async () => {
  return input
    .map(mass => calculateFinalFuelRequirement(mass))
    .reduce((sum, fuelMass) => (sum += fuelMass), 0);
};
