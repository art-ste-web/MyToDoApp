import {appElements} from './globals.js';

export {PopUpWindow};

class PopUpWindow {
    constructor(popUpData) {
        this.popUpWin = appElements.popUpWindow;
        this.popUpData = popUpData;
        this.parentEl = appElements.appContent;
        this.blockScr = appElements.blockScreen;
        this.optionsBlock = appElements.optionsContainer;
        this.popUpHTML = `<div class = "popup-window">
            <div class="popup-close"><button class="close-popup-btn"></button></div>
                <div class="popup-content">
                <p>${popUpData.bodyText}</p>
            </div>
            <div class="popup-btns">
                <button class="popup-confirm-btn">${popUpData.btnText}</button>
                <button class="popup-cancel-btn">Отмена</button>
            </div>
        </div>`;
        
    }
    static createPopUp() {
        this.optionsBlock.style.display = "none";
        this.blockScr.classList.add("show-el");
        if(!this.popUpWin) {
            this.parentEl.insertAdjacentHTML('afterbegin', this.popUpHTML);
           console.log(this.popUpWin);
        }
        const confirmBtn = document.querySelector(".popup-confirm-btn");
        const closePopUpBtn = document.querySelector(".close-popup-btn");
        const cancelPopUpBtn = document.querySelector(".popup-cancel-btn");
        confirmBtn.style.backgroundColor = this.popUpData.btnColor;
        confirmBtn.addEventListener("click", this.popUpData.btnFunc);
        closePopUpBtn.addEventListener("click", this.removePopUp);
        cancelPopUpBtn.addEventListener("click", this.removePopUp);
        console.log(this.blockScr.classList);
        
    }
    removePopUp() {
        if(this.popUpWin) {
        this.blockScr.classList.remove("show-el");
        // const blScr = appElements.blockScreen;
        // blScr.classList.remove("show-el");
        this.popUpWin.remove();
        }
    }
}




