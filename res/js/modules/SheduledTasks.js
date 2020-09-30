import {TaskListContent} from './TaskListContent.js';

export {SheduledTasks};

class SheduledTasks extends TaskListContent {
    constructor(todayDate) {
        super();
        this.todayDate = todayDate;
    }

    
    renderSelectSheduledDateBlock() {
        this.appContentBlock = document.querySelector(".app-content");
        this.taskInputBlock = document.querySelector(".task-input-block");
        this.sheduledDateTaskInput = document.querySelector(".sheduled-task-input-block");
        const todayDateConvTo_YY_MM_DD = this.todayDate.split(".").reverse();
        const todayDate_YY_MM_DD = `${todayDateConvTo_YY_MM_DD[0]}-${todayDateConvTo_YY_MM_DD[1]}-${todayDateConvTo_YY_MM_DD[2]}`;
        const sheduleTaskBlockHTML = `<div class="date-select">
                                        <p>Выберите дату</p>
                                        <div class="date-input">
                                            <input type="date" name="task-date" id="task-date" min="${todayDate_YY_MM_DD}" value="">
                                            <button class="date-select-btn"></button>
                                        </div>
                                        <button class = "today-tasks-btn">Задания на сегодня <span class="today-tasks-btn-icon"></span></button>
                                    </div>`;
        console.log(this);
        if(this.taskInputBlock) {
            this.taskInputBlock.style.bottom = '-180px';
        }
        if(this.sheduledDateTaskInput) {
            this.sheduledDateTaskInput.style.bottom = '-180px';
            setTimeout(this.removeSheduledDateTaskInput, 1500);
            
        }
        this.appContentBlock.innerHTML = "";
        this.appContentBlock.insertAdjacentHTML('afterbegin', sheduleTaskBlockHTML);
    }

    removeSheduledDateBlock() {
        this.selectTaskDateBlock = document.querySelector(".date-select");
        // this.appContentBlock.innerHTML = "<ul class='task-list'></ul>";
        // this.selectTaskDateBlock.style.cssText = "animation: appear-from-top; animation-duration: .25s; animation-direction: reverse;"
        this.selectTaskDateBlock.style.transition = "all .4s"; 
        this.selectTaskDateBlock.style.top = "800px";
        this.selectTaskDateBlock.style.opacity = "0";
        setTimeout(()=>{this.selectTaskDateBlock.remove()}, 1200);
    }

    checkInputSelectedDate() {
        this.dateInput = document.getElementById("task-date");
        if(this.dateInput.value !== "") {
            const plannedTaskDate = this.dateInput.value;
            const convPlanDate = plannedTaskDate.split("-").reverse();
            const plannedTaskDate_DD_MM_YY = `${convPlanDate[0]}.${convPlanDate[1]}.${convPlanDate[2]}`;
            console.log(plannedTaskDate_DD_MM_YY);
            
            //create object in main data array with sheduled date
            this.createSheduledDateObj(plannedTaskDate_DD_MM_YY);
            this.removeSheduledDateBlock();
            this.removeTaskInputBlock();
            return true;
        }
        else {
            this.dateInput.style.animation = "pulse  .5s ease-in-out";
                setTimeout(()=> {
                    this.dateInput.style.animation = "";
                }, 600)
            console.log('empty date input');
        }
    }

