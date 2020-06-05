class NotFoundError extends Error {
    constructor(message) {
        const computedMessage = message ? message : 'Not Found';
        super(computedMessage);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }

        this.name = 'NotFound';
    }
}

module.exports = NotFoundError;