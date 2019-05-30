export class ServiceException extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ServiceException.prototype);
    }
}
