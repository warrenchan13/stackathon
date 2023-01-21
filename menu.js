document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector("#start-button");

  startButton.addEventListener("click", (e) => {
    e.preventDefault();

    const startMenu = document.querySelector(".game-start");
    startMenu.classList.add("hidden");
  });

  const restartButton = document.querySelector("#restart-button");

  restartButton.addEventListener("click", (e) => {
    e.preventDefault();

    const endMenu = document.querySelector(".game-end");
    endMenu.classList.add("hidden");
  });
});
