export {ContentArea};

class ContentArea {
    constructor(todayDate, todayTasksArr, createTodayDateDataMethod, addTodayTaskToMainArrMethod) {
        
        this.todayDate = todayDate;
        this.todayTasksArr = todayTasksArr;
        this.createTodayDateDataMethod = createTodayDateDataMethod;
        this.addTodayTaskToMainArrMethod = addTodayTaskToMainArrMethod;
        this.appContentBlock = document.querySelector(".app-content");
        this.appTaskList = document.querySelector(".task-list");
        this.newTasksBtnBlock = document.querySelector(".new-task-btn");;
    }
    //show start content (task list for today or create add task btn and add it's function)
    showStartContent() {
        // console.log(todayTasks);
        if(!this.todayTasksArr) {
            let newTaskBtn = `<div class="new-task-btn"> 
                                    <img src="res/img/plus-circle.svg" alt="">
                                    <p>Нажмите, чтобы создать список</p>
                              </div>`;
            this.appContentBlock.insertAdjacentHTML('afterbegin', newTaskBtn);
            this.appContentBlock.style.justifyContent = "center";
            const addTaskTodayBtn = document.querySelector(".new-task-btn");
            addTaskTodayBtn.addEventListener("click", this.showTodayTaskInput);
        }
        else {
            this.renderTaskListFromArr();
        }
    }

    //render task list
    renderTaskListFromArr() {
        this.todayTasksArr.forEach(element  => {
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
        this.createTodayDateDataMethod;
        this.taskInputBlock = document.querySelector(".task-input-block");
        this.addTaskBtn = document.querySelector(".add-task-btn");
        this.style.display = "none";
        function showInput() {
            this.taskInputBlock.style.bottom = 0;
        }
        setTimeout(showInput.bind(this), 1000);
        this.addTaskBtn.addEventListener("click", addNewTodayTask);
    }

    addNewTodayTask() {
        const todayDate = appDate.todayShortDate();
        let todayTasks = appData.getTodayTaskArr(todayDate);
        console.log(todayTasks);
        const inputTaskText = document.querySelector(".task-text");
        if(inputTaskText.value) {
            addNewTaskItemToDOM();
            let curTodayTask = createTodayTasksArr(todayTasks);
            inputTaskText.value = "";
            addTodayTaskToMainArr(curTodayTask, mainDataArr);
            // console.log(curTodayTask);
        }
        else {
            animateEl.accentElement(inputTaskText);
                    
        }
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