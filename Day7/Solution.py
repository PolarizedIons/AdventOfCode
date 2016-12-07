import re

match_bracket = re.compile(r"\[(.*?)\]")
match_tls = re.compile(r".*(?P<letter1>.)(?P<letter2>.)(?P=letter2)(?P=letter1).*")
match_ssl = re.compile(r"\[.*?(?P<let1>.)(?P<let2>.)(?P=let1).*?\].*?(?P=let2)(?P=let1)(?P=let2).*?")


def split_ips(ip):
    brackets = match_bracket.findall(ip)
    non_brackets = [m.strip("[]") for m in match_bracket.split(ip) if m]

    return (brackets, non_brackets)


testcases = [
    'aba[bab]xyz',
    'xyx[xyx]xyx',
    'aaa[kek]eke',
    'zazbz[bzb]cdb',
    'rsght[akjgfte]safujhg[babiuwyh]wrhaba[fef]'
]

with open('input.txt') as f:
    ip_addresses = [split_ips(ip.strip('\n')) for ip in f.readlines()]

def part1():
    count = 0
    for brackets, non_brackets in ip_addresses:
        brackets = '-'.join(brackets)
        non_brackets = '-'.join(non_brackets)

        if match_tls.match(brackets):
            continue

        pair = match_tls.match(non_brackets)
        if pair and pair.group(1) != pair.group(2):
            count += 1

    print("Count", count)

def part2():
    print("Not working")

    # I hope to be able to finish this some day, but it seems that I cannot,
    # at least today

    # count = 0
    # for brackets, non_brackets in ip_addresses:
    #     print()
    #     print(brackets, non_brackets)
    #
    #     for bracket in brackets:
    #         string = "[" + bracket + "]" + ''.join(non_brackets)
    #
    #
    #         match = match_ssl.match(string)
    #         if match:
    #             print(match.groups())
    #             if match.group(1) != match.group(2):
    #                 print("+1")
    #                 count += 1
    #                 break;


    # print("Count", count)

if __name__ == "__main__":
    print("Part1:")
    part1()
    print("Part2:")
    part2()