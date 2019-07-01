import {DTOModelInstance} from "./DTOModelInstance";
import {Connector, Paginated} from "./Connector";
import {IModelRequest} from "./Connection";
import Url from "url";

export class ActionDTOModelInstance<T> extends DTOModelInstance<T> {
    public async apply<D>(entity: string, params: Partial<IModelRequest> = {}): Promise<Paginated<D>> {
        const url = Url.format({
            pathname: `${this.name}/${this.id}/apply`,
            query: { entity, ...params },
        });

        return await Connector.fetchApi(url);
    }

    public async run(): Promise<null> {
        const url = Url.format({
            pathname: `${this.name}/${this.id}/run`,
        });

        return await Connector.postApi(url, {});
    }

    public async cancel(): Promise<null> {
        const url = Url.format({
            pathname: `${this.name}/${this.id}/cancel`,
        });

        return await Connector.postApi(url, {});
    }
}