    createSheduledDateObj(plannedTaskDate_DD_MM_YY) {
        this.mainDataArr = this.getFromLocalStorage();
        console.log(this.mainDataArr);
        if(this.mainDataArr.length>0) {
            for(let i=0; i<this.mainDataArr.length; i++){
                console.log(this.mainDataArr[i]);
                if(this.mainDataArr[i].date === plannedTaskDate_DD_MM_YY) {
                    console.log('date allready exist');
                    this.renderSheduledDateTaskList(plannedTaskDate_DD_MM_YY);
                    this.removeTaskInputBlock();
                    // this.removeSheduledDateBlock();
                    this.renderSheduledDateTaskInput();
                    return;
                }
            }
            this.todayObj = {};
            this.todayObj.id = this.mainDataArr.length;
            this.todayObj.date = plannedTaskDate_DD_MM_YY;
            this.todayObj.tasks = [];
            this.todayObj.allDone = false;
            this.mainDataArr.push(this.todayObj);
            console.log('sheduled date obj created in main arr');
            this.setToLocalStorage(this.mainDataArr);
            this.renderSheduledDateTaskList(plannedTaskDate_DD_MM_YY);
            this.renderSheduledDateTaskInput();
            // return this.mainDataArr;
        }
        else {
            this.todayObj = {};
            this.todayObj.id = this.mainDataArr.length;
            this.todayObj.date = plannedTaskDate_DD_MM_YY;
            this.todayObj.tasks = [];
            this.todayObj.allDone = false;
            this.mainDataArr.push(this.todayObj);
            console.log('sheduled date obj created (main data was empty)');
            this.setToLocalStorage(this.mainDataArr);
            this.renderSheduledDateTaskList(plannedTaskDate_DD_MM_YY);
            this.renderSheduledDateTaskInput();
            return this.mainDataArr;
        }
    }

    renderSheduledDateTaskList(selectedDate) {
        this.appContentBlock = document.querySelector(".app-content");
        this.sheduledTaskList = document.querySelector(".sheduled-task-list");
        // const dateSelectBlock = document.querySelector(".date-select");
        if(!this.sheduledTaskList) {
            this.taskListCont = document.createElement('ul');
            this.taskListCont.setAttribute("class", "sheduled-task-list");
            this.appContentBlock.appendChild(this.taskListCont);
            this.sheduledTaskList = document.querySelector(".sheduled-task-list");
            console.log('create sheduled ul');
        }
        // if(dateSelectBlock) {
        //     dateSelectBlock.remove();
        // }
        const listHeaderHTML = `<h4 class = "date-list-head">Список заданий на <span id="sheduled-date">${selectedDate}</span></h4>`;
        this.sheduledListHeader = document.querySelector(".date-list-head");
        if(!this.sheduledListHeader) {
            this.appContentBlock.insertAdjacentHTML('afterbegin', listHeaderHTML);
        }
        this.appContentBlock.style.justifyContent = "flex-start";
        this.sheduledDateTaskArr = this.getSheduledDateTaskArray(selectedDate);
        if(this.sheduledDateTaskArr.length === 0) {
            const emptyListMessageHTML = `<p class = "list-message">Пока ничего не запланировано</p>`;
            this.sheduledTaskList.insertAdjacentHTML('beforeend', emptyListMessageHTML);
            this.sheduledTaskList.style.paddingTop = '30%';
        }
        this.sheduledDateTaskArr.forEach(element  => {
            const taskDoneItem = `<li class = "done"><span id = "${element.tId}" class="status checked"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span></span><span id="t${element.tId}" class="trash"></span></li>`;
            if(element.status === true) {
                this.sheduledTaskList.insertAdjacentHTML('beforeend', taskDoneItem);
            }
            else {
                const taskItem = `<li><span  id = "${element.tId}" class="status"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span><span id="t${element.tId}" class="trash"></span></li>`;
                this.sheduledTaskList.insertAdjacentHTML('beforeend', taskItem);
            }
        
        });
        console.log("render sheduled tasks list");
    }
    
    renderSheduledDateTaskInput() {
        this.sheduledTasksInputBlock = document.querySelector(".sheduled-task-input-block");
        this.taskInputParentEl = document.querySelector(".app-container");
        if(!this.sheduledTasksInputBlock) {
            this.sheduledTasksInputBlockHTML = `<div class="sheduled-task-input-block">
                                    <input class="sheduled-task-text" type="text" placeholder="введите текст задания">
                                    <button class="add-sheduled-task-btn"></button>
                                </div>`;
            this.taskInputParentEl.insertAdjacentHTML('beforeend', this.sheduledTasksInputBlockHTML);
            const sheduledTasksInputBlock = document.querySelector(".sheduled-task-input-block");
            console.log('show input block');
            const showInputBlock = () =>{sheduledTasksInputBlock.style.bottom = 0};
            setTimeout(showInputBlock, 500);
            
        }
        
    }

