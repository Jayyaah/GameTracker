import {
  getPopularGames,
  getNewGames,
  getUpcomingGames,
  getGenres
} from '../api/rawgApi.js';

import { createLoader } from '../components/loader.js';
import { createErrorMessage } from '../components/errorMessage.js';
import { createGameGrid } from '../components/gameGrid.js';

import { filterGames } from '../utils/filterGames.js';
import { initPlatformFilterSelect } from '../components/filters/platformSelect.js';
import { genreSelect } from '../components/filters/genreSelect.js';

export async function homeView() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const activeFilters = {
    platform: null,
    genre: null
  };

  const loader = createLoader();
  app.appendChild(loader);

  try {
    const [popular, newGames, upcoming] = await Promise.all([
      getPopularGames(),
      getNewGames(),
      getUpcomingGames()
    ]);

    const popularGames = popular.results;
    const newGamesList = newGames.results;
    const upcomingGamesList = upcoming.results;
    const genresData = await getGenres();
    const genres = genresData.results;

    // 🔹 Structure de la page
    app.innerHTML = `
      <div class="filters"></div>

      <section id="popular">
        <h2>🔥 Jeux populaires</h2>
      </section>

      <section id="new">
        <h2>🆕 Nouveautés</h2>
      </section>

      <section id="upcoming">
        <h2>⏳ À venir</h2>
      </section>
    `;

    const filtersContainer = app.querySelector('.filters');

    const popularSection = app.querySelector('#popular');
    const newSection = app.querySelector('#new');
    const upcomingSection = app.querySelector('#upcoming');

    function render() {
      popularSection.innerHTML = `<h2>🔥 Jeux populaires</h2>`;
      popularSection.appendChild(
        createGameGrid(filterGames(popularGames, activeFilters))
      );

      newSection.innerHTML = `<h2>🆕 Nouveautés</h2>`;
      newSection.appendChild(
        createGameGrid(filterGames(newGamesList, activeFilters))
      );

      upcomingSection.innerHTML = `<h2>⏳ À venir</h2>`;
      upcomingSection.appendChild(
        createGameGrid(filterGames(upcomingGamesList, activeFilters))
      );
    }

    const platformSelect = initPlatformFilterSelect((value) => {
      activeFilters.platform = value;
      render();
    });

    const genreSelectElement = genreSelect(genres, (value) => {
      activeFilters.genre = value;
      render();
    });

    filtersContainer.appendChild(platformSelect);
    filtersContainer.appendChild(genreSelectElement);

    render();

  } catch (error) {
    app.innerHTML = '';
    app.appendChild(
      createErrorMessage(
        'Impossible de charger les jeux. Vérifie ta connexion.'
      )
    );
  }
}
