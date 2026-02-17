export function createGameCarousel(screenshots) {
  const carousel = document.createElement('div');
  carousel.className = 'carousel';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev';
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next';
  nextBtn.textContent = '›';

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  screenshots.forEach(s => {
    const img = document.createElement('img');
    img.src = s.image;
    img.alt = 'Screenshot du jeu';
    track.appendChild(img);
  });

  viewport.appendChild(track);
  carousel.appendChild(prevBtn);
  carousel.appendChild(viewport);
  carousel.appendChild(nextBtn);

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    index = index > 0 ? index - 1 : screenshots.length - 1;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = index < screenshots.length - 1 ? index + 1 : 0;
    update();
  });

  return carousel;
}
