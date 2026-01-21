export function createGameCard(game) {
  const card = document.createElement('article');
  card.className = 'game-card';

  card.innerHTML = `
    <img src="${game.background_image || ''}" alt="${game.name}">
    <div class="game-card-content">
      <h3>${game.name}</h3>
      <p>⭐ ${game.rating ?? 'N/A'}</p>
      <p class="platforms">
        ${game.platforms
          ?.map(p => p.platform.name)
          .join(', ') || ''}
      </p>
    </div>
  `;

  card.addEventListener('click', () => {
    location.hash = `/game/${game.id}`;
  });

  return card;
}
