export class HttpError extends Error {
    public code: number | string;
    constructor(code: number | string, message?: string) {
        super(message);
        this.code = code;
    }
}
