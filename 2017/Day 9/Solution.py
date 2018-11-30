BEGIN_GROUP = '{'
GROUP_CHILDREN_SEPERATOR = ','
END_GROUP = '}'
BEGIN_GARBAGE = '<'
END_GARBAGE = '>'
IGNORE_NEXT = '!'


def get_input():
    return input()

    with open('input.txt') as f:
        return f.readline()

def tokensize(input_str):
    tokens = re.compile(r'[{}]|')

if __name__ == "__main__":
    print('=>', tokensize('{}'))
    print('=>', tokensize('{{}, {}, {}}'))
    print('=>', tokensize('{<ha>}'))
    print('=>', tokensize('{<ha{}>, !{{}}'))
    