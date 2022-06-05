//Get global variable
const stopwatch_time =document.querySelector('.watch .time'),
startB = document.getElementById('start'),
stopB = document.getElementById('stop'),
resetB = document.getElementById('reset');

let seconds =0;
let interval = null;

//Add event listner
startB.addEventListener('click', start);
stopB.addEventListener('click', stop);
resetB.addEventListener('click', reset);

//update timer
function timer(){
    seconds ++;

    // Set the format
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs*3600)) / 60);
    let secs = seconds % 60 ;
    
    //Set the format
    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;


    stopwatch_time.innerText = `${hrs}:${mins}:${secs}`;
}

function start(){
    if (interval){
        return
    }

    interval = setInterval(timer, 1000)
}

function stop(){
    clearInterval(interval);
    interval = null;
}

function reset(){
    stop();
    seconds = 0;
    stopwatch_time.innerText = "00:00:00"
}