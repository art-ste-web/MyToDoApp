export {ElementActions};

class ElementActions {
    constructor(element) {
        this.element = element; 
    }
    setInnerText(text) {
        this.element.innerText = text;
    }
    setInnerHTML(markUp) {
        this.element.innerHTML = markUp;
    }
    removeElement() {
        this.element.remove();
    }
    hideElement() {
        this.element.style.display = "none";
    }
    showElement() {
        this.element.style.display = "block";
    }
    showElementFlex() {
        this.element.style.display = "flex";
    }
}

