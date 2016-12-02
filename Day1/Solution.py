from pygame.math import Vector2 as Vec2

moves = []
with open('input.txt') as f:
    moves = f.readline().split(", ")

cur_pos = Vec2(0, 0)

DIRECTION = {
    'N': Vec2(0, 1),
    'S': Vec2(0, -1),
    'E': Vec2(-1, 0),
    'W': Vec2(1, 0)
}

cur_direction = 'N'

DIRECTION_MAP = {
    'N': {
        'R': 'E',
        'L': 'W'
    },
    'S': {
        'R': 'W',
        'L': 'E'
    },
    'E': {
        'R': 'S',
        'L': 'N'
    },
    'W': {
        'R': 'N',
        'L': 'S'
    }
}

def part1():
    global moves, cur_pos, DIRECTION, cur_direction, DIRECTION_MAP

    for move in moves:
        turn_dir = move[0]
        length = int(move[1:])

        cur_direction = DIRECTION_MAP[cur_direction][turn_dir]
        cur_pos += DIRECTION[cur_direction] * length

        #print("Now facing:", cur_direction)
        #print("MOVE: ", turn_dir + str(length))
        #print("Moved", DIRECTION[cur_direction] * length)
        #print("Current Position", cur_pos)


    distance = abs(cur_pos.x) + abs(cur_pos.y)
    print("DISTANCE:", distance)


def part2():
    global moves, cur_pos, DIRECTION, cur_direction, DIRECTION_MAP

    visited = []
    found = False

    for move in moves:
        turn_dir = move[0]
        length = int(move[1:])

        cur_direction = DIRECTION_MAP[cur_direction][turn_dir]
        for _ in range(length):
            cur_pos += DIRECTION[cur_direction]

            if (cur_pos.x, cur_pos.y) in visited:
                #print("VISITED", cur_pos, "twice!")
                distance = abs(cur_pos.x) + abs(cur_pos.y)
                print("DISTANCE:", distance)
                found = True
                break;

            visited.append((cur_pos.x, cur_pos.y))

        if found:
            break

if __name__ == "__main__":
    print("Part1")
    part1()
    print("Part2")
    part2()
