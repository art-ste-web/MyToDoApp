export {HeaderTodayDate};

class HeaderTodayDate {
    constructor(todayDate) {
        this.todayDate = todayDate;
        this.dateBlock = document.querySelector(".current-date-js");
    }

    renderTodayDate() {
        this.dateBlock.textContent = this.todayDate;
    }

}