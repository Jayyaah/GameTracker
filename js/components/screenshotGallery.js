export function createScreenshotGallery(screenshots = []) {
  const container = document.createElement("div");
  container.className = "screenshots";

  if (!screenshots.length) {
    container.innerHTML = "<p>Aucune capture disponible.</p>";
    return container;
  }

  screenshots.forEach(s => {
    const img = document.createElement("img");
    img.src = s.image;
    img.alt = "Screenshot du jeu";
    container.appendChild(img);
  });

  return container;
}
