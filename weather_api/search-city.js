
const inputCity = document.getElementById("search-city");
inputCity.addEventListener("keyup", ()=> {searchCity(inputCity.value.toLowerCase())});

function searchCity(key) {
    const cont = document.querySelector(".search-results");
    console.log(key);
    let newArray = citiesArr.filter((el)=> {
        const caseTrans = el.cyrName.toLowerCase();
        if(key!='') {
            return caseTrans.indexOf(key) !== -1;
        }
        
    })
    
    cont.innerHTML = "";
    newArray.forEach(el => {
        
        const result = document.createElement('p');
        result.textContent = el.cyrName;
        cont.appendChild(result);
        
        
    });
    for(let i=0; i<newArray; i++) {
        // cont.appendChild(result);
        console.log(newArray[i]);
        // cont.appendChild(result.innerText[foundArr[i].cyrName]);
    }
    // showSearchList(newArray);
    console.log(newArray)
}



function showSearchList(foundArr) {
    const cont = document.querySelector(".search-results");
    const result = document.createElement('p');
    for(let i=0; i<foundArr; i++) {
        // cont.appendChild(result);
        console.log("dfdf");
        // cont.appendChild(result.innerText[foundArr[i].cyrName]);
    }

}