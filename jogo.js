// ====================================
// SCORES
// ====================================

let player1 =
Number(localStorage.getItem("player1")) || 0;

let player2 =
Number(localStorage.getItem("player2")) || 0;

// ====================================
// PLAYER ESCOLHIDO
// ====================================

let selectedPlayer = null;

// ====================================
// ELEMENTOS
// ====================================

const startScreen =
document.getElementById("startScreen");

const gameScreen =
document.getElementById("gameScreen");

const startGameBtn =
document.getElementById("startGameBtn");

const player1Btn =
document.getElementById("player1Btn");

const player2Btn =
document.getElementById("player2Btn");

const score1 =
document.getElementById("score1");

const score2 =
document.getElementById("score2");

const currentPlayerText =
document.getElementById("currentPlayerText");

const gameArea =
document.getElementById("gameArea");

const winner =
document.getElementById("winner");

const resetBtn =
document.getElementById("resetBtn");

const leftBtn =
document.getElementById("leftBtn");

const rightBtn =
document.getElementById("rightBtn");

// ====================================
// PLAYER
// ====================================

const player =
document.createElement("div");

player.innerHTML = "❤️";

player.classList.add("player");

gameArea.appendChild(player);

// ====================================
// POSIÇÃO
// ====================================

let playerX = 150;

// ====================================
// ESCOLHER PLAYER
// ====================================

player1Btn.addEventListener("click", () => {

  selectedPlayer = 1;

  currentPlayerText.innerText =
  "Você é o Player 1";

  // VISUAL
  player1Btn.style.opacity = "1";

  player2Btn.style.opacity = "0.5";

});

player2Btn.addEventListener("click", () => {

  selectedPlayer = 2;

  currentPlayerText.innerText =
  "Você é o Player 2";

  // VISUAL
  player2Btn.style.opacity = "1";

  player1Btn.style.opacity = "0.5";

});

// ====================================
// START GAME
// ====================================

startGameBtn.addEventListener("click", () => {

  if(!selectedPlayer){

    alert("Escolha um player!");

    return;

  }

  startScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

});

// ====================================
// MOVIMENTO
// ====================================

function moveLeft(){

  playerX -= 35;

  if(playerX < 0){

    playerX = 0;

  }

  player.style.left = playerX + "px";

}

function moveRight(){

  playerX += 35;

  if(playerX >
  gameArea.clientWidth - 60){

    playerX =
    gameArea.clientWidth - 60;

  }

  player.style.left = playerX + "px";

}

// ====================================
// CONTROLES PC
// ====================================

document.addEventListener("keydown", (e) => {

  // JOGO TRAVADO
  if(!selectedPlayer) return;

  if(e.key === "ArrowLeft"){

    moveLeft();

  }

  if(e.key === "ArrowRight"){

    moveRight();

  }

});

// ====================================
// CONTROLES MOBILE
// ====================================

leftBtn.addEventListener(
"touchstart",
() => {

  if(!selectedPlayer) return;

  moveLeft();

}
);

rightBtn.addEventListener(
"touchstart",
() => {

  if(!selectedPlayer) return;

  moveRight();

}
);

// ====================================
// UPDATE
// ====================================

function updateScreen(){

  score1.innerText =
  player1 + " pontos";

  score2.innerText =
  player2 + " pontos";

}

updateScreen();

// ====================================
// PARTÍCULAS
// ====================================

function createExplosion(x, y){

  for(let i = 0; i < 12; i++){

    const particle =
    document.createElement("div");

    particle.innerHTML = "💥";

    particle.style.position = "absolute";

    particle.style.left = x + "px";

    particle.style.top = y + "px";

    particle.style.fontSize = "1.2rem";

    particle.style.pointerEvents = "none";

    particle.style.transition =
    "0.8s linear";

    gameArea.appendChild(particle);

    const randomX =
    (Math.random() - 0.5) * 200;

    const randomY =
    (Math.random() - 0.5) * 200;

    setTimeout(() => {

      particle.style.transform =
      `translate(${randomX}px, ${randomY}px)
      scale(0) rotate(360deg)`;

      particle.style.opacity = "0";

    }, 10);

    setTimeout(() => {

      particle.remove();

    }, 800);

  }

}

