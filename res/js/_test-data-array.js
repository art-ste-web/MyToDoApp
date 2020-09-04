export {mainDataArr};
//test data array
let mainDataArr = [
    {
        id: 0,
        date: "05.09.2020",
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