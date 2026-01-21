export function createErrorMessage(message = 'Une erreur est survenue') {
  const error = document.createElement('div');
  error.className = 'error';
  error.innerHTML = `
    <p>Error : ${message}</p>
  `;
  return error;
}
