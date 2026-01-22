import { createGameGrid } from "../components/gameGrid";
import { getFavorites } from "../utils/storage";

export function favoritesView() {
    const app = document.getElementById('app');
    const favorites = getFavorites();

    app.innerHTML = '<h2>Mes Jeux Favoris</h2>';
    if (favorites.length === 0) {
        app.innerHTML += '<p>Tu n\'as pas encore ajouté de jeux favoris.</p>';
        return;
    } if (favorites.length > 0) {
        app.appendChild(createGameGrid(favorites));
    }
}