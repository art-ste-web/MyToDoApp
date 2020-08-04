//app content container
const appContent = document.querySelector(".app-content");

//today date 
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
const dateEl = document.querySelector(".current-date-js");
function showCurrentDate(dateEl) {
    dateEl.innerHTML = fullDate;
}
showCurrentDate(dateEl);

//show task input bar (for adding today tasks)
const addTaskTodayBtn = document.querySelector(".new-task-btn");
const taskInput = document.querySelector(".task-input-block");
addTaskTodayBtn.addEventListener("click", ()=>{
    
    addTaskTodayBtn.style.display = "none";
    function showInput() {
        taskInput.style.bottom = 0;
    }
    setTimeout(showInput, 1000);
    
})

//show date select block
const selectDateBtn = document.querySelector(".btn-calendar");
const selectDateBlock = document.querySelector(".date-select");
selectDateBtn.addEventListener("click", ()=> {
    selectDateBlock.classList.toggle("show-el");
    addTaskTodayBtn.classList.toggle("hide-el");
    
})

//create list for selected date
const adjInsPosition = 'afterbegin';


const confirmDateBtn = document.querySelector(".date-select-btn");
confirmDateBtn.addEventListener("click", ()=>{
    const taskDate = document.getElementById("task-date");
    const taskListHeader = `<h2 class="task-list-header">Задания на ${taskDate.value}</h2>`;
    if(!taskDate.value) {
        const dateLabel = document.querySelector(".date-select p");
        dateLabel.style.transform = "scale(1.1)";
        
    }
    else {
        appContent.insertAdjacentHTML(adjInsPosition, taskListHeader);
        selectDateBlock.classList.toggle("hide-el");
        selectDateBlock.classList.toggle("show-el");
        console.log(taskDate.value);
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
        date: "1.08.2020",
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
console.log(dateTasks);
