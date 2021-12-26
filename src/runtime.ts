export interface Runtime {
    hasReference(property: string): boolean;
    getReference(property: string): boolean;
    setReference(property: string, value: any): void;
}

export class GenericRuntime implements Runtime{

    private readonly context: Map<string, any>;

    constructor(context: {}) {
        this.context = new Map;
        for (let key in context) {
            this.context.set(key, context[key]);
        }
    }

    hasReference(property: string): boolean{
        return typeof this.context[property] !== 'undefined'
    }

    getReference(property: string): boolean{
        return this.context[property];
    }

    setReference(property: string, value: any): void{
        return this.context[property] = value;
    }
}
