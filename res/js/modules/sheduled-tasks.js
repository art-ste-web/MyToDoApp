import {TaskListContent} from './TaskListContent.js';
const startCont = new TaskListContent;
export {SheduledTasks};

class SheduledTasks extends TaskListContent {
    constructor(todayDateYY_MM_DD) {
        super();
        this.todayDateYY_MM_DD = todayDateYY_MM_DD;
        
    }

    callSheduledTaskEvent() {
        const sheduleTaskBtn = document.querySelector(".btn-calendar");
        sheduleTaskBtn.addEventListener("click", this.renderSelectSheduledDateBlock.bind(this));
    }

    renderSelectSheduledDateBlock() {
        const taskInputBlock = document.querySelector(".task-input-block");
        const appContentBlock = document.querySelector(".app-content");
        const sheduleTaskBlockHTML = `<div class="date-select">
                                        <p>Выберите дату</p>
                                        <div class="date-input">
                                            <input type="date" name="task-date" id="task-date" min="${this.todayDateYY_MM_DD}" value="">
                                            <button class="date-select-btn"></button>
                                        </div>
                                        <button class = "today-tasks-btn">Задания на сегодня <span class="today-tasks-btn-icon"></span></button>
                                    </div>`;
        console.log(this);
        
        if(taskInputBlock) {
            taskInputBlock.style.bottom = '-180px';
        }
        appContentBlock.innerHTML = "";
        appContentBlock.insertAdjacentHTML('afterbegin', sheduleTaskBlockHTML);
        const toMainScrBtn = document.querySelector(".today-tasks-btn");
        // const mainScr = super.renderStartContent.bind(StartContent);
        toMainScrBtn.addEventListener("click", super.renderStartContent.bind(this));
        
        // toMainScrBtn.addEventListener("click",  ()=>{
        //     this.appContentBlock.innerHTML = "";
        //     super.renderStartContent.bind(this);
        // });
    }
}