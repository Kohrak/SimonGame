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
var limit = 20;
var sounds = [
  new Howl({src: ['sounds/ufo.mp3']}),
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
  sounds[num].play();
  playerSequence.push(num);
  var ind = playerSequence.length - 1
  if (playerSequence[ind] != sequence[ind]){
    if(strict){
      alert("you will have to start from the start");
      setTimeout(restart, 2000);
    } else {
      msg.textContent = "wrong, watch and start over";
      playerSequence = [];
      execSeq(sequence);
    }
  } else {
    if (ind == sequence.length - 1){
      msg.textContent = "correct!"
      score ++
      displayScore();
      if (score == limit){
        alert("you win!");
        setTimeout(restart, 2000);
      } else {
        playerSequence = [];
        turn();
      }
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
      playerMove(this.id);
    }
  })
});

startButton.addEventListener("click", restart);

strictButton.addEventListener("click", function(){
  strict = strict == true ? false : true;
  restart();
})
