let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = Array(9).fill("");

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("please enter both players names. ");
    return;
  }
  currentPlayer = player1;
  document.querySelector(
    ".message"
  ).textContent = `${currentPlayer},you're up!`;
  document.getElementById("input-section").style.display = "none";
  document.getElementById("game").style.display = "block";

  //add click listners to each cell
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = parseInt(cell.id) - 1;

      if (board[index] !== "") return; //already filled

      board[index] = currentSymbol;
      cell.textContent = currentSymbol;

      if (checkWin()) {
        document.querySelector(
          ".message"
        ).textContent = `${currentPlayer}, congratulations you won!`;
        disableBoard();
        return;
      }
      if (board.every((cell) => cell != "")) {
        document.querySelector(".message").textContent = `It's a draw`;
        return;
      }

      //switch player
      currentSymbol = currentSymbol === "X" ? "0" : "X";
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      document.querySelector(
        ".message"
      ).textContent = `${currentPlayer}, you're up!`;
    });
  });
  function checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        board[a] === currentSymbol &&
        board[b] === currentSymbol &&
        board[c] === currentSymbol
      );
    });
  }
  function disableBoard() {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
  }
});
