let dateTasks = [
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
        date: "06.08.2020",
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
// console.log(dateTasks);

//pulse animation (accent on element)
function accentElement(el) {
    el.style.animation = "pulse  .8s ease-in-out";
            setTimeout(()=> {
                el.style.animation = "";
            }, 1000)
}



//app content container
const appContent = document.querySelector(".app-content");

//current date 
function showCurrentDate() {
    const dateEl = document.querySelector(".current-date-js");
    let currentDate = new Date();
    let currWeekDay = String(currentDate.getDay());
    let currDay = currentDate.getDate()<10 ? '0'+String(currentDate.getDate()) : String(currentDate.getDate());
    let currMonth = currentDate.getMonth()<10 ? '0'+String(currentDate.getMonth()+1) : String(currentDate.getMonth()+1);
    let currYear = String(currentDate.getFullYear());
    const weekDays = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    let fullDate = `${weekDays[currWeekDay]}, ${currDay}.${currMonth}.${currYear}`;
    let shortDate = `${currDay}.${currMonth}.${currYear}`;
    dateEl.innerHTML = fullDate;
    return shortDate;
}
showCurrentDate();


//show start block 
function showStartContent(appContentContainer) {
    todayDate = showCurrentDate();
    let todayTasks;
    dateTasks.forEach(element => {
        if (todayDate==element["date"]) {
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
    }
    else {
        console.log(todayTasks);
    }
}
showStartContent(appContent);

//create new today task btn click (input task bar show)
function showTodayTaskInput() {
    const addTaskTodayBtn = document.querySelector(".new-task-btn");
    const taskInput = document.querySelector(".task-input-block");
    if (addTaskTodayBtn) {
        addTaskTodayBtn.addEventListener("click", ()=>{
    
            addTaskTodayBtn.style.display = "none";
            function showInput() {
                taskInput.style.bottom = 0;
            }
            setTimeout(showInput, 1000);
            
        })
    }
}
showTodayTaskInput();

//add task to list 
function addNewTodayTask() {
    const addTaskBtn = document.querySelector(".add-task-btn");
    const parentTaskEl = document.querySelector(".task-list");
    
    let dayTaskList = [
            {
                taskId: 0,
                text: "Выпить кофе",
                done: false,
                trash: false
            }
    ]
    addTaskBtn.addEventListener("click", () => {
        const inputTaskText = document.querySelector(".task-text");
        appContent.style.alignItems = "flex-start";
        let taskItem = `<li><span class="status"></span>${inputTaskText.value}<span class="trash"></span></li>`;
        if(inputTaskText.value) {
            parentTaskEl.insertAdjacentHTML('beforeend', taskItem);
            inputTaskText.value = "";
        }
        else {
            accentElement(inputTaskText);
            
        }
    })
}
addNewTodayTask()



//show date select block
const selectDateBtn = document.querySelector(".btn-calendar");
const selectDateBlock = document.querySelector(".date-select");
selectDateBtn.addEventListener("click", ()=> {
    selectDateBlock.classList.toggle("show-el");
    addTaskTodayBtn.classList.toggle("hide-el");
    
})

//button "select date" click 

const confirmDateBtn = document.querySelector(".date-select-btn");
confirmDateBtn.addEventListener("click", ()=>{
    const taskDate = document.getElementById("task-date");
    const adjInsPosition = 'afterbegin';
    const taskListHeader = `<h2 class="task-list-header">Сделать ${taskDate.value}:</h2>`;
    
    if(!taskDate.value) {
        const dateLabel = document.querySelector(".date-select p");
        accentElement(dateLabel);
        
    }
    else {
        appContent.insertAdjacentHTML(adjInsPosition, taskListHeader);
        selectDateBlock.classList.toggle("hide-el");
        selectDateBlock.classList.toggle("show-el");
        console.log(taskDate.value);
    }
    if(appContent.firstElementChild.tagName == "H2") {
        selectDateBlock.classList.toggle("show-el");
    }
    
})







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



