import {HttpError, NetworkError} from "../errors";

export interface Paginated<T> {
    total: number;
    items: T[];
    page: number;
    limit: number;
}

export interface Model {
    id: string;
    createdAt: number;
    updatedAt: number;
}

export class ConnectorClass {
    private host: string;
    private strict?: boolean;

    constructor() {
        this.host = window.location.host;
    }

    public setHost(host?: string, strict?: boolean) {
        this.host = host || window.location.host;
        this.strict = strict;
    }

    public fetchApi<D>(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            credentials: 'include',
            ...options,
        })
            .then((response: Response) => {
                if (this.strict && !response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err);
            });
    }

    public postApi<D>(
        path: string, body: any, options: RequestInit = {}, prefix: string = 'api'
    ): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;
        return fetch(url, {
            body: JSON.stringify(body || {}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            ...options,
        })
            .then((response: Response) => {
                if (this.strict && !response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                if (response.status === 204) {
                    return response.text();
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err);
            });
    }

    public patchApi<D>(
        path: string, body: any, options: RequestInit = {}, prefix: string = 'api'
    ): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;
        return fetch(url, {
            body: JSON.stringify(body || {}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
            ...options,
        })
            .then((response: Response) => {
                if (this.strict && !response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                if (response.status === 204) {
                    return response.text();
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err);
            });
    }

    public deleteApi<D>(
        path: string, options: RequestInit = {}, prefix: string = 'api'
    ): Promise<D> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;
        return fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            ...options,
        })
            .then((response: Response) => {
                if (this.strict && !response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.json();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err);
            });
    }

    public getApi(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<string> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            credentials: 'include',
            ...options,
        })
            .then((response: Response) => {
                if (this.strict && !response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.text();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err);
            });
    }

    public headApi(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<boolean> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            method: 'HEAD',
            credentials: 'include',
            ...options,
        })
            .then((response: Response) => {
                if (this.strict && !response.ok) {
                    return Promise.resolve(true);
                }
                return Promise.resolve(false);
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err);
            });
    }


    public downloadApi(path: string, options: RequestInit = {}, prefix: string = 'api'): Promise<Blob> {
        const url = `//${this.host}/${prefix ? `${prefix}/` : ''}${path}`;

        return fetch(url, {
            credentials: 'include',
            ...options,
        })
            .then((response: Response) => {
                if (this.strict && !response.ok) {
                    throw new HttpError(response.status, response.statusText);
                }
                return response.blob();
            })
            .catch((err: Error) => {
                if (err instanceof SyntaxError) {
                    throw new Error('fetchApi: bad JSON');
                }
                if (err instanceof HttpError) {
                    throw err;
                }

                throw new NetworkError(err);
            });
    }

    public openSocketConnection(
        io: { connect(host: string): any },
        messager: (connection: any) => void,
    ) {
        const connection = io.connect(this.host);
        messager(connection);
    }
}

export const Connector: ConnectorClass = new ConnectorClass();

export function initConnect(host?: string, strict: boolean = true) {
    Connector.setHost(host, strict);
}
