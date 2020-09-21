export {TaskListContent};

class TaskListContent {
    constructor(todayDate) {
        this.todayDate = todayDate;
        this.taskInputParentEl = document.querySelector(".app-container");
        this.inputBlock = document.querySelector(".task-input-block");
        this.appContentBlock = document.querySelector(".app-content");
        this.appTaskList = document.querySelector(".task-list");
    }

    
    //render add task btn or today task list
    renderStartContent() {
        // console.log(this);
        this.todayTasksArr = this.getTodayTaskArr();
        if(!this.todayTasksArr) {
            this.newTaskBtn = `<div class="new-task-btn"> 
                                    <img src="res/img/plus-circle.svg" alt="">
                                    <p>Нажмите, чтобы создать список</p>
                              </div>`;
            this.appContentBlock.insertAdjacentHTML('afterbegin', this.newTaskBtn);
            this.appContentBlock.style.justifyContent = "center";
            console.log('render add task btn');
            // console.log(this.todayTaskArr);
        }
        else {
            this.renderTaskListFromArr();
            this.renderTaskInputBlock()
            console.log('render exist task list');

        }
    }

    //render today task list
    renderTaskListFromArr() {
        this.appTaskList = document.querySelector(".task-list");
        // const dateSelectBlock = document.querySelector(".date-select");
        if(!this.appTaskList) {
            this.taskListCont = document.createElement('ul');
            this.taskListCont.setAttribute("class", "task-list");
            this.appContentBlock.appendChild(this.taskListCont);
            this.appTaskList = document.querySelector(".task-list");
            console.log('create ul');
        }
        // if(dateSelectBlock) {
        //     dateSelectBlock.remove();
        // }
        this.todayTaskArr = this.getTodayTaskArr();
        this.todayTaskArr.forEach(element  => {
            const taskDoneItem = `<li class = "done"><span id = "${element.tId}" class="status checked"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span></span><span id="t${element.tId}" class="trash"></span></li>`;
            if(element.status === true) {
                this.appTaskList.insertAdjacentHTML('beforeend', taskDoneItem);
            }
            else {
                const taskItem = `<li><span  id = "${element.tId}" class="status"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span><span id="t${element.tId}" class="trash"></span></li>`;
                this.appTaskList.insertAdjacentHTML('beforeend', taskItem);
            }
        
        });
        console.log("render list");
    }

    //hide add task btn block
    hideStartBlock() {
        this.addTaskTodayBtn = document.querySelector(".new-task-btn");
        this.addTaskTodayBtn.classList.add("hide-el");
    }

    //render task input block
    renderTaskInputBlock() {
        if(!this.inputBlock) {
            this.inputBlockHTML = `<div class="task-input-block">
                                    <input class="task-text" type="text" placeholder="введите текст задания">
                                    <button class="add-task-btn"></button>
                                    <button class="edit-task-btn"></button>
                                </div>`;
            this.taskInputParentEl.insertAdjacentHTML('beforeend', this.inputBlockHTML);
            const inputBlock = document.querySelector(".task-input-block");
            console.log('show input block');
            const showInputBlock = () =>{inputBlock.style.bottom = 0};
            setTimeout(showInputBlock, 500);
            
        }
        
    }

    addNewTodayTask() {
        this.inputTaskText = document.querySelector(".task-text");
        console.log('add new task btn clicked');
        if(this.inputTaskText.value) {
            // console.log(this);
            this.renderNewTaskItem();
            this.curTodayTask = this.updateTodayTasksArr();
            this.inputTaskText.value = "";
            this.addTodayTaskToMainArr(this.curTodayTask);
        }
        else {
            this.inputTaskText.style.animation = "pulse  .5s ease-in-out";
                setTimeout(()=> {
                    this.inputTaskText.style.animation = "";
                }, 600)
            console.log('empty input');
        }
    }

    //render task to DOM
    renderNewTaskItem() {
        this.inputTaskText = document.querySelector(".task-text");
        this.elCount = this.appTaskList.childElementCount;
        this.taskItem = `<li><span id = "${this.elCount}" class="status"></span>
                            <span id="text${this.elCount}" class="task-text-content">${this.inputTaskText.value}</span>
                            <span id="t${this.elCount}" class="trash"></span></li>`;
        this.appContentBlock.style.alignItems = "flex-start";
        this.appContentBlock.style.justifyContent = "flex-start";
        this.appTaskList.insertAdjacentHTML('beforeend', this.taskItem);
        console.log('task item rendered');
    }

    //DATA METHODS
    //get today task array from main data array
    getTodayTaskArr() {
        this.mainDataArr = this.getFromLocalStorage();
        console.log(this);
        this.todayTasks = null;
        this.mainDataArr.forEach(element => {
            if(element.date == this.todayDate) {
                this.todayTasks = element.tasks;
            }
            
        })
        
        // console.log(this.todayTasks);
        return this.todayTasks;
    }

    updateTodayTasksArr() {
        this.inputTaskText = document.querySelector(".task-text");
        this.todayTaskArr = this.getTodayTaskArr();
        this.taskObj = {};
        this.taskObj.tId = this.todayTaskArr.length;
        this.taskObj.text = this.inputTaskText.value;
        this.taskObj.status = false;
        this.taskObj.trash = false;
        this.todayTaskArr.push(this.taskObj);
        console.log('today task array updated');
        // console.log(this.todayTaskArr);
        return this.todayTaskArr;
    }

    createTodayDateObj() {
        this.mainDataArr = this.getFromLocalStorage();
        // console.log(this.mainDataArr);
        this.todayObj = {};
        this.todayObj.id = this.mainDataArr.length;
        this.todayObj.date = this.todayDate;
        this.todayObj.tasks = [];
        this.todayObj.allDone = false;
        this.mainDataArr.push(this.todayObj);
        console.log('today date obj created in main arr');
        this.setToLocalStorage(this.mainDataArr);
        return this.mainDataArr;
        
    }

    addTodayTaskToMainArr(todayTasks) {
        this.mainDataArr = this.getFromLocalStorage();
        this.dateTaskObj = {};
        this.arrItem = null;
        if(this.arrItem = this.mainDataArr.find(item => item.date == this.todayDate)) {
            this.arrItem.tasks = todayTasks; 
            console.log('main array updated');
        }
        else {
            this.dateTaskObj.id = this.mainDataArr.length;
            this.dateTaskObj.date = this.todayDate;
            this.dateTaskObj.tasks = todayTasks;
            this.dateTaskObj.allDone = false;
            this.mainDataArr.push(this.dateTaskObj);
            console.log("new task added to main array");
        }
        console.log(this.mainDataArr);
        this.setToLocalStorage(this.mainDataArr);
        return this.mainDataArr;
    }

    //LOCAL STORAGE
    setToLocalStorage(mainDataArr) {
        localStorage.setItem("MYTODO", JSON.stringify(mainDataArr));
        console.log('saved to LS');
    }

    getFromLocalStorage() {
        const data = localStorage.getItem("MYTODO");
        let mainDataArr = [];
        if(data) {
            mainDataArr = JSON.parse(data);
            return mainDataArr;
        }
        else {
            return [];
        }
    }

    clearLocalStorage() {
        localStorage.clear();
        document.location.reload();
    }
}