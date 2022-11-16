export function getPredictionPoint(prediction, name) {
  const part = prediction.keypoints.find((keypoint) => keypoint.name === name);
  if (!part) {
    throw new Error(`part named "${name} not found`);
  }

  return part;
}

export function drawKeypoints(context, prediction) {
  if (!prediction) {
    return;
  }

  for (const keypoint of prediction.keypoints) {
    drawPoint(context, keypoint.x, keypoint.y);
  }
}

function drawPoint(context, x, y) {
  context.fillStyle = 'green';
  context.fillRect(x - 2, y - 2, 4, 4);
}

export function getAngle(x, y) {
  if (y === 0) {
    return 0;
  }

  if (x === 0) {
    return Math.Pi / 2;
  }

  return Math.atan(y / x);
}
