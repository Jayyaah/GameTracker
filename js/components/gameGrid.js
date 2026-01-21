import { createGameCard } from './gameCard.js';

export function createGameGrid(games = []) {
  const grid = document.createElement('div');
  grid.className = 'game-grid';

  if (!games.length) {
    grid.innerHTML = `<p>Aucun jeu à afficher.</p>`;
    return grid;
  }

  games.forEach(game => {
    grid.appendChild(createGameCard(game));
  });

  return grid;
}
