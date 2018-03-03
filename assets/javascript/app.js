$(document).ready(function() {

    //Create a screen that create the start button and initial screen    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();

    //create a function, generate HTML(), that is triggered by the start button
    
    $("body").on("click", ".start-button", function(event) {
        event.preventDefault();
        clickSound.play();
        generateHTML();
        
        timerWrapper();
    });

    //Answer the questions
    $("body").on("click", ".answer", function(event) {
        //answered question true
        clickSound.play();         
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            //alert correct

            clearInterval(clock);
            generateWin();
        } 
        else { 
            //alert ("wrong answer")
            clearInterval(clock);
            generateLoss();
        }
    });
//Reset button
$("body").on("click", ".reset-button", function(event) {
    clickSound.play();
    resetGame();
});
});

//Generate Loss due to timeout function
function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class = 'text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class = 'text-center'>You ran out of time ! The correct answer was : " + correctAnswers[questionCounter] + "</P>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

//Generate win function
function generateWin() {
    correctTally++;
    gameHTML = "<p class = 'text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class = 'text-center'> Correct ! The answer is : " + correctAnswers[questionCounter] + "</P>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

//Generate loss function
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class = 'text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class = 'text-center'> Wrong ! The correct answer is : " + correctAnswers[questionCounter] + "</P>" + "<img class='center-block img-wrong' src='assets/images/x.png'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

//assign html for the function
function generateHTML() {
    gameHTML = "<p class = 'text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class = 'text-center'>" + questionArray[questionCounter] + "</P><p class ='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
    $(".mainArea").html(gameHTML);    
}

//each question is given 10 seconds to answer
function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 10;
        timerWrapper();        
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    clock = setInterval(tenSeconds, 1000);
    function tenSeconds() {
        if (counter === 0) {
            clearInterval(clock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class ='timer'>" + counter +" </span></p>" + "<p class='text-center'>All done, here's how you did !" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset the Quiz !</a></p>";
    $(".mainArea").html(gameHTML);
}

//Reset game function
function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 10;
    generateHTML();
    timerWrapper();
}

//declare Arrays

var questionArray = ["What is the largest state in US ?","What is the smallest state in US ?","Which chess piece can only move diagonally?","Name the director of the Lord of the Rings trilogy ?","Name the world's biggest island ?","What famous actor became Governor of California in 2003 ?","Howmany years must a player be retired to be eligible for the Pro Football Hall of Fame ?","What male tennis player has won the most Grand Slam titles ?"];
var answerArray = [["Alaska","Texas","California","Montana"],["Hawai","Connecticut","Delaware","Rhode Island"],["Knight","Bishop","King","Soldier"],["Hena Lewis","Tom Peterson","Peter Jackson","Graham Labroy"],["Madagaskar","Sri Lanka","Greenland","Australia"],["Ronald Reagan","Tom Hanks","Bruce Willies","Arnold Schwarzenegger"],["One year","Four years","Five years","Two years"],["Sergi Bubka","Rafael Nadal","Pete Sampras","Roger Federer"]];
var correctAnswers = ["A. Alaska","D. Rhode Island","B. Bishop","C. Peter Jackson","C. Greenland","D. Arnold Schwarzenegger","C. Five years","D. Roger Federer"];
var imageArray = ["<img class='center-block img-right' src='assets/images/alaska.png'>","<img class='center-block img-right' src='assets/images/rhodeIsland.png'>","<img class='center-block img-right' src='assets/images/bishop.jpg'>","<img class='center-block img-right' src='assets/images/peter.jpg'>","<img class='center-block img-right' src='assets/images/greenland.jpg'>","<img class='center-block img-right' src='assets/images/arnold.png'>","<img class='center-block img-right' src='assets/images/five.png'>","<img class='center-block img-right' src='assets/images/roger.jpg'>"];    

//declare variables
var startScreen;
var gameHTML;
var counter = 10;
var questionCounter = 0;
var selectedAnswer;
var clock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/button-click.mp3");
