export {AppData};

class AppData {
    constructor(mainDataArr) {
        this.mainDataArr = mainDataArr;
    }
    //get today task array from main data array
    getTodayTaskArr(date) {
        this.date = date;
        let todayTasks = null;
        this.mainDataArr.forEach(element => {
            if(element.date == date) {
                todayTasks = element.tasks;
            }
            
        })
        return todayTasks;
    }
}