let pomoArr = []
let total = 0;
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
const longBreakBtn = document.getElementById('longBreak')
const pomoBtn = document.getElementById('pomoBtn');
const stopBtn = document.getElementById('stpBtn');
const resetTime = document.getElementById('resetBtn')
const taskTime = document.getElementById('taskTime')
const totalTally = document.querySelector('span')

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


        img.style.width = "125px";
        img.style.width = "125px";
        img.setAttribute('src', "./resources/tomato.png");
        img.className = 'img-fluid'
        pomoArea.appendChild(img)

        img.onclick = function() {
            $(this).fadeOut()
            $(totalTally).fadeIn();
            total += 1;
            totalTally.innerHTML = `POMODOROS: ${total} HOURS: ${total / 2}`
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
    document.title =   `(${timeDis.textContent}) POMODORO!`
    
}

//BUTTON FUNCTIONS
brkBtn.onclick = function() {
    timer(300)
    status = 'started'
    stopBtn.textContent = 'PAUSE'
}
longBreakBtn.onclick = function() {
    timer(600)
    status = 'started'
    stopBtn.textContent = 'PAUSE'
}

pomoBtn.onclick = function() {
    timer(1500)
    status = 'started'
    stopBtn.textContent = 'PAUSE'
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
        stopBtn.textContent = 'PAUSE'
    }
}
resetTime.onclick = function() {
    clearInterval(countDown)
    status = 'stopped'
    timeDis.textContent = '00:00'
    document.title = 'POMODORO!'
    if(stopBtn.textContent === 'RESUME') {
        stopBtn.textContent = 'PAUSE'
    }
}
enterBtn.onclick = function() {
    fillArr();
    $(enterBtn).fadeOut();
    $(reseBtn).fadeIn();
    $(userInput).fadeOut();
    $(userInput).val('');
    $(taskTime).fadeOut();
}

reseBtn.onclick = function() {

    $(enterBtn).fadeIn();
    $(userInput).fadeIn();
    $(taskTime).fadeIn();
    $(totalTally).fadeOut();
    pomoArea.innerHTML = ""
    pomoArr = []
    total = 0;
    
    $(reseBtn).hide();
}
function playAudio() {
    let audio = new Audio('./resources/default.mp3')
    audio.play()
}

//Enter Key
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`)
    if(key.classList.contains('enter')) {
        fillArr();
        $(enterBtn).fadeOut();
        $(reseBtn).fadeIn();
        $(userInput).fadeOut();
        $(userInput).val('');
        $(taskTime).fadeOut();
    }
})