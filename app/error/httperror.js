// Allows you to structure the error with a status and a message
// Then the errorhandler middleware handles the error

export class HttpError extends Error{
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}