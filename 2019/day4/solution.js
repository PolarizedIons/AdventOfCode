const input = "136818-685979".split("-").map(num => parseInt(num, 10));

const isValidPart1 = pass => {
    pass = pass + "";
    if (pass.length !== 6) {
        return false;
    }

    for (let i = 0; i < pass.length - 1; i++) {
        if (pass[i] > pass[i + 1]) {
            return false;
        }
    }

    let hasDouble = false;
    for (let i = 1; i <= 9; i++) {
        if (pass.indexOf(`${i}${i}`) > -1) {
            hasDouble = true;
        }
    }
    if (!hasDouble) {
        return false;
    }

    return true;
};

const isValidPart2 = pass => {
    if (!isValidPart1(pass)) {
        return false;
    }

    let groupCorrect = false;
    for (let i = 0; i <= 9; i++) {
        const match = new RegExp(`(${i})?(${i}{2})(${i})?`).exec(pass);
        if (
            match &&
            match[1] === undefined &&
            match[3] === undefined &&
            match[2] === `${i}${i}`
        ) {
            groupCorrect = true;
        }
    }

    return groupCorrect;
};

module.exports.part1 = async () => {
    let passCount = 0;
    for (let pass = input[0]; pass < input[1]; pass++) {
        if (isValidPart1(pass)) {
            passCount += 1;
        }
    }

    return passCount;
};

module.exports.part2 = async () => {
    let passCount = 0;
    for (let pass = input[0]; pass < input[1]; pass++) {
        if (isValidPart2(pass)) {
            passCount += 1;
        }
    }

    return passCount;
};
