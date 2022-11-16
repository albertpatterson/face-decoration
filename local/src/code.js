// keypoints pointed to on the face https://github.com/albertpatterson/face-decoration#keypoints-identified

// When looking face to face at a person, they are facing
// in the opposite direction from you, so their right side
// is on your left, the face keypoints from your
// perspective are arranged as follows
//
//                rightEye   leftEye
// rightEarTragion    noseTip    leftEarTragion
//                  mouthCenter

window.getDrawProps = function (
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
  faceTiltAngle
) {
  // face object has the properties shown at https://github.com/albertpatterson/face-decoration#keypoints-json

  const rawWidth = leftEarTragionX - rightEarTragionX;
  const width = rawWidth;

  const xCenter = (rightEyeX + leftEyeX) / 2;
  const yCenter = (rightEyeY + leftEyeY) / 2;
  const height = width / 3;

  const angle = faceTiltAngle;

  // draw properties on the face https://github.com/albertpatterson/face-decoration#draw-properties
  return { xCenter, yCenter, width, height, angle };
};

/**
 *
 *
 *
 *
 *
 *
 *
 * Example for positioning the smile
 */
// window.getDrawProps = function (
//   leftEyeX,
//   leftEyeY,
//   rightEyeX,
//   rightEyeY,
//   noseTipX,
//   noseTipY,
//   mouthCenterX,
//   mouthCenterY,
//   leftEarTragionX,
//   leftEarTragionY,
//   rightEarTragionX,
//   rightEarTragionY,
//   faceTiltAngle
// ) {
//   // face object has the properties shown at https://github.com/albertpatterson/face-decoration#keypoints-json
//   // getFacePoint method helps to get the desired face point

//   const rawWidth = leftEarTragionX - rightEarTragionX;
//   const width = 0.75 * rawWidth;
//   const height = width / 2;
//   const xCenter = mouthCenterX;
//   const yCenter = mouthCenterY;

//   const earXDistance = rawWidth;
//   const earYDistance = leftEarTragionY - rightEarTragionY;

//   const angle = faceTiltAngle;

//   // draw properties drawn on the face https://github.com/albertpatterson/face-decoration#draw-properties
//   return { xCenter, yCenter, width, height, angle };
// };

/**
 *
 *
 *
 *
 *
 *
 *
 * Example for positioning the shopkin
 */
// window.getDrawProps = function (
//   leftEyeX,
//   leftEyeY,
//   rightEyeX,
//   rightEyeY,
//   noseTipX,
//   noseTipY,
//   mouthCenterX,
//   mouthCenterY,
//   leftEarTragionX,
//   leftEarTragionY,
//   rightEarTragionX,
//   rightEarTragionY,
//   faceTiltAngle
// ) {
//   // face object has the properties shown at https://github.com/albertpatterson/face-decoration#keypoints-json
//   // getFacePoint method helps to get the desired face point

//   const rawWidth = leftEarTragionX - rightEarTragionX;
//   const width = 1.75 * rawWidth;
//   const height = width;

//   const xCenter = (rightEarTragionX + leftEarTragionX) / 2;
//   const yCenter = (rightEarTragionY + leftEarTragionY) / 2;
//   const angle = faceTiltAngle;

//   // draw properties drawn on the face https://github.com/albertpatterson/face-decoration#draw-properties
//   return { xCenter, yCenter, width, height, angle };
// };
