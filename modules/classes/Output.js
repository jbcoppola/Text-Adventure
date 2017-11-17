class Output {
    constructor(input) {
        this.text = `> ${input}\n\n`;
    }
    add(text) {
        this.text += `${text}`;
    }
    addWithBreaks(text) {
        this.text += `${text}\n\n`;
    }
}

module.export = { Output };