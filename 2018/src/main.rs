extern crate advent_of_code_2018 as aoc;
mod days;

use aoc::AoCEvent;


fn main() {
    AoCEvent {
        participant: "PolarizedIons".to_string(),
        days: days::get_days(),
    }.run()
}
