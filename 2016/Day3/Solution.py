toint = lambda x: [int(x[0]), int(x[1]), int(x[2])]
#valid = lambda x: (x[0] + x[1]) > x[2] and (x[1] + x[2]) > x[0] and (x[2] + x[0]) > x[1]
def valid(triangle):
    triangle = sorted(triangle)
    return (triangle[0] + triangle[1]) > triangle[2]


triangles = []
with open('input.txt') as f:
    triangles = [toint(triangle.split()) for triangle in f.readlines()]

def part1():
    count = 0
    for triangle in triangles:
        if valid(triangle):
            count += 1

    print("Count:", count)

def part2():
    count = 0
    tmp = {
        0: [],
        1: [],
        2: []
    }

    for line in triangles:
        tmp[0].append(line[0])
        tmp[1].append(line[1])
        tmp[2].append(line[2])

        if len(tmp[0]) == 3:
            for i in range(3):
                if valid(tmp[i]):
                    count += 1

                tmp[i] = []



    print("Count:", count)

if __name__ == "__main__":
    print("Part1:")
    part1()
    print("Part2:")
    part2()