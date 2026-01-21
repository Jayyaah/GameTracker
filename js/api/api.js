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
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json();
} 

/**
 * Get popular games.
 */
export function getPopularGames() { 
    return fetchFromAPI('/games', { 
        ordering: '-rating', 
        page_size: 10 
    });
}

/**
 * Get new games.
 */
export function getNewGames() {  
    const currentDate = new Date().toISOString().split('T')[0];
    return fetchFromAPI('/games', { dates: `2023-01-01,${currentDate}`, ordering: '-released', page_size: 10 });
}}

/** 
 * Get upcoming games.
 */
export function getUpcomingGames() {  
    const currentDate = new Date().toISOString().split('T')[0];
    return fetchFromAPI('/games', { dates: `${currentDate},2024-12-31`, ordering: '-added', page_size: 10 });
}
