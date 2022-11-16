import { getPredictionPoint, getAngle } from '../util';
import { sendRequest } from '../util/request';
export async function translateUserCode(prediction) {
  const { x: leftEyeX, y: leftEyeY } = getPredictionPoint(
    prediction,
    'leftEye'
  );
  const { x: rightEyeX, y: rightEyeY } = getPredictionPoint(
    prediction,
    'rightEye'
  );
  const { x: noseTipX, y: noseTipY } = getPredictionPoint(
    prediction,
    'noseTip'
  );
  const { x: mouthCenterX, y: mouthCenterY } = getPredictionPoint(
    prediction,
    'mouthCenter'
  );
  const { x: rightEarTragionX, y: rightEarTragionY } = getPredictionPoint(
    prediction,
    'rightEarTragion'
  );
  const { x: leftEarTragionX, y: leftEarTragionY } = getPredictionPoint(
    prediction,
    'leftEarTragion'
  );

  const earXDistance = leftEarTragionX - rightEarTragionX;
  const earYDistance = leftEarTragionY - rightEarTragionY;

  const faceTiltAngle = getAngle(earXDistance, earYDistance);

  const props = await sendRequest({
    leftEyeX,
    leftEyeY,
    rightEyeX,
    rightEyeY,
    noseTipX,
    noseTipY,
    mouthCenterX,
    mouthCenterY,
    leftEarTragionX,
    leftEarTragionY,
    rightEarTragionX,
    rightEarTragionY,
    faceTiltAngle,
  });

  return props;
}
