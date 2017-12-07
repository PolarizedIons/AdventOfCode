def get_input():
    # return [int(i) for i in input().split(" ")]

    with open('input.txt') as f:
        return [int(i) for i in f.readline().split('\t')]


def part1():
    banks = get_input()
    seen_states = []
    cycle_count = 0

    while True:
        bank_state = [i for i in enumerate(banks)]
        if bank_state in seen_states:
            break
            
        seen_states.append(bank_state)
        cycle_count += 1

        max_bank_i, max_bank = max(bank_state, key=lambda x: x[1])
        banks[max_bank_i] = 0
        for i in range(1, max_bank + 1):
            banks[(max_bank_i + i)%len(banks)] += 1
        
    return cycle_count


def part2():
    banks = get_input()
    seen_states = []
    cycle_count = 0

    while True:
        bank_state = [i for i in enumerate(banks)]
        if bank_state in seen_states:
            return cycle_count - seen_states.index(bank_state)
            
        seen_states.append(bank_state)
        cycle_count += 1

        max_bank_i, max_bank = max(bank_state, key=lambda x: x[1])
        banks[max_bank_i] = 0
        for i in range(1, max_bank + 1):
            banks[(max_bank_i + i)%len(banks)] += 1
        
    return cycle_count


if __name__ == "__main__":
    print("Part 1")
    print(part1())
    print("Part 2")
    print(part2())