import { drawKeypoints } from './util';
import { getPredictions } from './model';
import { translateUserCode } from './user_code_interface/translate_user_code';

export function initiateVideoAndCanvas(video, canvas) {
  return video.play().then(() => {
    sizeVideoAndCanvas(video, canvas);

    const context = canvas.getContext('2d');
    context.font = '36px serif';
    context.fontWeight = 'bold';
    context.strokeStyle = 'green';
    context.fillStyle = 'green';
    context.lineWidth = 5;
  });
}

export function sizeVideoAndCanvas(video, canvas) {
  const { height, width } = getCanvasSize(video);
  video.setAttribute('width', width);
  video.setAttribute('height', height);
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
}

export function getCanvasSize(video) {
  const vWidth = video.videoWidth ?? video.width;
  const vHeight = video.videoHeight ?? video.height;

  const aspectRatio = vHeight / vWidth;

  const height = 300;
  const width = height / aspectRatio;
  const scale = width / vWidth;

  return { height, width, scale };
}

let currentStream = null;
export async function takepictures(
  video,
  canvas,
  model,
  stream = true,
  markKeypoints = false,
  id = null
) {
  if (id !== null && currentStream !== null && id !== currentStream) {
    return;
  }
  id = Date.now();
  currentStream = id;

  const context = canvas.getContext('2d');

  const { height, width, scale } = getCanvasSize(video);
  const predictions = await getPredictions(video, model);
  const translatedPredictions = await translatePredictions(predictions);
  context.drawImage(video, 0, 0, width, height);
  for (const translatedPrediction of translatedPredictions) {
    await drawOnVideo(context, translatedPrediction, scale);
  }

  if (markKeypoints) {
    for (const prediction of predictions) {
      drawKeypoints(context, prediction);
    }
  }

  if (stream) {
    requestAnimationFrame(() => {
      takepictures(video, canvas, model, stream, markKeypoints, id);
    });
  }
}

async function translatePredictions(predictions) {
  const translations = [];
  for (const prediction of predictions) {
    const translation = await translateUserCode(prediction);
    translations.push(translation);
  }
  return translations;
}

async function drawOnVideo(context, translatedPrediction, scale) {
  if (!translatedPrediction) {
    return;
  }

  const { xCenter, yCenter, width, height, angle } = translatedPrediction;
  const decoration = document.querySelector('img.selected');
  drawImageCenter(context, decoration, xCenter, yCenter, width, height, angle);
}

function drawImageCenter(ctx, decoration, x, y, w, h, ang) {
  ctx.rotate(ang);

  const r = Math.sqrt(x ** 2 + y ** 2);
  const b = getAng(x, y);
  const xp = r * Math.cos(b - ang);
  const yp = r * Math.sin(b - ang);

  drawImageCenterBase(ctx, decoration, xp, yp, w, h);
  ctx.rotate(-ang);
}

function drawImageCenterBase(ctx, decoration, x, y, w, h) {
  const xp = x - w / 2;
  const yp = y - h / 2;

  ctx.drawImage(decoration, xp, yp, w, h);
}

function drawRectCenter(ctx, x, y, w, h, alp) {
  ctx.rotate(alp);

  const r = Math.sqrt(x ** 2 + y ** 2);
  const b = getAng(x, y);
  const xp = r * Math.cos(b - alp);
  const yp = r * Math.sin(b - alp);

  drawRectCenterBase(ctx, xp, yp, w, h);

  ctx.rotate(-alp);
}

function drawRectCenterBase(ctx, x, y, w, h) {
  const xp = x - w / 2;
  const yp = y - h / 2;

  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.rect(xp, yp, w, h);
  ctx.stroke();
}

function getAng(x, y) {
  if (y === 0) {
    return 0;
  }

  if (x === 0) {
    return Math.Pi / 2;
  }

  return Math.atan(y / x);
}
