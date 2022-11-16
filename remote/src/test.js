import { takepictures } from './draw';
const EXAMPLE_FACES = JSON.parse(
  '[{"keypoints":[{"x":61.753472685813904,"y":72.43269681930542,"name":"rightEye"},{"x":99.93229508399963,"y":72.86659777164459,"name":"leftEye"},{"x":81.05683028697968,"y":91.52582287788391,"name":"noseTip"},{"x":79.56898212432861,"y":112.40522861480713,"name":"mouthCenter"},{"x":38.505108654499054,"y":86.20387315750122,"name":"rightEarTragion"},{"x":118.84606182575226,"y":88.43068778514862,"name":"leftEarTragion"}],"box":{"xMin":34.226059913635254,"xMax":126.09930038452148,"yMin":50.77314376831055,"yMax":142.64633059501648,"width":91.87324047088623,"height":91.87318682670593}},{"keypoints":[{"x":205.350261926651,"y":77.50007808208466,"name":"rightEye"},{"x":242.02297925949097,"y":77.34559178352356,"name":"leftEye"},{"x":220.36955952644348,"y":97.60047197341919,"name":"noseTip"},{"x":220.03390789031982,"y":116.80641174316406,"name":"mouthCenter"},{"x":187.16658353805542,"y":87.97490000724792,"name":"rightEarTragion"},{"x":265.36556482315063,"y":90.73348045349121,"name":"leftEarTragion"}],"box":{"xMin":181.00844621658325,"xMax":271.322500705719,"yMin":54.78809326887131,"yMax":145.10205388069153,"width":90.31405448913574,"height":90.31396061182022}}]'
);

const TEST_IMG = document.getElementById('test-img');
const TEST_CANVAS = document.getElementById('test-decoration-canvas');

let int = null;
export async function updateTest() {
  await updateTestSingle();
  int = setInterval(updateTestSingle, 250);
}

export function stopTest() {
  clearInterval(int);
}

async function updateTestSingle() {
  await takepictures(
    TEST_IMG,
    TEST_CANVAS,
    {
      estimateFaces: () => Promise.resolve(EXAMPLE_FACES),
    },
    false,
    true
  );
}
