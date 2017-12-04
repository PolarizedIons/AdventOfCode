from itertools import cycle


def read_input():
    return int(input())


def part1():
    num = read_input()

    if num == 1:
        return 0

    if num == 2:
        return 1

    # Find the "layer"
    # The number will be between two uneven roots
    # The bottom right will be root**2
    prev_root = 1
    root = 3
    while True:
        if prev_root ** 2 < num <= root ** 2:
            break

        prev_root = root
        root += 2

    # Now, find the coordinate of the number
    coord = None
    corner_br = root**2
    corner_bl = corner_br - (root-1)
    corner_tl = corner_bl - (root-1)
    corner_tr = corner_tl - (root-1)
    almost_corner_br = corner_tr - (root-2)
    # bottom row
    if corner_bl < num <= corner_br:
        coord = (abs(corner_bl - num), root-1)

    # left row
    elif corner_tl < num <= corner_bl:
        coord = (0, abs(corner_tl - num))

    # top row
    elif corner_tr < num <= corner_tl:
        coord = (abs(corner_tl - num), 0)

    # right row
    elif almost_corner_br < num <= corner_tr:
        coord = (root -1, abs(corner_tr - num))

    # somethings wrong row
    else:
        print("The number is missing!")
        return

    middle_coord = (root//2, root//2)
    return abs(middle_coord[0] - coord[0]) + abs(middle_coord[1] - coord[1])

# PART TWO

def move_right(cur_coord):
    return (cur_coord[0] + 1, cur_coord[1])

def move_up(cur_coord):
    return (cur_coord[0], cur_coord[1] - 1)

def move_left(cur_coord):
    return (cur_coord[0] - 1, cur_coord[1])

def move_down(cur_coord):
    return (cur_coord[0], cur_coord[1] + 1)

def get_neighbors_sum(coord, values):
    neighbors = [(1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1), (0, 1), (1, 1)]
    neighbors_sum = 0
    for n in neighbors:
        c = (coord[0] + n[0], coord[1] + n[1])
        neighbors_sum += values.get(c, 0)
    
    return neighbors_sum

def part2():
    num = read_input()
    values = {(0, 0): 1}
    cur_coord = (0, 0)
    size = (0, 0)
    size_neg = (0, 0)
    directions = cycle([move_right, move_up, move_left, move_down])
    move = next(directions)
    while True:
        cur_coord = move(cur_coord)

        if cur_coord[0] > size[0]:
            size = (cur_coord[0], size[1])
            move = next(directions)
        elif cur_coord[0] < size_neg[0]:
            size_neg = (cur_coord[0], size_neg[1])
            move = next(directions)
        elif cur_coord[1] > size[1]:
            size = (size[0], cur_coord[1])
            move = next(directions)
        elif cur_coord[1] < size_neg[1]:
            size_neg = (size_neg[0], cur_coord[1])
            move = next(directions)

        v = get_neighbors_sum(cur_coord, values)
        values[cur_coord] = v

        if v > num:
            break

    return values[cur_coord]

if __name__ == "__main__":
    print("Part 1")
    print(part1())
    print("Part 2")
    print(part2())
