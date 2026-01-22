import { router } from "./router.js";
import { debounce } from "./utils/debounce.js";
import { searchView } from "./views/searchView.js";

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

const debouncedSearchView = debounce(searchView, 300);
const input = document.getElementById("searchInput");

input.addEventListener("input", (event) => {
  const query = event.target.value;
  debouncedSearchView(query);
});