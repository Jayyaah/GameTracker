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
    option.value = p.value;
    option.textContent = p.label;
    selectElement.appendChild(option);
  });

  selectElement.addEventListener('change', (e) => {
    onChange(e.target.value || null);
  });

  return selectElement;
}

export { initPlatformFilterSelect };
