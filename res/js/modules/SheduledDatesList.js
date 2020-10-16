import {TaskListContent} from './TaskListContent.js';

class SheduledDatesList extends TaskListContent {
    constructor() {
        super();
    }

    renderDateList() {
        this.appContentBlock = document.querySelector(".app-content");
        this.appContentBlock.innerHTML = "";
        this.transformData();
    }

    transformData() {
        const mainDataArr = super.getFromLocalStorage();
        console.log(mainDataArr);
        const transformedMainArr = mainDataArr.filter(el => {
             return el.tasks.length > 0;
            
        });
        console.log(transformedMainArr);
        // const transArr = transformedMainArr.map(element => {
        //     const unixDate = element.date.split('.').reverse();
        //     return element.date.split('.').reverse();
        // });

        transformedMainArr.forEach(element => {
           const date = element.date.split('.').reverse();
           const convDate = `${date[0]}-${date[1]}-${date[2]}T06:00:00`;
           const unixTimeStamp = parseInt((new Date(convDate).getTime()/1000).toFixed(0))
           element.unixDate = Number(unixTimeStamp);
        });

        console.log(transformedMainArr);

        const sortedArr = transformedMainArr.sort((a, b)=> {
            return (a.unixDate-b.unixDate);
        });
        console.log(sortedArr);
        return sortedArr;
        // const date2 =new Date ('2020-10-16T00:00:00');
        // console.log(date2.toISOString());
        
        // const date1 = parseInt((new Date('2020-10-16T06:00:00').getTime()/1000).toFixed(0));
        // console.log(date1);
        //  console.log(transformedMainArr);
        

    }
}


export {SheduledDatesList};