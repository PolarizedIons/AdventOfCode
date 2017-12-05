def get_input():
    # lines = []
    # while True:
    #     i = input()
    #     if not i:
    #         break
    #     lines.append(int(i))
    # return lines

    with open('input.txt') as f:
        return [int(l.rstrip('\n')) for l in f.readlines()]


def part1():
    step_count = 0
    instructions = get_input()

    index = 0
    while 0 <= index < len(instructions):
        new_index = instructions[index] + index
        instructions[index] += 1
        index = new_index
        step_count += 1

    return step_count


def part2():
    step_count = 0
    instructions = get_input()

    index = 0
    while 0 <= index < len(instructions):
        offset = instructions[index]
        new_index = offset + index


        if offset >= 3:
            instructions[index] -= 1
        else:
            instructions[index] += 1

        index = new_index
        step_count += 1

    return step_count

if __name__ == "__main__":
    print("Part 1")
    print(part1())
    print("Part 2")
    print(part2())