export {DataStore};

class DataStore {
    constructor(mainDataArr) {
        this.mainDataArr = mainDataArr;
    }
    setToLocalStorage() {
        localStorage.setItem("MYTODO", JSON.stringify(this.mainDataArr));
    }
    getFromLocalStorage() {
        this.data = localStorage.getItem("MYTODO");
        if(this.data) {
            console.log('data');
            this.mainDataArr = JSON.parse(this.data);
            return this.mainDataArr;
            console.log();
        }
        else {
            this.mainDataArr = [];
            console.log('nodata');
            this.setToLocalStorage();
            return [];
        }
    }
    clearLocalStorage() {
        localStorage.clear();
        document.location.reload();
    }
}
