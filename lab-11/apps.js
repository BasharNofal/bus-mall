'use stric'

var arrOfProducts = [];
var firstImage = document.getElementById("first-img");
var secondImage = document.getElementById("second-img");
var thirdImage = document.getElementById("third-img");
var getProductSrc = 0;
var trials = 25;
var voteForProducts = document.getElementById('display-products');


function Product(name, path) {
    this.name = name;
    this.path = `img/` + path;
    this.randomlyTimesRendered = 0;
    this.votes = 0;
    arrOfProducts.push(this);
}

function render(firstImgIndex, secondImgIndex, thirdImgIndex) {
    firstImage.setAttribute("src", arrOfProducts[firstImgIndex].path);
    secondImage.setAttribute("src", arrOfProducts[secondImgIndex].path);
    thirdImage.setAttribute("src", arrOfProducts[thirdImgIndex].path);

    arrOfProducts[firstImgIndex].randomlyTimesRendered++;
    arrOfProducts[secondImgIndex].randomlyTimesRendered++;
    arrOfProducts[thirdImgIndex].randomlyTimesRendered++;
}

function genRandProduct() {
    var firstImgIndex = Math.round(Math.random() * (arrOfProducts.length - 1));
    do {
        var secondImgIndex = Math.round(Math.random() * (arrOfProducts.length - 1));
        var thirdImgIndex = Math.round(Math.random() * (arrOfProducts.length - 1));
    } while (firstImgIndex === secondImgIndex || secondImgIndex === thirdImgIndex || firstImgIndex === thirdImgIndex)
    // console.log(firstImgIndex);
    // console.log(secondImgIndex);
    // console.log(thirdImgIndex);


    render(firstImgIndex, secondImgIndex, thirdImgIndex);
}

new Product('bag', 'bag.jpg');
new Product('pen', 'pen.jpg');
new Product('banana', 'banana.jpg');
new Product('bathroom', 'bathroom.jpg');
new Product('boots', 'boots.jpg');
new Product('breakfast', 'breakfast.jpg');
new Product('bubblegum', 'bubblegum.jpg');
new Product('chair', 'chair.jpg');
new Product('cthulhu', 'cthulhu.jpg');
new Product('dog-duck', 'dog-duck.jpg');
new Product('dragon', 'dragon.jpg');
new Product('pet-sweep', 'pet-sweep.jpg');
new Product('scissors', 'scissors.jpg');
new Product('shark', 'shark.jpg');
new Product('sweep', 'sweep.png');
new Product('tauntaun', 'tauntaun.jpg');
new Product('unicorn', 'unicorn.jpg');
new Product('usb', 'usb.gif');
new Product('wine-glass', 'wine-glass.jpg');
new Product('water-can', 'water-can.jpg');

console.log(arrOfProducts);

function searchForProducts() {

    for (var counter = 0; counter < arrOfProducts.length; counter++) {
        if (arrOfProducts[counter].path === getProductSrc) {
            arrOfProducts[counter].votes++;
            if (trials != 0) {
                genRandProduct();
            } else {
                voteForProducts.removeEventListener("click", startRenderProcess);
                addResultButton();
            }
        }
    }
}

function addResultButton() {
    var button = document.createElement("button");
    button.setAttribute("id", "button");
    voteForProducts.appendChild(button);
    button.innerHTML = "Display Voting Results";
    button.addEventListener('click', displayResults);
}


function displayResults(event) {
    var unOrderedList = document.createElement("ul");
    voteForProducts.appendChild(unOrderedList);

    for (var counter2 = 0; counter2 < arrOfProducts.length; counter2++) {
        var listOfResults = document.createElement("li");
        listOfResults.textContent = arrOfProducts[counter2].name + " number of times renered, number of votes = " + arrOfProducts[counter2].randomlyTimesRendered + ", " + arrOfProducts[counter2].votes;
        unOrderedList.appendChild(listOfResults);
    }
}

function startRenderProcess(event) {
    var checkId = event.target.id;
    // console.log(checkId);
    if (checkId === "first-img" || checkId === "second-img" || checkId === "third-img") {
        trials--;
        getProductSrc = event.target.getAttribute('src');
        searchForProducts();
    }
}

voteForProducts.addEventListener('click', startRenderProcess);

