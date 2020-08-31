export {dataStore};
class DataStore {
    constructor(mainDataArr) {
        this.mainDataArr = mainDataArr;
    }
    setToLocalStorage(mainDataArr) {
        localStorage.setItem("MYTODO", JSON.stringify(mainDataArr));
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

const dataStore = new DataStore;