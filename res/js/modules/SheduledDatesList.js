import {TaskListContent} from './TaskListContent.js';

export {SheduledDatesList};

class SheduledDatesList extends TaskListContent {
    constructor() {
        super();
    }

    transformData() {
        this.mainDataArr = super.getFromLocalStorage();
        console.log(this.mainDataArr);
        // const transformedMainArr = this.mainDataArr.filter(el => {
        //     return el.tasks.length >0;
            
        // });
        const transArr = this.mainDataArr.forEach(element => {
            element.date.split('.');
        });
        console.log(transformedMainArr);
        

    }
}