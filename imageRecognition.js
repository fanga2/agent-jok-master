const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const assistantParams = require('./imageParams.json');
const { logExpression } = require('@cisl/zepto-logger');

const visualRecognition = new VisualRecognitionV3({
  version: '{version}',
  authenticator: new IamAuthenticator({
    apikey: '{apikey}',
  }),
  serviceUrl: '{url}',
  headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});

function classifyImage(input) {
  logExpression("Entered classifyImage with input: ", 2);
  logExpression(input, 2);
  let text = null;
  text = input.replace(/[\s\t\r\n]+/g,"").trim();
  let classifyParams = {
  	url: input,
  	classifierIds: [assistantParams.classifierID],
  	threshold: 0.0,
  };
  logExpression("classifyParams: ", 2);
  logExpression(classifyParams, 2);

  return visualRecognition.classify(classifyParams)
  .then(response => {
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