export class CommandHandlerException extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, CommandHandlerException.prototype);
    }
}
