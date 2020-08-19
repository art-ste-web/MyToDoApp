let genTasksArr = getDataFromLocalStorage();
// console.log(genTasksArr);
let genTasksArr1 = [
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
// console.log(genTasksArr);

//pulse animation (accent on element)
function accentElement(el) {
    el.style.animation = "pulse  .8s ease-in-out";
            setTimeout(()=> {
                el.style.animation = "";
            }, 1000)
}


//app globals
 const appElements = {
     selectDateBtn: document.querySelector(".btn-calendar"),
     allDatesListsBtn: document.querySelector(".btn-dates-list"),
     appContent: document.querySelector(".app-content"),
     dateEl: document.querySelector(".current-date-js"),
     taskListContainer: document.querySelector(".task-list"),
     optionsBtn: document.querySelector(".options-btn"),

 };

 let appData = {
    todayTaskArr: [],
 }

//*********DATES FUNCTIONS***********/
//generate current date
function fullCurrentDate() {
    let currentDate = new Date();
    let weekDay = currentDate.getDay();
    let date = currentDate.getDate();
    let month = currentDate.getMonth()+1;
    let year = currentDate.getFullYear();
    let strDate = date.toString();
    let strMonth = month.toString();
    let strYear = year.toString();
    let showCurrDay = date < 10 ? '0' + strDate : strDate;
    let showCurMonth = month < 10 ? '0' + strMonth : strMonth;
    const weekDays = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    let fullDate = `${weekDays[weekDay]}, ${showCurrDay}.${showCurMonth}.${strYear}`;
    let shortDate = `${showCurrDay}.${showCurMonth}.${strYear}`;
    appElements.dateEl.innerHTML = fullDate;
    return shortDate;
}
//short date format DD.MM.YYYY
function shortCurrentDate() {
    return fullCurrentDate();
    
}
//tranform date from DD.MM.YYYY to YYYY-MM-DD
function transformDateToYyMmDd(dateDdMmYy) {
    let dateArr = dateDdMmYy.split(".").reverse();
    let transformedDate = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
    return transformedDate;
}

//tranform date from YYYY-MM-DD to DD.MM.YYYY
function transformDateToDdMmYy(dateYyMmDd) {
    let dateArr = dateYyMmDd.split("-").reverse();
    let transformedDate = `${dateArr[0]}.${dateArr[1]}.${dateArr[2]}`;
    return transformedDate;
}
//*********END DATES FUNCTIONS***********/

/********LOCAL STORAGE FUNCTIONS********/
//save main data array to local storage
function setToLocalStorage(mainArr) {
    localStorage.setItem("MYTODO", JSON.stringify(mainArr));
}

//get data from local storage
function getDataFromLocalStorage() {
    let data = localStorage.getItem("MYTODO");
    let mainDataArr = [];
    if(data) {
        mainDataArr = JSON.parse(data);
        return mainDataArr;
    }
    else {
        return [];
    }
}

//clear local storage
function clearStorage() {
    localStorage.clear();
    document.location.reload();
}
/********END LOCAL STORAGE FUNCTIONS********/    


//********POPUP WINDOW*********/
function showPopUp(popUpData) {
    const popUpWin = document.querySelector(".popup-window");
    const parentEl = appElements.appContent;
    const blockScreen = document.querySelector(".popup-block-screen");
    const popUpMarkup = `<div class = "popup-window">
                            <div class="popup-close"><button class="close-popup-btn"></button></div>
                            <div class="popup-content">
                                <p>${popUpData.bodyText}</p>
                            </div>
                            <div class="popup-btns">
                                <button class="popup-confirm-btn">${popUpData.btnText}</button>
                                <button class="popup-cancel-btn">Отмена</button>
                        </div>
                    </div>`;
    hideOptions();
    blockScreen.style.display = "block";
    if(!popUpWin) {
        parentEl.insertAdjacentHTML('afterbegin', popUpMarkup);
    }
    const confirmBtn = document.querySelector(".popup-confirm-btn");
    const closePopUpBtn = document.querySelector(".close-popup-btn");
    const cancelPopUpBtn = document.querySelector(".popup-cancel-btn");
    confirmBtn.style.backgroundColor = popUpData.btnColor;
    confirmBtn.addEventListener("click", popUpData.btnFunc);
    closePopUpBtn.addEventListener("click", hidePopUp);
    cancelPopUpBtn.addEventListener("click", hidePopUp);
}
//hide popup
function hidePopUp() {
    const blockScreen = document.querySelector(".popup-block-screen");
    const popUpWin = document.querySelector(".popup-window");
    blockScreen.style.display = "none";
    // parentEl.removeChild(popUpWin);
    popUpWin.remove();
}
//********END POPUP WINDOW*********/


//******OPTIONS MENU*****/
appElements.optionsBtn.addEventListener("click", () => {
    const optBtnsCont = document.querySelector(".options-btns-container");
    const closeOptBtn = document.querySelector(".close-options-btn");
    const clearStorageBtn = document.querySelector(".delete-data-btn");
    optBtnsCont.style.display = "flex";
    closeOptBtn.addEventListener("click", () => {
        hideOptions();
    })
    clearStorageBtn.addEventListener("click", () => {
        const root = document.querySelector(':root');
        const rootStyles = getComputedStyle(root);
        const btnColor = rootStyles.getPropertyValue('--danger-red');
        const clearStoragePopUp = {
            bodyText: "Вы уверены, что хотите удалить все сохраненные данные приложения?",
            btnText: "Удалить данные",
            btnColor: btnColor,
            btnFunc: clearStorage,
        };
        showPopUp(clearStoragePopUp);
        
    })
})

//hide options menu
function hideOptions() {
    const optBtnsCont = document.querySelector(".options-btns-container");
    optBtnsCont.style.display = "none";
}
//******END OPTIONS MENU*****/


//get today task array from main data array
function getTodayTaskArr(date) {
    let todayTasks = null;
    genTasksArr.forEach(element => {
        if(element.date == date) {
            todayTasks = element.tasks;
        }
        
    })
    return todayTasks;
}

//show start content (task list for today or create add task btn and add it's function)
function showStartContent(appContentContainer) {
    todayDate = shortCurrentDate();
    let todayTasks = getTodayTaskArr(todayDate);
    // console.log(todayTasks);
    if(!todayTasks) {
        let newTaskBtn = `<div class="new-task-btn"> 
                                <img src="res/img/plus-circle.svg" alt="">
                                <p>Нажмите, чтобы создать список</p>
                             </div>`;
        appContentContainer.insertAdjacentHTML('afterbegin', newTaskBtn);
        appContentContainer.style.justifyContent = "center";
        const addTaskTodayBtn = document.querySelector(".new-task-btn");
        addTaskTodayBtn.addEventListener("click", showTodayTaskInput);
    }
    else {
        // let tasksList = selectTaskArr(todayTasks);
        renderTaskListFromArr(todayTasks);
        showNewTaskInput();
    }
}

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
    todayObj.date = shortCurrentDate();
    todayObj.tasks = [];
    todayObj.allDone = false;
    mainArr.push(todayObj);
    setToLocalStorage(mainArr)
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
    createTodayDateObj(genTasksArr);
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
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//edit text of task item in DOM
function editListItemTextInDom (itemId){
    const inputTaskText = document.querySelector(".task-text");
    const inputAddBtn = document.querySelector(".add-task-btn");
    const inputEditBtn = document.querySelector(".edit-task-btn");
    let selectedItemId = `text${itemId}`;
    inputAddBtn.style.display = "none";
    inputEditBtn.style.display = "block";
    let selectedItem = document.getElementById(selectedItemId);
    inputTaskText.value = selectedItem.innerText;
    console.log(selectedItem);
    inputEditBtn.addEventListener("click", () => {
        
        console.log(selectedItem);
        selectedItem.innerText = inputTaskText.value;
        inputAddBtn.style.display = "block";
        inputEditBtn.style.display = "none";
        console.log(inputTaskText.value);
        inputTaskText.value = "";
        selectedItem = null;
        
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
    const todayDate = shortCurrentDate();
    let todayTasks = getTodayTaskArr(todayDate);
    console.log(todayTasks);
    const inputTaskText = document.querySelector(".task-text");
    if(inputTaskText.value) {
        addNewTaskItemToDOM();
        curTodayTask = createTodayTasksArr(todayTasks);
        inputTaskText.value = "";
        addTodayTaskToMainArr(curTodayTask, genTasksArr);
        // console.log(curTodayTask);
    }
    else {
        accentElement(inputTaskText);
        
    }
    
}
//update main data array with new tasks
function addTodayTaskToMainArr(todayTasksArr, genArr) {
    let dateTaskObj = {};
    let today = shortCurrentDate();
    let arrItem = null;
    if(arrItem = genArr.find(item => item.date == today)) {
        arrItem.tasks = todayTasksArr; 
        console.log('updated');
    }
    else {
        dateTaskObj['id'] = genArr.length;
        dateTaskObj['date'] = shortCurrentDate();
        dateTaskObj['tasks'] = todayTasksArr;
        dateTaskObj['allDone'] = false;
        genArr.push(dateTaskObj);
        console.log("added");
    }
    console.log(genArr);
    setToLocalStorage(genArr);
    return genArr;
}



/******CONTENT BLOCK USER EVENTS******/
//get clicked element and set/unset done status
appElements.appContent.addEventListener("click", (event) => {
    let element = event.target;
    let elCheckedState = false;
    let elId = Number(event.target.id);
    let curDate = shortCurrentDate();
    // console.log(elId);
    if(element.classList.contains("status")) {
        element.classList.toggle("checked");
        element.parentNode.classList.toggle('done');
        if (element.classList.contains("checked")) {
            elCheckedState = true;
            changeStatusOfTask(curDate, elId, genTasksArr, elCheckedState);
        }
        else {
            elCheckedState = false;
            changeStatusOfTask(curDate, elId, genTasksArr, elCheckedState);
        }
        
    }
    else {
        let elChilds = element.childNodes;
        elChilds.forEach(el => {
            if(el.className ==="status") {
                accentElement(el);
            }
        })
    }
    //console.log(element);
})

//edit task
//get double clicked element to edit task text content
appElements.appContent.addEventListener("dblclick", (event) => {
    let element = event.target;
    let getElId = element.id;
    let elId = Number(getElId.substr(4));
    
    console.log(elId);
    editListItemTextInDom (elId);

    // changeTextContentOfTask(taskDate, taskId, mainDataArr, newTaskText);

})

//get clicked trash element and delete task from list
appElements.appContent.addEventListener("click", (event) => {
    let element = event.target;
    let getElId = event.target.id;
    let curDate = shortCurrentDate();
    let trashIdNum = Number(getElId.substr(1));
    // console.log(trashIdNum);
    if(element.classList.contains("trash")) {
        deleteItemFromList(curDate, trashIdNum, genTasksArr);
        let todayTasks = getTodayTaskArr(curDate);
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
            setToLocalStorage(mainDataArr);
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
    setToLocalStorage(mainDataArr);

}

//change task text in main array
function changeTextContentOfTask(taskDate, taskId, mainDataArr, newTaskText) {
    let todayEl = mainDataArr.find(el => el.date === taskDate);
    todayEl.tasks.forEach(el => {
        if(el.tId === taskId) {
            el.text = newTaskText;
            console.log("text edited");
            setToLocalStorage(mainDataArr);
        }
    })
}
//****************TASKS BY DATES*****************/
function showDateSelectBlock() {
    const taskInputBlock = document.querySelector(".task-input-block");
    const parentEl = appElements.appContent;
    let dateDdMmYy = shortCurrentDate();
    let minDate = transformDateToYyMmDd(dateDdMmYy);
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
        let plannedTaskDate = transformDateToDdMmYy(dateInput.value);
        console.log(plannedTaskDate);
        createTaskListSelectedDate(plannedTaskDate);
    }
    else {
        accentElement(dateInput);
    }
}

//create task list (parent) for selected date or show planned tasks
function createTaskListSelectedDate(selectedDate) {
    const container = appElements.appContent;
    const listParent = `<ul class = "task-list"></ul>`;
    const listHeader = `<h4 class = "date-list-head">Список заданий на <span>${selectedDate}</span></h4>`;
    container.innerHTML = "";
    container.style.justifyContent = "flex-start";
    container.insertAdjacentHTML('afterbegin', listHeader);
    container.insertAdjacentHTML('beforeend', listParent);
    //проверка на наличие заданий на эту дату и вывод
    checkPlannedTasks(selectedDate, container);
}

//check if exist tasks for selected date and render tasks (if exists) or show message (if not) 
function checkPlannedTasks(selectedDate, appContentContainer) {
    let dateTasks = getTodayTaskArr(selectedDate);
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

window.onload = fullCurrentDate();
window.onload = showStartContent(appElements.appContent, genTasksArr);
appElements.selectDateBtn.addEventListener("click", showDateSelectBlock);




//full screen api
// document.addEventListener("click", ()=>{
//     document.documentElement.requestFullscreen().catch((e) => {
//         console.log(e);
//     });
// });





