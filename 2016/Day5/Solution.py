import hashlib, random

CINAMATIC_DECODE = True # 'Forces' FANCY_DECODING to true
CINAMATIC_SYMBOLS = "abcdefghijklmnopqrstuvwxyz1234567890-=[];',./!@#$%^&*()_+{}:\"\\<>?"
FANCY_DECODING = True  # Pycharm for example doesn't like '\r', nor the speed stuff gets printed, so turn this off



def get_hash(input):
    return hashlib.md5(input.encode()).hexdigest()


def part1(door_id):
    password = "________"
    index = 0
    while "_" in password:
        door = door_id + str(index)
        hash = get_hash(door)
        if hash.startswith("00000"):
            i = password.index("_")
            password = password[:i] + hash[5] + password[i+1:]

        index += 1

        if index%5000 == 0:
            if CINAMATIC_DECODE:
                pas = ''.join([c if c != "_" else random.choice(CINAMATIC_SYMBOLS) for c in password])
                print(index, "=>", pas, end="\r")
            else:
                if FANCY_DECODING:
                    print(index, "=>", password, end="\r")

    if FANCY_DECODING:
        print(" " * (len(str(index)) + len(password) + 5), end="\r") # clear line

    print("Password:", password)


def part2(door_id):
    password = "________"
    index = 0
    while "_" in password:
        door = door_id + str(index)
        hash = get_hash(door)

        if hash.startswith("00000"):
            position = hash[5]

            try:
                position = int(position)

                if password[position] == "_":
                    password = password[:position] + hash[6] + password[position+1:]

            except:
                pass # catch invalid password position

        index += 1

        if index % 5000 == 0:
            if CINAMATIC_DECODE:
                pas = ''.join([c if c != "_" else random.choice(CINAMATIC_SYMBOLS) for c in password])
                print(index, "=>", pas, end="\r")
            else:
                if FANCY_DECODING:
                    print(index, "=>", password, end="\r")

    if FANCY_DECODING:
        print(" " * (len(str(index)) + len(password) + 5), end="\r") # clear line
    print("Password:", password)

if __name__ == "__main__":
    door_id = "ffykfhsq" # Input was given as a string this time

    # I have to do this, since hashes take a long time
    if input("Which part? [default=1]: ") != "2":
        #part1("abc")
        part1(door_id)
    else:
        #part2("abc")
        part2(door_id)