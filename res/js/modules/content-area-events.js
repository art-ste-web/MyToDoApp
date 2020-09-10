import {StartContent} from './start-content.js';

export {TaskListAreaEvents};

class TaskListAreaEvents extends StartContent {
    constructor(todayDate) {
        super();
        this.todayDate = todayDate;
        
    }
    taskListStatusEvents() {
        this.appTaskList.addEventListener("click", (event) => {
            this.clickedElement = event.target;
            this.elId = Number(event.target.id);
            this.trashIdNum = Number(event.target.id.substr(1));
            // console.log(this.trashIdNum);
            // console.log(this.clickedElement);
            this.changeStatusOfTask(this.clickedElement, this.elId);
            this.deleteTaskFromList(this.clickedElement, this.todayDate, this.trashIdNum);
            // console.log(this.mainDataArr);
        })
    }

    taskListEditTaskEvent() {
        this.appTaskList.addEventListener("dbclick", (event) => {
            this.clickedElement = event.target;
            console.log(this.clickedElement);
            console.log('db click');
        })
    }

    changeStatusOfTask(clickedTaskEl, clickedElId) {
        // console.log(this.mainDataArr);
        if(clickedTaskEl.classList.contains("status")) {
            clickedTaskEl.classList.toggle("checked");
            clickedTaskEl.parentNode.classList.toggle('done');
            if (clickedTaskEl.classList.contains("checked")) {
                const elCheckedState = true;
                this.dataChangeStatusOfTask(clickedElId, elCheckedState);
                console.log('task status true');
                super.setToLocalStorage();
                                
            }
            else {
                const elCheckedState = false;
                this.dataChangeStatusOfTask(clickedElId, elCheckedState);
                console.log('task status false');
                super.setToLocalStorage();
                
            }
            
        }
        else {
            let elChilds = clickedTaskEl.childNodes;
            elChilds.forEach(el => {
                if(el.className ==="status") {
                    el.style.animation = "big-pulse  .5s ease-in-out";
                    setTimeout(()=> {
                        el.style.animation = "";
                    }, 600)
                    console.log('pulse check span');
                                            
                }
            })
        }
    }

    deleteTaskFromList(clickedElement, taskDate, trashIdNum) {
        if(clickedElement.classList.contains("trash")) {
            this.deleteTaskFromDataArr(trashIdNum, taskDate);
            // let todayTasks = appData.getTodayTaskArr(curDate);
            this.clearDOMTaskList();
            super.renderTaskListFromArr();
        }
    }

    clearDOMTaskList() {
        const parentTaskEl = document.querySelector(".task-list");
        parentTaskEl.innerHTML = '';
    }
    //--------------Data methods-------------------

    dataChangeStatusOfTask(taskId, elState) {
        // console.log(this.mainDataArr);
        this.mainDataArr = super.getFromLocalStorage();
        let todayEl = this.mainDataArr.find(el => el.date === this.todayDate);
        todayEl.tasks.forEach(el => {
            if(el.tId === taskId) {
                el.status = elState;
                console.log(el);
                console.log("status in arr changed");
                // DataStore.setToLocalStorage(mainDataArr);
                console.log(this.mainDataArr);
                super.setToLocalStorage();
                return this.mainDataArr;
                
                
            }
        })
    }

    deleteTaskFromDataArr(taskId, taskDate) {
        this.mainDataArr = super.getFromLocalStorage();
        let todayEl = this.mainDataArr.find(el => el.date === taskDate);
        console.log(todayEl);
        this.todayElTasks = todayEl.tasks;
        this.todayElTasks.forEach(el => {
            if(el.tId === taskId) {
                this.todayElTasks.splice(el.tId, 1);
                console.log(el.tId);
                // console.log(todayElTasks);
                for(let i = 0; i < this.todayElTasks.length; i++) {
                    this.todayElTasks[i].tId = i;
                    // console.log(this.todayElTasks);
                    
                }
            }
        })
        super.setToLocalStorage();
        
    }
}