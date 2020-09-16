export {StartContent};

class StartContent {
    constructor(todayDate) {
        this.todayDate = todayDate;
    }

    
    //render add task btn or today task list
    renderStartContent() {
        console.log(this);
        const appContentBlock = document.querySelector(".app-content");
        const todayTasksArr = this.getTodayTaskArr();
        if(!todayTasksArr) {
            const newTaskBtn = `<div class="new-task-btn"> 
                                    <img src="res/img/plus-circle.svg" alt="">
                                    <p>Нажмите, чтобы создать список</p>
                              </div>`;
            appContentBlock.insertAdjacentHTML('afterbegin', newTaskBtn);
            appContentBlock.style.justifyContent = "center";
            const addTaskTodayBtn = document.querySelector(".new-task-btn");
            addTaskTodayBtn.addEventListener("click", () =>{
                this.renderTaskInputBlock();
                this.createTodayDateObj();
                this.hideStartBlock();
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
        let appTaskList = document.querySelector(".task-list");
        const dateSelectBlock = document.querySelector(".date-select");
        const appContentBlock = document.querySelector(".app-content");
        if(!appTaskList) {
            const taskListCont = document.createElement('ul');
            taskListCont.setAttribute("class", "task-list");
            appContentBlock.appendChild(taskListCont);
            appTaskList = document.querySelector(".task-list");
            console.log('create ul');
            
        }
        if(dateSelectBlock) {
            dateSelectBlock.remove();
        }
        const todayTaskArr = this.getTodayTaskArr();
        todayTaskArr.forEach(element  => {
            const taskDoneItem = `<li class = "done"><span id = "${element.tId}" class="status checked"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span></span><span id="t${element.tId}" class="trash"></span></li>`;
            if(element.status === true) {
                appTaskList.insertAdjacentHTML('beforeend', taskDoneItem);
            }
            else {
                const taskItem = `<li><span  id = "${element.tId}" class="status"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span><span id="t${element.tId}" class="trash"></span></li>`;
                appTaskList.insertAdjacentHTML('beforeend', taskItem);
            }
        
        });
        
    }

    //hide add task btn block
    hideStartBlock() {
        const addTaskTodayBtn = document.querySelector(".new-task-btn");
        addTaskTodayBtn.classList.add("hide-el");
    }

    //render task input block
    renderTaskInputBlock() {
        const taskInputParentEl = document.querySelector(".app-container");
        const inputBlock = document.querySelector(".task-input-block");
        const inputBlockHTML = `<div class="task-input-block">
                                    <input class="task-text" type="text" placeholder="введите текст задания">
                                    <button class="add-task-btn"></button>
                                    <button class="edit-task-btn"></button>
                                </div>`;
        if(!inputBlock) {
            taskInputParentEl.insertAdjacentHTML('beforeend', inputBlockHTML);
            const addTaskBtn = document.querySelector(".add-task-btn");
            const inputBlock = document.querySelector(".task-input-block");
            console.log('show input block');
            const showInput = () =>{inputBlock.style.bottom = 0};
            setTimeout(showInput, 500);
            addTaskBtn.addEventListener("click", () => {
                this.addNewTodayTask();
            });
            
        }
        
    }

    addNewTodayTask() {
        const inputTaskText = document.querySelector(".task-text");
        console.log('add new task btn clicked');
        if(inputTaskText.value) {
            this.renderNewTaskItem();
            const curTodayTask = this.updateTodayTasksArr();
            inputTaskText.value = "";
            this.addTodayTaskToMainArr(curTodayTask);
            // this.setToLocalStorage();
            // console.log(curTodayTask);
        }
        else {
            inputTaskText.style.animation = "pulse  .5s ease-in-out";
                setTimeout(()=> {
                    inputTaskText.style.animation = "";
                }, 600)
            console.log('empty input');
        }
    }

    //render task to DOM
    renderNewTaskItem() {
        const appContentBlock = document.querySelector(".app-content");
        const appTaskList = document.querySelector(".task-list");
        const inputTaskText = document.querySelector(".task-text");
        const elCount = appTaskList.childElementCount;
        const taskItem = `<li><span id = "${elCount}" class="status"></span>
                            <span id="text${elCount}" class="task-text-content">${inputTaskText.value}</span>
                            <span id="t${elCount}" class="trash"></span></li>`;
        appContentBlock.style.alignItems = "flex-start";
        appContentBlock.style.justifyContent = "flex-start";
        appTaskList.insertAdjacentHTML('beforeend', taskItem);
        console.log('task item rendered');
    }

    //DATA METHODS
    //get today task array from main data array
    getTodayTaskArr() {
        const mainDataArr = this.getFromLocalStorage();
        console.log(this);
        let todayTasks = null;
        mainDataArr.forEach(element => {
            if(element.date == this.todayDate) {
                todayTasks = element.tasks;
            }
            
        })
        
        console.log(todayTasks);
        return todayTasks;
    }

    updateTodayTasksArr() {
        const inputTaskText = document.querySelector(".task-text");
        const todayTaskArr = this.getTodayTaskArr();
        let taskObj = {};
        taskObj.tId = todayTaskArr.length;
        taskObj.text = inputTaskText.value;
        taskObj.status = false;
        taskObj.trash = false;
        todayTaskArr.push(taskObj);
        console.log('today task array updated');
        console.log(todayTaskArr);
        return todayTaskArr;
    }

    createTodayDateObj() {
        const mainDataArr = this.getFromLocalStorage();
        console.log(mainDataArr);
        let todayObj = {};
        todayObj.id = mainDataArr.length;
        todayObj.date = this.todayDate;
        todayObj.tasks = [];
        todayObj.allDone = false;
        mainDataArr.push(todayObj);
        console.log('today date obj created in main arr');
        this.setToLocalStorage(mainDataArr);
        return mainDataArr;
        
    }

    addTodayTaskToMainArr(todayTasks) {
        const mainDataArr = this.getFromLocalStorage();
        let dateTaskObj = {};
        let arrItem = null;
        if(arrItem = mainDataArr.find(item => item.date == this.todayDate)) {
            arrItem.tasks = todayTasks; 
            console.log('main array updated');
        }
        else {
            dateTaskObj.id = mainDataArr.length;
            dateTaskObj.date = this.todayDate;
            dateTaskObj.tasks = todayTasks;
            dateTaskObj.allDone = false;
            mainDataArr.push(this.dateTaskObj);
            console.log("new task added to main array");
        }
        console.log(mainDataArr);
        this.setToLocalStorage(mainDataArr);
        return mainDataArr;
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