// ====================================
// TELA TREMER
// ====================================

function shakeScreen(){

  gameArea.style.animation =
  "shake 0.3s";

  setTimeout(() => {

    gameArea.style.animation = "";

  }, 300);

}

// ====================================
// CSS SHAKE
// ====================================

const style =
document.createElement("style");

style.innerHTML = `

@keyframes shake{

  0%{transform:translateX(0);}
  20%{transform:translateX(-10px);}
  40%{transform:translateX(10px);}
  60%{transform:translateX(-10px);}
  80%{transform:translateX(10px);}
  100%{transform:translateX(0);}

}

`;

document.head.appendChild(style);

// ====================================
// BOMBA
// ====================================

function createBomb(){

  // JOGO TRAVADO
  if(!selectedPlayer) return;

  const bomb =
  document.createElement("div");

  bomb.innerHTML = "💣";

  bomb.style.position = "absolute";

  bomb.style.fontSize = "2.5rem";

  bomb.style.top = "-50px";

  bomb.style.left =
  Math.random() *
  (gameArea.clientWidth - 50)
  + "px";

  bomb.style.transition =
  "transform 0.1s";

  gameArea.appendChild(bomb);

  let bombY = -50;

  const fall = setInterval(() => {

    bombY += 8;

    bomb.style.top =
    bombY + "px";

    bomb.style.transform =
    `rotate(${bombY * 3}deg)`;

    // ====================================
    // COLISÃO REALISTA
    // ====================================

    const playerRect =
    player.getBoundingClientRect();

    const bombRect =
    bomb.getBoundingClientRect();

    // CENTROS
    const playerCenterX =
    playerRect.left +
    playerRect.width / 2;

    const playerCenterY =
    playerRect.top +
    playerRect.height / 2;

    const bombCenterX =
    bombRect.left +
    bombRect.width / 2;

    const bombCenterY =
    bombRect.top +
    bombRect.height / 2;

    // DISTÂNCIAS
    const distanceX =
    playerCenterX - bombCenterX;

    const distanceY =
    playerCenterY - bombCenterY;

    // DISTÂNCIA FINAL
    const distance =
    Math.sqrt(

      distanceX * distanceX +

      distanceY * distanceY

    );

    // HITBOX
    const collisionDistance = 40;

    // ====================================
    // COLISÃO
    // ====================================

    if(distance < collisionDistance){

      clearInterval(fall);

      // EXPLOSÃO
      createExplosion(

        bomb.offsetLeft,

        bomb.offsetTop

      );

      // TREMER
      shakeScreen();

      // REMOVER
      bomb.remove();

      // PLAYER 1
      if(selectedPlayer === 1){

        player1 = 0;

        localStorage.setItem(
          "player1",
          player1
        );

      }

      // PLAYER 2
      else{

        player2 = 0;

        localStorage.setItem(
          "player2",
          player2
        );

      }

      // UPDATE
      updateScreen();

      // DANO PLAYER
      player.style.transform =
      "scale(1.5)";

      player.style.filter =
      "drop-shadow(0 0 20px red)";

      setTimeout(() => {

        player.style.transform =
        "scale(1)";

        player.style.filter =
        "none";

      }, 300);

      // TEXTO
      winner.innerText =
      "💥 Você perdeu! Pontos zerados.";

      setTimeout(() => {

        winner.innerText = "";

      }, 2000);

    }

    // ====================================
    // PASSOU
    // ====================================

    if(bombY >
    gameArea.clientHeight){

      clearInterval(fall);

      bomb.remove();

      // PLAYER 1
      if(selectedPlayer === 1){

        player1++;

        localStorage.setItem(
          "player1",
          player1
        );

      }

      // PLAYER 2
      else{

        player2++;

        localStorage.setItem(
          "player2",
          player2
        );

      }

      updateScreen();

    }

  }, 20);

}

// ====================================
// LOOP
// ====================================

setInterval(() => {

  createBomb();

}, 900);

// ====================================
// RESET
// ====================================

resetBtn.addEventListener("click", () => {

  player1 = 0;

  player2 = 0;

  localStorage.removeItem("player1");

  localStorage.removeItem("player2");

  updateScreen();

});