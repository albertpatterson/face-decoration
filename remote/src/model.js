let model = null;

export async function getModel() {
  if (model) {
    return model;
  }

  const factory = faceDetection.SupportedModels.MediaPipeFaceDetector;
  const detectorConfig = {
    runtime: 'tfjs',
    maxFaces: 10,
  };
  model = await faceDetection.createDetector(factory, detectorConfig);
  return model;
}

export async function getPredictions(video, model) {
  const estimationConfig = { flipHorizontal: false };
  const faces = await model.estimateFaces(video, estimationConfig);
  return faces;
}
