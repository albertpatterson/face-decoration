function createRequestSender() {
  let handler = null;
  let timeout = null;

  window.addEventListener('message', (event) => {
    if (handler) {
      clearTimeout(timeout);
      handler(event.data);
      handler = null;
      timeout = null;
    }
  });

  async function sendRequest(request) {
    return await new Promise((res, rej) => {
      handler = (result) => {
        if (result.response) {
          res(result.response);
        } else if (result.error) {
          rej(result.error);
        } else {
          rej(new Error(`Invalid result: ${JSON.stringify(result)}`));
        }
      };

      timeout = setTimeout(() => {
        rej('Request timed out');
      }, 1e3);
      window.parent.postMessage(request, '*');
    });
  }

  return sendRequest;
}

export const sendRequest = createRequestSender();
