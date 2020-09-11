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
            this.taskTextId = Number(event.target.id.substr(4));
            // console.log(this.taskTextId);
            // console.log(this.clickedElement);
            this.changeStatusOfTask(this.clickedElement, this.elId);
            this.deleteTaskFromList(this.clickedElement, this.todayDate, this.trashIdNum);
            this.taskListEditTaskEvent(this.clickedElement, this.taskTextId);
            // console.log(this.mainDataArr);
            
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

    //-----------Edit task text methods----------------
    taskListEditTaskEvent(clickedTaskEl, clickedTaskTextId) {
        const editTaskInput = document.getElementById("task-edit-field");
        const editBtn = document.querySelector(".edit-task");
        if(clickedTaskEl.classList.contains("task-text-content") && !editTaskInput) {
            this.trashBtnElements = document.querySelectorAll(".trash");
            console.log(this.trashBtnElements);
            this.trashBtnElements.forEach(el => {
                if(el.nextElementSibling) {
                    el.nextElementSibling.remove();
                    el.style.display = 'block';
                }
                
                if(el.id === `t${clickedTaskTextId}`) {
                    this.editTaskBtnHTML = `<span class = "edit-task"></span>`;
                    clickedTaskEl.parentNode.insertAdjacentHTML('beforeend', this.editTaskBtnHTML);
                    el.style.display = 'none';
                    this.editBtn = document.querySelector(".edit-task");
                    this.editBtn.addEventListener("click", () => {this.showEditInput(clickedTaskEl)});
                }
            })
                       
        }

        if (editBtn) {
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
        this.editInput = document.getElementById("task-edit-field");
        if(this.editInput) {
            this.editInput.remove();
        }
        this.taskTextContent = clickedTaskEl.innerText;
        clickedTaskEl.innerHTML = `<input id = "task-edit-field" type = "text" value = "${this.taskTextContent}">`;
        this.trashBtnElements = document.querySelectorAll(".trash");
            this.trashBtnElements.forEach(el => {
                if(el.nextElementSibling) {
                    el.nextElementSibling.remove();
                    this.confirmEditBtnHTML = `<span class = "confirm-edit-task"></span>`;
                    clickedTaskEl.parentNode.insertAdjacentHTML('beforeend', this.confirmEditBtnHTML);
                    this.confirmEditBtn = document.querySelector(".confirm-edit-task");
                    this.confirmEditBtn.addEventListener("click", () => {this.confirmEditTask(clickedTaskEl)});
                }
            })
    }

    confirmEditTask(clickedTaskEl) {
        this.editTaskInput = document.getElementById("task-edit-field");
        this.confirmEditBtn = document.querySelector(".confirm-edit-task");
        this.taskTextId = clickedTaskEl.id;
        this.taskId = Number(clickedTaskEl.id.substr(4));
        this.taskTextEl = document.getElementById(this.taskTextId);
        this.taskTextEl.innerText = this.editTaskInput.value;
        this.dataChangeTextofTask(this.editTaskInput.value, this.taskId);
        this.editTaskInput.remove();
        this.confirmEditBtn.remove();
        this.trashBtn = document.getElementById(`t${this.taskId}`);
        this.trashBtn.style.display = 'block';
        
        console.log(this.taskId);
    }

    hideEditTaskBtn(clickedElement) {
        if(!clickedElement.classList.contains("task-text-content")) {
            this.trashBtnElements = document.querySelectorAll(".trash");
            this.trashBtnElements.forEach(el => {
                if(el.nextElementSibling) {
                    el.nextElementSibling.remove();
                    el.style.display = 'block';
                }
            })
        }
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

    dataChangeTextofTask(newTaskText, taskId) {
        this.mainDataArr = super.getFromLocalStorage();
        
        let todayEl = this.mainDataArr.find(el => el.date === this.todayDate);
        this.todayElTasks = todayEl.tasks;
        this.todayElTasks.forEach(el => {
            if(el.tId === taskId) {
                el.text = newTaskText;
            }
        })
        super.setToLocalStorage();

    }
}