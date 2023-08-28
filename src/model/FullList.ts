import ListItem from "./ListItem";

// creating another interface for our ListItem
// refers to the getter of the list and also the methods for the list.

interface List {
    list: ListItem[]; //setter
    // our methods
    load(): void, //loads the list
    save(): void, //save the list
    clearList(): void, //clear the list
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
    
}

// implementing our class
export default class FullList implements List{
    // inside here we define our constructor that is going to receive a list which will also be private.
    // we will have our getter and then our methods.

    // we can now define the instance of our class.
    static instance: FullList = new FullList()


    // creating a singleton since there will only be one instance of this class created 
    private constructor(private _list: ListItem[] = []){
        //the constructor receives our private _list items and the ListItems with a default array items 
    }

    // defining our methods
    get list(): ListItem[] {
        return this._list;
    }

    // load method
    load(): void {
        const storedList: string | null = localStorage.getItem("myList"); //retrieving my list
        
        // adding our type guard, that is the list in local storage is not a string just return 
        if (typeof storedList !== "string") return

        // else
        
        //defining it's own type and creatinf a new list item
        const parsedList: {_id: string, _item: string, _checked: boolean}[]
        = JSON.parse(storedList)
        
        // going through that parsed list and creating a new list item and populating our list again. 
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    // save method to save our list to the local storage
    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    // creating the clear list method
    clearList(): void {
        // to clear the list
        this._list = []
        //saving the new list created by making sure we are writing over the list in local storage using this.save()
        this.save()
    }

    //our Add item method
    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }


    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}