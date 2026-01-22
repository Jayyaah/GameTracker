import {
    searchGames } from '../api/rawgApi.js';

import { createLoader } from '../components/loader.js';
import { createErrorMessage } from '../components/errorMessage.js';
import { createGameGrid } from '../components/gameGrid.js'; 

export async function searchView(query) {
    const app = document.getElementById('app');
    if (query.length < 2) {
        return;
    }
    app.innerHTML = '';
    const loader = createLoader();
    app.appendChild(loader);
    try {
        const data = await searchGames(query);
        const results = data.results;
        
        if (results.length === 0) {
            app.innerHTML = `<h2>Aucun résultat trouvé pour "${query}"</h2>`;
            return;
        }

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