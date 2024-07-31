let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(timer);
        document.getElementById('startStop').innerText = 'Start';
        running = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        document.getElementById('startStop').innerText = 'Stop';
        running = true;
    }
}

function recordLap() {
    if (running) {
        const lapTime = elapsedTime;
        laps.push(lapTime);
        const formattedTime = formatTime(lapTime);
        const lapsList = document.getElementById('laps');
        const lapItem = document.createElement('li');
        lapItem.className = 'lap-item';
        lapItem.textContent = formattedTime;
        lapsList.appendChild(lapItem);
    }
}

function fullReset() {
    clearInterval(timer);
    document.getElementById('display').innerText = '00:00:00.000';
    elapsedTime = 0;
    running = false;
    document.getElementById('startStop').innerText = 'Start';
    laps = [];
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
}

function clearLaps() {
    laps = [];
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;
    let minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;
    let seconds = Math.floor(milliseconds / 1000);
    milliseconds = milliseconds % 1000;

    return (
        pad(hours, 2) +
        ':' +
        pad(minutes, 2) +
        ':' +
        pad(seconds, 2) +
        '.' +
        pad(milliseconds, 3)
    );
}

function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
