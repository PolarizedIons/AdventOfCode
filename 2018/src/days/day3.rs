use advent_of_code_2018::AoCDay;
use advent_of_code_2018::Puzzle;
use regex::Regex;
use std::collections::HashSet;

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
    input.lines().map(|line| Claim::new(line)).collect()
}

fn puzzle1(input: String) -> String {
    let input = parse_input(input);

    let mut single_claims = HashSet::new();
    let mut total_claims = 0;
    for claim in input.iter() {
        for i_x in 0..claim.size.0 {
            for i_y in 0..claim.size.1 {
                let x = claim.location.0 + i_x;
                let y = claim.location.0 + i_y;
                let pos = Box::new(Coord(x, y));

                if ! single_claims.contains(&pos) {
                    single_claims.insert(pos);
                }
                total_claims += 1;
            }
        }
    }

    format!("{}", (total_claims - single_claims.len()) / 2)
}

fn puzzle2(input: String) -> String {
    "meooow".to_string()
}


#[derive(Debug)]
struct Claim {
    pub claim_id: i32,
    pub location: Coord,
    pub size: Coord,
}

impl Claim {
    pub fn new(line: &str) -> Claim {
        let re = Regex::new(r"#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)").unwrap();
        let cap = re.captures(line).unwrap();

        Claim {
            claim_id: cap[1].parse().unwrap(),
            location: Coord(cap[2].parse().unwrap(), cap[3].parse().unwrap()),
            size: Coord(cap[4].parse().unwrap(), cap[5].parse().unwrap()),
        }
    }
}

#[derive(PartialEq, Eq, Debug)]
struct Coord(i32, i32);
