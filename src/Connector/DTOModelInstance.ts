import {Connector, Paginated} from "./Connector";
import {DTOModel} from "./DTOModel";
import Url from "url";

export class DTOModelInstance<T> {
    protected readonly name: string = 'test';
    public id: string = '';
    public value?: T;

    constructor(name: string, value?: T) {
        this.name = name;
        this.value = value;
    }

    public async delete(): Promise<void> {
        const url = Url.format({
            pathname: `${this.name}/${this.id}`,
        });

        return Connector.deleteApi(url);
    }

    public async update(val?: Partial<T>): Promise<DTOModelInstance<T>> {
        const url = Url.format({
            pathname: `${this.name}/${this.id}`,
        });

        if (val) {
            await Connector.patchApi(url, val);
            this.value = Object.assign(this.value || {} as T, val);
        } else {
            await Connector.patchApi(url, this.value);
        }
        return this;
    }

    public getNestedModel<D, K = Paginated<D>>(name: string): DTOModel<D, K> {
        const self = this;
        return new class extends DTOModel<D, K> {
            public name: string = `${self.name}/${self.id}/${name}`;
        }
    }
}
