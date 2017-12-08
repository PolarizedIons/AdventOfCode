import re
from collections import namedtuple

MANUAL_INPUT = False
INPUT_REGEX= re.compile('([a-z]+)\s\(([0-9]+)\)(?:\s->\s([a-z,\s]+))?')
NodeTuple = namedtuple('NodeTuple', ['name', 'weight', 'children'])


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

    raw_nodes = []
    for l in lines:
        line = INPUT_REGEX.match(l)
        name, weight = line.group(1), line.group(2)
        children = line.group(3).split(', ') if line.group(3) else []
        raw_nodes.append(NodeTuple(name=name, weight=weight, children=children))
    
    nodes = {}
    for raw_node in raw_nodes:
        nodes[raw_node.name] =  Node(raw_node.name, raw_node.weight)
    
    for raw_node in raw_nodes:
        node = nodes[raw_node.name]
        for c in raw_node.children:
            child_node = nodes[c]
            node.addChild(child_node)
        
    return nodes


class Node:
    def __init__(self, name, weight):
        self.parent = None
        self.children = []
        self.name = name
        self.weight = weight
    
    def addChild(self, child):
        child.setParent(self)
        self.children.append(child)
    
    def setParent(self, parent):
        self.parent = parent

    # def calcTowerWeight(self):
    #     return self.weight + sum(map(lambda node: node.calcTowerWeight(), self.children))

    def isBalanced(self):
        return len(set(map(lambda node: node.weight, self.children))) <= 1

    def __str__(self):
        return f"{self.name} ({self.weight}) {len(self.children)} => {[i for i in map(lambda x: x.name, self.children)]}"

    def __repr__(self):
        return self.__str__()

def part1():
    nodes = get_input()
    
    # Get the "first" node from the dictionary 
    # (any really, since dicts have no order)
    # transversal_node
    trans_node = next(iter(nodes.values()))
    while trans_node.parent is not None:
        trans_node = trans_node.parent

    return trans_node.name

# def part2(root_node_name):
#     nodes = get_input()

#     trans_node = nodes[root_node_name]
#     found_unbalanced = False
#     while True:
#         for child in trans_node.children:
#             if not child.isBalanced():
#                 found_unbalanced = True
#                 trans_node = child
        
#         if not found_unbalanced:
#             break
#         found_unbalanced = False

#     print(trans_node)
#     for c in trans_node.children:
#         print(c.name, '->', c.children, c.calcTowerWeight())


if __name__ == "__main__":
    print("Part 1")
    root_node_name = part1()
    print(root_node_name)
    # print("Part 2")
    # print(part2(root_node_name))
