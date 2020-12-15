const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const imageParams = require('./imageParams.json');
const { logExpression } = require('@cisl/zepto-logger');

const visualRecognition = new VisualRecognitionV3({
  version: imageParams.version,
  authenticator: new IamAuthenticator({
    apikey: imageParams.apikey,
  }),
  serviceUrl: imageParams.url,
  headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});

function classifyImage(input) {
  logExpression("Entered classifyImage with input: ", 1);
  logExpression(input, 1);
  let text = null;
  text = input.replace(/[\s\t\r\n]+/g,"").trim();
  let classifyParams = {
  	url: input,
  	classifierIds: [imageParams.classifierID],
  	threshold: 0.0,
  };
  logExpression("classifyParams: ", 1);
  logExpression(classifyParams, 1);

  return visualRecognition.classify(classifyParams)
  .then(response => {
  	logExpression(translateWatsonResponse(response), 1);
  	return translateWatsonResponse(response);
  })
  .catch(err => {
  	logExpression("Error classifying image: ", 1);
  	logExpression(err, 1);
  });
}

function translateWatsonResponse(response) {
  let result = response.result;
  let images = result.images[0] || {};
  let output = images.classifiers[0] || {};

  return output;
}

exports = module.exports = {
  classifyImage
};