
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEL = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const html = document.querySelector('html');

// music 
 
const songs = [
    {
        name: 'G4-1',
        displayName: 'Local Scammer',
        artist: 'G4 Boyz',
        src: "G4-1.jpg"
    },

    {
        name: 'Pobre',
        displayName: 'Pobre',
        artist: 'Joe Love',
        src: "Pobre.jpg"
    },

    {
        name: 'Instagram',
        displayName: 'Instagram',
        artist: 'Joe Love',
        src: "Instagram.jpg"

    },

    {
        name: 'Monigote',
        displayName: 'Mingote',
        artist: 'Almighty',
        src: "Monigote.jpg"
    }
];


// chech if playing 
let isPlaying = false;


/* Play */
function playSong() {
    playBtn.addEventListener
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

/* Pause */
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}


/* play or pause event  listener  */

playBtn.addEventListener('click', (e) => {
    // e.preventDefault();
    // console.log(e)

    (isPlaying ? pauseSong() : playSong())
});


//update dom state

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.src}`;

}


//current song
let songIndex = 0;

//previus song 
function prevSong() {
    songIndex--;
    if (songIndex < 0 ){
        songIndex =songs.length -1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//next song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load - select first song 
loadSong(songs[songIndex]);
// console.log(songs[songIndex]);


//Update Progress Bar en Time

function updateProgressBar(e){
    if (isPlaying){
       const { duration, currentTime}  = e.srcElement;
      

       // update progress bar width
       const progressPercent = (currentTime / duration) * 100;
       progress.style.width = `${progressPercent}%`;

       // calculate display for duration
       const durationMinutes = Math.floor(duration / 60);
       let durationSeconds = Math.floor(duration % 60);
       if (durationSeconds < 10){
           durationSeconds = `0${durationSeconds}`;
       }

       //Delay swiching  duration element to avoit NaN
       if (durationSeconds){
           durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
       }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        
        currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// set progress bar 

function setProgressBar(e){ 
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// event listeners state
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
document.addEventListener('keyup', (e) => ( e.code == "Space") ? playBtn.click(): false);
document.addEventListener('keyup', (e) => ( e.code == "ArrowLeft") ? prevBtn.click(): false);
document.addEventListener('keyup', (e) => ( e.code == "ArrowRight") ? nextBtn.click(): false);

