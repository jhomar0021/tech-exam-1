const musicSlider = document.getElementById("musicSlider");
const currentDurationText = document.getElementById("currentDuration");
const musicPlayButton = document.getElementById("musicPlayButton");
const musicPlayIcon = document.getElementById("musicPlaySymbol");
const musicPauseIcon = document.getElementById("musicPauseSymbol");
const musicRecord = document.getElementById("musicRecordImage");
let minutes = 0;
let seconds = 0;

const musicBackButton = document.getElementById("musicBackButton");
const musicForwardButton = document.getElementById("musicForwardButton");


let playing = false;
let Duration = 0;

musicPlayButton.addEventListener("click", () => {
    if(playing == false){
        play();
    }
    else{
        pause();
    }
});

musicBackButton.addEventListener("click", () => {
    reset();
});

musicForwardButton.addEventListener("click", () => {
    reset();
});

function play(){
    playing = true;
    musicRecord.classList.add("animate-spin");
    timerstart();
    musicPauseIcon.classList.remove("d-none");
    musicPlayIcon.classList.add("d-none")

}

function pause(){
    clearInterval(int);
    musicPauseIcon.classList.add("d-none");
    musicPlayIcon.classList.remove("d-none")
    playing = false;
    musicRecord.classList.remove("animate-spin");
}

function timer(){
    if(musicSlider.value == 613){
        reset();
    }
    else{
    Duration +=1;
    musicSlider.value = Duration;

    seconds += 1;
    if(seconds == 60) {
        seconds = 0;
        minutes++;
    }

    
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = 
        seconds < 10
        ? "0" + seconds
        : seconds < 60
        ? seconds
        : seconds;

    currentDurationText.innerHTML = `${m}:${s}`;
}
}

let int;
function timerstart(){
    int = setInterval(timer, 1000);
}

function reset(){
    clearInterval(int);
    Duration = 0;
    minutes =0;
    seconds =0;
    musicSlider.value = 0;
    pause();
    currentDurationText.innerHTML = '00:00';
}