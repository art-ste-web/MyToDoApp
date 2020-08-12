let genTasksArr = getDataFromLocalStorage();
console.log(genTasksArr);
let genTasksArr1= [
    {
        id: 0,
        date: "31.07.2020",
        tasks: [
            {
                id: 0,
                text: "Выпить кофе",
                done: false,
                trash: false
            },
            {
                id: 1,
                text: "Учить JS",
                done: false,
                trash: false
            }
        ],
        allDone: false

    },
    {
        id: 1,
        date: "12.08.2020",
        tasks: [
            {
                id: 0,
                text: "Бегать",
                done: false,
                trash: false
            },
            {
                id: 1,
                text: "Прогулка",
                done: false,
                trash: false
            },
            {
                id: 2,
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
                id: 0,
                text: "Бегать",
                done: false,
                trash: false
            },
            {
                id: 1,
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
     appContent: document.querySelector(".app-content"),
     dateEl: document.querySelector(".current-date-js"),
     taskListContainer: document.querySelector(".task-list"),
 };

 let appData = {
    todayTaskArr: [],
 }


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

function shortCurrentDate() {
    return fullCurrentDate();
    
}

//get today task array from main data array
function getTodayTaskArr() {
    let todayDate = shortCurrentDate();
    let todayTasks = null;
    genTasksArr.forEach(element => {
        if(element.date == todayDate) {
            todayTasks = element.tasks;
        }
        
    })
    return todayTasks;
}

//show task list for today or create add task btn and add its function
function showStartContent(appContentContainer, mainDataArr) {
    todayDate = shortCurrentDate();
    let todayTasks = getTodayTaskArr();
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

//show input for today task 
function showNewTaskInput() {
    const taskInput = document.querySelector(".task-input-block");
    const addTaskBtn = document.querySelector(".add-task-btn");
        function showInput() {
                taskInput.style.bottom = 0;
        }
        setTimeout(showInput, 1000);
    addTaskBtn.addEventListener("click", addNewTodayTask);
}

//create new today date objecr in main data array
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
        let taskDoneItem = `<li class = "done"><span id = "${element.tId}" class="status checked"></span>${element.text}<span class="trash"></span></li>`;
        if(element.status === true) {
            parentTaskEl.insertAdjacentHTML('beforeend', taskDoneItem);
        }
        else {
            let taskItem = `<li><span  id = "${element.tId}" class="status"></span>${element.text}<span class="trash"></span></li>`;
            parentTaskEl.insertAdjacentHTML('beforeend', taskItem);
        }
        
    });
    
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
    let taskItem = `<li><span class="status"></span>${inputTaskText.value}<span class="trash"></span></li>`;
    appElements.appContent.style.alignItems = "flex-start";
    appElements.appContent.style.justifyContent = "flex-start";
    parentTaskEl.insertAdjacentHTML('beforeend', taskItem);

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
    let todayTasks = getTodayTaskArr();
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
    


//get clicked element and set/unset done status
appElements.taskListContainer.addEventListener("click", (event) => {
    let element = event.target;
    let elCheckedState = false;
    let elId = Number(event.target.id);
    let curDate = shortCurrentDate();
    console.log(elId);
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
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//change task status in main array
function changeStatusOfTask(taskDate, taskId, mainDataArr, elState) {
    mainDataArr.forEach(el =>{
        // console.log(el);
        if(el.date === taskDate) {
            el.tasks.forEach( e => {
                // console.log(e);
                // console.log(typeof(taskId));
                if(e.tId === taskId) {
                    if(elState === true) {
                        e.status = true;
                        console.log(e.status);
                        setToLocalStorage(mainDataArr);
                    }
                    else {
                        e.status = false;
                        console.log(e.status);
                        setToLocalStorage(mainDataArr);
                    }
                }
            })
        }
    })
    
}







// //show date select block
// const selectDateBtn = document.querySelector(".btn-calendar");
// const selectDateBlock = document.querySelector(".date-select");
// selectDateBtn.addEventListener("click", ()=> {
//     selectDateBlock.classList.toggle("show-el");
//     addTaskTodayBtn.classList.toggle("hide-el");
    
// })

// //button "select date" click 

// const confirmDateBtn = document.querySelector(".date-select-btn");
// confirmDateBtn.addEventListener("click", ()=>{
//     const taskDate = document.getElementById("task-date");
//     const adjInsPosition = 'afterbegin';
//     const taskListHeader = `<h2 class="task-list-header">Сделать ${taskDate.value}:</h2>`;
    
//     if(!taskDate.value) {
//         const dateLabel = document.querySelector(".date-select p");
//         accentElement(dateLabel);
        
//     }
//     else {
//         appContent.insertAdjacentHTML(adjInsPosition, taskListHeader);
//         selectDateBlock.classList.toggle("hide-el");
//         selectDateBlock.classList.toggle("show-el");
//         console.log(taskDate.value);
//     }
//     if(appContent.firstElementChild.tagName == "H2") {
//         selectDateBlock.classList.toggle("show-el");
//     }
    
// })


//call functions


fullCurrentDate();
showStartContent(appElements.appContent, genTasksArr);



//full screen api
// document.addEventListener("click", ()=>{
//     document.documentElement.requestFullscreen().catch((e) => {
//         console.log(e);
//     });
// });


// let dateInp = document.getElementById("date_input");
// dateInp.addEventListener("input", ()=> {
//     console.log(dateInp.value);
// })


