class Output {
    constructor(input) {
        this.text = `<div>> ${input}</div>`;
    }
    add(text) {
        this.text += `<div>${text}<div>`;
    }
}

module.exports = Output;