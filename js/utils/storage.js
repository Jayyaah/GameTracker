const STORAGE_KEY = 'gametracker_favorites';

export function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function isFavorite(gameId) {
    return getFavorites().some(game => game.id === gameId);
}

export function toggleFavorite(game) {
    const favorites = getFavorites();
    const gameIndex = favorites.findIndex(fav => fav.id === game.id);

    if (gameIndex === -1) {
        favorites.push(game);
    } else {    
        favorites.splice(gameIndex, 1);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}