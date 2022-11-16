# Make Your Own Artificial Intelligence Driven Web App to Decorate Faces https://github.com/albertpatterson/face-decoration

The app will capture video and then apply artificial intelligence to decorate your face.

Make your own with [REPLIT.com](https://replit.com/@apatterson189/face-decoration): https://replit.com/@apatterson189/face-decoration

![Demo](./doc/demo.gif 'Demo')

## Create Your Own

create your own decortion and code to position it!

### Create Your Decoration

1. Create a png image to use as the decoration. Any app that allows you to create png files will work fine. The default decoration uses Google Drawings to make simple [sunglasses](https://tinyurl.com/ys9sfshn): https://tinyurl.com/ys9sfshn. A few options:
   1. [Google Drawings](https://docs.google.com/drawings): https://docs.google.com/drawings
   1. [Sketchpad](https://sketch.io/sketchpad/): https://sketch.io/sketchpad/
   1. [Figma](https://www.figma.com/): https://www.figma.com/
   1. etc...
1. replace the image at "edit/decoration.png" with your new decoration.

### Code Your Logic to Position the Decoration

update "edit/get_draw_props.js" to correctly calculate the drawing properties for your decoration. - the face parameter includes data like the following:

#### Keypoints (JSON)

```json
{
  "keypoints": [
    { "x": 141, "y": 61, "name": "rightEye" },
    { "x": 180, "y": 64, "name": "leftEye" },
    { "x": 167, "y": 80, "name": "noseTip" },
    { "x": 162, "y": 103, "name": "mouthCenter" },
    { "x": 105, "y": 76, "name": "rightEarTragion" },
    { "x": 189, "y": 81, "name": "leftEarTragion" }
  ],
  "box": {
    "xMin": 104,
    "xMax": 198,
    "yMin": 42,
    "yMax": 135,
    "width": 93,
    "height": 93
  }
}
```

#### Keypoints Identified

![Face Key Points](./doc/faceKeyPoints.png 'Face key points')

Based on the face keypoints, calculate the following to position the decoration

- xCenter: the x coordinate of the center of the decoration
- yCenter: the y coordinate of the center of the decoration
- width: the width of the decoration
- height: the height of the decoration
- angle: the angle of the decoration

#### Draw Properties

![Draw Props](./doc/drawProps.png 'Draw Props')

You can use the provided example images and video to check if your calculation is correct

## Other Resources

- Access this document online
  - URL: https://github.com/albertpatterson/face-decoration
  - Scan this QR code with your phone<br><img src="./doc/qrcode.png" height="150px" width="150px" alt="QR code">
