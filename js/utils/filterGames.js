export function filterGames(games, filters) {
    return games.filter(game => {
        const genreMatch = !filters.genre || 
        game.genres?.some(genre => genre.name === filters.genre);

        const platformMatch = !filters.platform || 
        game.platforms?.some(platform => 
            platform.platform.name === filters.platform
        );

        return genreMatch && platformMatch;
    });
}