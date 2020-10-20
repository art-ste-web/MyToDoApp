import {SheduledTasks} from './SheduledTasks.js';

class DatesListOperations extends SheduledTasks {
    constructor() {
        super();
    }

    getDatesListClickedEl () {
        const datesList = document.querySelector(".sheduled-tasks-list");
        datesList.addEventListener("click", (event)=> {
            console.log(event.target);
            console.log(event.target.textContent);
            
        })
    }
}

export {DatesListOperations};