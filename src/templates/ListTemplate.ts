import FullList from '../model/FullList'

interface DOMList {
    ul: HTMLUListElement, 
    clear(): void,
    render(FullList: FullList): void,  
}

export default class ListTemplate implements DOMList {


    ul: HTMLUListElement

    // making this a single tone
    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    // clearing the list on the dom
    // important to note is that here we are focusing on the display and not data.
    clear(): void {
        this.ul.innerHTML = ''
    } 

    render(fullList: FullList): void {
        this.clear()

        
        fullList.list.forEach(item => {
            //list item has a check box: input type, id, tabindex of 0, and a label
            //Creating out the list out as the parent component.
            
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item" 

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check) 
            
            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })


            // creating the label that holds the description for each item
            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = "button"
            button.textContent = 'x'
            li.append(button)

            // adding an event listener to the button.
            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })
            
            //adding the list item to the unordered list which is the parent of the entire list.
            this.ul.append(li)
            
        })
    
        }
        
      
}