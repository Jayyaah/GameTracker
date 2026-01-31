
export function genreSelect(genres, onChange) {
  const selectElement = document.createElement('select');
  selectElement.id = 'genre-select';
  selectElement.className = 'genre-select';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Tous les genres';
  selectElement.appendChild(defaultOption);

  genres.forEach(g => {
    const option = document.createElement('option');
    option.value = g.name; // IMPORTANT : on filtre par name
    option.textContent = g.name;
    selectElement.appendChild(option);
  });

  selectElement.addEventListener('change', (e) => {
    onChange(e.target.value || null);
  });

  return selectElement;
}
