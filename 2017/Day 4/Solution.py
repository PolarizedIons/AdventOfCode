from itertools import combinations


def get_input():
    # lines = []
    # while True:
    #     i = input()
    #     if not i:
    #         break
    #     lines.append(i)
    # return lines

    with open('input.txt') as f:
        return [l.rstrip('\n') for l in f.readlines()]


def part1():
    valid_sum = 0
    for line in get_input():
        words = line.split(" ")

        if len(words) == len(set(words)):
            valid_sum += 1

    return valid_sum

def part2():
    valid_sum = 0
    for line in get_input():
        words = line.split(" ")

        # part one basicly
        if len(words) != len(set(words)):
            continue
        
        valid = True
        for word1, word2 in combinations(words, 2):
            if set(word1) == set(word2):
                valid = False
                break
        
        if valid:
            valid_sum += 1
    
    return valid_sum
        

if __name__ == "__main__":
    print("Part 1")
    print(part1())
    print("Part 2")
    print(part2())