export {ContentAreaEvents};

class ContentAreaEvents {
    constructor() {
        this.contentArea = document.querySelector(".app-content");
    }
    catchElementByEvent() {
        this.contentArea.addEventListener("click", (event) => {
            console.log(event.target);
        })
    }
}