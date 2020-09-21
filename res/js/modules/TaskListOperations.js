import {TaskListContent} from './TaskListContent.js';

export {TaskListOperations};

class TaskListOperations extends TaskListContent {
    constructor(todayDate) {
        super();
        this.todayDate = todayDate;
        this.editTaskInput = document.getElementById("task-edit-field");
        this.editBtn = document.querySelector(".edit-task");
        this.taskInputBlock = document.querySelector(".task-input-block");
    }

    //catching clicked element
    taskListStatusEvents() {
        this.appTaskList = document.querySelector(".task-list");
        if(this.appTaskList) {
            this.appTaskList.addEventListener("click", (event) => {
                const clickedElement = event.target;
                const elId = Number(event.target.id);
                const trashIdNum = Number(event.target.id.substr(1));
                const taskTextId = Number(event.target.id.substr(4));
                // console.log(this.taskTextId);
                // console.log(this.clickedElement);
                this.changeStatusOfTask(clickedElement, elId);
                this.deleteTaskFromList(clickedElement, this.todayDate, trashIdNum);
                this.taskListEditTaskEvent(clickedElement, taskTextId);
                // console.log(this.mainDataArr);
                
            })
        }
        
    }

    //change status of task
    changeStatusOfTask(clickedTaskEl, clickedElId) {
        // console.log(this.mainDataArr);
        if(clickedTaskEl.classList.contains("status")) {
            clickedTaskEl.classList.toggle("checked");
            clickedTaskEl.parentNode.classList.toggle('done');
            if (clickedTaskEl.classList.contains("checked")) {
                const elCheckedState = true;
                this.dataChangeStatusOfTask(clickedElId, elCheckedState);
                console.log('task status true');
                // super.setToLocalStorage();
                                
            }
            else {
                const elCheckedState = false;
                this.dataChangeStatusOfTask(clickedElId, elCheckedState);
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

    //-----------Edit task text methods----------------
    //handling click on task text
    taskListEditTaskEvent(clickedTaskEl, clickedTaskTextId) {
        if(clickedTaskEl.classList.contains("task-text-content") && !this.editTaskInput) {
            this.trashBtnElements = document.querySelectorAll(".trash");
            // console.log(trashBtnElements);
            this.trashBtnElements.forEach(el => {
                if(el.nextElementSibling) {
                    el.nextElementSibling.remove();
                    el.style.display = 'block';
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
                }
            })
                       
        }

        if (this.editBtn) {
        this.trashBtnElements = document.querySelectorAll(".trash");
            this.trashBtnElements.forEach(el => {
                if(el.nextElementSibling) {
                    el.nextElementSibling.remove();
                    el.style.display = 'block';
                }
            })
        }
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
        const taskInputBlock = document.querySelector(".task-input-block");
        const editTaskInput = document.getElementById("task-edit-field");
        const confirmEditBtn = document.querySelector(".confirm-edit-task");
        const taskTextId = clickedTaskEl.id;
        const taskId = Number(clickedTaskEl.id.substr(4));
        const taskTextEl = document.getElementById(taskTextId);
        taskTextEl.innerText = editTaskInput.value;
        this.dataChangeTextofTask(editTaskInput.value, taskId);
        editTaskInput.remove();
        confirmEditBtn.remove();
        const trashBtn = document.getElementById(`t${taskId}`);
        trashBtn.style.display = 'block';
        taskInputBlock.style.bottom = '0px';
        // console.log(taskId);
    }

    //-----------Delete task methods----------------
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
        const mainDataArr = super.getFromLocalStorage();
        let todayEl = mainDataArr.find(el => el.date === this.todayDate);
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

    deleteTaskFromDataArr(taskId, taskDate) {
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

    dataChangeTextofTask(newTaskText, taskId) {
        const mainDataArr = super.getFromLocalStorage();
        let todayEl = mainDataArr.find(el => el.date === this.todayDate);
        const todayElTasks = todayEl.tasks;
        todayElTasks.forEach(el => {
            if(el.tId === taskId) {
                el.text = newTaskText;
            }
        })
        super.setToLocalStorage(mainDataArr);

    }
}