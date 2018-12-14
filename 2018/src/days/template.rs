use advent_of_code_2018::AoCDay;
use advent_of_code_2018::Puzzle;

pub fn day() -> AoCDay {
    let input = include_str!("inputs/day1.txt");

    AoCDay::new(1, "day 1 titlehere")
        .add_puzzle(Puzzle::new(input, Box::new(puzzle1)).complete())
        .add_puzzle(Puzzle::new(input, Box::new(puzzle2)))
}

fn puzzle1(input: String) -> String {
    format!("no output :(")
}

fn puzzle2(input: String) -> String {
    format!("no output :(")
}