    removeSheduledDateTaskInput() {
        this.sheduledDateTaskInput = document.querySelector(".sheduled-task-input-block");
        if(this.sheduledDateTaskInput) {
            this.sheduledDateTaskInput.remove();
        }
    }

    addNewSheduledTask() {
        this.inputSheduledTaskText = document.querySelector(".sheduled-task-text");
        console.log('add new sheduled task btn clicked');
        if(this.inputSheduledTaskText.value) {
            // console.log(this);
            this.renderNewSheduledTaskItem();
            this.sheduledDateTasksArr = this.updateSheduledDateTasksArr();
            this.inputSheduledTaskText.value = "";
            // this.addTodayTaskToMainArr(this.curTodayTask);
            this.addSheduledTasksToMainArr(this.sheduledDateTasksArr);
        }
        else {
            this.inputSheduledTaskText.style.animation = "pulse  .5s ease-in-out";
                setTimeout(()=> {
                    this.inputSheduledTaskText.style.animation = "";
                }, 600)
            console.log('empty sheduled input');
        }
    }

    renderNewSheduledTaskItem() {
        this.appContentBlock = document.querySelector(".app-content");
        this.appTaskList = document.querySelector(".sheduled-task-list");
        this.inputSheduledTaskText = document.querySelector(".sheduled-task-text");
        this.emptyListMessage = document.querySelector(".list-message");
        this.elCount = this.appTaskList.childElementCount;
        this.sheduledTaskItemHTML = `<li><span id = "${this.elCount}" class="status"></span>
                            <span id="text${this.elCount}" class="task-text-content">${this.inputSheduledTaskText.value}</span>
                            <span id="t${this.elCount}" class="trash"></span></li>`;
        this.appContentBlock.style.alignItems = "flex-start";
        this.appContentBlock.style.justifyContent = "flex-start";
        if(this.emptyListMessage){
            this.emptyListMessage.remove();
        }
        this.appTaskList.style.paddingTop = "";
        this.appTaskList.insertAdjacentHTML('beforeend', this.sheduledTaskItemHTML);
        console.log('sheduled task item rendered');
    }

    //DATA
    getSheduledDateTaskArray(selectedDate) {
        this.mainDataArr = this.getFromLocalStorage();
        // console.log(this);
        this.selectedDateTasks = null;
        this.mainDataArr.forEach(element => {
            if(element.date == selectedDate) {
                this.selectedDateTasks = element.tasks;
            }
            
        })
        
        // console.log(this.todayTasks);
        return this.selectedDateTasks;
    }

    updateSheduledDateTasksArr() {
        this.inputSheduledTaskText = document.querySelector(".sheduled-task-text");
        this.sheduledDate = document.querySelector("#sheduled-date").innerHTML;
        console.log(this.sheduledDate);
        this.sheduledDateTaskArr = this.getSheduledDateTaskArray(this.sheduledDate);
        this.taskObj = {};
        this.taskObj.tId = this.sheduledDateTaskArr.length;
        this.taskObj.text = this.inputSheduledTaskText.value;
        this.taskObj.status = false;
        this.taskObj.trash = false;
        this.sheduledDateTaskArr.push(this.taskObj);
        console.log('sheduled date task array updated');
        // console.log(this.todayTaskArr);
        return this.sheduledDateTaskArr;
    }

    addSheduledTasksToMainArr(sheduledTasksArr) {
        this.sheduledDate = document.querySelector("#sheduled-date").innerHTML;
        this.mainDataArr = this.getFromLocalStorage();
        this.dateTaskObj = {};
        this.arrItem = null;
        if(this.arrItem = this.mainDataArr.find(item => item.date == this.sheduledDate)) {
            this.arrItem.tasks = sheduledTasksArr; 
            console.log('main array updated');
        }
        else {
            this.dateTaskObj.id = this.mainDataArr.length;
            this.dateTaskObj.date = this.sheduledDate;
            this.dateTaskObj.tasks = sheduledTasksArr;
            this.dateTaskObj.allDone = false;
            this.mainDataArr.push(this.dateTaskObj);
            console.log("new task added to main array");
        }
        console.log(this.mainDataArr);
        this.setToLocalStorage(this.mainDataArr);
        return this.mainDataArr;
    }
}