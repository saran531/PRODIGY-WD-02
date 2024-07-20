let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateDisplay, 1000);
    running = true;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = 0;
  difference = 0;
  running = false;
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("laps").innerHTML = "";
  laps = [];
}

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("display").innerText =
    hours + ":" + minutes + ":" + seconds;
}

function lapTime() {
  if (running) {
    let lapTime = document.getElementById("display").innerText;
    laps.push(lapTime);
    let lapElement = document.createElement("li");
    lapElement.innerText = "Lap " + laps.length + ": " + lapTime;
    document.getElementById("laps").appendChild(lapElement);
  }
}