import {SheduledTasks} from './SheduledTasks.js';

export {SheduledTasksOperations};

class SheduledTasksOperations extends SheduledTasks {
    constructor() {
        super();
    }

    //catching clicked element
    sheduledTaskListStatusEvents() {
        this.sheduledTaskList = document.querySelector(".sheduled-task-list");
        if(this.sheduledTaskList) {
            this.sheduledTaskList.addEventListener("click", (event) => {
                const clickedElement = event.target;
                const elId = Number(event.target.id);
                const trashIdNum = Number(event.target.id.substr(1));
                const taskTextId = Number(event.target.id.substr(4));
                // console.log(taskTextId);
                // console.log(this.clickedElement);
                this.changeStatusOfSheduledTask(clickedElement, elId);
                this.deleteSheduledTaskFromList(clickedElement, trashIdNum);
                this.editSheduledTaskText(clickedElement, taskTextId);
                // console.log(this.mainDataArr);
                
            })
        }
        
    }

    //change status of task
    changeStatusOfSheduledTask(clickedTaskEl, clickedElId) {
        // console.log(this.mainDataArr);
        if(clickedTaskEl.classList.contains("status")) {
            clickedTaskEl.classList.toggle("checked");
            clickedTaskEl.parentNode.classList.toggle('done');
            if (clickedTaskEl.classList.contains("checked")) {
                const elCheckedState = true;
                this.dataChangeStatusOfSheduledTask(clickedElId, elCheckedState);
                console.log('task status true');
                // super.setToLocalStorage();
                                
            }
            else {
                const elCheckedState = false;
                this.dataChangeStatusOfSheduledTask(clickedElId, elCheckedState);
                console.log('task status false');
                // super.setToLocalStorage();
                
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

    //-----------Delete task methods----------------
    deleteSheduledTaskFromList(clickedElement, trashIdNum) {
        if(clickedElement.classList.contains("trash")) {
            this.sheduledTaskDate = document.querySelector("#sheduled-date").innerHTML;
            this.deleteSheduledTaskFromDataArr(trashIdNum, this.sheduledTaskDate);
            // let todayTasks = appData.getTodayTaskArr(curDate);
            this.clearDOMTaskList();
            super.renderSheduledDateTaskList(this.sheduledTaskDate);
            this.sheduledTaskListStatusEvents();
        }
    }

    deleteSheduledTaskFromDataArr(taskId, taskDate) {
        const mainDataArr = super.getFromLocalStorage();
        let todayEl = mainDataArr.find(el => el.date === taskDate);
        console.log(todayEl);
        const todayElTasks = todayEl.tasks;
        todayElTasks.forEach(el => {
            if(el.tId === taskId) {
                todayElTasks.splice(el.tId, 1);
                console.log(el.tId);
                // console.log(todayElTasks);
                for(let i = 0; i < todayElTasks.length; i++) {
                    todayElTasks[i].tId = i;
                    // console.log(this.todayElTasks);
                    
                }
            }
        })
        super.setToLocalStorage(mainDataArr);
        
    }

    clearDOMTaskList() {
        const parentTaskEl = document.querySelector(".sheduled-task-list");
        parentTaskEl.innerHTML = '';
    }

    //-----------Edit sheduled task text methods----------------
    //handling click on task text
    editSheduledTaskText(clickedTaskEl, clickedTaskTextId) {
        console.log('edit sheduled text');
        this.taskInputBlock = document.querySelector(".sheduled-task-input-block");
        this.editTaskInput = document.getElementById("task-edit-field");
        if(clickedTaskEl.classList.contains("sheduled-task-text-content") && !this.editTaskInput) {
            this.trashBtnElements = document.querySelectorAll(".trash");
            // console.log(trashBtnElements);
            this.trashBtnElements.forEach(el => {
                if(el.nextElementSibling) {
                    el.nextElementSibling.remove();
                    el.style.display = 'block';
                    console.log('edit sheduled text remove');
                }
                
                if(el.id === `t${clickedTaskTextId}`) {
                    const editTaskBtnHTML = `<span class = "edit-task"></span>`;
                    clickedTaskEl.parentNode.insertAdjacentHTML('beforeend', editTaskBtnHTML);
                    el.style.display = 'none';
                    const editBtn = document.querySelector(".edit-task");
                    editBtn.addEventListener("click", () => {
                        this.showEditInput(clickedTaskEl);
                        this.taskInputBlock.style.bottom = '-180px';
                    });
                    console.log('edit sheduled add');
                }
            })
                       
        }

        // if (this.editBtn) {
        // this.trashBtnElements = document.querySelectorAll(".trash");
        //     this.trashBtnElements.forEach(el => {
        //         if(el.nextElementSibling) {
        //             el.nextElementSibling.remove();
        //             el.style.display = 'block';
        //             console.log('eeedddiiitt');
        //         }
        //     })
        // }
    }

    showEditInput(clickedTaskEl) {
        if(this.editInput) {
            this.editInput.remove();
        }
        this.taskTextContent = clickedTaskEl.innerText;
        clickedTaskEl.innerHTML = `<input id = "task-edit-field" type = "text" value = "${this.taskTextContent}">`;
        this.trashBtnElements = document.querySelectorAll(".trash");
            this.trashBtnElements.forEach(el => {
                if(el.nextElementSibling) {
                    el.nextElementSibling.remove();
                    const confirmEditBtnHTML = `<span class = "confirm-edit-task"></span>`;
                    clickedTaskEl.parentNode.insertAdjacentHTML('beforeend', confirmEditBtnHTML);
                    this.confirmEditBtn = document.querySelector(".confirm-edit-task");
                    this.confirmEditBtn.addEventListener("click", () => {this.confirmEditTask(clickedTaskEl)});
                }
            })
    }

    confirmEditTask(clickedTaskEl) {
        const taskInputBlock = document.querySelector(".sheduled-task-input-block");
        const editTaskInput = document.getElementById("task-edit-field");
        const confirmEditBtn = document.querySelector(".confirm-edit-task");
        const taskTextId = clickedTaskEl.id;
        const taskId = Number(clickedTaskEl.id.substr(4));
        const taskTextEl = document.getElementById(taskTextId);
        taskTextEl.innerText = editTaskInput.value;
        this.dataChangeTextofSheduledTask(editTaskInput.value, taskId);
        editTaskInput.remove();
        confirmEditBtn.remove();
        const trashBtn = document.getElementById(`t${taskId}`);
        trashBtn.style.display = 'block';
        taskInputBlock.style.bottom = '0px';
        // console.log(taskId);
    }


    //--------------Data methods-------------------

    dataChangeStatusOfSheduledTask(taskId, elState) {
        this.sheduledTaskDate = document.querySelector("#sheduled-date").innerHTML;
        // console.log(this.mainDataArr);
        const mainDataArr = super.getFromLocalStorage();
        let todayEl = mainDataArr.find(el => el.date === this.sheduledTaskDate);
        todayEl.tasks.forEach(el => {
            if(el.tId === taskId) {
                el.status = elState;
                console.log(el);
                console.log("status in arr changed");
                // DataStore.setToLocalStorage(mainDataArr);
                console.log(this.mainDataArr);
                super.setToLocalStorage(mainDataArr);
                return mainDataArr;
                
                
            }
        })
    }

    dataChangeTextofSheduledTask(newTaskText, taskId) {
        const mainDataArr = super.getFromLocalStorage();
        this.sheduledTaskDate = document.querySelector("#sheduled-date").innerHTML;
        let todayEl = mainDataArr.find(el => el.date === this.sheduledTaskDate);
        const todayElTasks = todayEl.tasks;
        todayElTasks.forEach(el => {
            if(el.tId === taskId) {
                el.text = newTaskText;
            }
        })
        super.setToLocalStorage(mainDataArr);

    }

}