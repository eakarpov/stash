export type FormatType =
    'tree' // Tree representation
    | 'map' // Associative array representation
    | 'list' // Paginated list representation
    | 'flat'; // Flag collection without pagination

export interface IModelRequest {
    $sort: string;
    $order: string;
    $page: number;
    $limit: number;
    $search: string;
    $format: FormatType;
}

export class Connection {
    public host: string = '';
    public port: string = '';
    public path: string = 'api/socket';

    public constructor(host: string, port: string, path?: string) {
        this.host = host;
        this.port = port;
        if (path) {
            this.path = path;
        }
    }

}
