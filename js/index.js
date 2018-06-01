"use strict";
var pickPaper = document.getElementById("box1");
var pickScissors = document.getElementById("box2");
var pickRock = document.getElementById("box3");
var newGame = document.getElementById("newGame");
var rounds = 0 ;
var userScore = 0;
var computerScore = 0;
var log = function(text) {
  document.getElementById("output").innerHTML = text;
};
var computerMove = function() {
  var computerNumber = Math.floor(Math.random() * 3) + 1;
  return computerNumber;
};

pickPaper.addEventListener("click", function() {
  playerMove("paper");
});
pickScissors.addEventListener("click", function() {
  playerMove("scissors");
});
pickRock.addEventListener("click", function() {
  playerMove("rock");
});

var scoreTable = function() {
  document.getElementById("result").innerHTML =
    "Result You: " + userScore + " Computer: " + computerScore + "<br>";
};
pickPaper.disabled = true;
pickScissors.disabled = true;
pickRock.disabled = true;
 
newGame.addEventListener("click", function() {
  rounds = parseInt(window.prompt("Wpisz liczbę rund"),10);
  document.getElementById("rounds").innerHTML = "Liczba rund: " + rounds;
  var userScore = 0;
  var computerScore = 0;
  if (rounds != 0 && rounds != null) {
  pickPaper.disabled = false;
  pickScissors.disabled = false;
  pickRock.disabled = false;
  scoreTable();
  log("Choose Paper, Scissors or Rock")
  }
  else if (rounds === 0 || rounds == null) {
    log("Kliknij NEW GAME i wpisz liczbę rund")
  }
});

var playerMove = function(move) {
  var computer = computerMove();
  if (
    (move === "paper" && computer === 1) ||
    (move === "scissors" && computer === 2) ||
    (move === "rock" && computer === 3)
  ) {
    log("DRAW");
  } else if (
    (move === "paper" && computer === 2) ||
    (move === "scissors" && computer === 3) ||
    (move === "rock" && computer === 1)
  ) {
    computerScore++;
    log("Computer WIN");
  } else {
    userScore++;
    log("You WIN");
  }
scoreTable();
 
  if (computerScore === rounds || userScore === rounds || rounds === 0 ) {
  pickPaper.disabled = true;
  pickScissors.disabled = true;
  pickRock.disabled = true;
  document.getElementById("output").innerHTML += " ENTIRE GAME" +"<br> GAME OVER PLEASE PRESS NEW GAME BUTON";
    
  userScore = 0;
  computerScore = 0;
  
  
 }
};