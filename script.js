'use strict';

function initializePage() {

// The HTML is complete on its own. JavaScript adds the little surprises.
const secretButton = document.querySelector('#secret-button');
secretButton?.addEventListener('click', () => {
  const note = document.querySelector('#secret-note');
  const opening = note.hidden;
  note.hidden = !opening;
  secretButton.setAttribute('aria-expanded', String(opening));
  secretButton.innerHTML = opening ? 'Keep this close to your heart <span>♡</span>' : 'P.S. One more little thing <span>♡</span>';
  if (opening) {
    note.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
    celebrate();
  }
});

function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-particle';
    heart.setAttribute('aria-hidden', 'true');
    heart.textContent = i % 2 ? '♡' : '♥';
    heart.style.left = `${8 + Math.random() * 84}%`;
    heart.style.animationDelay = `${Math.random() * .5}s`;
    document.body.append(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
    setTimeout(() => heart.remove(), 4000);
  }
}

const reasons = [
  'Your smile is still my favourite part of the day.',
  'You make even the ordinary days feel like something worth remembering.',
  'With you, I can be completely, comfortably myself.',
  'Your kindness is one of the most beautiful things about you.',
  'I love the life we are slowly, beautifully building together.',
  'You are the person I want to tell all my little stories to.',
  'Somehow, being next to you always feels like coming home.',
  'Of all the people in the world, I get to call you my wife. ♡'
];
let reasonIndex = 0;
document.querySelector('#reason-button')?.addEventListener('click', () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  document.querySelector('#reason-text').textContent = reasons[reasonIndex];
  document.querySelector('#reason-count').textContent = `${String(reasonIndex + 1).padStart(2, '0')} / 08 little reminders`;
});

// Native dialogs preserve keyboard focus and support Escape.
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

const photoDialog = document.querySelector('#photo-dialog');
if (photoDialog) {
  const photos = [...document.querySelectorAll('[data-photo]')].map(button => ({
    src: button.querySelector('img').getAttribute('src'),
    alt: button.querySelector('img').alt,
    caption: button.querySelector('.handwritten').textContent
  }));
  let selected = 0;
  const photo = document.querySelector('#large-photo');
  const count = document.querySelector('#photo-count');
  function showPhoto(index) {
    selected = (index + photos.length) % photos.length;
    const item = photos[selected];
    count.textContent = 'Loading this little memory…';
    photo.onload = () => { count.textContent = `${selected + 1} / ${photos.length} · ${item.caption}`; };
    photo.onerror = () => { count.textContent = 'This photo couldn’t load. Try the next memory or close and reopen.'; };
    photo.alt = item.alt;
    photo.src = item.src;
  }
  document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
    showPhoto(Number(button.dataset.photo));
    photoDialog.showModal();
  }));
  document.querySelector('#previous-photo').addEventListener('click', () => showPhoto(selected - 1));
  document.querySelector('#next-photo').addEventListener('click', () => showPhoto(selected + 1));
  photoDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(selected - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(selected + 1); }
  });
}

const musicDialog = document.querySelector('#music-dialog');
if (musicDialog) {
  const container = document.querySelector('#video-container');
  document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
    stopBackgroundMusic(false);
    const videoId = button.dataset.video;
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return;
    document.querySelector('#playing-title').textContent = button.dataset.title;
    document.querySelector('#player-youtube').href = `https://www.youtube.com/watch?v=${videoId}`;
    const status = document.createElement('p');
    status.textContent = 'Opening your song…';
    status.setAttribute('role', 'status');
    const frame = document.createElement('iframe');
    frame.title = `${button.dataset.title} — YouTube music video`;
    frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    frame.addEventListener('load', () => status.remove(), { once: true });
    container.replaceChildren(status, frame);
    musicDialog.showModal();
  }));
  // Removing the iframe stops playback completely when the dialog closes.
  musicDialog.addEventListener('close', () => container.replaceChildren());
}

}

initializePage();

