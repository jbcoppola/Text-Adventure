class Output {
    constructor(input) {
        this.text = `<div><p> > ${input}</p></div>`;
    }
    add(text) {
        this.text += `<div><p>${text}<p><div>`;
    }
}

module.exports = Output;