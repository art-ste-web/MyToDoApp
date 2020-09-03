export {OptionsMenu};

class OptionsMenu {
    constructor(alertPopUp) {
        this.parentEl = document.querySelector(".date-block");
        this.alertPopUp = alertPopUp;
        this.optionsHTML = `<div class = "options-btns-container">
                                <button class = "close-options-btn"></button>
                                <button class = "delete-data-btn"></button>
                                <button class = "select-location-btn"></button>
                            </div>`;
    }
    renderOptionsMenu() {
        this.parentEl.insertAdjacentHTML('beforeend', this.optionsHTML);
        this.optionsCont = document.querySelector(".options-btns-container");
        this.optionsCont.style.display = "flex";
        this.closeBtn = document.querySelector(".close-options-btn");
        this.delDataBtn = document.querySelector(".delete-data-btn");

        //close menu btn event
        this.closeBtn.addEventListener("click", ()=> {
            this.hideOptionsMenu();
        });

        //clear local storage pop up
        function showPopUp() {
            this.alertPopUp();
            const delDBtn = document.querySelector(".delete-data-btn");
            delDBtn.removeEventListener("click", showPopUp.bind(this));
            this.hideOptionsMenu();
        }
        //clear local storage btn event
        this.delDataBtn.addEventListener("click", showPopUp.bind(this));
              
    }
    hideOptionsMenu() {
        const optCont = document.querySelector(".options-btns-container");
        optCont.remove();
    }
}