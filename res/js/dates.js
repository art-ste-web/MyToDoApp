export class ToDoDates {
    constructor(dateToConvert) {
        this.dateToConvert = dateToConvert;
        this.currentDate = new Date();
        this.weekDay = this.currentDate.getDay();
        this.date = this.currentDate.getDate();
        this.month = this.currentDate.getMonth()+1;
        this.year = this.currentDate.getFullYear();
        this.strDate = this.date.toString();
        this.strMonth = this.month.toString();
        this.strYear = this.year.toString();
        this.showCurrDay = this.date < 10 ? '0' + this.strDate : this.strDate;
        this.showCurMonth = this.month < 10 ? '0' + this.strMonth : this.strMonth;
        this.weekDays = [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];

    }
    //full date format WEEKDAY, DD.MM.YYYY
    todayFullDate() {
        return `${this.weekDays[this.weekDay]}, ${this.showCurrDay}.${this.showCurMonth}.${this.strYear}`;
    }
    //short date format DD.MM.YYYY
    todayShortDate() {
        return `${this.showCurrDay}.${this.showCurMonth}.${this.strYear}`;
    }
    //tranform date from DD.MM.YYYY to YYYY-MM-DD
    transformDateToYYMMDD(dateToConvert) {
        let dateArr = dateToConvert.split(".").reverse();
        return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
    }
    //tranform date from YYYY-MM-DD to DD.MM.YYYY
    transformDateToDDMMYY(dateToConvert) {
        let dateArr = dateToConvert.split("-").reverse();
        return `${dateArr[0]}.${dateArr[1]}.${dateArr[2]}`;
    }
}


export let appDate = new ToDoDates();
