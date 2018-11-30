use advent_of_code_2018::AoCDay;
use advent_of_code_2018::Puzzle;

pub fn day() -> AoCDay {
    AoCDay::new(1, "day 1 titlehere")
        .add_puzzle(Puzzle::new("hi", Box::new(puzzle1)).complete())
        .add_puzzle(Puzzle::new("bla", Box::new(puzzle2)))
}

fn puzzle1(input: String) -> String {
    "moooo".to_string()
}

fn puzzle2(input: String) -> String {
    "meooow".to_string()
}
