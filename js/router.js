import { homeView } from "./views/homeView.js";

const routes = {
  "/": homeView,
};

export function router() {
  const app = document.getElementById("app");
  if (!app) return;

  if (!location.hash || location.hash === "#/" || location.hash === "#") {
    routes["/"]();
    return;
  }

  app.innerHTML = "<h2>Page introuvable</h2>";
}
