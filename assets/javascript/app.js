// Week 5 homework:Totally Trivial Trivia
// Charles Simpson @KC0NUG

var correctNum = 0;
var incorrectNum = 0;
var notAnsweredNum = 0;
var questionNumber = 0;
var time = 0;
var timeToAnswerQuestion =30;
var timerCounter = timeToAnswerQuestion;
var timeBetweenSelections = 3500;

var questionsArray = [
    "Name that album: ?",
    "Name that album: ?",    
    "Name that album: ?",
    "Name that album: ?",
    "Name that album: ?",
    "Founding guitarist and principal songwriter: ?",
    "Name that album: ?",
    "This post card was included with which album: ?",
    "Shine on You Crazy Diamond, Pts. 1-9,Welcome to the Machine, and 'Which ones Pink' is which album: ?",
    "Where was this Pink Floyd 1971 movie recorded: ?"
];

var distractorArray = [
    ["Atom Heart Mother", "Animals", "The Final Cut", "Pigs on a Wing"],
    ["Atom Heart Mother", "Animals", "The Final Cut", "Pigs on a Wing"],
    ["Atom Heart Mother", "Animals", "The Final Cut", "Dark Side of the Moon"],
    ["Obscured By Clouds", "Animals", "Meddle", "Dark Side of the Moon"],
    ["Obscured By Clouds", "Animals", "Meddle", "Dark Side of the Moon"],
    ["David Gilmore","Syd Barrett"],
    ["Wish You Were Here","Ummagumma","Echos", "Welcome to the Machine"],
    ["Wish You Were Here","Ummagumma","Echos", "Welcome to the Machine"],
    ["Ummagumma","Echos", "Welcome to the Machine","Wish You Were Here"],
    ["Rome","Greece","Pompeii"]
];

var correctArray = [
    1,
    0,
    3,
    2,
    0,
    1,
    1,
    0,
    3,
    2
];

var hasPicArray = [ 
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    false,
    true
];

var picArray = [ "assets/images/Animals.jpg",
    "assets/images/AtomHeartMother.jpg",
    "assets/images/DarkSideofthemoon.jpg",
    "assets/images/Meddle.jpg",
    "assets/images/Obscuredbyclouds.jpg",
    "",
    "assets/images/Umaguma.jpg",
    "assets/images/pfwywh_lp_japan_postcard_front.jpg",
    "",
    "assets/images/pinkfloydpompeii.jpg"
];


$("#startGame").on("click", function(event) {
    $("#startGame").hide();
    clock();
    generateHTML();

});

$("body").on("click", ".answer", function(event) {
    event.preventDefault();
    var indexOfAnswer = $(this).attr("ans-data"); 
    if ( correctArray[questionNumber] == indexOfAnswer) {
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
        + timerCounter + "</span></h2><h3 class='text-center'>" 
        + questionsArray[questionNumber] + "</h3><br>";

    if (hasPicArray[questionNumber]){
        gameHTML += '<img src="';
        gameHTML += picArray[questionNumber];
        gameHTML += '" alt="pinkfloydpic" class="img-thumbnail" style="width:300px;height:300px"><br>';
    }

    for (var i = 0; i < distractorArray[questionNumber].length; i++) {        
        gameHTML += `<button ans-data="${i}" type="button" class="btn btn-primary answer">`;    
        gameHTML += distractorArray[questionNumber][i]; 
        gameHTML += '</button><br>';
    }  
    $(".gameDiv").html(gameHTML);    
};

function correctAnswer() {
    correctNum++;
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center good'>Correct! The answer is: " +
        distractorArray[questionNumber][correctArray[questionNumber]];
    if (hasPicArray[questionNumber]){
        gameHTML += '<br><img src="';
        gameHTML += picArray[questionNumber];
        gameHTML += '" alt="pinkfloydpic" class="img-thumbnail" style="width:300px;height:300px">';
    }

    if (questionNumber===8){
        gameHTML += '<br><img src="assets/images/Wishyouwherehere.jpg"';
        gameHTML += '" alt="pinkfloydpic" class="img-thumbnail" style="width:300px;height:300px">';
        gameHTML += '<img src="assets/images/WishYouWhereHerelg.jpg"';
        gameHTML += '" alt="pinkfloydpic" class="img-thumbnail" style="width:300px;height:300px">';
    }
    gameHTML +="</h3>";
    $(".gameDiv").html(gameHTML);
    setTimeout(wait, timeBetweenSelections);
}

function wrongAnswer() {   
    incorrectNum++;
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center bad'>Incorrect! The answer is: " +
        distractorArray[questionNumber][correctArray[questionNumber]];
    if (hasPicArray[questionNumber]){
        gameHTML += '<br><img src="';
        gameHTML += picArray[questionNumber];
        gameHTML += '" alt="pinkfloydpic" class="img-thumbnail" style="width:300px;height:300px"><br>';
    }
    if (questionNumber===8){
        gameHTML += '<br><img src="assets/images/Wishyouwherehere.jpg"';
        gameHTML += '" alt="pinkfloydpic" class="img-thumbnail" style="width:300px;height:300px">';
        gameHTML += '<img src="assets/images/WishYouWhereHerelg.jpg"';
        gameHTML += '" alt="pinkfloydpic" class="img-thumbnail" style="width:300px;height:300px">';
    }
    gameHTML +="</h3>";
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
        timerCounter + "</span></h2><h3 class='text-center' id='all_done'>All done, here's how you did!</h3>" +
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