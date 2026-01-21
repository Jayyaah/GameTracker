import {
    searchGames } from '../api/api.js';

import { createLoader } from '../components/loader.js';
import { createErrorMessage } from '../components/errorMessage.js';
import { createGameGrid } from '../components/gameGrid.js'; 

export async function searchView(query) {
    const app = document.getElementById('app');
    app.innerHTML = '';
    const loader = createLoader();
    app.appendChild(loader);
    try {
        const results = await searchGames(query);
        app.innerHTML = `<h2>Résultats de la recherche pour "${query}"</h2>`;
        app.appendChild(createGameGrid(results));
    } catch (error) {
        app.innerHTML = '';
        app.appendChild(
            createErrorMessage(
                'Impossible de charger les résultats de la recherche. Vérifie ta connexion.'
            )
        );
    }
}