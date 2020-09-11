export {StartContent};

class StartContent {
    constructor(todayDate) {
        this.mainDataArr = this.getFromLocalStorage();
        this.todayDate = todayDate;
        this.appContentBlock = document.querySelector(".app-content");
        this.appTaskList = document.querySelector(".task-list");

        this.taskInputParentEl = document.querySelector(".app-container");
        this.inputBlockHTML = `<div class="task-input-block">
                                    <input class="task-text" type="text" placeholder="введите текст задания">
                                    <button class="add-task-btn"></button>
                                    <button class="edit-task-btn"></button>
                                </div>`;
        
    }

    
    //render add task btn or today task list
    renderStartContent() {
        this.todayTasksArr = this.getTodayTaskArr();
        if(!this.todayTasksArr) {
            let newTaskBtn = `<div class="new-task-btn"> 
                                    <img src="res/img/plus-circle.svg" alt="">
                                    <p>Нажмите, чтобы создать список</p>
                              </div>`;
            this.appContentBlock.insertAdjacentHTML('afterbegin', newTaskBtn);
            this.appContentBlock.style.justifyContent = "center";
            this.addTaskTodayBtn = document.querySelector(".new-task-btn");
            this.addTaskTodayBtn.addEventListener("click", () =>{
                this.renderTaskInputBlock();
                this.createTodayDateObj();
                this.hideStartBlock();
                this.setToLocalStorage();
            });
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
        this.todayTaskArr = this.getTodayTaskArr();
        this.todayTaskArr.forEach(element  => {
            let taskDoneItem = `<li class = "done"><span id = "${element.tId}" class="status checked"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span></span><span id="t${element.tId}" class="trash"></span></li>`;
            if(element.status === true) {
                this.appTaskList.insertAdjacentHTML('beforeend', taskDoneItem);
            }
            else {
                let taskItem = `<li><span  id = "${element.tId}" class="status"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span><span id="t${element.tId}" class="trash"></span></li>`;
                this.appTaskList.insertAdjacentHTML('beforeend', taskItem);
            }
        
        });
    }

    //hide add task btn block
    hideStartBlock() {
        this.addTaskTodayBtn = document.querySelector(".new-task-btn");
        this.addTaskTodayBtn.classList.add("hide-el");
    }

    //render task input block
    renderTaskInputBlock() {
        this.inputBlock = document.querySelector(".task-input-block");
        if(!this.inputBlock) {
            this.taskInputParentEl.insertAdjacentHTML('beforeend', this.inputBlockHTML);
            this.addTaskBtn = document.querySelector(".add-task-btn");
            this.inputBlock = document.querySelector(".task-input-block");
            console.log('show input block');
            this.showInput = () =>{this.inputBlock.style.bottom = 0};
            setTimeout(this.showInput, 1000);
            this.addTaskBtn.addEventListener("click", () => {
                this.addNewTodayTask();
            });
            
        }
        
    }

    addNewTodayTask() {
        this.inputTaskText = document.querySelector(".task-text");
        console.log('add new task btn clicked');
        if(this.inputTaskText.value) {
            this.renderNewTaskItem();
            let curTodayTask = this.updateTodayTasksArr();
            this.inputTaskText.value = "";
            this.addTodayTaskToMainArr(curTodayTask);
            this.setToLocalStorage();
            // console.log(curTodayTask);
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
        const elCount = this.appTaskList.childElementCount;
        let taskItem = `<li><span id = "${elCount}" class="status"></span>
                            <span id="text${elCount}" class="task-text-content">${this.inputTaskText.value}</span>
                            <span id="t${elCount}" class="trash"></span></li>`;
        this.appContentBlock.style.alignItems = "flex-start";
        this.appContentBlock.style.justifyContent = "flex-start";
        this.appTaskList.insertAdjacentHTML('beforeend', taskItem);
        console.log('task item rendered');
    }

    //DATA METHODS
    //get today task array from main data array
    getTodayTaskArr() {
        this.mainDataArr = this.getFromLocalStorage();
        this.todayTasks = null;
        this.mainDataArr.forEach(element => {
            if(element.date == this.todayDate) {
                this.todayTasks = element.tasks;
            }
            
        })
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
        console.log(this.todayTaskArr);
        return this.todayTaskArr;
    }

    createTodayDateObj() {
        this.todayObj = {};
        this.todayObj.id = this.mainDataArr.length;
        this.todayObj.date = this.todayDate;
        this.todayObj.tasks = [];
        this.todayObj.allDone = false;
        this.mainDataArr.push(this.todayObj);
        this.saveDataMethod;
        console.log('today date obj created in main arr');
        return this.mainDataArr;
        
    }

    addTodayTaskToMainArr(todayTasks) {
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
        this.setToLocalStorage;
        return this.mainDataArr;
    }

    // addTodayTaskToMainArr() {
    //     this.dateTaskObj = {};
    //     this.arrItem = null;
    //     if(this.arrItem = this.mainDataArr.find(item => item.date == this.todayDate)) {
    //         this.arrItem.tasks = this.getTodayTaskArr(); 
    //         console.log('updated');
    //     }
    //     else {
    //         this.dateTaskObj['id'] = this.mainDataArr.length;
    //         this.dateTaskObj['date'] = this.todayDate;
    //         this.dateTaskObj['tasks'] = this.getTodayTaskArr();
    //         this.dateTaskObj['allDone'] = false;
    //         this.mainDataArr.push(this.dateTaskObj);
    //         console.log("added");
    //     }
    //     console.log(this.mainDataArr);
    //     this.saveDataMethod;
    //     return this.mainDataArr;
    // }

    //LOCAL STORAGE
    setToLocalStorage() {
        localStorage.setItem("MYTODO", JSON.stringify(this.mainDataArr));
        console.log('saved to LS');
    }

    getFromLocalStorage() {
        this.data = localStorage.getItem("MYTODO");
        this.mainDataArr = [];
        if(this.data) {
            this.mainDataArr = JSON.parse(this.data);
            return this.mainDataArr;
        }
        else {
            return [];
        }
    }
}