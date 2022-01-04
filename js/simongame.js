var gamePattern=[];
var buttonColor=["red","blue","green","yellow"];
var userClickedPattern=[]

var started=false;
var level=0;

$(document).keypress(function(){
        if(!started){
            $("#level-title").text("Level "+ level);
            newSequence();
            started=true;

        }
       

}); 

$(".btn").click(function(){
   
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);


});



function newSequence(){

    level++;
    $("#level-title").text("Level "+ level);
    
    randomNumber=(Math.floor(Math.random()*4));
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).delay(10).fadeOut().fadeIn("fast"); 
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
function animatePress(currentColor){

        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },100);
        
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{

    if(userClickedPattern.length===gamePattern.length)
    {
        setTimeout(function(){
            newSequence();
            userClickedPattern=[];
        },1000);
    }
   
}
else{
    gameOver();
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    
}

}

function gameOver(){
    
    started=false;
    gamePattern = [];
    userClickedPattern=[];
    level=0;
   
}
