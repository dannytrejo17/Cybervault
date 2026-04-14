const phrases = [
  "Aprende y guarda tus comandos de hacking ético",
  "Explora vulnerabilidades reales",
  "Domina la seguridad ofensiva",
  "Practica como un profesional"
];

let i = 0;          // índice de la frase actual
let j = 0;          // índice de carácter actual
let currentText = "";
let deleting = false;

function typeEffect() {
  const subtitle = document.getElementById("subtitle");
  const fullText = phrases[i];

  if (!deleting) {
    currentText = fullText.slice(0, j + 1);
    subtitle.innerHTML = currentText;
    j++;

    if (j === fullText.length) {
      deleting = true;
      setTimeout(typeEffect, 1500); // espera antes de borrar
      return;
    }
  } else {
    currentText = fullText.slice(0, j - 1);
    subtitle.innerHTML = currentText;
    j--;

    if (j === 0) {
      deleting = false;
      i = (i + 1) % phrases.length; // pasa a la siguiente frase
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 100); // más rápido al borrar
}

// Inicia la animación
typeEffect();



