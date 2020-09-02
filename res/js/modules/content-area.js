export {ContentArea};

class ContentArea {
    constructor(appContentBlock, todayDate, todayTasks) {
        this.appContentBlock = appContentBlock;
        this.todayDate = todayDate;
        this.todayTasks = todayTasks;
    }
    //show start content (task list for today or create add task btn and add it's function)
    showStartContent() {
        // console.log(todayTasks);
        if(!this.todayTasks) {
            let newTaskBtn = `<div class="new-task-btn"> 
                                    <img src="res/img/plus-circle.svg" alt="">
                                    <p>Нажмите, чтобы создать список</p>
                              </div>`;
            this.appContentBlock.insertAdjacentHTML('afterbegin', newTaskBtn);
            this.appContentBlock.style.justifyContent = "center";
            const addTaskTodayBtn = document.querySelector(".new-task-btn");
            // addTaskTodayBtn.addEventListener("click", showTodayTaskInput);
        }
        else {
            // let tasksList = selectTaskArr(todayTasks);
            // renderTaskListFromArr(todayTasks);
            // showNewTaskInput();
            console.log("else");
        }
    }
}