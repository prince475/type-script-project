// creating the model for our ListItem

export interface Item {
    // This will be our list items getters and setters

    id: string,
    item: string,
    checked: boolean,
}

export default class ListItem implements Item {
    // creating items with id, item and checked
    constructor(

        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false,
    ) {
        // since the getters and setters have already been set 
        // we don't have to implicitly define them because it will be a second assignment
    }

    // implementing our getters and setters 
    get id(): string {
        return this._id
    }
    set id(id: string) {
        this._id = id
    }
    get item(): string {
        return this._item
    }
    set item(item: string) {
        this._item = item
    }
    get checked(): boolean {
        return this._checked
    }
    set checked(checked: boolean) {
        this._checked = checked
    }
}