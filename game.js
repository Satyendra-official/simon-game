//global Variables
//buttons colour
var buttonColours = ["red", "blue", "green", "yellow"];

//patterns of the user and the system random pattern array
var userClickPattern = [];
var gamePattern = [];

//level of the user
var level = 0;

//game has been started or not
var started = false;


$(document).keypress(function(){
    if(!started){
        $("h1").html("Level "+level);
        nextSequence();
        started = true;
    }
  });


  //user click listener.
$(".btn").click(function(event){
    var userChosenColour = event.target.id;   
    userClickPattern.push(userChosenColour)

    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length-1)
    
});

//system sequence function
function nextSequence() {
    userClickPattern=[];
    level++;

    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

//answer matched here.
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickPattern[currentLevel]){

        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        } else{

        }
         
    } else{
        playSound("wrong"); 
        $("body").addClass("game-over");
        $("#level-title").text("Game Over");

        setTimeout(function(){
            $("body").removeClass("game-over");
            $("#level-title").text("Game Over! Press Any Key to Restart");
        },200);   

        startOver();
        
    }
    
}

//To restart the game
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}


//sounds
function playSound(name){
    var buttonSound = new Audio("./sounds/"+name+".mp3")
    buttonSound.play();
}


//animations
function animatePress(currentColor) {
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}
