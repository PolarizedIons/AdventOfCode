
wordlist = []
with open('input.txt') as f:
    wordlist = f.readlines()

def build_char_list():
    chars = {}
    for word in wordlist:
        for index, letter in enumerate(word):
            if index not in chars:
                chars[index] = {}

            if letter not in chars[index]:
                chars[index][letter] = 1
            else:
                chars[index][letter] += 1

    return chars


def part1():
    decoded = ""
    for char in build_char_list().values():
        decoded += sorted(char.items(), key= lambda key: key[1], reverse=True)[0][0]

    print(decoded)


def part2():
    decoded = ""
    for char in build_char_list().values():
        decoded += sorted(char.items(), key=lambda key: key[1])[0][0]

    print(decoded)

if __name__ == "__main__":
    print("Part1: ")
    part1()

    print("Part2: ")
    part2()