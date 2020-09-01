import {appElements} from '../globals.js';

export {PopUpWindow};

class PopUpWindow {
    constructor(popUpData) {
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
    createPopUp() {
        this.optionsBlock.style.display = "none";
        this.blockScr.classList.add("show-el");
        this.parentEl.insertAdjacentHTML('afterbegin', this.popUpHTML);
        this.confirmBtn = document.querySelector(".popup-confirm-btn");
        this.closePopUpBtn = document.querySelector(".close-popup-btn");
        this.cancelPopUpBtn = document.querySelector(".popup-cancel-btn");
        this.confirmBtn.style.backgroundColor = this.popUpData.btnColor;
        this.confirmBtn.addEventListener("click", this.popUpData.btnFunc);
        this.closePopUpBtn.addEventListener("click", this.removePopUp.bind(this));
        this.cancelPopUpBtn.addEventListener("click", this.removePopUp.bind(this));
        console.log(this);
        return this;
    }
    // addPopUpEvents() {
        
    //     confirmBtn.addEventListener("click", this.popUpData.btnFunc);
    //     closePopUpBtn.addEventListener("click", this.removePopUp);
    //     cancelPopUpBtn.addEventListener("click", this.removePopUp);
    //     console.log(this.removePopUp);
    // }
    removePopUp() {
        // console.log(this);
        const popUp = document.querySelector(".popup-window");
        this.blockScr.classList.remove("show-el");
        // const blScr = appElements.blockScreen;
        // blScr.classList.remove("show-el");
        popUp.remove();
              
    }
}




