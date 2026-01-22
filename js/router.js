import { homeView } from "./views/homeView.js";
import { gameView } from "./views/gameView.js";
import { favoritesView } from "./views/favoritesView.js";

const routes = {
  "/": homeView,
  "/game": gameView,
  "/favorites": favoritesView,
};

export function router() {
  const app = document.getElementById("app");
  if (!app) return;

  if (!location.hash || location.hash === "#/" || location.hash === "#") {
    homeView();
    return;
  }

  const hash = location.hash.replace("#", "");
  const parts = hash.split("/").filter(Boolean);

  const path = `/${parts[0]}`;
  const param = parts[1];

  const view = routes[path];

  if (!view) {
    app.innerHTML = "<h2>Page introuvable</h2>";
    return;
  }

  view(param);
}
