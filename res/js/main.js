//IMPORT
//app globals
import {appElements} from './common/globals.js';

//animations
import {ElementAnimation} from './common/animations.js';
const animateEl = new ElementAnimation;

//dates
import {ToDoDates} from './common/dates.js';
const appDate = new ToDoDates;

//local storage functions
import {DataStore} from './common/storage.js';

//data functions
import {AppData} from './common/app-data.js';

//change HTML elements and styles
import {ElementActions} from './common/el-actions.js';

//MODULES
//options menu
import {OptionsMenu} from './modules/options-menu.js';
const options = new OptionsMenu;

//app content 
import {ContentArea} from './modules/content-area.js';









//APPLICATION
//get data from local storage
let mainDataArr = DataStore.getFromLocalStorage();

//TEST data class
const appData = new AppData(mainDataArr);
const taskA = appData.getTodayTaskArr(appDate.todayShortDate());
console.log(taskA);


const appContent = new ContentArea(appElements.appContent, appDate.todayShortDate(), taskA);
appContent.showStartContent();

//test data array
let mainDataArr1 = [
    {
        id: 0,
        date: "31.07.2020",
        tasks: [
            {
                tId: 0,
                text: "Выпить кофе",
                done: false,
                trash: false
            },
            {
                tId: 1,
                text: "Учить JS",
                done: false,
                trash: false
            }
        ],
        allDone: false

    },
    {
        id: 1,
        date: "13.08.2020",
        tasks: [
            {
                tId: 0,
                text: "Бегать",
                done: false,
                trash: false
            },
            {
                tId: 1,
                text: "Прогулка",
                done: false,
                trash: false
            },
            {
                tId: 2,
                text: "Learn JS",
                done: false,
                trash: false
            }
        ],
        allDone: false

    },
    {
        id: 2,
        date: "10.08.2020",
        tasks: [
            {
                tId: 0,
                text: "Бегать",
                done: false,
                trash: false
            },
            {
                tId: 1,
                text: "Прогулка",
                done: true,
                trash: false
            }
        ],
        allDone: false

    }
]

//today date in header
const todayDate = new ElementActions(appElements.dateEl);
todayDate.setInnerText(appDate.todayFullDate());

//options menu
appElements.optionsBtn.addEventListener("click", () => {
    options.renderOptionsMenu();
});

//*****************************/


//show start content (task list for today or create add task btn and add it's function)
// function showStartContent(appContentContainer) {
//     let todayDate = appDate.todayShortDate();
//     let todayTasks = appData.getTodayTaskArr(todayDate);
//     // console.log(todayTasks);
//     if(!todayTasks) {
//         let newTaskBtn = `<div class="new-task-btn"> 
//                                 <img src="res/img/plus-circle.svg" alt="">
//                                 <p>Нажмите, чтобы создать список</p>
//                              </div>`;
//         appContentContainer.insertAdjacentHTML('afterbegin', newTaskBtn);
//         appContentContainer.style.justifyContent = "center";
//         const addTaskTodayBtn = document.querySelector(".new-task-btn");
//         addTaskTodayBtn.addEventListener("click", showTodayTaskInput);
//     }
//     else {
//         // let tasksList = selectTaskArr(todayTasks);
//         renderTaskListFromArr(todayTasks);
//         showNewTaskInput();
//     }
// }

//show input block  
function showNewTaskInput() {
    const taskInput = document.querySelector(".task-input-block");
    const addTaskBtn = document.querySelector(".add-task-btn");
        function showInput() {
                taskInput.style.bottom = 0;
        }
        setTimeout(showInput, 1000);
    addTaskBtn.addEventListener("click", addNewTodayTask);
}

//create new today date object in main data array
function createTodayDateObj(mainArr) {
    let todayObj = {};
    todayObj.id = mainArr.length;
    todayObj.date = appDate.todayShortDate();
    todayObj.tasks = [];
    todayObj.allDone = false;
    mainArr.push(todayObj);
    DataStore.setToLocalStorage(mainArr)
    return mainArr;
}
//renders list to parrent ul element from tasks array
function renderTaskListFromArr(listArr) {
    const parentTaskEl = document.querySelector(".task-list");
    listArr.forEach(element  => {
        let taskDoneItem = `<li class = "done"><span id = "${element.tId}" class="status checked"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span></span><span id="t${element.tId}" class="trash"></span></li>`;
        if(element.status === true) {
            parentTaskEl.insertAdjacentHTML('beforeend', taskDoneItem);
        }
        else {
            let taskItem = `<li><span  id = "${element.tId}" class="status"></span><span id="text${element.tId}" class="task-text-content">${element.text}</span><span id="t${element.tId}" class="trash"></span></li>`;
            parentTaskEl.insertAdjacentHTML('beforeend', taskItem);
        }
        
    });
    
}

