module.exports = class IntComputer {
    constructor(instructions, inputs = []) {
        this.instructions = instructions;
        this.cursor = 0;

        this.inputs = inputs;
        this.outputs = [];

        this.relativeBase = 0;

        this.running = false;
    }

    run() {
        this.running = true;
        while (this.running) {
            this.step();
        }
    }

    step() {
        const opcode = this.readOpcode();
        opcode.run();
    }

    get output() {
        return this.instructions[0];
    }

    readMemory(pos) {
        if (pos < 0) {
            throw new Error("Tried reading memory at negative position", pos);
        }

        if (pos > this.instructions.length - 1) {
            this.extendMemory(this.instructions.length + pos);
        }
        return this.instructions[pos];
    }

    writeMemory(pos, val) {
        if (pos < 0) {
            throw new Error("Tried wrting to memory at negative position", pos);
        }

        if (pos > this.instructions.length - 1) {
            this.extendMemory(this.instructions.length + pos);
        }
        this.instructions[pos] = val;
    }

    get cursorInt() {
        return this.readMemory(this.cursor);
    }

    nextNumber() {
        const instruction = this.cursorInt;
        this.cursor++;
        return instruction;
    }

    readOpcode() {
        const opcodeInstruction = this.nextNumber();
        return new Opcode(this, opcodeInstruction);
    }

    extendMemory(total) {
        while (this.instructions.length < total) {
            this.instructions.push(0);
        }
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
        const num = this.computer.nextNumber();
        this.argCount += 1;
        const mode = Math.floor(
            (this.instruction % 10 ** (this.argCount + 2)) /
                10 ** (this.argCount + 1)
        );

        if (mode === 0) {
            return new Argument(mode, num, this.computer.readMemory(num));
        } else if (mode === 1) {
            return new Argument(mode, this.computer.cursor - 1, num);
        } else if (mode === 2) {
            return new Argument(
                mode,
                this.computer.relativeBase + num,
                this.computer.readMemory(this.computer.relativeBase + num)
            );
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
            case 9:
                this.instructionRelativeBaseOffset();
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

        this.computer.writeMemory(outputPos, num1 + num2);
    }

    instructionMultiply() {
        const num1 = this.readArgument().value;
        const num2 = this.readArgument().value;
        const outputPos = this.readArgument().position;

        this.computer.writeMemory(outputPos, num1 * num2);
    }

    instructionInput() {
        const pos = this.readArgument().position;
        const input = this.computer.inputs.shift();
        this.computer.writeMemory(pos, input);
    }

    instructionOutput() {
        const arg = this.readArgument();
        const pos = arg.position;
        const value = this.computer.readMemory(pos);
        this.computer.outputs.push(value);
        this.computer.writeMemory(0, value);
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

        this.computer.writeMemory(
            output.position,
            num1.value < num2.value ? 1 : 0
        );
    }

    instructionEquals() {
        const num1 = this.readArgument();
        const num2 = this.readArgument();
        const output = this.readArgument();

        this.computer.writeMemory(
            output.position,
            num1.value === num2.value ? 1 : 0
        );
    }

    instructionRelativeBaseOffset() {
        const offset = this.readArgument().value;
        this.computer.relativeBase += offset;
    }
}

class Argument {
    constructor(mode, pos, value) {
        this.mode = mode;
        this.position = pos;
        this.value = value;
    }
}
