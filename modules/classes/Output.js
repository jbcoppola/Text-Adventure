class Output {
    constructor(input) {
        this.text = `<div><p>> ${input}</p></div>`;
    }
    add(text) {
        this.text += `<div>${text}<div>`;
    }
}

module.exports = Output;