import {SheduledTasksOperations} from './SheduledTasksOperations.js';

class DatesListOperations extends SheduledTasksOperations {
    constructor() {
        super();
    }

    getDatesListClickedEl () {
        const datesList = document.querySelector(".sheduled-tasks-list");
        datesList.addEventListener("click", (event)=> {
            console.log(event.target);
            console.log(event.target.textContent);
            if(event.target.classList.contains("d-btn")) {
                this.renderDateTaskList(event.target.textContent);
                super.sheduledTaskListStatusEvents();
                this.renderDateTaskInput();
            }
        })
    }

    renderDateTaskList(selectedDate) {
        this.appContentBlock = document.querySelector(".app-content");
        this.appContentBlock.innerHTML = '';
        this.taskListCont = document.createElement('ul');
        this.taskListCont.setAttribute("class", "sheduled-task-list");
        this.appContentBlock.appendChild(this.taskListCont);
        this.sheduledTaskList = document.querySelector(".sheduled-task-list");
        console.log('create sheduled ul');
         const listHeaderHTML = `<h4 class = "date-list-head">Список заданий на <span id="sheduled-date">${selectedDate}</span></h4>`;
        this.appContentBlock.insertAdjacentHTML('afterbegin', listHeaderHTML);
        this.appContentBlock.style.justifyContent = "flex-start";
        this.sheduledDateTaskArr = this.getSheduledDateTaskArray(selectedDate);
        if(this.sheduledDateTaskArr.length === 0) {
            const emptyListMessageHTML = `<p class = "list-message">Пока ничего не запланировано</p>`;
            this.sheduledTaskList.insertAdjacentHTML('beforeend', emptyListMessageHTML);
            this.sheduledTaskList.style.paddingTop = '30%';
        }
        this.sheduledDateTaskArr.forEach(element  => {
            const taskDoneItem = `<li class = "done"><span id = "${element.tId}" class="status checked"></span><span id="text${element.tId}" class="sheduled-task-text-content">${element.text}</span></span><span id="t${element.tId}" class="trash"></span></li>`;
            if(element.status === true) {
                this.sheduledTaskList.insertAdjacentHTML('beforeend', taskDoneItem);
            }
            else {
                const taskItem = `<li><span  id = "${element.tId}" class="status"></span><span id="text${element.tId}" class="sheduled-task-text-content">${element.text}</span><span id="t${element.tId}" class="trash"></span></li>`;
                this.sheduledTaskList.insertAdjacentHTML('beforeend', taskItem);
            }
        
        });

        console.log("render sheduled tasks list");
    }

    renderDateTaskInput() {
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
        else {
            this.sheduledTasksInputBlock.style.bottom = 0;
        }
        
    }
}

export {DatesListOperations};