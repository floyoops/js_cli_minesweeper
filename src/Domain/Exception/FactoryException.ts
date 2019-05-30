export class FactoryException extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, FactoryException.prototype);
    }
}
