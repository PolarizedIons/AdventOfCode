const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`Which day do you want to run?`, async day => {
  console.log(`Day ${day}\n===============`);
  const solution = require(`./day${day}/solution.js`);
  console.log("Part 1:\n" + (await solution.part1()));
  console.log("Part 2:\n" + (await solution.part2()));
  readline.close();
});
