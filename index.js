let pomoArr = []
let pomosNeeded
let countDown;
let status = 'stopped'
let secz
let currentTimeStamp

const pomoArea = document.getElementById('pomodoros');
const toms = document.getElementById('img');
const userInput = document.querySelector('input');
const enterBtn = document.getElementById('enterBtn');
const reseBtn = document.getElementById('reset');
const timeDis = document.getElementById('display');
const brkBtn = document.getElementById('breakBtn');
const pomoBtn = document.getElementById('pomoBtn');
const stopBtn = document.getElementById('stpBtn');
const resetTime = document.getElementById('resetBtn')


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
//TIMER
function timer(seconds) {
    clearInterval(countDown)
    const now = Date.now();
    const then = Date.now() + seconds * 1000;
    displayTimeLeft(seconds)

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft <= 0) {
            playAudio()
            clearInterval(countDown)           
        }
        timeDis.textContent = secondsLeft
        displayTimeLeft(secondsLeft)
    }, 1000);
}
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    timeDis.textContent = display
    secz = remainderSeconds
}
//BUTTON FUNCTIONS
brkBtn.onclick = function() {
    timer(300)
    status = 'started'
}

pomoBtn.onclick = function() {
    timer(1500)
    status = 'started'
}
stopBtn.onclick = function() {
    if(status === 'started') {
        clearInterval(countDown)
        status = 'paused'
        currentTimeStamp = parseInt(timeDis.textContent) * 60 + secz
        stopBtn.textContent = 'RESUME'
        console.log(currentTimeStamp)
    } else if(status === 'paused') {
        clearInterval(countDown)
        timer(currentTimeStamp)
        status = 'started'
        stopBtn.textContent = 'STOP'
    }
}
resetTime.onclick = function() {
    clearInterval(countDown)
    timeDis.textContent = '00:00'
    if(stopBtn.textContent === 'RESUME') {
        stopBtn.textContent = 'STOP'
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
function playAudio() {
    let audio = new Audio('./resources/default.mp3')
    audio.play()
}