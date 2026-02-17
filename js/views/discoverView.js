import { getDiscoverGames, getPlatforms, getGenres } from '../api/rawgApi.js';
import { createGameGrid } from '../components/gameGrid.js';
import { createLoader } from '../components/loader.js';
import { createErrorMessage } from '../components/errorMessage.js';
import { initPlatformFilterSelect } from '../components/filters/platformSelect.js';
import { genreSelect } from '../components/filters/genreSelect.js';

export async function discoverView() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const loader = createLoader();
  app.appendChild(loader);

  const params = new URLSearchParams(window.location.hash.split('?')[1]);

  const activeFilters = {
    platform: params.get('platforms'),
    genre: params.get('genres')
  };

  try {
    const [gamesData, platformsData, genresData] = await Promise.all([
      getDiscoverGames(activeFilters),
      getPlatforms(),
      getGenres()
    ]);

    const games = gamesData.results;
    const platforms = platformsData.results.map(p => ({
      value: p.id,
      label: p.name
    }));
    const genres = genresData.results;

    app.innerHTML = `
      <div class="filters"></div>
      <h2>Résultats de la recherche</h2>
      <div id="discover-results"></div>
    `;

    const filtersContainer = app.querySelector('.filters');
    const resultsContainer = document.getElementById('discover-results');

    const platformSelect = initPlatformFilterSelect(platforms, (value) => {
      activeFilters.platform = value;
      window.location.hash = buildDiscoverUrl(activeFilters);
    });

    if (activeFilters.platform) {
      platformSelect.value = activeFilters.platform;
    }

    const genreSelectElement = genreSelect(genres, (value) => {
      activeFilters.genre = value;
      window.location.hash = buildDiscoverUrl(activeFilters);
    });

    if (activeFilters.genre) {
      genreSelectElement.value = activeFilters.genre;
    }

    filtersContainer.appendChild(platformSelect);
    filtersContainer.appendChild(genreSelectElement);

    if (games.length === 0) {
      resultsContainer.innerHTML = `<p>Aucun jeu à afficher.</p>`;
    } else {
      resultsContainer.appendChild(createGameGrid(games));
    }

  } catch (error) {
    app.innerHTML = '';
    app.appendChild(
      createErrorMessage('Erreur lors du chargement des jeux.')
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
