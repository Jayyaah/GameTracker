import { getDiscoverGames } from '../api/rawgApi.js';
import { createGameGrid } from '../components/gameGrid.js';
import { createLoader } from '../components/loader.js';
import { createErrorMessage } from '../components/errorMessage.js';

export async function discoverView() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const loader = createLoader();
  app.appendChild(loader);

  const hash = window.location.hash;
  const queryString = hash.split('?')[1];
  const params = new URLSearchParams(queryString);

  const filters = {
    platform: params.get('platforms'),
    genre: params.get('genres')
  };

  if (!filters.platform && !filters.genre) {
    window.location.hash = '#/';
    return;
  }

  try {
    const data = await getDiscoverGames(filters);
    const games = data.results;

    app.innerHTML = `
      <h2>Résultats de la recherche</h2>
      <div id="discover-results"></div>
    `;

    const resultsContainer = document.getElementById('discover-results');
    resultsContainer.appendChild(createGameGrid(games));

  } catch (error) {
    app.innerHTML = '';
    app.appendChild(
      createErrorMessage(
        'Erreur lors du chargement des jeux.'
      )
    );
  }
}

export function buildDiscoverUrl(filters) {
  const params = new URLSearchParams();

  if (filters.platform) {
    params.append('platforms', filters.platform);
  }

  if (filters.genre) {
    params.append('genres', filters.genre);
  }

  return `#/discover?${params.toString()}`;
}
