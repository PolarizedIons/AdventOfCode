# http://adventofcode.com/2017/day/1

def read_input(strip_newlines=None):
    # return input()

    with open('input.txt') as f:
        return f.readline().strip("\r").strip("\n")

def part1():
    numbers = read_input()
    numbers = [int(n) for n in numbers]
    numbers.append(numbers[0])  # Let the it "wrap around" to the first number. This is lazy I know

    number_sum = 0
    prev = None
    for n in numbers:
        if n == prev:
            number_sum += n

        prev = n

    return number_sum


def part2():
    numbers = read_input()
    numbers = [int(n) for n in numbers]

    numbers_len = len(numbers)
    skip_amount = numbers_len // 2
    number_sum = 0
    for i, n in enumerate(numbers):
        compare_index = (i + skip_amount) % numbers_len
        if n == numbers[compare_index]:
            number_sum += n

    return number_sum

if __name__ == "__main__":
    print("Part 1")
    print(part1())
    print("Part 2")
    print(part2())
