export {DataStore};

class DataStore {
    constructor(mainDataArr) {
        this.mainDataArr = mainDataArr;
    }
    setToLocalStorage() {
        localStorage.setItem("MYTODO", JSON.stringify(this.mainDataArr));
    }
    getFromLocalStorage() {
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
    clearLocalStorage() {
        localStorage.clear();
        document.location.reload();
    }
}
