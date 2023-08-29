import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

// creating an init app function where our event listeners will be handled and all other activities
const initApp = (): void => {
    //getting the instances

    const fullList = FullList.instance
    const template = ListTemplate.instance

    //getting out form and listening to the submit event
    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

    // adding an event listener to the form
    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        // when new item is submitted to the form do;
        event.preventDefault()

        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if(!newEntryText.length) return

        //doing the list calculations 
        const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1

        // for new item
        const newItem = new ListItem(itemId.toString(), newEntryText)
        
        // adding item to the list
        fullList.addItem(newItem)
        template.render(fullList)


    })

    // adding a listener to that clear list button
    const clearItems = document.getElementById("clearItemButton") as HTMLButtonElement
     
    // calling methods to clear the list as well as the template.
    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear()
    })

    //loading the function
    fullList.load()
    template.render(fullList)
}

// running js unitll the dom content is loaded.
document.addEventListener("DOMContentLoaded", initApp)