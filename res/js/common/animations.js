export {ElementAnimation};

class ElementAnimation {
    constructor () {
        
    }
    accentElement(element) {
        element.style.animation = "pulse  .8s ease-in-out";
                setTimeout(()=> {
                    element.style.animation = "";
                }, 1000)
    }
}