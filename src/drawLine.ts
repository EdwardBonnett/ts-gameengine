import * as PIXI from 'pixi.js';

let app = new PIXI.Application({ 
    width: 640, 
    height: 360, 
    backgroundAlpha: 0,
    antialias: true
});
document.body.appendChild(app.view);

let previousData: Array<number> = [];
const data = Array(1000).fill(0).map(() => Math.random() * 50);
let min = Math.min(...data);
let max = Math.max(...data);
const width = 640;
const height = 300;


let myGraph = new PIXI.Graphics();
app.stage.addChild(myGraph);

function lerp(v0: number, v1: number, t: number) {
    return v0 * (1 - t) + v1 * t;
}
var prepareRGBChannelColor = function(channelColor) {
    var colorText = channelColor.toString(16);
    if (colorText.length < 2) {
      while (colorText.length < 2) {
        colorText = "0" + colorText;
      }
    }
  
    return colorText;
  }
  
  // Getting RGB channels from a number color
  // param color is a number
  // return an RGB channels object {red: number, green: number, blue: number}
  var getRGBChannels = function(color) {
    var colorText = color.toString(16);
    if (colorText.length < 6) {
      while (colorText.length < 6) {
        colorText = "0" + colorText;
      }
    }
  
    var result = {
      red: parseInt(colorText.slice(0, 2), 16),
      green: parseInt(colorText.slice(2, 4), 16),
      blue: parseInt(colorText.slice(4, 6), 16)
    };
    return result;
  }
  
  // Preparaiton of a color data object
  // param color is a number [0-255]
  // param alpha is a number [0-1]
  // return the color data object {color: number, alpha: number, channels: {red: number, green: number, blue: number}}
  var prepareColorData = function(color, alpha) {
    return {
      color: color,
      alpha: alpha,
      channels: getRGBChannels(color)
    }
  }
  
  // Getting the color of a gradient for a very specific gradient coef
  // param from is a color data object
  // param to is a color data object
  // return value is of the same type
  var getColorOfGradient = function(from, to, coef) {
    if (!from.alpha && from.alpha !== 0) {
      from.alpha = 1;
    }
    if (!from.alpha && from.alpha !== 0) {
      to.alpha = 1;
    }
  
    var colorRed = Math.floor(from.channels.red + coef * (to.channels.red - from.channels.red));
    colorRed = Math.min(colorRed, 255);
    var colorGreen = Math.floor(from.channels.green + coef * (to.channels.green - from.channels.green));
    colorGreen = Math.min(colorGreen, 255);
    var colorBlue = Math.floor(from.channels.blue + coef * (to.channels.blue - from.channels.blue));
    colorBlue = Math.min(colorBlue, 255);
  
    var rgb = prepareRGBChannelColor(colorRed) + prepareRGBChannelColor(colorGreen) + prepareRGBChannelColor(colorBlue);
  
    return {
      color: parseInt(rgb, 16),
      alpha: from.alpha + coef * (to.alpha - from.alpha)
    };
  }
  
function drawGradient () {
    var gradient = new PIXI.Graphics();
    app.stage.addChild(gradient);
    //
    var rect = {
    width: width,
    height: height
    };
    var round = 20;
    //
    var colorFromData = prepareColorData(0xFF00FF, 1);
    var colorToData = prepareColorData(0xFF0000, 0.2);
    //
    var stepCoef;
    var stepColor;
    var stepAlpha;
    var stepsCount = 100;
    var stepHeight = rect.height / stepsCount;
    for (var stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
        stepCoef = stepIndex / stepsCount;
        stepColor = getColorOfGradient(colorFromData, colorToData, stepCoef);

        gradient.beginFill(stepColor.color, stepColor.alpha);
        gradient.drawRect(
            0,
            rect.height * stepCoef,
            rect.width,
            stepHeight
        );
    }
    return gradient;
}

var gradient1 = drawGradient();


function drawLine () { 
    const segmentWidth = width / data.length;
    const pointHeight = height / (max - min)
    const line = myGraph
    .moveTo(0, height - (pointHeight * data[0]) + min)
    .lineStyle({ 
        width: 3,
        color: 0x333333})
        
     line.beginFill(0xffffff);
    data.forEach((point, i) => {
        previousData[i] = lerp(previousData[i], point, 0.1)
        line.lineTo(
            segmentWidth * i, 
            height - (pointHeight * previousData[i]) + min
        )
    });
    line.lineTo(width, height);
    line.lineTo(0, height);
     line.endFill();
    gradient1.mask = line;
}



app.ticker.add(() => {
    myGraph.clear();
    drawLine();
});


window.addEventListener('click', () => {
    previousData = JSON.parse(JSON.stringify(data));
    data.forEach((_el, i) => {
        data[i] = Math.random() * 50;
    });
})