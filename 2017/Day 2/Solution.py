import itertools

def read_input():
    # lines = []
    # while True:
    #     i = input()
    #     if not i:
    #         break
    #     lines.append(i)
    # return lines

    with open('input.txt') as f:
        return f.readlines()

def part1():
    checksum = 0
    for line in read_input():
        numbers = [int(n) for n in line.replace("\t", " ").split(" ")]
        checksum += max(numbers) - min(numbers)

    return checksum

def part2():
    values_sum = 0
    for line in read_input():
        numbers = [int(n) for n in line.replace("\t", " ").split(" ")]
        for num_a, num_b in itertools.combinations(numbers, 2):
            if num_a % num_b == 0:
                values_sum += num_a // num_b
            elif num_b % num_a == 0:
                values_sum += num_b // num_a

    return values_sum

if __name__ == "__main__":
    print("Part 1")
    print(part1())
    print("Part 2")
    print(part2())
