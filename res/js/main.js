let currentDate = new Date();
let currDay = String(currentDate.getDate());
let currMonth = String(currentDate.getMonth()+1);
let currYear = String(currentDate.getFullYear());

console.log(`${currDay}.${currMonth}.${currYear}`);


let dateInp = document.getElementById("date_input");
dateInp.addEventListener("input", ()=> {
    console.log(dateInp.value);
})
