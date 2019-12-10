const raw_input = require("../util").readInput("day8/input.txt");
// const raw_input = "123456789012";
const input = raw_input
    .split("")
    .filter(num => !!num.trim())
    .map(num => parseInt(num, 10));

class Image {
    constructor(width, height) {
        this.layers = [[]];
        this.width = width;
        this.height = height;
        this.size = width * height;
    }

    get lastLayer() {
        return this.layers[this.layers.length - 1];
    }

    pushData(val) {
        if (this.lastLayer.length >= this.size) {
            this.layers.push([]);
        }

        this.lastLayer.push(val);
    }

    display() {
        const screen = [];
        for (let i = 0; i < this.height; i++) {
            const arr = [];
            for (let j = 0; j < this.width; j++) {
                arr.push(" ");
            }
            screen.push(arr);
        }

        for (const layer of this.layers) {
            for (const i in layer) {
                const pixel = layer[i];
                const width = i % this.width;
                const height = Math.floor(i / this.width);

                if (screen[height][width] === " ") {
                    if (pixel === 0) {
                        screen[height][width] = ".";
                    } else if (pixel === 1) {
                        screen[height][width] = "#";
                    }
                }
            }
        }

        return screen.map(line => line.join("")).join("\r\n");
    }
}

module.exports.part1 = async () => {
    const image = new Image(25, 6);
    for (const pixel of input) {
        image.pushData(pixel);
    }

    let minZeros = Number.MAX_SAFE_INTEGER;
    let maxLayer = -1;
    for (const layer in image.layers) {
        let zeroCount = 0;
        for (const pixel of image.layers[layer]) {
            if (pixel === 0) {
                zeroCount++;
            }
        }

        if (zeroCount < minZeros) {
            minZeros = zeroCount;
            maxLayer = layer;
        }
    }

    let oneCount = 0;
    let twoCount = 0;
    for (const pixel of image.layers[maxLayer]) {
        if (pixel === 1) {
            oneCount++;
        }

        if (pixel === 2) {
            twoCount++;
        }
    }

    return oneCount * twoCount;
};

module.exports.part2 = async () => {
    const image = new Image(25, 6);
    for (const pixel of input) {
        image.pushData(pixel);
    }

    return image.display();
};
