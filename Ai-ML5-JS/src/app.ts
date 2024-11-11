/// <reference path="../node_modules/@types/p5/global.d.ts" />
/// <reference path="../types/global.d.ts" />

let video;
let handPose;
let hands = [];

function preload() {
}

function setup() {
  handPose = ml5.handPose();
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.hide();
  handPose.detectStart(video, results => hands = results);
}

function draw() {
  //image(video, 0, 0);
  //clear();
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        //console.log(hand);
        let index = hand.index_finger_tip;
        let thumb = hand.thumb_tip;

        let x = (index.x + thumb.x) * 0.5;
        let y = (index.y + thumb.y) * 0.5;
        let sw = dist(index.x, index.y, thumb.x, thumb.y);
        
        if (sw < 30) {
          fill(255, 0, 255);
          noStroke();
          circle(x, y, sw);

        }
        //circle(hand['thumb_tip'].x, hand['thumb_tip'].y, 16);
        //circle(hand['index_finger_tip'].x, hand['index_finger_tip'].y, 16);


        //dist()
      //   for (let i = 0; i < hand.keypoints.length; i++) {
      //     let keypoint = hand.keypoints[i];
      //     if (hand.handedness == "Left") {
      //       fill(255, 0, 255);
      //     } else {
      //       fill(255, 255, 0);
      //     }
      //     noStroke();
      //     circle(keypoint.x, keypoint.y, 8);
          
      //   }
      // }
    }
  }
}