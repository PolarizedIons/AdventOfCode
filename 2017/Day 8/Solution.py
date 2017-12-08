import re
from collections import namedtuple
from enum import Enum


MANUAL_INPUT = False
PARSE_REGEX = re.compile(r'([a-z]+) (inc|dec) ([-0-9]+) if ([a-z]+) (>|<|>=|<=|==|!=) ([-0-9]+)')
ParsedLine = namedtuple('ParsedLine', ['mod_reg', 'mod_op', 'mod_value', 'comp_reg', 'op', 'comp_value'])

class ModifyOperation(Enum):
    INCREMENT = 'inc'
    DECREMENT = 'dec'

class ComparasonOperation(Enum):
    LESS_THAN = '<'
    GREATER_THAN = '>'
    LESS_THAN_OR_EQUALS = '<='
    GREATER_THAN_OR_EQUALS = '>='
    EQUALS = '=='
    NOT_EQUALS = '!='


def parse_line(line):
    # b inc 5 if a > 1
    line = PARSE_REGEX.match(line)
    return ParsedLine(
        mod_reg = line.group(1),
        mod_op = ModifyOperation(line.group(2)),
        mod_value = int(line.group(3)),
        comp_reg = line.group(4),
        op = ComparasonOperation(line.group(5)),
        comp_value = int(line.group(6))
    )


def get_input():
    lines = None
    if MANUAL_INPUT:
        lines = []
        while True:
            i = input()
            if not i:
                break
            lines.append(i)
    else:
        with open('input.txt') as f:
            lines = [l.rstrip('\n') for l in f.readlines()]
    
    return [parse_line(l) for l in lines]

def compare(value1, value2, operation):
    if operation == ComparasonOperation.EQUALS:
        return value1 == value2
    elif operation == ComparasonOperation.GREATER_THAN:
        return value1 > value2
    elif operation == ComparasonOperation.GREATER_THAN_OR_EQUALS:
        return value1 >= value2
    elif operation == ComparasonOperation.LESS_THAN:
        return value1 < value2
    elif operation == ComparasonOperation.LESS_THAN_OR_EQUALS:
        return value1 <= value2
    elif operation == ComparasonOperation.NOT_EQUALS:
        return value1 != value2

def part1And2():
    lines = get_input()
    registers = {}
    max_value = 0

    def get_register(name):
        if name not in registers:
            registers[name] = 0
        return registers[name]
    
    # ['mod_reg', 'mod_op', 'mod_value', 'comp_reg', 'op', 'comp_value'])
    for line in lines:
        modify_register = get_register(line.mod_reg)
        compare_register = get_register(line.comp_reg)

        if compare(compare_register, line.comp_value, line.op):
            if line.mod_op == ModifyOperation.INCREMENT:
                registers[line.mod_reg] += line.mod_value
            elif line.mod_op == ModifyOperation.DECREMENT:
                registers[line.mod_reg] -= line.mod_value

            max_value = max(max_value, registers[line.mod_reg])

    return max(registers.values()), max_value
    


if __name__ == "__main__":
    part1, part2 = part1And2()
    print(f"Part 1\n{part1}\nPart 2\n{part2}")
