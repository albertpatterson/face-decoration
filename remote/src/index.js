import { showExampleVideo, showCameraVideo, showScreenVideo } from './camera';
import { getModel } from './model';
import { initiateVideoAndCanvas, takepictures } from './draw';
import './style.scss';
import './carousel';
import './add_img';
import { waitForValidUserCode } from './user_code_interface/validate';
import { updateTest, stopTest } from './test';

const testSection = document.getElementById('test-section');
const videoSection = document.getElementById('videos-section');
const canvas = document.getElementById('decoration-canvas');
let currentVideo = null;

window.launchTest = async function () {
  await hideVideos();
  await showTest();
};

async function showSingleVideoTab(showVideoTab) {
  hideTest();
  hideDecorationCanvas();
  showVideos();
  showLoading();
  setTimeout(async () => {
    await showVideoTab();
    hideLoading();
    showDecorationCanvas();
  }, 0);
}

window.launchExample = async function () {
  await showSingleVideoTab(playExample);
};

window.launchCamera = async function () {
  await showSingleVideoTab(playCamera);
};

window.launchScreen = async function () {
  await showSingleVideoTab(playScreen);
};

(async () => {
  console.log('start', window);
  document.body.style.display = 'block';
  await waitForValidUserCode();
  showContent();
  await window.launchTest();
})();

function showContent() {
  document.getElementById('user-code-valid').style.display = 'block';
}

const LOADING_INDICATOR = document.getElementById('loading-indicator');
function showLoading() {
  LOADING_INDICATOR.style.display = 'block';
}

function hideLoading() {
  LOADING_INDICATOR.style.display = 'none';
}

async function playExample() {
  const video = await showExampleVideo();
  currentVideo = video;
  await initiateVideoAndCanvas(video, canvas);
  const model = await getModel();
  takepictures(video, canvas, model);
}

async function playCamera() {
  const video = await showCameraVideo(); //update
  currentVideo = video;
  await initiateVideoAndCanvas(video, canvas);
  const model = await getModel();
  takepictures(video, canvas, model);
}

async function playScreen() {
  const video = await showScreenVideo(); //update
  currentVideo = video;
  await initiateVideoAndCanvas(video, canvas);
  const model = await getModel();
  takepictures(video, canvas, model);
}

async function showTest() {
  testSection.style.display = 'block';
  videoSection.style.display = 'none';
  await updateTest();
}

function hideTest() {
  testSection.style.display = 'none';
  stopTest();
}

function showVideos() {
  videoSection.style.display = 'block';
}

function hideVideos() {
  videoSection.style.display = 'none';
}

const DECORATION_CANVAS = document.getElementById('decoration-canvas');
function hideDecorationCanvas() {
  DECORATION_CANVAS.style.display = 'none';
}

function showDecorationCanvas() {
  DECORATION_CANVAS.style.display = 'inline';
}