// A single player lives outside <main>, so turning a page doesn't stop our song.
const soundtrack = document.createElement('aside');
soundtrack.className = 'floating-soundtrack';
soundtrack.setAttribute('aria-label', 'Our background song');
soundtrack.innerHTML = `<div class="soundtrack-bar"><span class="soundtrack-symbol" aria-hidden="true">♫</span><div><strong>Our little world, with music.</strong><span>Do You Know · Diljit Dosanjh</span></div><button class="soundtrack-dismiss" aria-label="Close background music">×</button></div><button class="start-soundtrack">▶ <span>Play our song</span></button><div class="background-video" hidden></div><p class="soundtrack-hint" hidden>Our song stays with you as you turn the pages.<br><a href="https://www.youtube.com/watch?v=P-DhwN87JDY" target="_blank" rel="noopener noreferrer">Not playing? Open on YouTube ↗</a></p>`;
document.body.append(soundtrack);
const backgroundVideo = soundtrack.querySelector('.background-video');
const startSoundtrack = soundtrack.querySelector('.start-soundtrack');
let backgroundPlaying = false;
try { if (sessionStorage.getItem('shilpa-music-dismissed') === 'yes') soundtrack.hidden = true; } catch { /* Music still works when browser storage is unavailable. */ }

function stopBackgroundMusic(dismiss) {
  if (!backgroundPlaying && !dismiss) return;
  backgroundVideo.replaceChildren();
  backgroundVideo.hidden = true;
  soundtrack.querySelector('.soundtrack-hint').hidden = true;
  startSoundtrack.hidden = false;
  backgroundPlaying = false;
  soundtrack.hidden = dismiss;
  if (dismiss) {
    try { sessionStorage.setItem('shilpa-music-dismissed', 'yes'); } catch { /* Optional preference only. */ }
  }
}
startSoundtrack.addEventListener('click', () => {
  // Only one music video plays at a time.
  document.querySelector('#music-dialog[open]')?.close();
  const frame = document.createElement('iframe');
  frame.title = 'Do You Know by Diljit Dosanjh — our background song';
  frame.src = 'https://www.youtube-nocookie.com/embed/P-DhwN87JDY?autoplay=1&loop=1&playlist=P-DhwN87JDY&rel=0';
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allowFullscreen = true;
  backgroundVideo.replaceChildren(frame);
  backgroundVideo.hidden = false;
  startSoundtrack.hidden = true;
  soundtrack.querySelector('.soundtrack-hint').hidden = false;
  backgroundPlaying = true;
});
soundtrack.querySelector('.soundtrack-dismiss').addEventListener('click', () => stopBackgroundMusic(true));

// Same-site navigation swaps only the page content. All URLs remain real HTML
// files, so opening a new tab, refreshing, and navigation without JS still work.
const sitePages = new Set(['index.html', 'moments.html', 'letter.html', 'promises.html', 'songs.html']);
let navigationController;
async function turnPage(url, pushHistory) {
  navigationController?.abort();
  navigationController = new AbortController();
  const controller = navigationController;
  const main = document.querySelector('main');
  main.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(url.href, { signal: controller.signal });
    if (!response.ok) throw new Error('Page unavailable');
    const next = new DOMParser().parseFromString(await response.text(), 'text/html');
    const nextMain = next.querySelector('main');
    if (!nextMain) throw new Error('Missing page content');
    if (pushHistory) history.pushState({}, '', url.href);
    document.title = next.title;
    main.replaceWith(nextMain);
    for (const link of document.querySelectorAll('.site-header nav a')) {
      if (new URL(link.href).pathname === url.pathname) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    initializePage();
    nextMain.tabIndex = -1;
    nextMain.focus({ preventScroll: true });
    if (url.hash) document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  } catch (error) {
    if (error.name !== 'AbortError') {
      // Return to normal browser navigation when fetch isn't available.
      window.location.assign(url.href);
    }
  } finally {
    if (controller === navigationController) document.querySelector('main')?.removeAttribute('aria-busy');
  }
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
  const url = new URL(link.href);
  const currentDirectory = location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1);
  const destinationDirectory = url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1);
  if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol) || destinationDirectory !== currentDirectory || !sitePages.has(url.pathname.split('/').pop()) || (url.pathname === location.pathname && url.hash)) return;
  event.preventDefault();
  turnPage(url, true);
});
window.addEventListener('popstate', () => turnPage(new URL(location.href), false));
