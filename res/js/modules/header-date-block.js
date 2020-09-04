export {HeaderTodayDate};

class HeaderTodayDate {
    constructor(todayDate) {
        this.todayDate = todayDate;
        this.dateBlock = document.querySelector(".current-date-js");
    }

    renderTodayDate() {
        console.log(this.dateBlock);
        this.dateBlock.innerText(this.todayDate);
    }

}