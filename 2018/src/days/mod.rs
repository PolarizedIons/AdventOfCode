use aoc::AoCDay;

mod day1;
mod day2;
mod day3;

pub fn get_days() -> Vec<AoCDay> {
    vec![
        day1::day(),
        day2::day(),
        day3::day(),
    ]
}