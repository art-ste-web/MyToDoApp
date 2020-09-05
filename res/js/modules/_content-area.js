export {ContentArea};

class ContentArea {
    constructor(todayDate, method_todayTasksArr, method_createTodayDateData, method_addTodayTaskToMainArr, method_updateTodayTasksArr, method_pulseTextInput) {
        
        this.todayDate = todayDate;
        this.method_todayTasksArr = method_todayTasksArr;
        this.method_createTodayDateData = method_createTodayDateData;
        this.method_addTodayTaskToMainArr = method_addTodayTaskToMainArr;
        this.method_updateTodayTasksArr = method_updateTodayTasksArr;
        this.method_addTodayTaskToMainArr = method_addTodayTaskToMainArr;
        this.method_pulseTextInput = method_pulseTextInput;
        this.appContentBlock = document.querySelector(".app-content");
        this.appTaskList = document.querySelector(".task-list");
        this.inputTaskText = document.querySelector(".task-text");
        this.newTasksBtnBlock = document.querySelector(".new-task-btn");
        this.addTodayTask = this.addNewTodayTask.bind(this);
    }
    //show start content (task list for today or create add task btn and add it's function)
    

    //render task list
    renderTaskListFromArr() {
            this.method_todayTasksArr.forEach(element  => {
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

    showTodayTaskInput() {
        this.method_createTodayDateData;
        this.taskInputBlock = document.querySelector(".task-input-block");
        this.addTaskBtn = document.querySelector(".add-task-btn");
        this.style.display = "none";
        function showInput() {
            this.taskInputBlock.style.bottom = 0;
        }
        setTimeout(showInput.bind(this), 100);
        this.addTaskBtn.addEventListener("click", () => {
            this.addTodayTask;
            console.log(this.addTodayTask);
        });
    }

    addNewTodayTask() {
        // this.method_todayTasksArr;
        console.log('hi');
        if(this.inputTaskText.value) {
            this.renderNewTaskItem();
            let curTodayTask = this.method_updateTodayTasksArr;
            this.inputTaskText.value = "";
            this.method_addTodayTaskToMainArr;
            // console.log(curTodayTask);
        }
        else {
            this.method_pulseTextInput;
            console.log('hihi');
        }
    }

    //render task to DOM
    renderNewTaskItem() {
        const elCount = this.appTaskList.childElementCount;
        let taskItem = `<li><span id = "${elCount}" class="status"></span>
                            <span id="text${elCount}" class="task-text-content">${this.inputTaskText.value}</span>
                            <span id="t${elCount}" class="trash"></span></li>`;
        this.appContentBlock.style.alignItems = "flex-start";
        this.appContentBlock.style.justifyContent = "flex-start";
        this.appTaskList.insertAdjacentHTML('beforeend', taskItem);
        
    }


    //show task input
    showNewTaskInput() {
            function showInput() {
                    this.taskInputBlock.style.bottom = 0;
            }
            setTimeout(showInput.bind(this), 1000);
        addTaskBtn.addEventListener("click", addNewTodayTask);
    }
}