import {
  getPopularGames,
  getNewGames,
  getUpcomingGames
} from '../api/rawgApi.js';

import { createLoader } from '../components/loader.js';
import { createErrorMessage } from '../components/errorMessage.js';
import { createGameGrid } from '../components/gameGrid.js';

export async function homeView() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const loader = createLoader();
  app.appendChild(loader);

  try {
    const [popular, newGames, upcoming] = await Promise.all([
      getPopularGames(),
      getNewGames(),
      getUpcomingGames()
    ]);

    app.innerHTML = `
      <section>
        <h2>🔥 Jeux populaires</h2>
      </section>

      <section>
        <h2>🆕 Nouveautés</h2>
      </section>

      <section>
        <h2>⏳ À venir</h2>
      </section>
    `;

    const sections = app.querySelectorAll('section');

    sections[0].appendChild(createGameGrid(popular.results));
    sections[1].appendChild(createGameGrid(newGames.results));
    sections[2].appendChild(createGameGrid(upcoming.results));

  } catch (error) {
    app.innerHTML = '';
    app.appendChild(
      createErrorMessage(
        'Impossible de charger les jeux. Vérifie ta connexion.'
      )
    );
  }
}
