export function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `
    <div class="spinner"></div>
    <p>Chargement...</p>
  `;
  return loader;
}