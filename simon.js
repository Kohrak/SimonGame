var sequence = [0, 1]
var playerSequence = []
var squares = document.querySelectorAll(".square");
function newMove(num){
  return Math.floor((Math.random() * num));
}

function turn(){
  //generate new move
  sequence.push(newMove(4));
  //display moves
  console.log(sequence);
  execSeq(sequence);
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
