export class Storage<T>
{
    private _items: T[] = [];

    constructor() { }

    public addItem(...item: T[])
    {
        this._items.push(...item);
    }

    public removeItem(item: T)
    {
        this._items = this._items.filter(i => i !== item);
    }

    public getAllItems(): T[]
    {
        return this._items;
    }

    public getItem(findCallBackFN: (value: T, index: number, obj: T[]) => unknown)
    {
        return this._items.find(findCallBackFN);
    }
}