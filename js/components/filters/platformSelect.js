function initPlatformFilterSelect(platforms, onChange) {
  const selectElement = document.createElement('select');
  selectElement.id = 'platform-filter';
  selectElement.className = 'platform-filter-select';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Toutes les plateformes';
  selectElement.appendChild(defaultOption);

  platforms.forEach(p => {
    const option = document.createElement('option');
    option.value = p.id;      // ID RAWG (PS4, PS5, etc.)
    option.textContent = p.name;
    selectElement.appendChild(option);
  });

  selectElement.addEventListener('change', (e) => {
    onChange(e.target.value || null);
  });

  return selectElement;
}

export { initPlatformFilterSelect };
