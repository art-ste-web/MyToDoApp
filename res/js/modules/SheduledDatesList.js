import {TaskListContent} from './TaskListContent.js';

export {SheduledDatesList};

class SheduledDatesList extends TaskListContent {
    constructor() {
        super();
    }

    transformData() {
        this.mainDataArr = super.getFromLocalStorage();
        console.log(this.mainDataArr);
        const transformedMainArr = this.mainDataArr.map(el => {
            if(el.tasks.length > 0) {
                return el;
            }
        });
        console.log(transformedMainArr);
        

    }
}