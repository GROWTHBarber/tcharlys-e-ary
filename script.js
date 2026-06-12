// ====================================
// MENU MOBILE
// ====================================

const menuToggle = document.querySelector(".menu-toggle");

const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {

  menu.classList.toggle("active");

});

// ====================================
// FECHAR MENU
// ====================================

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {

  link.addEventListener("click", () => {

    menu.classList.remove("active");

  });

});

// ====================================
// BOTÃO VER MAIS
// ====================================

const scrollBtn = document.getElementById("scrollBtn");

scrollBtn.addEventListener("click", () => {

  window.scrollTo({

    top: window.innerHeight,

    behavior: "smooth"

  });

});

// ====================================
// ABRIR PÁGINA DO JOGO
// ====================================

const openGame = document.getElementById("openGame");

openGame.addEventListener("click", () => {

  window.location.href = "jogo.html";

});

// ====================================
// ANIMAÇÃO DOS CARDS
// ====================================

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

  card.style.opacity = "0";

  card.style.transform = "translateY(40px)";

  setTimeout(() => {

    card.style.transition = "0.6s";

    card.style.opacity = "1";

    card.style.transform = "translateY(0)";

  }, index * 250);

});

// ====================================
// EFEITO NAS FOTOS
// ====================================

const photos = document.querySelectorAll(".photo");

photos.forEach(photo => {

  photo.addEventListener("mouseenter", () => {

    photo.style.transform = "scale(1.05)";

  });

  photo.addEventListener("mouseleave", () => {

    photo.style.transform = "scale(1)";

  });

});

// ====================================
// TEXTO DIGITANDO
// ====================================

const title = document.querySelector(".hero-content h2");

const originalText = title.innerText;

title.innerText = "";

let typingIndex = 0;

function typingEffect(){

  if(typingIndex < originalText.length){

    title.innerText += originalText.charAt(typingIndex);

    typingIndex++;

    setTimeout(typingEffect, 80);

  }

}

typingEffect();

// ====================================
// CHUVA DE CORAÇÕES
// ====================================

function createHeartRain(){

  const heart = document.createElement("div");

  heart.innerHTML = "❤️";

  heart.style.position = "fixed";

  heart.style.top = "-20px";

  heart.style.left = Math.random() * window.innerWidth + "px";

  heart.style.fontSize = Math.random() * 20 + 20 + "px";

  heart.style.pointerEvents = "none";

  heart.style.zIndex = "999";

  heart.style.animation = "fall 5s linear forwards";

  document.body.appendChild(heart);

  setTimeout(() => {

    heart.remove();

  }, 5000);

}

setInterval(createHeartRain, 700);

// ====================================
// KEYFRAMES VIA JS
// ====================================

const style = document.createElement("style");

style.innerHTML = `

@keyframes fall{

  0%{
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  100%{
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }

}

`;

document.head.appendChild(style);