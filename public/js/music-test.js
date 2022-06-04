let mySongs =[

    {
        name: "Sleepless",
        artist: "Epik high",
        img: "1",
        audio: "1",
    },

    {
        name: "The Weekend",
        artist: "88rising/BIBI",
        img: "2",
        audio: "2",
    },

    {
        name: "Peaches",
        artist: "Justin Bieber",
        img: "3",
        audio: "3",
    },

    {
        name: "Treasure",
        artist: "Bruno Mars",
        img: "4",
        audio: "4",       
    },

]
//Get the all stuff in container class
const container = document.querySelector(".container");


const mPic = document.getElementsByTagName("img");//Album picture
const mTit = container.querySelector(".content .name");//Music title
const mPpl = container.querySelector(".content .artist");//Music artist

// Set button
// Store class into variation
const list = container.querySelector(".list");//list class
const pp = container.querySelector(".pp");// play&pause button class

// Store button stuff
const ppB = container.querySelector("#pplay");
const preB = container.querySelector("#previous");//previous song button
const nextB = container.querySelector("#next"); //next song button
const mLB = container.querySelector("#mlist");//Music list button
const switchModeB = container.querySelector("#repeat");
const cB = list.querySelector("#close");//Close button

//Set progress variation
const progress = container.querySelector(".progress");
const bar = progress.querySelector(".bar");

//Musicfile
const songs = container.querySelector("#songs");

console.log(switchModeB)
let mySongsNumber = Math.floor(Math.random() * mySongs.length + 1);
isMusicPaused = true;


//Add a loading music event to the window
window.addEventListener("load", () => {
  loadMusic(mySongsNumber);
  //playingSong();
});


// Write a funnction which is used to load the music
function loadMusic(index) {
  //Get the songs name and artist
  mTit.innerText = mySongs[index - 1].name;
  mPpl.innerText = mySongs[index - 1].artist;
  //Get the album image and mp3 file
  //Add .src t create the right file format into class
  //mPic.src = `../image/${mySongs[index - 1].img}.jpg`;
  //songs.src = `../songs/${mySongs[index - 1].audio}.mp3`;
  mPic.src = "../image/"+mySongs[index - 1].img+".jpg";
  songs.src = "../songs/"+mySongs[index - 1].img+".mp3";
  console.log(mTit.innerText);
  console.log(mPpl.innerText);
  console.log(mySongs[index - 1])
  console.log(index);
  console.log(mPic);
  console.log(songs.src);
  console.log(mPic.src);
}


//Write function and adding event to meet the basic requirement for the ply and paause music.
// Write a function to play the music
function playMusic() {
  // Display pause button while playing
  container.classList.add("paused");
  ppB.setAttribute("class", "icon icon-pause_circle_outline");
  //Play the music
  songs.play();
}

// Write a function to pause the music
function pauseMusic() {
  // Display play button while pausing
  container.classList.remove("paused");
  ppB.setAttribute("class", "icon icon-play_circle_outline");
  //Pause the music
  songs.pause();
}

//Add a click event to the play and puse class"pp"  
pp.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("paused");//Use paused class to judge the music condition
  isMusicPlay ? pauseMusic() : playMusic();
   //playingSong();
  //Test code below
//switch(isMusicPlay){
  //case truthy:
    //pauseMusic();
  //case falsy:
    //playMusic();  
  }
);//default is false

//Basic function to switch music between now, previous and next one
//------BELOW------
//Write a function to play last music
function prevMusic() {
  mySongsNumber--;

  mySongsNumber < 1 ? (mySongsNumber = mySongs.length) : (mySongsNumber = mySongsNumber);
  loadMusic(mySongsNumber);
  playMusic();
  //playingSong();
}

//Write a function to play next muisc
function nextMusic() {
  mySongsNumber++;

  mySongsNumber > mySongs.length ? (mySongsNumber = 1) : (mySongsNumber = mySongsNumber);
  loadMusic(mySongsNumber);
  playMusic();
  //playingSong();
}

//Add click event
preB.addEventListener("click", () => {prevMusic()});

//Add click event
nextB.addEventListener("click", () => {nextMusic()});


//Update the progress bar
//------BELOW------
//Add an update time of a song event to the songs doc
songs.addEventListener("timeupdate", (e) => {
  //Get the current time
  const currentTime = e.target.currentTime;
  //Get whole length
  const duration = e.target.duration;
  //Get percent
  let pWidth = (currentTime / duration) * 100;
  //pass the results to the css
  bar.style.width = `${pWidth}%`;

  let musicCurrentTime = container.querySelector(".now"),
    musicDuartion = container.querySelector(".end");

  
  //Add an update loadingtime of a song event to the songs doc
  songs.addEventListener("loadeddata", () => {
    let mainAdDuration = songs.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    //Caculating time
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    //Whole duration
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  //Update current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//Add an click event to jump the progress bar
progress.addEventListener("click", (e) => {
  //Get the width
  let pWidth = progress.clientWidth;
  //get the X coordinate
  let clickedOffsetX = e.offsetX;
  let songDuration = songs.duration;
  songs.currentTime = (clickedOffsetX /pWidth) * songDuration;
  playMusic();
  playingSong();
});

//Set clicking event for player
//While user interact with repeat button, the icon will change
//------Code below-----
switchModeB.addEventListener("click", () => {
  let getText = switchModeB.id;
  console.log(getText);
  switch (getText) {
    // Write 3 modes to change the case if click the botton
    case "repeat":
      switchModeB.setAttribute("class", "icon icon-repeat_one");
      switchModeB.setAttribute("id", "repeat_one");
      break;
    case "repeat_one":
      switchModeB.setAttribute("class", "icon icon-shuffle");
      switchModeB.setAttribute("id", "shuffle");
      break;
    case "shuffle":
      switchModeB.setAttribute("class", "icon icon-repeat");
      switchModeB.setAttribute("id", "repeat");
      break;
  }
});


// Add ending event  
songs.addEventListener("ended", () => {
  let getText = switchModeB.id;
  console.log(getText);
  switch (getText) {
    // Write 3 modes to change the case if click the botton
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      songs.currentTime = 0;
      loadMusic(mySongsNumber);
      playMusic();
      break;
    case "shuffle":
      //Get random muisc list number
      let randnum = Math.floor(Math.random() * mySongs.length + 1);
      do {
        randnum = Math.floor(Math.random() * mySongs.length + 1);
      } while (mySongsNumber == randnum);
      mySongsNumber = randnum;
      loadMusic(mySongsNumber);
      playMusic();
      playingSong();
      break;
  }
});


mLB.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

cB.addEventListener("click", () => {
  mLB.click();
});

const ulTag = container.querySelector("ul");

