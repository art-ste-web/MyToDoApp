
const inputCity = document.getElementById("search-city");
inputCity.addEventListener("change", searchCity(inputCity.value));

function searchCity(key) {
    let newArray = citiesArr.filter((el)=> {
        const caseTrans = el.cyrName.toLowerCase();
        return caseTrans.indexOf(key) !== -1;
    })
    console.log(newArray)
    showSearchList(newArray);
}



function showSearchList(foundArr) {
    const cont = document.querySelector(".search-results");
    const result = document.createElement('p');
    for(let i=0; i<foundArr; i++) {
        cont.appendChild(result.innerText[foundArr[i].cyrName]);
    }

}