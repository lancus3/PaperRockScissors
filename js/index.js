"use strict";
var pickPaper = document.getElementById("box1");
var pickScissors = document.getElementById("box2");
var pickRock = document.getElementById("box3");
var newGame = document.getElementById("newGame");
var params = {
  rounds: 0,
  userScore: 0,
  computerScore: 0,
  roundsNumber: 0,
  progress: []
};
var computerMap = {
  1: "paper",
  2: "scissors",
  3: "rock"
}




var log = function (text) {
  document.getElementById("output").innerHTML = text;
};
var computerMove = function () {
  var computerNumber = Math.floor(Math.random() * 3) + 1;
  return computerNumber;
};
var buttons = document.querySelectorAll(".player-move");

for (var i = 0; i < buttons.length; i++) {
  var btnClass = buttons[i].getAttribute("data-move");
  buttons[i].addEventListener("click", function () {
    playerMove(btnClass);
  });
}

var scoreTable = function () {
  document.getElementById("result").innerHTML =
    "Result You: " +
    params.userScore +
    " Computer: " +
    params.computerScore +
    "<br>";
};
pickPaper.disabled = true;
pickScissors.disabled = true;
pickRock.disabled = true;

newGame.addEventListener("click", function () {
  params.rounds = parseInt(window.prompt("Wpisz liczbę rund"), 10);
  params.progress.length = 0;
  params.roundsNumber = 0;
  document.getElementById("rounds").innerHTML = "Liczba rund: " + params.rounds;
  params.userScore = 0;
  params.computerScore = 0;
  if (params.rounds != 0 && params.rounds != null) {
    pickPaper.disabled = false;
    pickScissors.disabled = false;
    pickRock.disabled = false;
    scoreTable();
    log("Choose Paper, Scissors or Rock");
  } else if (params.rounds === 0 || params.rounds == null) {
    log("Kliknij NEW GAME i wpisz liczbę rund");
  }
});
function tableCreate() {
  var modalTable = document.querySelector(".table");
  modalTable.innerHTML = "";
  modalTable.innerHTML = ""
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for (var j = 0; j < params.progress.length; j++) {
    var row = document.createElement("tr");
    var paraProgress = params.progress[j];

    for (var key in paraProgress) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(paraProgress[key]);

      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);

  modalTable.appendChild(tbl);

  tbl.setAttribute("border", "2");
}


var showModal = function () {
  document.querySelector("#modal-overlay").classList.add("show");
  document.querySelector(".content").innerHTML =
    " Computer: " + params.computerScore + " You: " + params.userScore;
  tableCreate();

};

var modalLinks = document.querySelectorAll(".show-modal");

var hideModal = function (event) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("show");
};

var closeButtons = document.querySelectorAll(".modal .close");

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

document.querySelector("#modal-overlay").addEventListener("click", hideModal);

var modals = document.querySelectorAll(".modal");

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

var playerMove = function (move) {
  var results = "";
  params.roundsNumber++;
  var computer = computerMove();
  if (
    (move === "paper" && computer === 1) ||
    (move === "scissors" && computer === 2) ||
    (move === "rock" && computer === 3)
  ) {
    log("DRAW");
    results = "draw";
  } else if (
    (move === "paper" && computer === 2) ||
    (move === "scissors" && computer === 3) ||
    (move === "rock" && computer === 1)
  ) {
    params.computerScore++;
    log("Computer WIN");
    results = "Computer WIN"
  } else {
    params.userScore++;
    log("You WIN");
    results = "User WIN";
  }
  scoreTable();
  params.progress.push({

    round: params.roundsNumber,
    userMove: move,
    computerMove: computerMap[computer],
    roundResult: results,
    afterRound: params.userScore + ":" + params.computerScore
  })
  if (params.computerScore === params.rounds || params.rounds === 0) {
    pickPaper.disabled = true;
    pickScissors.disabled = true;
    pickRock.disabled = true;
    showModal();
    document.querySelector(".content").innerHTML +=
      " <br>COMPUTER WIN ENTIRE GAME" + "<br>  PLEASE PRESS NEW GAME BUTTON";

    params.userScore = 0;
    params.computerScore = 0;
  } else if (params.userScore === params.rounds || params.rounds === 0) {
    pickPaper.disabled = true;
    pickScissors.disabled = true;
    pickRock.disabled = true;
    showModal();
    document.querySelector(".content").innerHTML +=
      "<br>CONGRATULATIONS! YOU WIN ENTIRE GAME" +
      "<br>  PLEASE PRESS NEW GAME BUTTON";

    params.userScore = 0;
    params.computerScore = 0;
  }
};
