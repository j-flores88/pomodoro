let pomoArr = []
let pomosNeeded

const pomoArea = document.getElementById('pomodoros');
const toms = document.getElementById('img');
const userInput = document.querySelector('input');
const enterBtn = document.getElementById('enterBtn');
const reseBtn = document.getElementById('reset');
const timeDis = document.getElementById('display');
const brkBtn = document.getElementById('breakBtn');
const pomoBtn = document.getElementById('pomoBtn');
const stopBtn = document.getElementById('stpBtn');

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

const startTimer = function(duration, display) {
    let timer = duration, minutes, seconds;

    setInterval(function(){
        minutes =  parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timeDis.textContent = minutes + ':' + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000)

    stopBtn.onclick = function() {
        console.log('stop')
        clearInterval()
    }
}

brkBtn.onclick = function() {
    let fiveMins = 60 * 5;
    let display = timeDis;

    startTimer(fiveMins, display)
}

pomoBtn.onclick = function() {
    let pomoMins = 60 * 25;
    let display = timeDis;

    startTimer(pomoMins, display)
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
