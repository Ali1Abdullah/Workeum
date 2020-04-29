export class Main {
    public id: number | string;
    constructor(item: any) {
        this.id = item.id;
    }
    static renderModels(modelClass: any, datasource: any): any {
        return datasource.map(item => new modelClass(item));
    }
    static renderModel(modelClass: any, item: any): any {
        return new modelClass(item);;
    }
}