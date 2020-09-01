export {DataStore};

class DataStore {
    constructor(mainDataArr) {
        this.mainDataArr = mainDataArr;
    }
    static setToLocalStorage(mainDataArr) {
        localStorage.setItem("MYTODO", JSON.stringify(mainDataArr));
    }
    static getFromLocalStorage() {
        let data = localStorage.getItem("MYTODO");
        let mainDataArr = [];
        if(data) {
            mainDataArr = JSON.parse(data);
            return mainDataArr;
        }
        else {
            return [];
        }
    }
    static clearLocalStorage() {
        localStorage.clear();
        document.location.reload();
    }
}
