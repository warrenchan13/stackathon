document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector("#start-button");
  startButton.addEventListener("click", (e) => {
    e.preventDefault();

    const startMenu = document.querySelector(".game-start");
    startMenu.classList.add("hidden");
  });

  const restartButtonWin = document.querySelector("#restart-button-win");
  restartButtonWin.addEventListener("click", (e) => {
    e.preventDefault();

    const endMenuWin = document.querySelector(".game-win");
    endMenuWin.classList.add("hidden");
    window.location.reload();
  });

  const restartButtonLose = document.querySelector("#restart-button-lose");
  restartButtonLose.addEventListener("click", (e) => {
    e.preventDefault();

    const endMenuLose = document.querySelector(".game-lose");
    endMenuLose.classList.add("hidden");
    window.location.reload();
  });
});
