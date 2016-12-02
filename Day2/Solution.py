
KEY_MAP_PART_1 = {
    '1': {
        'D': '4',
        'R': '2'
    },
    '2': {
        'L': '1',
        'R': '3',
        'D': '5'
    },
    '3': {
        'L': '2',
        'D': '6'
    },
    '4': {
        'U': '1',
        'R': '5',
        'D': '7'
    },
    '5': {
        'U': '2',
        'R': '6',
        'D': '8',
        'L': '4'
    },
    '6': {
        'U': '3',
        'L': '5',
        'D': '9'
    },
    '7': {
        'U': '4',
        'R': '8'
    },
    '8': {
        'L': '7',
        'U': '5',
        'R': '9'
    },
    '9': {
        'L': '8',
        'U': '6'
    }
}

KEY_MAP_PART_2 = {
    '1': {
        'D': '3'
    },
    '2': {
        'R': '3',
        'D': '6'
    },
    '3': {
        'U': '1',
        'L': '2',
        'R': '4',
        'D': '7'
    },
    '4': {
        'L': '3',
        'D': '8'
    },
    '5': {
        'R': '6'
    },
    '6': {
        'U': '2',
        'L': '5',
        'D': 'A',
        'R': '7'
    },
    '7': {
        'U': '3',
        'L': '6',
        'D': 'B',
        'R': '8'
    },
    '8': {
        'U': '4',
        'L': '7',
        'D': 'C',
        'R': '9'
    },
    '9': {
        'L': '8'
    },
    'A': {
        'U': '6',
        'R': 'B'
    },
    'B': {
        'U': '7',
        'L': 'A',
        'D': 'D',
        'R': 'C'
    },
    'C': {
        'U': '8',
        'L': 'B'
    },
    'D': {
        'U': 'B'
    }
}


def solve(key_map):
    with open('input.txt') as f:
        current_number = '5'
        while True:
            line = f.readline()
            if not line:
                break

            for step in line:
                try:
                    current_number = key_map[current_number][step]
                except KeyError:
                    pass

            print(current_number, end='')


if __name__ == "__main__":
    print("part1")
    solve(KEY_MAP_PART_1)
    print("\npart2")
    solve(KEY_MAP_PART_2)