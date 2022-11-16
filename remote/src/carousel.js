import {
  getCachedImgs,
  getCachedSelectedSrc,
  setCachedSelectedImg,
} from './cache';

export const previewContainer = document.getElementById('preview-container');

const cachedImgs = getCachedImgs();
for (const cachedImg of cachedImgs) {
  const img = document.createElement('img');
  img.src = cachedImg;
  previewContainer.appendChild(img);
}

const selectedImg = getInitialSelectedImg();
showFullImg(selectedImg);

previewContainer.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName !== 'IMG') {
    return;
  }
  showFullImg(target);
});

export function showFullImg(preview) {
  const currentSelection = previewContainer.querySelector('.selected');
  if (currentSelection) {
    currentSelection.classList.remove('selected');
  }
  preview.classList.add('selected');
  const src = preview.src.slice();
  setCachedSelectedImg(src);
}

function getInitialSelectedImg() {
  const selectedSrc = getCachedSelectedSrc();
  const imgs = Array.from(previewContainer.querySelectorAll('img'));

  for (const img of imgs) {
    if (img.src === selectedSrc) {
      return img;
    }
  }

  return imgs[0];
}
