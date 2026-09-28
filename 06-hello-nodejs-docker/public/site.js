// Click "Congratulations!" para repetir la animación.
// Implementado en JS vanilla + CSS: sin jQuery/GSAP/Underscore ni CDNs externos.

const NUM_STARS = 20;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createStars(container, count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'blob';
    star.textContent = '★';
    container.appendChild(star);
  }
}

function animateTitle(title) {
  title.classList.remove('animate-in');
  void title.offsetWidth; // fuerza reflow para poder reiniciar la animación
  title.classList.add('animate-in');
}

function resetBlobs(blobs) {
  blobs.forEach((blob) => {
    blob.style.transition = 'none';
    blob.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
    blob.style.opacity = '1';
    blob.style.display = 'none';
  });
}

function animateBlobs(blobs) {
  const xSeed = randomBetween(350, 380);
  const ySeed = randomBetween(120, 170);

  blobs.forEach((blob) => {
    const speed = randomBetween(1, 5);
    const rotation = randomBetween(5, 100);
    const scale = randomBetween(0.8, 1.5);
    const x = randomBetween(-xSeed, xSeed);
    const y = randomBetween(-ySeed, ySeed);

    blob.style.display = 'block';
    blob.style.transition = `transform ${speed}s ease-out, opacity ${speed}s ease-out`;
    void blob.offsetWidth; // fuerza reflow para que la transición arranque desde el estado actual

    blob.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
    blob.style.opacity = '0';

    blob.addEventListener('transitionend', () => {
      blob.style.display = 'none';
    }, { once: true });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const congrats = document.querySelector('.congrats');
  const title = document.querySelector('h1');

  createStars(congrats, NUM_STARS);
  const blobs = Array.from(congrats.querySelectorAll('.blob'));

  animateTitle(title);
  animateBlobs(blobs);

  congrats.addEventListener('click', () => {
    resetBlobs(blobs);
    requestAnimationFrame(() => {
      animateTitle(title);
      animateBlobs(blobs);
    });
  });
});
