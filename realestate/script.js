//python3 -c 'import json; from pathlib import Path; p=Path("realestate"); files=sorted(f.name for f in (p/"images").iterdir() if f.is_file() and f.suffix.lower() in {".jpg",".jpeg",".png",".gif",".webp"}); (p/"images.json").write_text(json.dumps(files, indent=2)+"\n"); print(f"Updated manifest with {len(files)} photos")'

const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const overlay = document.getElementById('overlay');
const previewImg = document.getElementById('preview-image');

let images = [];
let currentIndex = 0;
let loading = false;
const batchSize = 9;

function closePreview() {
  overlay.hidden = true;
  previewImg.src = '';
}

function showPreview(image) {
  previewImg.src = image.src;
  previewImg.alt = image.alt;
  overlay.hidden = false;
}

overlay.addEventListener('click', event => {
  if (event.target === overlay || event.target.closest('.overlay-close')) {
    closePreview();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !overlay.hidden) {
    closePreview();
  }
});

function loadNextBatch() {
  if (loading || currentIndex >= images.length) return;

  loading = true;
  loader.textContent = 'Loading photos…';
  const nextBatch = images.slice(currentIndex, currentIndex + batchSize);
  const imagePromises = nextBatch.map(filename => new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      image.classList.add('loaded');
      image.addEventListener('click', () => showPreview(image));
      resolve(image);
    }, { once: true });
    image.addEventListener('error', () => {
      console.error(`Could not load gallery image: ${filename}`);
      resolve(null);
    }, { once: true });
    image.src = `images/${encodeURIComponent(filename)}`;
  }));

  Promise.all(imagePromises).then(loadedImages => {
    const fragment = document.createDocumentFragment();
    loadedImages.filter(Boolean).forEach(image => fragment.appendChild(image));
    gallery.appendChild(fragment);
    currentIndex += nextBatch.length;
    loading = false;
    loader.textContent = currentIndex < images.length ? 'Scroll to load more photos' : 'All photos loaded';
    if (currentIndex < images.length && loader.getBoundingClientRect().top < window.innerHeight + 500) {
      loadNextBatch();
    }
  });
}

fetch('images.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Image manifest request failed (${response.status})`);
    }
    return response.json();
  })
  .then(files => {
    if (!Array.isArray(files)) {
      throw new Error('Image manifest must contain an array of filenames');
    }
    images = files.filter(filename => typeof filename === 'string' && /\.(jpe?g|png|gif|webp)$/i.test(filename));
    if (images.length === 0) {
      loader.textContent = 'No photos found';
      return;
    }

    loadNextBatch();
  })
  .catch(error => {
    console.error('Could not load the gallery:', error);
    loader.textContent = 'Could not load photos. Please try again later.';
    loader.classList.add('load-error');
  });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      loadNextBatch();
    }
  }, { rootMargin: '500px' });
  observer.observe(loader);
} else {
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      loadNextBatch();
    }
  });
}

document.addEventListener('contextmenu', event => event.preventDefault());
