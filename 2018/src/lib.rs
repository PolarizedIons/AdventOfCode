use std::io;
use std::io::BufRead;
use chrono::prelude::*;

pub struct AoCEvent {
    pub participant: String,
    pub days: Vec<AoCDay>,
}

impl AoCEvent {
    fn new(participant: &str) -> AoCEvent {
        AoCEvent {
            participant: participant.to_string(),
            days: Vec::with_capacity(25),
        }
    }

    fn menu(&self) {
        println!(" ************************** ");
        println!("     Advent of Code 2018    ");
        println!(" ************************** ");
        println!(" Competitor: {}\n", self.participant);

        for day in self.days.iter() {
            let stars_str = "*".repeat(day.stars() as usize) + &" ".repeat(day.puzzles.len() - day.stars() as usize);
            println!(" Day {} [{}]: {}", day.day, stars_str, day.title);
        }
    }

    pub fn run(&mut self) {
        loop {
            self.menu();

            println!("\nPlease input day to run. [blank=today,-1=exit]");
            let mut line = String::new();
            let stdin = io::stdin();
            stdin.lock().read_line(&mut line).expect("Error reading stdin!");
            line = line.trim().to_string();

            if line.is_empty() {
                let local: DateTime<Local> = Local::now();
                let seek_day = local.day();
                if self.days.len() < seek_day as usize{
                    println!("Day {} doesn't exist", seek_day);
                    continue;
                }

                let mut aoc_day = None;
                for day in self.days.iter_mut() {
                    if day.day as u32 == seek_day {
                        aoc_day = Some(day);
                        break;
                    }
                }

                if aoc_day.is_none() {
                    println!("That's not a day!");
                    continue;
                }

                aoc_day.unwrap().print();
                break;

            }
            else if line.eq(&"-1".to_string()) {
                break;
            }

            let seek_day: u8 = match line.parse() {
                Ok(num) => num,
                Err(_) => {
                    println!("Cannot parse {} into u8, try again", line);
                    continue
                },
            };

            let mut aoc_day = None;
            for day in self.days.iter_mut() {
                if day.day == seek_day {
                    aoc_day = Some(day);
                    break;
                }
            }

            if aoc_day.is_none() {
                println!("That's not a day!");
                continue;
            }

            aoc_day.unwrap().print();
            break;
        }
    }
}

pub struct AoCDay {
    pub day: u8,
    pub title: String,
    pub puzzles: Vec<Puzzle>,
}

impl AoCDay {
    pub fn new(day: u8, title: &str) -> AoCDay {
        AoCDay {
            day,
            title: title.to_string(),
            puzzles: Vec::with_capacity(2),
        }
    }

    pub fn stars(&self) -> u8 {
        self.puzzles.iter().filter(|puzzle| puzzle.is_complete).count() as u8
    }

    pub fn add_puzzle(mut self, puzzle: Puzzle) -> Self {
        self.puzzles.push(puzzle);
        self
    }
    pub fn print(&mut self) {
        println!("Day {}: {}", self.day, self.title);
        for (i, puzzle) in self.puzzles.iter_mut().enumerate() {
            print!("Part {}: ", (i + 1));
            if puzzle.is_complete {
                print!("Output: {}\n", puzzle.output());
            }
            else {
                print!("Incomplete :(\n");
            }
        }
    }
}

pub struct Puzzle {
    pub is_complete: bool,
    pub input: String,
    output: Option<String>,
    solver: Box<Fn(String) -> String>,
}

impl Puzzle {
    pub fn new(input: &str, solver: Box<Fn(String) -> String>) -> Puzzle {
        Puzzle {
            is_complete: false,
            input: input.to_string(),
            output: None,
            solver,
        }
    }

    pub fn complete(mut self) -> Self {
        self.is_complete = true;
        self
    }

    pub fn output(&mut self) -> String {
        if None == self.output {
            self.output = Some( (self.solver)(self.input.clone()) );
        };

        self.output.clone().expect("Error getting output for puzzle!")
    }
}
