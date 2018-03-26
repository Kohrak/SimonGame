var sequence = []
var playerSequence = []
var squares = document.querySelectorAll(".square");
function newMove(num){
  return Math.floor((Math.random() * num));
}

function turn(){
  //generate new move
  sequence.push(newMove(4));
  //display moves
  console.log(sequence)
}

function displayMove(square){
  square.classList.toggle("selected");
  setTimeout(function(){
    square.classList.toggle("selected");
  }, 4000);
}
