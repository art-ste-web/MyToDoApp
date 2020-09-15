import {StartContent} from './start-content.js';
import {TaskListAreaEvents} from './content-area-events.js';
const startContent = new StartContent;
const taskListEvents = new TaskListAreaEvents;
export {SheduledTasks};

class SheduledTasks extends StartContent {
    constructor(todayDateYY_MM_DD) {
        super();
        this.todayDateYY_MM_DD = todayDateYY_MM_DD;
        this.taskInputBlock = document.querySelector(".task-input-block");
        this.appContentBlock = document.querySelector(".app-content");
        this.sheduleTaskBlockHTML = `<div class="date-select">
            <p>Выберите дату</p>
            <div class="date-input">
                <input type="date" name="task-date" id="task-date" min="${this.todayDateYY_MM_DD}" value="">
                <button class="date-select-btn"></button>
            </div>
            <button class = "today-tasks-btn">Задания на сегодня <span class="today-tasks-btn-icon"></span></button>
        </div>`;
        // this.showTodayTasks = super.renderStartContent.bind(startContent);
    }

    renderSelectSheduledDateBlock() {
        
        console.log(this);
        
        if(this.taskInputBlock) {
            this.taskInputBlock.style.bottom = '-180px';
        }
        this.appContentBlock.innerHTML = "";
        this.appContentBlock.insertAdjacentHTML('afterbegin', this.sheduleTaskBlockHTML);
        const toMainScrBtn = document.querySelector(".today-tasks-btn");
        // const mainScr = super.renderStartContent.bind(StartContent);
        toMainScrBtn.addEventListener("click", super.renderStartContent);
        
        // toMainScrBtn.addEventListener("click",  ()=>{
        //     this.appContentBlock.innerHTML = "";
        //     super.renderStartContent.bind(this);
        // });
    }
}