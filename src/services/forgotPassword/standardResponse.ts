export default class StandardResponse<T> {
    public Status: number;
    public Data: T;
    public Messages?: string;
    public Exception?: string;

    constructor(status: number, data: any, mess?: string, exception?: string) {
        this.Status = status;
        this.Data = data;
        this.Messages = mess;
        this.Exception = exception;
    }
}