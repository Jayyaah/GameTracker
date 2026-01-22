function platformFilter(games, selectedPlatform) {
    if (!selectedPlatform) {
        return games;
    }
    return games.filter(game => game.platform === selectedPlatform);
}

function initPlatformFilterSelect(games, onFilterChange) {
    const selectElement = document.createElement('select');
    selectElement.id = 'platform-filter';
    selectElement.className = 'platform-filter-select';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All Platforms';
    selectElement.appendChild(defaultOption);

    const platforms = [...new Set(games.map(game => game.platform))];
    platforms.forEach(platform => {
        const option = document.createElement('option');
        option.value = platform;
        option.textContent = platform;
        selectElement.appendChild(option);
    });

    selectElement.addEventListener('change', (e) => {
        const filtered = platformFilter(games, e.target.value);
        onFilterChange(filtered);
    });

    return selectElement;
}

export { platformFilter, initPlatformFilterSelect };