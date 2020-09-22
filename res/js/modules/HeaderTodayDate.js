export {HeaderTodayDate};

class HeaderTodayDate {
    constructor(todayDate) {
        this.todayDate = todayDate;
        
    }

    renderTodayDate() {
        this.dateBlock = document.querySelector(".current-date-js");
        this.dateBlock.textContent = this.todayDate;
    }

}