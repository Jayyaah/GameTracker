import {
  getGameDetails,
  getGameScreenshots
} from "../api/rawgApi.js";

import { createLoader } from "../components/loader.js";
import { createErrorMessage } from "../components/errorMessage.js";
import { createScreenshotGallery } from "../components/screenshotGallery.js";

import {
  toggleFavorite,
  isFavorite
} from "../utils/storage.js";

export async function gameView(gameId) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const loader = createLoader();
  app.appendChild(loader);

  try {
    const [game, screenshots] = await Promise.all([
      getGameDetails(gameId),
      getGameScreenshots(gameId)
    ]);

    app.innerHTML = "";

    const isFav = isFavorite(game.id);

    const section = document.createElement("section");
    section.className = "game-detail";

    section.innerHTML = `
      <button id="backBtn">⬅ Retour</button>

      <h1>${game.name}</h1>

      <button id="favBtn">
        ${isFav ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris"}
      </button>

      <img src="${game.background_image}" alt="${game.name}" />

      <p><strong>Note Metacritic :</strong> ${game.metacritic ?? "N/A"}</p>
      <p><strong>Date de sortie :</strong> ${game.released ?? "N/A"}</p>

      <p><strong>Genres :</strong>
        ${game.genres.map(g => g.name).join(", ")}
      </p>

      <p><strong>Plateformes :</strong>
        ${game.platforms.map(p => p.platform.name).join(", ")}
      </p>

      <p>${game.description_raw ?? "Pas de description disponible."}</p>
    `;

    section.querySelector("#backBtn").addEventListener("click", () => {
      history.back();
    });

    const favBtn = section.querySelector("#favBtn");
    favBtn.addEventListener("click", () => {
      toggleFavorite({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating
      });

      favBtn.textContent = isFavorite(game.id)
        ? "❤️ Retirer des favoris"
        : "🤍 Ajouter aux favoris";
    });

    app.appendChild(section);

    app.appendChild(
      createScreenshotGallery(screenshots.results)
    );

  } catch (error) {
    app.innerHTML = "";
    app.appendChild(
      createErrorMessage("Impossible de charger le jeu.")
    );
  }
}
