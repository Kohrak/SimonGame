var sequence = [];
var playerSequence = [];
var squares = document.querySelectorAll(".square");
var msg = document.querySelector("#msg");
var statusmsg = document.querySelector("#status")
var scoreDisplay = document.querySelector("#score")
var startButton = document.querySelector("button")
var running = false;
var score = 0
function newMove(num){
  return Math.floor((Math.random() * num));
}

function displayMove(square){
  square.classList.toggle("selected");
  setTimeout(function(){
    square.classList.toggle("selected");
  }, 2000);
}

function execSeq(arr){
  statusmsg.textContent = "Watch!";
  var i = 0;
  var timer = setInterval(function(){
    if (i < arr.length){
      displayMove(squares[sequence[i]]);
      i++
    } else {
      console.log("stop");
      clearInterval(timer);
      running = false;
      statusmsg.textContent = "Play!";
    }
  }, 3000)
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
    msg.textContent = "wrong, watch and start over";
    playerSequence = [];
    execSeq(sequence);
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
      playerMove(this.id);
    }
  })
});

startButton.addEventListener("click", restart);
