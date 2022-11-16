import { sendRequest } from '../util/request';

const leftEyeX = 200;
const leftEyeY = 100;
const rightEyeX = 100;
const rightEyeY = 110;
const noseTipX = 150;
const noseTipY = 105;
const mouthCenterX = 150;
const mouthCenterY = 200;
const leftEarTragionX = 250;
const leftEarTragionY = 110;
const rightEarTragionX = 50;
const rightEarTragionY = 110;
const faceTiltAngle = (Math.PI / 180) * 10;

const BASE_MESSAGE =
  '"window.getDrawProps must return an object like the following {xCenter:1, yCenter:2, width:3, height:4, angle:5}';

export async function throwDrawError() {
  const drawProps = await throwFcnError();
  await throwPropsError(drawProps);
}

async function throwFcnError() {
  try {
    const drawProps = await sendRequest({
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

    return drawProps;
  } catch (error) {
    if (error.message === 'Invalid result: {}') {
      throw new Error(
        `You must define a function called "window.getDrawProps". ${BASE_MESSAGE}`
      );
    }
    throw error;
  }
}

function throwPropError(drawProps, name) {
  const value = drawProps[name];
  if (value === undefined) {
    throw new Error(`Property "${name}" missing. ${BASE_MESSAGE}`);
  }

  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Property "${name}" must be a number. ${BASE_MESSAGE}`);
  }
}

function throwPropsError(drawProps) {
  if (!drawProps) {
    throw new Error(
      `"window.getDrawProps" does not return a value. ${BASE_MESSAGE}`
    );
  }

  const names = ['xCenter', 'yCenter', 'width', 'height', 'angle'];
  for (const name of names) {
    throwPropError(drawProps, name);
  }
}

export async function waitForValidUserCode() {
  await new Promise(async (res) => {
    const int = setInterval(async () => {
      try {
        await throwDrawError();
        clearUserRunError();
        clearInterval(int);
        res();
      } catch (drawError) {
        showUserRunError(drawError);
      }
    }, 250);
  });
}

const USER_CODE_ERROR_BLOCK = document.getElementById('user-code-error');
const USER_CODE_ERROR_DISPLAY = document.getElementById(
  'user-code-error-display'
);

function showUserRunError(drawError) {
  USER_CODE_ERROR_DISPLAY.innerText = drawError.stack;
  USER_CODE_ERROR_BLOCK.style.display = 'block';
}

function clearUserRunError() {
  USER_CODE_ERROR_BLOCK.style.display = 'none';
}
