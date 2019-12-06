module.exports = class IntComputer {
    constructor(instructions) {
        this.instructions = instructions;
        this.cursor = 0;

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
    }

    get type() {
        return this.instruction;
    }

    run() {
        switch (this.type) {
            case 1: // Add
                this.instructionAdd();
                break;
            case 2: // Multiply
                this.instructionMultiply();
                break;
            case 99:
                this.computer.readNumber();
                this.computer.running = false;
                break;
            default:
                throw new Error("Unknown opcode " + this.opcode);
        }
    }

    instructionAdd() {
        const num1 = this.computer.readNumber();
        const num2 = this.computer.readNumber();
        const output = this.computer.readNumber();

        this.computer.instructions[output] =
            this.computer.instructions[num1] + this.computer.instructions[num2];
    }

    instructionMultiply() {
        const num1 = this.computer.readNumber();
        const num2 = this.computer.readNumber();
        const output = this.computer.readNumber();

        this.computer.instructions[output] =
            this.computer.instructions[num1] * this.computer.instructions[num2];
    }
}
