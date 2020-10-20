import {TaskListContent} from './TaskListContent.js';

class DatesList extends TaskListContent {
    constructor() {
        super();
    }

    renderDateList() {
        this.hideTaskInput();
        this.appContentBlock = document.querySelector(".app-content");
        this.appContentBlock.style.alignItems = "center";
        this.appContentBlock.style.justifyContent = "flex-start";
        this.appContentBlock.innerHTML = "";
        const transDataArr = this.transformData();
        const datesListHeader = document.createElement("h1");
        datesListHeader.setAttribute("class", "all-dates-list-header");
        datesListHeader.innerText = "Запланированные задания:"
        this.appContentBlock.appendChild(datesListHeader);
        if(transDataArr.length === 0) {
            const emptyList = document.createElement("p");
            emptyList.setAttribute("class", "list-message");
            emptyList.textContent = "Ничего не запланировано";
            emptyList.style.paddingTop = '30%';
            this.appContentBlock.appendChild(emptyList);
        }
        else {
            const datesListEl = document.createElement("ul");
            datesListEl.setAttribute("class", "sheduled-tasks-list");
            this.appContentBlock.appendChild(datesListEl);
            transDataArr.forEach(el => {
                const listCont = document.querySelector(".sheduled-tasks-list");
                const listItem = document.createElement("li");
                listItem.setAttribute("class", "d-btn");
                const trashBtn = document.createElement("span");
                trashBtn.setAttribute("id", `tr${el.id}`);
                trashBtn.setAttribute("class", "trash-btn");
                if(el.allDone === true) {
                    const allDoneIcon = document.createElement("span");
                    allDoneIcon.setAttribute("class", "date-tasks-done-icon");
                    listItem.textContent = el.date;
                    listCont.appendChild(listItem).appendChild(allDoneIcon);
                    listItem.setAttribute("class", "d-btn all-tasks-done-item");
                    listItem.appendChild(trashBtn);
                }
                else {
                    listItem.textContent = el.date;
                    listCont.appendChild(listItem);
                    listItem.appendChild(trashBtn);
                }
                
            });
        }
       
    }

    hideTaskInput() {
        const taskInput = document.querySelector(".task-input-block");
        const shedTaskInput = document.querySelector(".sheduled-task-input-block");
        if(taskInput && taskInput.style.bottom === '0px') {
            taskInput.style.bottom = '-180px';
            console.log('hide input');
        }
        if(shedTaskInput && shedTaskInput.style.bottom === '0px') {
            shedTaskInput.style.bottom = '-180px';
            console.log('hide shed input');
        }
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
           const unixTimeStamp = parseInt((new Date(convDate).getTime()/1000).toFixed(0));
           element.unixDate = Number(unixTimeStamp);
           const isAllDone = element.tasks.every((el)=>{
               return el.status === true;
           });
           if(isAllDone) {
               element.allDone = true;
           }
        //    console.log(isAllDone);
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


export {DatesList};