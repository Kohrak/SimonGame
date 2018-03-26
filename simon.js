var sequence = [0, 1]
var playerSequence = []
var squares = document.querySelectorAll(".square");

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
  var i = 0;
  var timer = setInterval(function(){
    if (i < arr.length){
      displayMove(squares[sequence[i]]);
      i++
    } else {
      console.log("stop");
      clearInterval(timer);
    }
  }, 3000)
}

function turn(){
  //generate new move
  sequence.push(newMove(4));
  //display moves
  console.log(sequence);
  execSeq(sequence);
}

function playerMove(num){
  playerSequence.push(num);
  var ind = playerSequence.length - 1
  if (playerSequence[ind] != sequence[ind]){
    alert("wrong, watch and start over")
    playerSequence = [];
    execSeq(sequence);
  } else {
    if (ind == sequence.length - 1){
      alert("correct!");
      playerSequence = [];
      turn();
    }
  }
}
