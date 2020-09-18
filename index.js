let pomoArr = []
let pomosNeeded

const pomoArea = document.getElementById('pomodoros');
const toms = document.getElementById('img');
const userInput = document.querySelector('input');
const enterBtn = document.getElementById('enterBtn');
const reseBtn = document.getElementById('reset');

$(reseBtn).hide();

const fillArr = function(amount){
    amount = document.getElementById('userInput').value
    pomosNeeded = amount * 2;
    
    for(let i = 0; i < pomosNeeded; i++) {
        pomoArr.push(toms)
    }
    fillPomos()
}
const fillPomos = function() {

    for(let j = 0; j < pomoArr.length; j++) {
        let img = document.createElement('img')


        img.style.width = "200px";
        img.style.width = "200px";
        img.setAttribute('src', "./resources/tomato.png");

        pomoArea.appendChild(img)

        img.onclick = function() {
            $(this).fadeOut()
        }
    }
}

enterBtn.onclick = function() {
    fillArr();
    $(enterBtn).fadeOut();
    $(reseBtn).fadeIn();
    $(userInput).fadeOut();
    $(userInput).val('');  
}

reseBtn.onclick = function() {
    $(enterBtn).fadeIn();
    $(userInput).fadeIn();
    pomoArea.innerHTML = ""
    pomoArr = []
    $(reseBtn).hide();
}
