const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

let userClickedPattern = [];
let started = false;
let level = 0;

if (!started) {
  $(document).keypress(function (event) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  });
}

$(".btn").click((event) => {
  const userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern[0]);
  console.log(gamePattern[0]);
});

const playSound = (name) => {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("h1").text(`Level ${level}`);
  const number = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColors[number];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 100);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};
const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
