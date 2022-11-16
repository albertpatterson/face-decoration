import { previewContainer, showFullImg } from './carousel';
import { addCachedImg } from './cache';

const addBtn = document.getElementById('add-btn');
const fileSelect = document.getElementById('file-select');

addBtn.addEventListener('click', () => {
  fileSelect.click();
});

fileSelect.addEventListener('change', async (event) => {
  const files = event.target.files;
  if (files.length === 0) {
    return;
  }
  const file = files[0];
  const src = URL.createObjectURL(file);
  const dataUrl = await toDataURL(src);
  URL.revokeObjectURL(src);
  const img = document.createElement('img');
  img.src = dataUrl;

  previewContainer.appendChild(img);
  showFullImg(img);
  addCachedImg(dataUrl);
});

async function toDataURL(src) {
  return await new Promise((res) => {
    toDataURLCB(src, res);
  });
}

function toDataURLCB(src, callback) {
  var image = new Image();
  image.crossOrigin = 'Anonymous';
  image.onload = function () {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    context.drawImage(this, 0, 0);
    var dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
  };
  image.src = src;
}
