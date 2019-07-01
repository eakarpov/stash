import {ActionDTOModelInstance} from "./ActionDTOModelInstance";
import {Connector, Paginated} from "./Connector";
import Url from "url";
import {DTOModelInstance} from "./DTOModelInstance";
import {clean} from "../utils";
import {IModelRequest} from "./Connection";

export interface IAction {
    Name: string;
}

export class DTOModel<T, K = Paginated<T>> {
    protected name: string = 'test';

    public async find(
        options: Partial<IModelRequest>,
        filter: Partial<T> = {}
    ): Promise<K> {
        const url = Url.format({
            pathname: this.name,
            query: {
                ...clean({...options, ...filter}),
            },
        });
        return Connector.fetchApi<K>(url);
    }

    public async get(id: string): Promise<DTOModelInstance<T>> {
        const url = Url.format({
            pathname: `${this.name}/${id}`,
        });

        const res: T = await Connector.fetchApi(url);
        const instance = new DTOModelInstance<T>(this.name, res);
        instance.id = id;
        return instance;
    }

    public async check<D>(Name: string, params: D = {} as D): Promise<boolean> {
        const url = Url.format({
            pathname: this.name,
            query: {
                Name,
                ...clean(params),
            },
        });

        try {
            return await Connector.headApi(url);
        } catch (e) {
            return false;
        }
    }

    public async create<D = T>(val: D): Promise<DTOModelInstance<D>> {
        const url = Url.format({
            pathname: this.name,
        });

        const res: string = await Connector.postApi<string>(url, val);
        const instance = new DTOModelInstance<D>(this.name, val);
        instance.id = res;
        return instance;
    }

    public async deleteAll(): Promise<null> {
        const url = Url.format({
            pathname: this.name,
        });

        return Connector.deleteApi(url);
    }

    public async filter(val: IFilterDTO|string) {
        if (typeof val === 'string') {
            return await filterDTO.getInstance(val).apply(this.name);
        } else {
            return await filterDTO.apply(this.name, val);
        }
    }

    public getInstance(id: string, val?: T): DTOModelInstance<T> {
        const inst = new DTOModelInstance<T>(this.name, val);
        inst.id = id;
        return inst;
    }
}

export class ActionDTOModel<T, K = Paginated<T>> extends DTOModel<T, K> {

    public getInstance(id: string, val?: T): ActionDTOModelInstance<T> {
        const inst = new ActionDTOModelInstance<T>(this.name, val);
        inst.id = id;
        return inst;
    }

    public async apply(entity: string, filter: T): Promise<Paginated<T>> {
        const url = Url.format({
            pathname: `${this.name}/apply`,
            query: { entity },
        });

        return await Connector.postApi(url, filter);
    }
}

export type IFilterDTO = any;

export class FilterDTO extends ActionDTOModel<IFilterDTO> {
    public name: string = 'filters';
}

export const filterDTO = new FilterDTO();
