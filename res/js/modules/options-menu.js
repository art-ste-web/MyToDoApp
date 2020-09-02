import {appElements} from '../common/globals.js';
import {PopUpWindow} from './pop-up.js';
import {DataStore} from '../common/storage.js';

export {OptionsMenu};

class OptionsMenu {
    constructor(parentEl, popUpData) {
        this.parentEl = parentEl;
        this.popUpData = popUpData;
        this.optionsHTML = `<div class = "options-btns-container">
                                <button class = "close-options-btn"></button>
                                <button class = "delete-data-btn"></button>
                                <button class = "select-location-btn"></button>
                            </div>`;
    }
    renderOptionsMenu() {
        this.parentEl.insertAdjacentHTML('beforeend', this.optionsHTML);
        const optBlock = document.querySelector('.options-btns-container');
        optBlock.style.display = "flex";
        this.closeBtn = document.querySelector(".close-options-btn");
        this.delDataBtn = document.querySelector(".delete-data-btn");

        //close menu btn
        this.closeBtn.addEventListener("click", ()=> {
            OptionsMenu.hideOptionsMenu();
        });

        function showPopUp() {
            //getting value of CSS variable
            const root = document.querySelector(':root');
            const rootStyles = getComputedStyle(root);
            const btnColor = rootStyles.getPropertyValue('--danger-red');
            //popUp input data
            const clearStoragePopUpData = {
                bodyText: "Вы уверены, что хотите удалить все сохраненные данные приложения?",
                btnText: "Удалить данные",
                btnColor: btnColor,
                btnFunc: DataStore.clearLocalStorage
            };
            const alertClearStorePopUp = new PopUpWindow(clearStoragePopUpData);
            alertClearStorePopUp.renderPopUp();
            const delDBtn = document.querySelector(".delete-data-btn");
            delDBtn.removeEventListener("click", showPopUp);
        }
        //clear local storage btn
        this.delDataBtn.addEventListener("click", showPopUp);
        
        
    }
    static hideOptionsMenu() {
        const optCont = document.querySelector(".options-btns-container");
        optCont.style.display = "none";
    }
}