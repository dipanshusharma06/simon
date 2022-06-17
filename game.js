var buttonColors=["red","blue","yellow","green"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

$(document).keypress(function(event){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});

$('.btn').click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);     
});

function checkAnswer(currentlevel){

    var l=gamePattern.length, m=userClickedPattern.length;

    if(gamePattern[currentlevel]==userClickedPattern[currentlevel] ){
        if(l==m){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }    
    
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }
}

function nextSequence() {
    
    $("#level-title").text("Level " + level);

    level++;
    userClickedPattern=[];

    var r = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[r];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(input){
    var audio=new Audio(input+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}






