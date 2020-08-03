//show task input bar
const addTaskTodayBtn = document.querySelector(".new-task-btn");
const taskInput = document.querySelector(".task-input-block");
addTaskTodayBtn.addEventListener("click", ()=>{
    taskInput.style.bottom = 0;
    addTaskTodayBtn.style.display = "none";
})


//today date 
let currentDate = new Date();
let currDay = String(currentDate.getDate());
let currWeekDay = String(currentDate.getDay());
let currMonth = String(currentDate.getMonth()+1);
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
const dateEl = document.querySelector(".current-date");
function showCurrentDate(dateEl) {
    dateEl.innerHTML = fullDate;
}
showCurrentDate(dateEl);


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
