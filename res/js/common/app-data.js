export {AppData};

class AppData {
    constructor(mainDataArr, todayDate, saveDataMethod) {
        this.mainDataArr = mainDataArr;
        this.saveDataMethod = saveDataMethod;
        this.todayDate = todayDate;
    }

    //create or update array with tasks for today
    updateTodayTasksArr() {
        this.todayTaskArr = this.getTodayTaskArr();
        this.inputTaskText = document.querySelector(".task-text");
        this.taskObj = {};
        this.taskObj['tId'] = this.todayTaskArr.length;
        this.taskObj['text'] = this.inputTaskText.value;
        this.taskObj['status'] = false;
        this.taskObj['trash'] = false;
        this.todayTaskArr.push(taskObj);
        // console.log(taskObj);
        return this.todayTaskArr;
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

    createTodayDateObj() {
        this.todayObj = {};
        this.todayObj.id = this.mainDataArr.length;
        this.todayObj.date = this.todayDate;
        this.todayObj.tasks = [];
        this.todayObj.allDone = false;
        this.mainDataArr.push(this.todayObj);
        this.saveDataMethod;
        return this.mainDataArr;
    }

    addTodayTaskToMainArr() {
        this.dateTaskObj = {};
        this.arrItem = null;
        if(this.arrItem = this.mainDataArr.find(item => item.date == this.todayDate)) {
            this.arrItem.tasks = this.getTodayTaskArr(); 
            console.log('updated');
        }
        else {
            this.dateTaskObj['id'] = this.mainDataArr.length;
            this.dateTaskObj['date'] = this.todayDate;
            this.dateTaskObj['tasks'] = this.getTodayTaskArr();
            this.dateTaskObj['allDone'] = false;
            this.mainDataArr.push(this.dateTaskObj);
            console.log("added");
        }
        console.log(this.mainDataArr);
        this.saveDataMethod;
        return this.mainDataArr;
    }
}