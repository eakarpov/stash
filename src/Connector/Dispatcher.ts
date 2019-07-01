import {Connection} from "./Connection";
import {initConnect} from "./Connector";

export interface EventOut<T> {
    type: string;
    method: string;
    data: T;
}

export interface EventIn<T = any> {
    type: string;
    data: T;
}

export class Dispatcher {
    public error: string = '';
    private connection?: WebSocket;

    constructor(public ws: Connection, public rules: (e: string) => void) {
        this.connection = new WebSocket(`ws://${ws.host}:${ws.port}/${ws.path}`);
        this.connection.onclose = () => {
            this.connection = void 0;
        };
        this.connection.onerror = (e: Event) => {
            // tslint:disable
        };
        this.connection.onmessage = (e: MessageEvent) => {
            if (this.connection) {
                this.rules(e.data);
            }
        };
    }

    public dispatch<T>(service: string, method: string, data: Partial<T> = {}) {
        const box = {
            type: service,
            method: method,
            data: data,
        } as EventOut<T>;
        if (this.connection) {
            this.connection.send(JSON.stringify(box));
        }
    }
}

export function initialize(cn: Connection, rules: (e: string) => void): Dispatcher {
    initConnect( window.location.host);
    return new Dispatcher(cn, rules);
}
