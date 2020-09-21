import {TaskListContent} from './TaskListContent.js';

export {SheduledTasks};

class SheduledTasks extends TaskListContent {
    constructor(todayDateYY_MM_DD) {
        super();
        this.todayDateYY_MM_DD = todayDateYY_MM_DD;
        this.taskInputBlock = document.querySelector(".task-input-block");
        this.appContentBlock = document.querySelector(".app-content");
    }

    
    renderSelectSheduledDateBlock() {
        const sheduleTaskBlockHTML = `<div class="date-select">
                                        <p>Выберите дату</p>
                                        <div class="date-input">
                                            <input type="date" name="task-date" id="task-date" min="${this.todayDateYY_MM_DD}" value="">
                                            <button class="date-select-btn"></button>
                                        </div>
                                        <button class = "today-tasks-btn">Задания на сегодня <span class="today-tasks-btn-icon"></span></button>
                                    </div>`;
        console.log(this);
        
        if(this.taskInputBlock) {
            this.taskInputBlock.style.bottom = '-180px';
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
}