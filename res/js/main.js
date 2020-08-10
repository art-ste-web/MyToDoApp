let genTasksArr = [
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
        date: "11.08.2020",
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
            }
        ],
        allDone: false

    },
    {
        id: 2,
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
 let appElements = {
     appContent: document.querySelector(".app-content"),
     dateEl: document.querySelector(".current-date-js"),
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
    let showCurrDay = date<10 ? '0' + strDate : strDate;
    let showCurMonth = month<10 ? '0' + strMonth : strMonth;
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


//show task list for today or create add task btn and add its function
function showStartContent(appContentContainer, mainDataArr) {
    todayDate = shortCurrentDate();
    let todayTasks = null;
    mainDataArr.forEach(element => {
        if (todayDate === element["date"]) {
            todayTasks = element;
            return todayTasks;
        }
});
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
        // console.log(todayTasks);
        showTasks(todayTasks);
    }
}

//show today tasks if exist
function showTasks(todayTasks) {
   const todayTaskArr = todayTasks.tasks;
   console.log(todayTaskArr);

}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//renders list to parrent ul element from tasks array
function renderListFromArr(listArr) {

}

//show input on click add task btn
function showTodayTaskInput() {
    const taskInput = document.querySelector(".task-input-block");
    const addTaskTodayBtn = document.querySelector(".new-task-btn");
    const addTaskBtn = document.querySelector(".add-task-btn");
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
    const inputTaskText = document.querySelector(".task-text");
    if(inputTaskText.value) {
        addNewTaskItemToDOM();
        curTodayTask = createTodayTasksArr(appData.todayTaskArr);
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
    return genArr;
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


