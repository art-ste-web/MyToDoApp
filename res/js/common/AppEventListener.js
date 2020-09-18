export {AppEventListener};

class AppEventListener {
    constructor() {
        
    }

    // addListener(element, action, method) {
    //     this.element = element;
    //     this.action = action;
    //     this.method = method;
    //     if(this.element && !this.element.hasAttribute("ev-listener")) {
    //         this.element.addEventListener(this.action, this.method);
    //         this.element.setAttribute("ev-listener", "true");
    //         console.log('listener added');
    //     }
    //     else {
    //         console.log('element does not exist');
    //     }
    // }

    addListener([element, action, method]) {
        this.element = element;
        this.action = action;
        this.method = method;
        if(this.element && !this.element.hasAttribute("ev-listener")) {
            this.element.addEventListener(this.action, this.method);
            this.element.setAttribute("ev-listener", "true");
            console.log('listener added');
        }
        else {
            // console.log('element does not exist');
        }
    }
}