use advent_of_code_2018::AoCDay;
use advent_of_code_2018::Puzzle;
use regex::Regex;
use std::collections::HashMap;

pub fn day() -> AoCDay {
    let input = include_str!("inputs/day3.txt");

//    let input = "#1 @ 1,3: 4x4
//#2 @ 3,1: 4x4
//#3 @ 5,5: 2x2
//";

    AoCDay::new(3, "No Matter How You Slice It")
        .add_puzzle(Puzzle::new(input, Box::new(puzzle1)).complete())
        .add_puzzle(Puzzle::new(input, Box::new(puzzle2)))
}

fn parse_input(input: String) -> Vec<Claim> {
    input.lines().map(|line| Claim::from(line)).collect()
}

fn puzzle1(input: String) -> String {
    let input = parse_input(input);

    let mut claims_map = HashMap::new();
    for claim in input.iter() {
        for i_x in 0..claim.size.0 {
            for i_y in 0..claim.size.1 {
                let x = claim.location.0 + i_x;
                let y = claim.location.1 + i_y;

                *claims_map.entry((x, y)).or_insert(0) += 1;
            }
        }
    }

    let conflict_count = claims_map.values().filter(|count| **count > 1).count();

    format!("{}", conflict_count)
}

fn puzzle2(input: String) -> String {
    format!("no output :(")
}


#[derive(Debug)]
struct Claim {
    pub claim_id: i32,
    pub location: (i32, i32),
    pub size: (i32, i32),
}

impl From<&str> for Claim {
    fn from(line: &str) -> Claim {
        let re = Regex::new(r"#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)").unwrap();
        let cap = re.captures(line).unwrap();

        Claim {
            claim_id: cap[1].parse().unwrap(),
            location: (cap[2].parse().unwrap(), cap[3].parse().unwrap()),
            size: (cap[4].parse().unwrap(), cap[5].parse().unwrap()),
        }
    }
}
