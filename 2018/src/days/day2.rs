use advent_of_code_2018::AoCDay;
use advent_of_code_2018::Puzzle;
use std::collections::HashMap;
use std::collections::HashSet;
use std::collections::hash_map::RandomState;
use std::collections::hash_set::Difference;

pub fn day() -> AoCDay {
    let input = include_str!("inputs/day2.txt");

    AoCDay::new(2, "Inventory Management System")
        .add_puzzle(Puzzle::new(input, Box::new(puzzle1)).complete())
        .add_puzzle(Puzzle::new(input, Box::new(puzzle2)))
}

fn parse_input(input: String) -> Vec<BoxID> {
    input.lines().map(|line| BoxID::new(line.to_string())).collect()
}

fn puzzle1(input: String) -> String {
    let input = parse_input(input);

    let mut two_cnt = 0;
    let mut three_cnt = 0;
    for b in input {
        if b.two_letters_match {
            two_cnt += 1;
        }
        if b.three_letters_match {
            three_cnt += 1;
        }
    }

    format!("{}", (two_cnt * three_cnt))
}

fn puzzle2(input: String) -> String {
    let mut diffs = 0;
    let mut diff_char = 0;
    for line_a in input.lines() {
        for line_b in input.lines() {
            if line_a.eq(line_b) {
                continue
            }

            println!("diff {} - {}", line_a, line_b);
            diffs = 0;
            diff_char = 0;
            for i in 0..line_a.len() {
                let char_a = &line_a[0..1];
                let char_b = &line_b[0..1];
                if ! char_a.eq(char_b) {
                    diffs += 1;
                    diff_char = i;
                    println!("did a diff at {}, {} != {}, diffs is now {}", i, char_a, char_b, diffs);
                }

                if diffs > 1 {
                    println!("did a break1");
                    break
                }
            }

            if diffs == 1 {
                println!("found diff at char {}", diff_char);
                let mut new_line = line_a.clone().to_string();
                new_line.remove(diff_char);
                return new_line;
            }
        }
        if diffs == 1 {
            println!("found diff at char {}", diff_char);
            let mut new_line = line_a.clone().to_string();
            new_line.remove(diff_char);
            return new_line;
        }

    }

    format!("none")
}

#[derive(Debug)]
struct BoxID {
    pub id: String,
    pub two_letters_match: bool,
    pub three_letters_match: bool,
}

impl BoxID {
    pub fn new(boxid: String) -> BoxID {
        BoxID {
            two_letters_match: has_letters_of_count(&boxid, 2),
            three_letters_match: has_letters_of_count(&boxid, 3),
            id: boxid,
        }
    }
}

fn has_letters_of_count(input: &String, count: i32) -> bool {
    let mut map = HashMap::new();
    for l in input.chars() {
        if ! map.contains_key(&l) {
            map.insert(l, 0);
        }

        map.insert(l, map.get(&l).unwrap() + 1);
    }

    for (_letter, cnt) in map.iter() {
        if *cnt == count {
            return true;
        }
    }

    return false;
}