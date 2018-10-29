const fileInput = `Carolina Escobar,0,8,10,5,10,6,6,9,6,10,10,0,0,7,7,0,10,10,0,0,3,0,5,0,0
Cristian Rodriguez,5,8,9,7,10,10,7,1,6,5,5,8,6,10,10,0,8,2,7,9,9,0,8,3,1
Luis Felipe Vergara,6,8,10,9,9,0,1,1,7,7,8,4,2,10,10,10,8,7,9,10,9,9,8,8,7
Ilian Londono,10,10,10,3,10,0,2,8,10,8,8,4,0,8,8,5,5,7,8,6,10,6,7,3,3
Jose Ossa,5,6,10,8,10,8,7,6,10,10,10,9,5,6,5,0,9,10,10,10,10,3,1,0,0
Juan Antonio Pazmino,10,10,5,10,10,8,10,10,10,10,10,0,0,10,7,7,10,10,10,8,10,8,9,3,3
Mateo Zuluaga,5,5,8,9,10,6,6,8,8,6,8,2,2,8,5,5,2,2,4,2,7,7,5,3,9
Oscar Hoyos,2,9,5,10,10,1,2,0,8,7,10,0,0,9,8,2,7,9,1,9,5,0,3,0,0
Paula Garcia,9,9,10,10,9,8,7,8,7,8,8,2,0,9,7,3,7,7,8,0,10,8,0,10,0
Paulo Rosas,7,8,9,6,9,5,6,6,5,10,10,10,2,10,10,10,10,7,5,2,10,6,9,0,10
Santiago Mondragon,5,8,9,8,10,0,8,7,8,9,10,5,0,10,10,8,10,10,10,8,10,10,8,5,2
Santiago Ortiz Guevara,4,4,9,5,10,2,3,2,5,8,8,0,0,10,6,0,4,0,0,5,5,0,5,0,0
Sebastian Restrepo,10,10,10,7,2,6,6,4,4,10,8,0,0,10,8,0,3,3,5,7,9,0,0,7,7
Estefania Montana Buitrago,8,8,10,10,10,8,4,4,7,6,9,0,0,9,9,7,7,6,0,4,10,2,5,7,6`;

let personArray = [];

let dataCSV = [];

Papa.parse(fileInput, {
    delimiter: "", // auto-detect
    newline: "", // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: false,
    trimHeaders: false,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    complete: function (data) {
        dataCSV = data.data;
        console.log(dataCSV, "this is the data obtained")
    }
});



dataCSV.forEach(element => {
    var cosito = [];
    cosito.push(element[0]);

    element.shift();

    element.forEach(elemento => {
        elementoInt = parseInt(elemento);
        cosito.push(elementoInt);

    });

    personArray.push(cosito);
});

console.log(personArray, "the first person array");

localStorage.setItem("personArrayBackup", JSON.stringify(personArray));

personArray.forEach(element => {
    element.shift();
});

function cosSim(array, array0) {

    let aibiArray = [];
    let aPotenciedArray = [];
    let bPotenciedArray = [];

    for (let index = 0; index < array.length; index++) {
        const a = array[index];
        const b = array0[index];

        aibiArray.push(a * b);
        aPotenciedArray.push(Math.pow(a, 2));
        bPotenciedArray.push(Math.pow(b, 2));
    }


    let aibi = aibiArray.reduce((a, b) => a + b, 0);
    let aPotencied = aPotenciedArray.reduce((a, b) => a + b, 0);
    let bPotencied = bPotenciedArray.reduce((a, b) => a + b, 0);

    return aibi / ((Math.sqrt(aPotencied)) * (Math.sqrt(bPotencied)));
}

function getPizzaHood(arrayPerson, personArray, pizzaBros) {

    let personCosSimilars = [];

    personArray.forEach(element => {
        personCosSimilars.push(cosSim(element, arrayPerson));
    });

    localStorage.setItem("personSimsBackup", JSON.stringify(personCosSimilars));

    personCosSimilars.sort();

    while (personCosSimilars.length != pizzaBros + 1) {
        personCosSimilars.shift();
    }

    let personSimsBackup = JSON.parse(localStorage.getItem("personSimsBackup"));
    let personArrayBackup = JSON.parse(localStorage.getItem("personArrayBackup"));

    let pizzaHood = [];

    personCosSimilars.forEach(element => {
        let index = personSimsBackup.indexOf(element);
        pizzaHood.push(personArrayBackup[index]);
    });

    return [pizzaHood, personCosSimilars];
}


let everyPizzaHood = [];

personArray.forEach(element => {
    let persona = {
        pizzaBros: getPizzaHood(element, personArray, 4)[0],
        pizzaSims: getPizzaHood(element, personArray, 4)[1],
        pizzaIngredients: []
    };

    everyPizzaHood.push (persona);

});

console.log (everyPizzaHood);

everyPizzaHood.forEach(element => {
    let ingredients = [];
    for (let i = 0; i < element.pizzaBros[0].length; i++) {
        let ingredientArray = [];
        for (let j = 0; j < element.pizzaBros.length; j++) {
            let ingredientVal = element.pizzaBros[j][i];
            ingredientArray.push(ingredientVal);
        }

        let ingredientSum = ingredientArray.reduce((a, b) => a + b, 0);
        ingredients.push(ingredientSum);
        element.pizzaIngredients = ingredients;
    }
});

everyPizzaHood.forEach(element => {
    element.pizzaIngredients.shift();
    let testArray = [];
    testArray = element.pizzaIngredients.map(ingredient => {

        return ingredient/25;
    });
    console.log(testArray);
});


console.log (everyPizzaHood);