//clear parent ul element (for redrawing list)
function clearDOMTaskList() {
    const parentTaskEl = document.querySelector(".task-list");
    parentTaskEl.innerHTML = '';
}

//show input on click add task btn
function showTodayTaskInput() {
    const taskInput = document.querySelector(".task-input-block");
    const addTaskTodayBtn = document.querySelector(".new-task-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
    createTodayDateObj(mainDataArr);
    addTaskTodayBtn.style.display = "none";
        function showInput() {
                taskInput.style.bottom = 0;
        }
        setTimeout(showInput, 1000);
    addTaskBtn.addEventListener("click", addNewTodayTask);
}

//add new li element to parent ul
function addNewTaskItemToDOM() {
    
    const inputTaskText = document.querySelector(".task-text");
    const parentTaskEl = document.querySelector(".task-list");
    const elCount = parentTaskEl.childElementCount;
    let taskItem = `<li><span id = "${elCount}" class="status"></span><span id="text${elCount}" class="task-text-content">${inputTaskText.value}</span><span id="t${elCount}" class="trash"></span></li>`;
    appElements.appContent.style.alignItems = "flex-start";
    appElements.appContent.style.justifyContent = "flex-start";
    parentTaskEl.insertAdjacentHTML('beforeend', taskItem);
    
}
/*********EDIT TASK TEXT FUNCTIONS**********/
//show edit task input block
function showEditTextInputBlock() {
    const inputAddBtn = document.querySelector(".add-task-btn");
    const inputEditBtn = document.querySelector(".edit-task-btn");
    inputAddBtn.style.display = "none";
    inputEditBtn.style.display = "block";
    
}

//insert edit task text to input
function selectAndMarkEditableTask(itemId) {
    const inputTaskText = document.querySelector(".task-text");
    const selectedItemId = `text${itemId}`;
    const selectedItem = document.getElementById(selectedItemId);
    selectedItem.setAttribute("edit", "true");
    inputTaskText.value = selectedItem.innerText;
    
} 



//hide edit task input block
function hideEditTextInputBlock() {
    const inputTaskText = document.querySelector(".task-text");
    const inputAddBtn = document.querySelector(".add-task-btn");
    const inputEditBtn = document.querySelector(".edit-task-btn");
    inputAddBtn.style.display = "block";
    inputEditBtn.style.display = "none";
    clearTaskTextInput();
    const tasktItems = document.querySelectorAll(".task-text-content");
    for(let i=0; i<tasktItems.length; i++) {
        tasktItems[i].parentNode.style.opacity = null;
    }
    removeEditAttr();
}


//clear task input 
function clearTaskTextInput() {
    const inputTaskText = document.querySelector(".task-text");
    inputTaskText.value = "";
}




//insert new task text to task item
function updateTaskText(mainDataArr) {
    const date = appDate.todayShortDate();
    const inputTaskText = document.querySelector(".task-text");
    const tasktItems = document.querySelectorAll(".task-text-content");
    for(let i=0; i<tasktItems.length; i++) {
        if(tasktItems[i].getAttribute("edit")) {
            let getElId = tasktItems[i].id;
            let elId = Number(getElId.substr(4));
            let editTask = document.getElementById(getElId);
            editTask.innerText = inputTaskText.value;
            console.log(elId);
            let todayEl = mainDataArr.find(el => el.date === date);
                todayEl.tasks.forEach(el => {
                    if(el.tId === elId) {
                        el.text = inputTaskText.value;
                        console.log("text edited");
                        DataStore.setToLocalStorage(mainDataArr);
                    }
                })
        }
        else {
            tasktItems[i].parentNode.style.opacity = '.2';
        }
        // console.log(tasktItems[i]);
    }
    
    // console.log(tasktItems);
    // clearTaskTextInput();
    // hideEditTextInputBlock();
    
}



//remove edit attr 
function removeEditAttr() {
    const tasktItems = document.querySelectorAll(".task-text-content");
    for(let i=0; i<tasktItems.length; i++) {
        if(tasktItems[i].getAttribute("edit")) {
            let editTask = document.getElementById(tasktItems[i].id);
            editTask.removeAttribute("edit");
        }
        
    }
}




//edit task event
//get double clicked element to edit task text content
appElements.taskListContainer.addEventListener("dblclick", (event) => {
    const date = appDate.todayShortDate();
    const inputTaskText = document.querySelector(".task-text");
    const inputEditBtn = document.querySelector(".edit-task-btn");
    const element = event.target;
    const getElId = element.id;
    const elId = Number(getElId.substr(4));
    console.log("clicked "+elId);
    showEditTextInputBlock();
    selectAndMarkEditableTask(elId);
    inputTaskText.addEventListener("keyup", ()=> {updateTaskText(mainDataArr)});
    inputEditBtn.addEventListener("click", hideEditTextInputBlock);
    
    // changeTextContentOfTask(date, elId, mainDataArr, newTaskText);

})

//change task text in main array
function changeTextContentOfTask(taskDate, taskId, mainDataArr, newTaskText) {
    let todayEl = mainDataArr.find(el => el.date === taskDate);
    todayEl.tasks.forEach(el => {
        if(el.tId === taskId) {
            el.text = newTaskText;
            console.log("text edited");
            DataStore.setToLocalStorage(mainDataArr);
        }
    })
}




//create or update array with tasks for today
function createTodayTasksArr(todayTaskArr) {
    const inputTaskText = document.querySelector(".task-text");
    let taskObj = {};
    taskObj['tId'] = todayTaskArr.length;
    taskObj['text'] = inputTaskText.value;
    taskObj['status'] = false;
    taskObj['trash'] = false;
    todayTaskArr.push(taskObj);
    // console.log(taskObj);
    return todayTaskArr;

}
//adds new today task on click
function addNewTodayTask() {
    const todayDate = appDate.todayShortDate();
    let todayTasks = appData.getTodayTaskArr(todayDate);
    console.log(todayTasks);
    const inputTaskText = document.querySelector(".task-text");
    if(inputTaskText.value) {
        addNewTaskItemToDOM();
        let curTodayTask = createTodayTasksArr(todayTasks);
        inputTaskText.value = "";
        addTodayTaskToMainArr(curTodayTask, mainDataArr);
        // console.log(curTodayTask);
    }
    else {
        animateEl.accentElement(inputTaskText);
                
    }
    
}
//update main data array with new tasks
function addTodayTaskToMainArr(todayTasksArr, genArr) {
    let dateTaskObj = {};
    let today = appDate.todayShortDate();
    let arrItem = null;
    if(arrItem = genArr.find(item => item.date == today)) {
        arrItem.tasks = todayTasksArr; 
        console.log('updated');
    }
    else {
        dateTaskObj['id'] = genArr.length;
        dateTaskObj['date'] = appDate.todayShortDate();
        dateTaskObj['tasks'] = todayTasksArr;
        dateTaskObj['allDone'] = false;
        genArr.push(dateTaskObj);
        console.log("added");
    }
    console.log(genArr);
    DataStore.setToLocalStorage(genArr);
    return genArr;
}



/******CONTENT BLOCK USER EVENTS******/
//get clicked element and set/unset done status
appElements.appContent.addEventListener("click", (event) => {
    let element = event.target;
    let elCheckedState = false;
    let elId = Number(event.target.id);
    let curDate = appDate.todayShortDate();
    // console.log(elId);
    if(element.classList.contains("status")) {
        element.classList.toggle("checked");
        element.parentNode.classList.toggle('done');
        if (element.classList.contains("checked")) {
            elCheckedState = true;
            changeStatusOfTask(curDate, elId, mainDataArr, elCheckedState);
        }
        else {
            elCheckedState = false;
            changeStatusOfTask(curDate, elId, mainDataArr, elCheckedState);
        }
        
    }
    else {
        let elChilds = element.childNodes;
        elChilds.forEach(el => {
            if(el.className ==="status") {
                animateEl.accentElement(el);
            }
        })
    }
    //console.log(element);
})




//get clicked trash element and delete task from list
appElements.appContent.addEventListener("click", (event) => {
    let element = event.target;
    let getElId = event.target.id;
    let curDate = appDate.todayShortDate();
    let trashIdNum = Number(getElId.substr(1));
    // console.log(trashIdNum);
    if(element.classList.contains("trash")) {
        deleteItemFromList(curDate, trashIdNum, mainDataArr);
        let todayTasks = appData.getTodayTaskArr(curDate);
        clearDOMTaskList();
        renderTaskListFromArr(todayTasks);
    }

})

//change task status in main array
function changeStatusOfTask(taskDate, taskId, mainDataArr, elState) {
    
    let todayEl = mainDataArr.find(el => el.date === taskDate);
    todayEl.tasks.forEach(el => {
        if(el.tId === taskId) {
            el.status = elState;
            console.log("work");
            DataStore.setToLocalStorage(mainDataArr);
        }
    })
}

//delete item from tasklist in main data array
function deleteItemFromList(taskDate, taskId, mainDataArr) {
    let todayEl = mainDataArr.find(el => el.date === taskDate);
    let todayElTasks = todayEl.tasks;
    todayElTasks.forEach(el => {
        if(el.tId === taskId) {
            todayElTasks.splice(el.tId, 1);
            console.log(el.tId);
            // console.log(todayElTasks);
            for(let i = 0; i < todayElTasks.length; i++) {
                todayElTasks[i].tId = i;
                console.log(todayElTasks);
                
            }
            
           
        }
    })
    DataStore.setToLocalStorage(mainDataArr);

}








//****************TASKS BY DATES*****************/
function showDateSelectBlock() {
    const taskInputBlock = document.querySelector(".task-input-block");
    const parentEl = appElements.appContent;
    let dateDdMmYy = appDate.todayShortDate();
    let minDate = appDate.transformDateToYYMMDD(dateDdMmYy);
    const dateEl = `<div class="date-select">
                        <p>Выберите дату</p>
                        <div class="date-input">
                            <input type="date" name="task-date" id="task-date" min="${minDate}" value="">
                            <button class="date-select-btn"></button>
                        </div>
                        <button class = "today-tasks-btn">Задания на сегодня <span class="today-tasks-btn-icon"></span></button>
                    </div>`;
    if(taskInputBlock.style.bottom = '0px') {
        taskInputBlock.style.bottom = '-180'+'px';
    }
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML('afterbegin', dateEl);
    //event listeners for created btns
    const dateSelectBtn = document.querySelector(".date-select-btn");
    const toMainScreenBtn = document.querySelector(".today-tasks-btn");
    dateSelectBtn.addEventListener("click", checkSelectedDate);
    toMainScreenBtn.addEventListener("click", toMainScreen);
}

//return to main screen 
function toMainScreen() {
    let contentEl = appElements.appContent;
    contentEl.innerHTML = "";
    const listParent = `<ul class = "task-list"></ul>`;
    contentEl.insertAdjacentHTML('afterbegin', listParent);
    showStartContent(contentEl);
}

//check if date was selected
function checkSelectedDate() {
    const dateInput = document.getElementById("task-date");
    if(dateInput.value !== "") {
        let plannedTaskDate = appDate.transformDateToDDMMYY(dateInput.value);
        console.log(plannedTaskDate);
        createTaskListSelectedDate(plannedTaskDate);
    }
    else {
        animateEl.accentElement(dateInput);
    }
}

//create task list (parent) for selected date or show planned tasks
function createTaskListSelectedDate(selectedDate) {
    const container = appElements.appContent;
    const listParent = `<ul class = "task-list"></ul>`;
    const listHeader = `<h4 class = "date-list-head">Список заданий на <span id="sheduled-date">${selectedDate}</span></h4>`;
    container.innerHTML = "";
    container.style.justifyContent = "flex-start";
    container.insertAdjacentHTML('afterbegin', listHeader);
    container.insertAdjacentHTML('beforeend', listParent);
    //проверка на наличие заданий на эту дату и вывод
    checkPlannedTasks(selectedDate, container);
}

//check if exist tasks for selected date and render tasks (if exists) or show message (if not) 
function checkPlannedTasks(selectedDate, appContentContainer) {
    let dateTasks = appData.getTodayTaskArr(selectedDate);
    // console.log(todayTasks);
    if(!dateTasks) {
        let emptyListMessage = `<p class = "list-message">Пока ничего не запланировано</p>`;
        appContentContainer.insertAdjacentHTML('beforeend', emptyListMessage);
        showTaskInputForSelectedDate();
    }
    else {
        // let tasksList = selectTaskArr(todayTasks);
        renderTaskListFromArr(dateTasks);
        showTaskInputForSelectedDate();
    }
}

//show task input block for add new tasks on selected date
function showTaskInputForSelectedDate() {
    const taskInput = document.querySelector(".task-input-block");
    const addTaskBtn = document.querySelector(".add-task-btn");
        function showInput() {
                taskInput.style.bottom = 0;
        }
        setTimeout(showInput, 1000);
    addTaskBtn.addEventListener("click", addTasksForDateToMainArr);
}

function addTasksForDateToMainArr() {
    console.log("add item");
}



//************CALL FUNCTIONS***************

// window.onload = fullCurrentDate();
window.onload = showStartContent(appElements.appContent, mainDataArr);
appElements.selectDateBtn.addEventListener("click", showDateSelectBlock);




//full screen api
// document.addEventListener("click", ()=>{
//     document.documentElement.requestFullscreen().catch((e) => {
//         console.log(e);
//     });
// });





