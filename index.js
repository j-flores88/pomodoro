let pomoArr = []
let total = 0;
let pomosNeeded
let countDown;
let status = 'stopped'
let remainderSeconds;
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
const pauseBtn = document.getElementById('pauseBtn');
const resetTime = document.getElementById('resetBtn')
const taskTime = document.getElementById('taskTime')
const totalTally = document.querySelector('span')

$(reseBtn).hide();

const fillArr = (amount) => {
    pomosNeeded = parseInt(amount) * 2;
    for(let i = 0; i < pomosNeeded; i++) {
        pomoArr.push(toms)
    }
    fillPomos()
}
const fillPomos = () => {
    for(let i = 0; i < pomoArr.length; i++) {
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
const timer = (mins) => {
    clearInterval(countDown)
    let time = mins * 60;

    countDown = setInterval(() => {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60;
    
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        remainderSeconds = seconds;

        timeDis.textContent = `${minutes}:${seconds}`
        document.title =   `(${timeDis.textContent}) POMODORO!`
    
        if(seconds <= 0 && minutes <= 0) {
            playAudio()
            clearInterval(countDown)
            document.title = `TIMER DONE`
        } else {
            time--
        }
    }, 1000)
}

//BUTTON FUNCTIONS
brkBtn.onclick = () => {
    timer(5)
    timerBtns();
}
longBreakBtn.onclick = () => {
    timer(10)
    timerBtns();
}
pomoBtn.onclick = () => {
    timer(25)
    timerBtns();
}
const timerBtns = () => {
    status = 'started'
    pauseBtn.textContent = 'PAUSE'
}

pauseBtn.onclick = () => {
    if(status === 'started') {
        clearInterval(countDown)
        status = 'paused'
        currentTimeStamp = parseInt(timeDis.textContent) + remainderSeconds / 60;
        pauseBtn.textContent = 'RESUME'
        document.title = 'PAUSED'
    } else if(status === 'paused') {
        clearInterval(countDown)
        timer(currentTimeStamp)
        status = 'started'
        pauseBtn.textContent = 'PAUSE'
    }
}
resetTime.onclick = () => {
    clearInterval(countDown)
    status = 'stopped'
    timeDis.textContent = '00:00'
    document.title = 'POMODORO!'
    if(pauseBtn.textContent === 'RESUME') {
        pauseBtn.textContent = 'PAUSE'
    }
}
reseBtn.onclick = () => {
    $(enterBtn).fadeIn();
    $(userInput).fadeIn();
    $(taskTime).fadeIn();
    $(totalTally).fadeOut();
    pomoArea.innerHTML = ""
    pomoArr = []
    total = 0;
    
    $(reseBtn).hide();
}

//Enter Key + Button
const enterKeyBtn = () => {
    let amount = document.getElementById('userInput').value
    if(isNaN(amount)) return;

    fillArr(amount);
    $(enterBtn).fadeOut();
    $(reseBtn).fadeIn();
    $(userInput).fadeOut();
    $(userInput).val('');
    $(taskTime).fadeOut();
}
window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') enterKeyBtn();
})
enterBtn.onclick = () => enterKeyBtn();
//Audio
const playAudio = () => {
    let audio = new Audio('./resources/default.mp3')
    audio.play()
}
