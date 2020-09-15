export {SheduledTasks};

class SheduledTasks {
    constructor(todayDateYY_MM_DD) {
        this.todayDateYY_MM_DD = todayDateYY_MM_DD;
        this.parentEl = document.querySelector(".app-content");
        this.taskInputBlock = document.querySelector(".task-input-block");
        this.sheduleTaskBlockHTML = `<div class="date-select">
            <p>Выберите дату</p>
            <div class="date-input">
                <input type="date" name="task-date" id="task-date" min="${this.todayDateYY_MM_DD}" value="">
                <button class="date-select-btn"></button>
            </div>
            <button class = "today-tasks-btn">Задания на сегодня <span class="today-tasks-btn-icon"></span></button>
        </div>`;
    }

    renderSelectSheduledDateBlock() {
        console.log(this.todayDateYY_MM_DD);
        if(this.taskInputBlock.style.bottom = '0px') {
            this.taskInputBlock.style.bottom = '-180'+'px';
        }
        this.parentEl.innerHTML = "";
        this.parentEl.insertAdjacentHTML('afterbegin', this.sheduleTaskBlockHTML);
    }
}