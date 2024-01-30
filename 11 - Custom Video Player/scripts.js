// Fetch the elements
const videoPlayer = document.querySelector('.player__video');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const playBttn = document.querySelector('.player__button');
const controls = document.querySelectorAll('.player__slider');
const skipCntrls = document.querySelectorAll('.player__button');

let playFlag = false;

// Define functions
async function playVideo(){
    if(playFlag){
        try {
            await videoPlayer.play();
            playBttn.innerHTML = '❚ ❚';
        } catch (error) {
            console.error(e);
        }
    }
    else{
        videoPlayer.pause();
        playBttn.innerHTML = '►';
    }
}

function performAction(){
    if(this.name === 'volume'){
        videoPlayer.volume = this.value;
    }else{
        videoPlayer.playbackRate = this.value;
    }
}

function skipVideo(){
    if(this.getAttribute('data-skip') === '-10'){
        videoPlayer.currentTime += -10;
    }else{
        videoPlayer.currentTime += 25;
    }
    updateProgress();
}

function updateProgress(){
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressFilled.style.flexBasis = `${progress}%`;
}

// Event Listeners
playBttn.addEventListener('click', () => {
    playFlag = !playFlag;
    playVideo();
});

videoPlayer.addEventListener('click', () => {
    playFlag = !playFlag;
    playVideo();
});

controls.forEach(control => control.addEventListener('click', performAction));
controls.forEach(control => control.addEventListener('change', updateProgress));
skipCntrls.forEach(sCntrl => sCntrl.addEventListener('click', skipVideo));

