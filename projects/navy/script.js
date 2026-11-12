//python3 -c 'import json; from pathlib import Path; p=Path("projects/navy"); files=sorted(f.name for f in (p/"images").iterdir() if f.is_file() and f.suffix.lower() in {".jpg",".jpeg",".png",".gif",".webp"}); (p/"images.json").write_text(json.dumps(files, indent=2)+"\n"); print(f"Updated manifest with {len(files)} photos")'

const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const overlay = document.getElementById('overlay');
const previewImg = document.getElementById('preview-image');
const previewCaption = document.getElementById('preview-caption');

const photoDescriptions = {
  'DSC00758.JPG': 'Wiring',
  'DSC00774.JPG': 'Motors',
  'DSC00777.JPG': 'Filing',
  'DSC00778.JPG': '',
  'DSC00786.JPG': 'Womens Bathroom',
  'DSC00790.JPG': 'Elevator Mechanisms',
  'DSC03387-1.jpg': 'Building 624',
  'DSC03407-1.jpg': 'Building 624 Facing West',
  'DSC03408-1.jpg': 'Headquarters Exterior',
  'DSC03426-1-2.jpg': 'Headquarters Exterior',
  'DSC03455-1.jpg': 'Wooden Floating Dry Dock',
  'DSC03457-1-2.jpg': 'Exterior of a Floating Dry Dock Engine House',
  'DSC07025.JPG': 'Mustin Field Housing'
};

let images = [];
let currentIndex = 0;
let loading = false;
const batchSize = 9;

function closePreview() {
  overlay.hidden = true;
  previewImg.src = '';
  previewCaption.textContent = '';
  previewCaption.hidden = true;
}

function showPreview(image, description) {
  previewImg.src = image.src;
  previewImg.alt = image.alt;
  previewCaption.textContent = description;
  previewCaption.hidden = !description;
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
    const description = (photoDescriptions[filename] || '').trim();
    image.alt = description || 'Navy project photograph';
    image.addEventListener('load', () => {
      image.classList.add('loaded');
      image.addEventListener('click', () => showPreview(image, description));
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
