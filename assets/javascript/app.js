// Week 5 homework:Totally Trivial Trivia
// Charles Simpson @KC0NUG

var correctNum = 0;
var incorrectNum = 0;
var notAnsweredNum = 0;
var questionNumber = 0;
var time = 0;
var timeToAnswerQuestion =30;
var timerCounter = timeToAnswerQuestion;
var timeBetweenSelections = 2500;

var questionsArray = [
    "Question #1 Hint: You should answer 2nd Choice?",
    "Question #2 Hint: You should answer 1st Choice?",
    "Question #3 Hint: You should answer true?",
    "Question #3 Hint: You should answer false?"
];

var distractorArray = [
    ["1st Choice", "2nd Choice", "3rd Choice", "4th Choice"],
    ["1st Choice", "2nd Choice", "3rd Choice", "4th Choice"],
    ["False", "True"],
    ["False", "True"]
];

var correctArray = [
    1,
    0,
    1,
    0
];


$("#startGame").on("click", function(event) {
    $("#startGame").hide();
    clock();
    generateHTML();

});

$("body").on("click", ".answer", function(event) {
    event.preventDefault();
    selectedAnswer = $(this).text();
    if ( correctArray[questionNumber] === distractorArray[questionNumber].indexOf(selectedAnswer)){
        clearInterval(time);
        correctAnswer();
    } else {
        clearInterval(time);
        wrongAnswer();
    }
});

$("body").on("click", ".reset-button", function(event) {
    correctNum = 0;
    incorrectNum = 0;
    notAnsweredNum = 0;
    questionNumber = 0;
    time = 0;
    timerCounter = timeToAnswerQuestion;
    resetGame();
});

function clock() {
    time = setInterval(runClock, 1000);
    function runClock() {
        if (timerCounter === 0) {
            clearInterval(time);
            questionTimeout();
        }
        if (timerCounter > 0) {
            timerCounter--;
        }
        $(".timer").html(timerCounter);
    }
}

function generateHTML() {  
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" 
        + timerCounter + "</span></h2><h3 class='text-center'>" + questionsArray[questionNumber];
    for (var i = 0; i < distractorArray[questionNumber].length; i++) {
        gameHTML += "</h3><h3 class='answer'>";
        gameHTML += distractorArray[questionNumber][i];
    }
    gameHTML += "</h3>";   
    $(".gameDiv").html(gameHTML);    
};

function correctAnswer() {
    correctNum++;
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center'>Correct! The answer is: " +
        distractorArray[questionNumber][correctArray[questionNumber]] + "</h3>";
    $(".gameDiv").html(gameHTML);
    setTimeout(wait, timeBetweenSelections);
}

function wrongAnswer() {   
    incorrectNum++;
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center'>Incorrect! The answer is: " +
        distractorArray[questionNumber][correctArray[questionNumber]] + "</h3>";
    $(".gameDiv").html(gameHTML);
    setTimeout(wait, timeBetweenSelections);
}

function questionTimeout() {    
    notAnsweredNum++;
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center'>You ran out of time!</h3>" +
        "<h3>The correct answer is: " + distractorArray[questionNumber][correctArray[questionNumber]] + "</h3>";
    $(".gameDiv").html(gameHTML);
    setTimeout(wait, timeBetweenSelections);
}

function endOfGame() {   
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center'>All done, here's how you did!</h3>" +
        "<h3 class='summary-correct'>Correct Answers: " + correctNum +
        "</h3><h3>Incorrect Answers: " + incorrectNum + "</h3><h3>Unanswered: " +
        notAnsweredNum + "</h3>" +
        "<h3 class='text-center reset-button-container'><a class='btn btn-primary btn-lg reset-button' href='#' role='button'>Start Over?</a></h3>";
    $(".gameDiv").html(gameHTML);    
}

function wait() {    
    if (questionNumber < (questionsArray.length-1)) {
        questionNumber++;       
        generateHTML();
        timerCounter = timeToAnswerQuestion;
        clock();
    } else {
        endOfGame();
    }
}

function resetGame() {
    generateHTML();
    clock();
}