function initPlatformFilterSelect(onChange) {
  const selectElement = document.createElement('select');
  selectElement.id = 'platform-filter';
  selectElement.className = 'platform-filter-select';

  const platforms = [
    { label: 'Toutes les plateformes', value: '' },
    { label: 'PC', value: 'PC' },
    { label: 'PlayStation 5', value: 'PlayStation 5' },
    { label: 'Xbox Series X', value: 'Xbox Series X' }
  ];

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
