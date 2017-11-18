class UseCase {
    constructor({ usedWith, text, destroy = true, creates }) {
        //items the item can be used with
        this.usedwith = usedWith;
        //the description of what happens when used
        this.text = text;
        // whether item is destroyed on use
        this.destroy = destroy;
        // what the item creates after use
        this.creates = creates;
    }
}

module.exports = UseCase;