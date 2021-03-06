'use strict';

var arrOfProducts = [];
var firstImage = document.getElementById("first-img");
var secondImage = document.getElementById("second-img");
var thirdImage = document.getElementById("third-img");
var getProductSrc = 0;
var trials = 25;
var voteForProducts = document.getElementById('display-products');
var arrOfRenderedProducts = [];
var resultChart = document.getElementById("chart").getContext('2d');
var arrOfNames = [];
var arrOfVotes = [];
var arrOfTimesRendered = [];


function Product(name, path) {
    this.name = name;
    this.path = `img/` + path;
    this.timesRendered = 0;
    this.votes = 0;
    arrOfProducts.push(this);
}

function render(firstImgIndex, secondImgIndex, thirdImgIndex) {
    firstImage.setAttribute("src", arrOfProducts[firstImgIndex].path);
    secondImage.setAttribute("src", arrOfProducts[secondImgIndex].path);
    thirdImage.setAttribute("src", arrOfProducts[thirdImgIndex].path);

    arrOfProducts[firstImgIndex].timesRendered++;
    arrOfProducts[secondImgIndex].timesRendered++;
    arrOfProducts[thirdImgIndex].timesRendered++;
}

function genRandProduct() {
    do {
        var firstImgIndex = Math.round(Math.random() * (arrOfProducts.length - 1));
        var firstRenderedImage = arrOfProducts[firstImgIndex].name;
    } while (checkRenderedProducts(firstRenderedImage));

    do {
        var secondImgIndex = Math.round(Math.random() * (arrOfProducts.length - 1));
        var secondRenderedImage = arrOfProducts[secondImgIndex].name;
        var thirdImgIndex = Math.round(Math.random() * (arrOfProducts.length - 1));
        var thirdRenderedImage = arrOfProducts[thirdImgIndex].name;
    } while (firstImgIndex === secondImgIndex || secondImgIndex === thirdImgIndex || firstImgIndex === thirdImgIndex || checkRenderedProducts(secondRenderedImage) || checkRenderedProducts(thirdRenderedImage))
    // console.log(firstImgIndex);
    // console.log(secondImgIndex);
    // console.log(thirdImgIndex);

    arrOfRenderedProducts = [];
    arrOfRenderedProducts.push(arrOfProducts[firstImgIndex], arrOfProducts[secondImgIndex], arrOfProducts[thirdImgIndex]);
    // console.log(arrOfRenderedProducts);
    render(firstImgIndex, secondImgIndex, thirdImgIndex);
}

function checkRenderedProducts(renderedImages) {
    // console.log(renderedImages);
    // console.log(arrOfRenderedProducts);
    for (var counter3 = 0; counter3 < arrOfRenderedProducts.length; counter3++) {
        // console.log(arrOfRenderedProducts[counter3].name);
        // console.log(counter3);
        if (arrOfRenderedProducts[counter3].name === renderedImages) {
            return true;
        }
    }
    return false;
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


// initialize the images
genRandProduct();

// console.log(arrOfProducts);

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
    for (var counter4 = 0; counter4 < arrOfProducts.length; counter4++){
        arrOfNames.push(arrOfProducts[counter4].name);
        arrOfVotes.push(arrOfProducts[counter4].votes);
        arrOfTimesRendered.push(arrOfProducts[counter4].timesRendered);
    }
        new Chart(resultChart, {
            type: 'bar',
            data: {
                labels: arrOfNames,
                datasets: [{
                    label: '# of Votes',
                    data: arrOfVotes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                  label: '#of Times Images Were Rendered',
                  data: arrOfTimesRendered,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }
            });
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

