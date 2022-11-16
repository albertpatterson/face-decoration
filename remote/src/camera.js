export async function getVideoStream() {
  return await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
}

export async function getScreenStream() {
  return await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false,
  });
}

const wrapper = document.getElementById('video-wrapper');

let showingVideo = null;
export async function showExampleVideo() {
  const video = document.createElement('video');
  const exampleUrl = new URL('./assets/game.mp4', import.meta.url);
  video.src = exampleUrl.href;
  video.muted = true;
  video.preload = true;
  video.autoplay = true;
  video.loop = true;

  if (showingVideo) {
    wrapper.removeChild(showingVideo);
  }

  wrapper.appendChild(video);
  showingVideo = video;
  return showingVideo;
}

export async function showCameraVideo() {
  const video = document.createElement('video');
  const stream = await getVideoStream();
  video.srcObject = stream;

  if (showingVideo) {
    wrapper.removeChild(showingVideo);
  }

  wrapper.appendChild(video);
  showingVideo = video;
  return showingVideo;
}

export async function showScreenVideo() {
  const video = document.createElement('video');
  const stream = await getScreenStream();
  video.srcObject = stream;

  if (showingVideo) {
    wrapper.removeChild(showingVideo);
  }

  wrapper.appendChild(video);
  showingVideo = video;
  return showingVideo;
}
