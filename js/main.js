import { router } from "./router.js";
import { searchView } from "./views/searchView.js";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

const input = document.getElementById("searchInput");
input.addEventListener("input", (event) => {
    searchView(event.target.value);
});