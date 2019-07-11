export class NetworkError extends Error {
    public error: Error;
    constructor(error: Error) {
        super(error.message);
        this.error = error;
    }
}
