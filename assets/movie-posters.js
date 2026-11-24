for (const player of document.querySelectorAll('iframe[data-movie-poster]')) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'movie-poster';
  const title = player.closest('.card')?.querySelector('h3, h4')?.textContent.trim() || 'video';
  button.setAttribute('aria-label', 'Play ' + title);
  const image = document.createElement('img');
  image.src = player.dataset.moviePoster;
  image.alt = '';
  image.loading = 'lazy';
  button.append(image);
  button.addEventListener('click', () => {
    const url = new URL(player.src);
    url.searchParams.set('autoplay', '1');
    player.allow = [player.allow, 'autoplay'].filter(Boolean).join('; ');
    player.src = url.href;
    player.title ||= title;
    button.replaceWith(player);
    player.focus();
  }, { once: true });
  image.addEventListener('error', () => button.replaceWith(player), { once: true });
  player.replaceWith(button);
}
