//Initialize the level variable
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; // Array to store the game pattern
var userClickedPattern = [];

// Function to start the game
$(document).on("keydown", function () {
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// Function for button click. When the button is clicked, add the pressed class and remove it after,
// 50ms. Play the sound for the button that was clicked.
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); // Logic to check answer would go here
});

// Function to generate a random color and store it in the game pattern
function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // Random number between 0 and 3
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // Fade animation to indicate the next button in the sequence.
    playSound(randomChosenColor); // Play the sound for the button that was clicked.
}

// Function to play sound. Create a new audio object and play the sound. Used the the anon function used in the button click.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(nextSequence, 1000); 
      }
    } else {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = false;    level = 0;
        gamePattern = [];
        userClickedPattern = [];
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    }
}
