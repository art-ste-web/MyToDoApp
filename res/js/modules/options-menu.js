import {appElements} from './globals.js';

export {OptionsMenu};

class OptionsMenu {
    constructor() {
        this.parentEl = appElements.dateBlock;
        this.optionsHTML = `<div class = "options-btns-container">
                                <button class = "close-options-btn"></button>
                                <button class = "delete-data-btn"></button>
                                <button class = "select-location-btn"></button>
                            </div>`;
    }
    renderOptions() {
        this.parentEl.insertAdjacentHTML('beforeend', this.optionsHTML);
    }
    static hideOptions() {
        const optCont = document.querySelector(".options-btns-container");
        optCont.style.display = "none";
    }
}