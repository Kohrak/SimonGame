var sequence = []
var playerSequence = []
function newMove(num){
  return Math.floor((Math.random() * num));
}

function turn(){
  //generate new move
  sequence.push(newMove(4));
  //display moves
  console.log(sequence)
}
