export {OptionsMenu};

class OptionsMenu {
    constructor() {
        this.parentEl = document.querySelector(".date-block");
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
    }

    hideOptionsMenu() {
        const optCont = document.querySelector(".options-btns-container");
        optCont.remove();
        
    }
}