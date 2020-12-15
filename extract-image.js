const {classifyImage} = require('./imageRecognition.js');
const {setLogLevel, logExpression} = require('@cisl/zepto-logger');
let logLevel = 1; // default log level
setLogLevel(logLevel);

function interpretImage(watsonResponse) {
  logExpression("In interpretImage, watsonResponse is: ", 1);
  logExpression(watsonResponse, 1);
  let bestClass = {};
  let bestScore = 0.0;
  for(i = 0; i < watsonResponse.classes.length; i++) {
  	if(watsonResponse.classes[i].score > bestScore) {
  	  bestClass = watsonResponse.classes[i];
  	  bestScore = watsonResponse.classes[i].score;
  	}
  }

  let cmd = {};
  if(bestClass.class == "cake" && bestScore > 0.2){
  	cmd = {
  	  type: "cake"
  	};
  }else if(bestClass.class == "pancake" && bestScore > 0.2){
  	cmd = {
  	  type: "pancake"
  	};
  }else{
  	cmd = {
  	  type: "unknown"
  	};
  }
  logExpression("Returning from interpretImage with cmd: ", 1);
  logExpression(cmd, 1);
  return cmd;
}

exports = module.exports = {
  interpretImage
};