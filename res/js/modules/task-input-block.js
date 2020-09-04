export {TaskInputBlock};

class TaskInputBlock {
    constructor() {
        this.parentEl = document.querySelector(".app-container");
        this.inputBlockHTML = `<div class="task-input-block">
                                    <input class="task-text" type="text" placeholder="введите текст задания">
                                    <button class="add-task-btn"></button>
                                    <button class="edit-task-btn"></button>
                                </div>`;
    }

    renderTaskInputBlock(addTaskBtnFunc) {
        this.inputBlock = document.querySelector(".task-input-block");
        if(!this.inputBlock) {
            console.log('fdgf');
            this.parentEl.insertAdjacentHTML('beforeend', this.inputBlockHTML);
            this.addTaskBtn = document.querySelector(".add-task-btn");
            this.addTaskBtn.addEventListener("click", addTaskBtnFunc);
            this.showTaskInputBlock();
        }
        
    }

    showTaskInputBlock() {
        this.inputBlock = document.querySelector(".task-input-block");
        console.log('111');
        this.showInput = () =>{this.inputBlock.style.bottom = 0};
        setTimeout(this.showInput, 1000);
    }
}