from collections import namedtuple
import re, string
room_tuple = namedtuple('room', ['letters', 'checksum', 'sector'])

ALPHABET = list(string.ascii_lowercase)

rooms = []
room_regex = re.compile(r"(.*)-(\d+)\[(.*)\]")
with open('input.txt') as f:
    for line in f.readlines():
        letters, sector_id, checksum = room_regex.match(line).groups()
        rooms.append(room_tuple(letters=letters, checksum=checksum, sector=int(sector_id)))


def validate(room):
    room_letters = room.letters.replace("-", "")
    letters = {}

    for letter in room_letters:
        if letter not in letters:
            letters[letter] = 1
        else:
            letters[letter] += 1

    letters_checksum = sorted(letters.items(), key = lambda x: (-x[1], x[0]))[:5]
    letters_checksum = ''.join([letter for letter, num in letters_checksum])

    return room.checksum == letters_checksum


def part1():
    total = 0
    for room in rooms:
        if validate(room):
            total += room.sector
        else:
            rooms.remove(room)

    print("Sum:", total)

def part2():
    for room in rooms:
        shift_num = room.sector%26
        realname = ""
        for letter in room.letters.replace("-", " "):
            if letter == " ":
                realname += " "
                continue

            realname += ALPHABET[(ALPHABET.index(letter) + shift_num)%26]

        if "northpole" in realname:
            print(realname, '-', room.sector)
            break



if __name__ == "__main__":
    print("Part1: ")
    part1()
    print("Part2: ")
    part2()