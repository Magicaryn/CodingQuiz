var highscorebox = document.querySelector(".highscore-box");
var timerelement = document.querySelector(".timer-element");
var start = document.querySelector(".start");

var startScreen = document.getElementById("start-screen");
var gameScreen = document.getElementById("game-screen");
var endGame = document.getElementById("end-game");
var questionDisplay = document.getElementById("question-display");
var answersContainer = document.getElementById("answers-container");
var rightAnswer = document.getElementById("right-answer");
var wrongAnswer = document.getElementById("wrong-answer");
var highScoreList = document.getElementById("highscore-list");

var trackQuestion = 0

var timer;
var secondsLeft = 75;

var score = 0;


var quizquestions = [
    {
        question: "The condition in an if/else statement is enclosed within ______",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis",
    },
    {
        question: "String values must be enclosed within ______  when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parethesis"],
        answer: "curly brackets",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal/bash", "for loops", "console log"],
        answer: "console log",
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },

];


function startTimer () {
    timer = setInterval(function() {
        secondsLeft--;
        timerelement.textContent = "Time: " + secondsLeft;
       

    if(secondsLeft <= 0 ) {
        clearInterval(timer);
        endGame.classList.remove("hidden");
        gameScreen.classList.add("hidden");
    }
},
    1000);


}



function isCorrect () {
    rightAnswer.classList.remove("hidden")
    setTimeout(function() {rightAnswer.classList.add("hidden")},2000);

}

function isWrong () {
    wrongAnswer.classList.remove("hidden")
    setTimeout(function() {wrongAnswer.classList.add("hidden")},2000);

}


function startQuiz() {
    secondsLeft = 75;  
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    endGame.classList.add("hidden");                   
    startTimer();
    displayquestion();

}

function displayquestion () {
    questionDisplay.textContent = quizquestions[trackQuestion].question;

    answersContainer.innerHTML = ""

const choices = quizquestions[trackQuestion].choices

    for (let j = 0; j < choices.length; j++) {
        var choicesButton = document.createElement("button");
        choicesButton.textContent = quizquestions[trackQuestion].choices[j];
        answersContainer.appendChild(choicesButton);


      
          }

}
answersContainer.addEventListener("click", function(event) {
    event.preventDefault()
    if(event.target.matches("button")){
        checkAnswer(event.target.textContent)
    }
        })

function checkAnswer(userChoice) {
    const correctanswer = quizquestions[trackQuestion].answer;
 console.log("correctanswer",correctanswer,"userclicked",userChoice)
   if (userChoice === correctanswer) {
     isCorrect();
    } else {
         isWrong();
         secondsLeft -= 10
        }

        trackQuestion++
        if(quizquestions.length > trackQuestion){
            displayquestion()
        } else {
            clearInterval()
            endGame.classList.remove("hidden");
            gameScreen.classList.add("hidden");
        }

}

function endGameScreen() {
    const userinitials = document.querySelector("#initials-input").value.trim() 
    const highscores = JSON.parse(localStorage.getItem("highscores")) || []
    highscores.push(userinitials)
    localStorage.setItem("highscores",JSON.stringify(highscores))
}

    document.querySelector("#initials-form").addEventListener("submit",endGameScreen)



function showHighScores() {
highScoreList.classList.remove("hidden");
endGame.classList.add("hidden");
gameScreen.classList.add("hidden");
startScreen.classList.add("hidden");
highScoreList.textContent = ("High Scores!");
const listofinitials = JSON.parse(localStorage.getItem("highscores")) || []
initial = ""

for( var j = 0; j < listofinitials.length; j++){
initial += `<li>${listofinitials[j]}</li>`
   highScoreList.innerHTML = initial
}
var clearButton = document.createElement("button");
clearButton.textContent = "Clear Highscores";
highScoreList.appendChild(clearButton);

clearButton.addEventListener("click", clearScores)

function clearScores() {
    localStorage.clear();
}
}
 


start.addEventListener("click", startQuiz);

highscorebox.addEventListener("click", showHighScores);

