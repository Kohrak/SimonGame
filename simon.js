var sequence = [];
var playerSequence = [];
var squares = document.querySelectorAll(".square");
var msg = document.querySelector("#msg");
var statusmsg = document.querySelector("#status");
var scoreDisplay = document.querySelector("#score");
var startButton = document.querySelector("#startb");
var strictButton = document.querySelector("#strictb")
var running = false;
var score = 0
var strict = false;

var sounds = [
  new Howl({src: ['sounds/dotted-spiral.mp3']}),
  new Howl({src: ['sounds/suspension.mp3']}),
  new Howl({src: ['sounds/moon.mp3']}),
  new Howl({src: ['sounds/zig-zag.mp3']})
]
function newMove(num){
  return Math.floor((Math.random() * num));
}

function displayMove(square, sound){
  square.classList.toggle("selected");
  sound.play();
  setTimeout(function(){
    square.classList.toggle("selected");
  }, 1500);
}

function execSeq(arr){
  statusmsg.textContent = "Watch!";
  var i = 0;
  var timer = setInterval(function(){
    if (i < arr.length){
      displayMove(squares[sequence[i]], sounds[sequence[i]]);
      i++
    } else {
      console.log("stop");
      clearInterval(timer);
      running = false;
      statusmsg.textContent = "Play!";
    }
  }, 2000)
}

function turn(){
  //generate new move
  sequence.push(newMove(4));
  //display moves
  running = true;
  execSeq(sequence);
}

function displayScore(){
  scoreDisplay.textContent = score;
}

function playerMove(num){
  playerSequence.push(num);
  var ind = playerSequence.length - 1
  if (playerSequence[ind] != sequence[ind]){
    if(strict){
      alert("you will have to start from the start");
      restart();
    } else {
      msg.textContent = "wrong, watch and start over";
      playerSequence = [];
      execSeq(sequence);
    }
  } else {
    if (ind == sequence.length - 1){
      msg.textContent = "correct!"
      playerSequence = [];
      turn();
      score ++
      displayScore();
    }
  }
}

function restart(){
  sequence = [];
  playerSequence = [];
  score = 0;
  displayScore();
  msg.textContent = "Let's go";
  statusmsg.textContent = "";
  turn();
}

squares.forEach(function(square){
  square.addEventListener("click", function(){
    if (!running && sequence.length > 0){
      sounds[this.id].play();
      playerMove(this.id);
    }
  })
});

startButton.addEventListener("click", restart);

strictButton.addEventListener("click", function(){
  strict = strict == true ? false : true;
  restart();
})
