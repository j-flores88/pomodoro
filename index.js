let total = 0;
let countDown;
let status = 'stopped'
let remainderSeconds;
let currentTimeStamp

const pomoArea = document.getElementById('pomodoros');
const userInput = document.querySelector('input');
const timeDis = document.getElementById('display');
const taskTime = document.getElementById('taskTime')
const totalTally = document.querySelector('span')
const enterBtn = document.getElementById('enterBtn');
const restartBtn = document.getElementById('restart');
const brkBtn = document.getElementById('breakBtn');
const longBreakBtn = document.getElementById('longBreak')
const pomoBtn = document.getElementById('pomoBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetTime = document.getElementById('resetBtn')
const playIcon = document.getElementsByClassName('fas fa-play')
const pauseIcon = document.getElementsByClassName('fas fa-pause')

$(playIcon).hide()
$(restartBtn).hide();

const fillPomos = (amount) => {
    let pomosNeeded = parseInt(amount) * 2;
    let i = 0;
    while (i < pomosNeeded) {
        let img = document.createElement('img')

        img.style.width = "100px";
        img.setAttribute('src', "./resources/tomato.png");
        img.className = 'img-fluid'
        pomoArea.appendChild(img)

        img.onclick = function() {
            $(this).fadeOut()
            $(totalTally).fadeIn();
            total += 1;
            totalTally.innerHTML = `POMODOROS: ${total} HOURS: ${total / 2}`
        }
        i++
    }
}
//TIMER
const timer = (mins) => {
    let time = mins * 60;
    const now = Date.now()
    const then = now + time * 1000

    clearInterval(countDown)
    displayTimeLeft(time)
    //run interval
    countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    
    if(secondsLeft < 0) {
        playAudio()
        clearInterval(countDown)
        document.title = `TIMER DONE`
        return;
    }
    displayTimeLeft(secondsLeft)
    }, 1000)
}

const displayTimeLeft = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    remainderSeconds = remainingSeconds;
    const display = `${minutes}:${remainingSeconds}`

    timeDis.textContent = display
    document.title = `(${timeDis.textContent}) POMODORO!`   
}

//BUTTON FUNCTIONS
brkBtn.onclick = () => {
    timer(5)
    timerStart();
}
longBreakBtn.onclick = () => {
    timer(10)
    timerStart();
}
pomoBtn.onclick = () => {
    timer(25)
    timerStart();
}
const timerStart = () => {
    status = 'started'
    $(playIcon).hide();
    $(pauseIcon).fadeIn();
}
pauseBtn.addEventListener('click', () => {
    if(status === 'started') {
        clearInterval(countDown)
        status = 'paused'
        currentTimeStamp = parseInt(timeDis.textContent) + remainderSeconds / 60;
        //pauseBtn.textContent = 'RESUME'
        $(pauseIcon).hide();
        $(playIcon).fadeIn();
        document.title = 'PAUSED'
    } else if(status === 'paused') {
        clearInterval(countDown)
        timer(currentTimeStamp)
        timerStart();
    }
})
resetTime.addEventListener('click', () => {
    clearInterval(countDown)
    status = 'stopped'
    timeDis.textContent = '00:00'
    document.title = 'POMODORO!'
    if(pauseBtn.textContent === 'RESUME') {
        pauseBtn.textContent = 'PAUSE'
    }
})
restartBtn.addEventListener('click', () => {
    $(enterBtn).fadeIn();
    $(userInput).fadeIn();
    $(taskTime).fadeIn();
    $(totalTally).fadeOut();
    pomoArea.innerHTML = ""
    total = 0;
    
    $(restartBtn).hide();
})
//Enter Key + Button
const enterKeyBtn = () => {
    let amount = document.getElementById('userInput').value
    if(isNaN(amount) || amount === '') return;

    fillPomos(amount)
    $(enterBtn).fadeOut();
    $(restartBtn).fadeIn();
    $(userInput).fadeOut();
    $(userInput).val('');
    $(taskTime).fadeOut();
}
window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') enterKeyBtn();
})
enterBtn.addEventListener('click', () => enterKeyBtn());
//Audio
const playAudio = () => {
    let audio = new Audio('./resources/default.mp3')
    audio.play()
}
