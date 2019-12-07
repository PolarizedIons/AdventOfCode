module.exports = class IntComputer {
    constructor(instructions, inputs = []) {
        this.instructions = instructions;
        this.cursor = 0;

        this.inputs = inputs;

        this.running = false;
    }

    run() {
        this.running = true;
        while (this.running) {
            const opcode = this.readOpcode();
            opcode.run();
        }
    }

    get output() {
        return this.instructions[0];
    }

    readNumber() {
        const instruction = this.instructions[this.cursor];
        this.cursor++;
        return instruction;
    }

    readOpcode() {
        const opcodeInstruction = this.readNumber();
        return new Opcode(this, opcodeInstruction);
    }
};

class Opcode {
    constructor(computer, instruction) {
        this.computer = computer;
        this.instruction = instruction;

        this.argCount = 0;
    }

    get type() {
        return this.instruction % 100;
    }

    readArgument() {
        const num = this.computer.readNumber();
        this.argCount += 1;
        const mode = Math.floor(
            (this.instruction % 10 ** (this.argCount + 2)) /
                10 ** (this.argCount + 1)
        );

        if (mode === 0) {
            return new Argument(mode, num, this.computer.instructions[num]);
        } else if (mode === 1) {
            return new Argument(mode, this.computer.cursor - 1, num);
        } else {
            throw new Error("Unknown mode " + mode);
        }
    }

    run() {
        switch (this.type) {
            case 1:
                this.instructionAdd();
                break;
            case 2:
                this.instructionMultiply();
                break;
            case 3:
                this.instructionInput();
                break;
            case 4:
                this.instructionOutput();
                break;
            case 5:
                this.instructionJumpIfTrue();
                break;
            case 6:
                this.instructionJumpIfFalse();
                break;
            case 7:
                this.instructionLessThan();
                break;
            case 8:
                this.instructionEquals();
                break;
            case 99: // Break
                this.computer.running = false;
                break;
            default:
                throw new Error("Unknown opcode " + this.instruction);
        }
    }

    instructionAdd() {
        const num1 = this.readArgument().value;
        const num2 = this.readArgument().value;
        const outputPos = this.readArgument().position;

        this.computer.instructions[outputPos] = num1 + num2;
    }

    instructionMultiply() {
        const num1 = this.readArgument().value;
        const num2 = this.readArgument().value;
        const outputPos = this.readArgument().position;

        this.computer.instructions[outputPos] = num1 * num2;
    }

    instructionInput() {
        const pos = this.readArgument().position;
        const input = this.computer.inputs.shift();
        this.computer.instructions[pos] = input;
    }

    instructionOutput() {
        const pos = this.readArgument().position;
        const value = this.computer.instructions[pos];
        // console.log("Output: ", value);
        this.computer.instructions[0] = value;
    }

    instructionJumpIfTrue() {
        const condition = this.readArgument();
        const newPointer = this.readArgument();
        if (condition.value !== 0) {
            this.computer.cursor = newPointer.value;
        }
    }

    instructionJumpIfFalse() {
        const condition = this.readArgument();
        const newPointer = this.readArgument();
        if (condition.value === 0) {
            this.computer.cursor = newPointer.value;
        }
    }

    instructionLessThan() {
        const num1 = this.readArgument();
        const num2 = this.readArgument();
        const output = this.readArgument();

        this.computer.instructions[output.position] =
            num1.value < num2.value ? 1 : 0;
    }

    instructionEquals() {
        const num1 = this.readArgument();
        const num2 = this.readArgument();
        const output = this.readArgument();

        this.computer.instructions[output.position] =
            num1.value === num2.value ? 1 : 0;
    }
}

class Argument {
    constructor(mode, pos, value) {
        this.mode = mode;
        this.position = pos;
        this.value = value;
    }
}
