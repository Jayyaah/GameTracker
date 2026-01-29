import { API_KEY } from '../config.js';
const BASE_URL = 'https://api.rawg.io/api';

/**
 * Fetch data from the RAWG Video Games Database API.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Object} params - An object containing query parameters.
 */
async function fetchFromAPI(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('key', API_KEY);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
} 

/**
 * Get popular games.
 */
export function getPopularGames(page = 1) { 
    return fetchFromAPI('/games', { 
        ordering: '-rating', 
        page_size: 10,
        page
    });
}

/**
 * Get new games.
 */
export function getNewGames() {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  const from = lastMonth.toISOString().split('T')[0];
  const to = today.toISOString().split('T')[0];

  return fetchFromAPI('/games', {
    dates: `${from},${to}`,
    ordering: '-released',
    page_size: 10
  });
}


/** 
 * Get upcoming games.
 */
export function getUpcomingGames() {
  const today = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);

  const from = today.toISOString().split('T')[0];
  const to = nextYear.toISOString().split('T')[0];

  return fetchFromAPI('/games', {
    dates: `${from},${to}`,
    ordering: 'released',
    page_size: 10
  });
}

/** 
 * Get genres games.
 */
export function getGenres() {  
    return fetchFromAPI('/genres');
}


/**
 * Search games by query.
 * @param {string} query - The search query.
 */
export function searchGames(query) {  
    if (!query || query.trim().length < 2) {
        return Promise.resolve({ results: [] });
    }
    return fetchFromAPI('/games', { 
        search: query, 
        page_size: 10 
    });
}

/**
 * Get game details by ID.
 * @param {number} gameId - The ID of the game.
 */
export function getGameDetails(gameId) {  
    return fetchFromAPI(`/games/${gameId}`);
}

/**
 * Get game screenshots by ID.
 * @param {number} gameId - The ID of the game.
 */
export function getGameScreenshots(gameId) {  
    return fetchFromAPI(`/games/${gameId}/screenshots`);
}

