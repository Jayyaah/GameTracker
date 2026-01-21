import { homeView } from "./views/homeView.js";
import { gameView } from "./views/gameView.js";
import { favoritesView } from "./views/favoritesView.js";
import { searchView } from "./views/searchView.js";

const routes = {
  "/": homeView,
  "/game": gameView,
  "/favorites": favoritesView,
  "/search": searchView,
};

export function router() {
  const app = document.getElementById("app");

  const hash = location.hash.slice(1) || "/";
  const [path, param] = hash.split("/");

  const view = routes[path];

  if (!view) {
    app.innerHTML = "<h2>Page introuvable</h2>";
    return;
  }

  view(param);
}
