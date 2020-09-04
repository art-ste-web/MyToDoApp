export {StartContent};

class StartContent {
    constructor(mainDataArr, todayDate) {
        this.mainDataArr = mainDataArr;
        this.todayDate = todayDate;
        this.appContentBlock = document.querySelector(".app-content");
    }

    //get today task array from main data array
    getTodayTaskArr() {
        this.todayTasks = null;
        this.mainDataArr.forEach(element => {
            if(element.date == this.todayDate) {
                this.todayTasks = element.tasks;
            }
            
        })
        return this.todayTasks;
    }

    renderStartContent(addNewTaskBtnFunc) {
        this.todayTasksArr = this.getTodayTaskArr();
        // console.log(todayTasks);
        if(!this.todayTasksArr) {
            let newTaskBtn = `<div class="new-task-btn"> 
                                    <img src="res/img/plus-circle.svg" alt="">
                                    <p>Нажмите, чтобы создать список</p>
                              </div>`;
            this.appContentBlock.insertAdjacentHTML('afterbegin', newTaskBtn);
            this.appContentBlock.style.justifyContent = "center";
            this.addTaskTodayBtn = document.querySelector(".new-task-btn");
            this.addTaskTodayBtn.addEventListener("click", () =>{
                addNewTaskBtnFunc();
                this.hideStartBlock();
            });
        }
        else {
            this.renderTaskListFromArr();
        }
    }

    hideStartBlock() {
        this.addTaskTodayBtn = document.querySelector(".new-task-btn");
        this.addTaskTodayBtn.classList.add("hide-el");
    }
}