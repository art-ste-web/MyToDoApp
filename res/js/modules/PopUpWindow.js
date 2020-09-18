export {PopUpWindow};

class PopUpWindow {
    constructor(popUpData) {
        this.popUpData = popUpData;
        this.parentEl = document.querySelector(".app-content");
        this.blockScr = document.querySelector(".popup-block-screen");
        this.optionsCont = document.querySelector(".options-btns-container");
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
    renderPopUp() {
        this.blockScr.classList.add("show-el");
        this.parentEl.insertAdjacentHTML('afterbegin', this.popUpHTML);
        this.confirmBtn = document.querySelector(".popup-confirm-btn");
        this.confirmBtn.style.backgroundColor = this.popUpData.btnColor;
        
    }
    
    removePopUp() {
        const popUp = document.querySelector(".popup-window");
        this.blockScr.classList.remove("show-el");
        popUp.remove();
    }
}




