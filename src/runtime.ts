export interface Runtime {
    hasReference(property: string): boolean;
    getReference(property: string): boolean;
    setReference(property: string, value: any): void;
}

export class GenericRuntime implements Runtime{

    private readonly context: Map<string, any>;

    constructor(context: {[key: string]: any}) {
        this.context = new Map;
        for (let key in context) {
            this.context.set(key, context[key]);
        }
    }

    hasReference(property: string): boolean{
        return this.context.has(property)
    }

    getReference(property: string): boolean{
        return this.context.get(property);
    }

    setReference(property: string, value: any): void{
        this.context.set(property, value);
    }
}
