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
                if(this.mainDataArr[i].date == plannedTaskDate_DD_MM_YY) {
                    console.log('date allready exist');
                    return;
                }
                else {
                    this.todayObj = {};
                    this.todayObj.id = this.mainDataArr.length;
                    this.todayObj.date = plannedTaskDate_DD_MM_YY;
                    this.todayObj.tasks = [];
                    this.todayObj.allDone = false;
                    this.mainDataArr.push(this.todayObj);
                    console.log('sheduled date obj created in main arr');
                    this.setToLocalStorage(this.mainDataArr);
                    return this.mainDataArr;
                }
            }
            
        }
        else {
            this.todayObj = {};
            this.todayObj.id = this.mainDataArr.length;
            this.todayObj.date = plannedTaskDate_DD_MM_YY;
            this.todayObj.tasks = [];
            this.todayObj.allDone = false;
            this.mainDataArr.push(this.todayObj);
            console.log('obj created in main arr');
            this.setToLocalStorage(this.mainDataArr);
            return this.mainDataArr;
        }
        // else {
        //     this.mainDataArr.forEach(el => {
        //         if(el.date == plannedTaskDate_DD_MM_YY) {
        //             console.log(el.date, plannedTaskDate_DD_MM_YY);
        //             return;
        //         }
        //         else {
        //             this.todayObj = {};
        //             this.todayObj.id = this.mainDataArr.length;
        //             this.todayObj.date = plannedTaskDate_DD_MM_YY;
        //             this.todayObj.tasks = [];
        //             this.todayObj.allDone = false;
        //             this.mainDataArr.push(this.todayObj);
        //             console.log('sheduled date obj created in main arr');
        //             this.setToLocalStorage(this.mainDataArr);
        //             return this.mainDataArr;
        //         }
        //     });
        // }
        
        // console.log(this.mainDataArr);
        
        
    }
}