export function createGameCarousel(images) {
  let currentIndex = 0;

  const carousel = document.createElement('div');
  carousel.className = 'game-carousel';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  images.forEach((img, index) => {
    const image = document.createElement('img');
    image.src = img.image;
    image.className = 'carousel-image';
    if (index === 0) image.classList.add('active');
    track.appendChild(image);
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev';
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next';
  nextBtn.textContent = '›';

  function updateCarousel() {
    const imgs = track.querySelectorAll('.carousel-image');
    imgs.forEach(img => img.classList.remove('active'));
    imgs[currentIndex].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  carousel.appendChild(prevBtn);
  carousel.appendChild(track);
  carousel.appendChild(nextBtn);

  return carousel;
}
