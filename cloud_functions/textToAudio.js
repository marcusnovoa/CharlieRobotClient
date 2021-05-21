/*
 * This file includes code for two separate files, index.js and package.json.
 * Be sure to separate them into their proper files on the Google Cloud platform.
 * 
 * Name:     textToAudio
 * Region:   us-east4
 * Trigger:  HTTP
 * Runtime:  Node.js 10
 * Executed: textToAudio
 */

/*** index.js ***/

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech')

// Import other required libraries
const fs = require('fs')
// const stream = require('stream')
const util = require('util')

// Creates a client
const client = new textToSpeech.TextToSpeechClient()

/**
 * Text-to-Audio is a Cloud Function that is triggered by an HTTP
 * request. The function processes one audio file.
 *
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 */
exports.textToAudio = async (req, res) => {
  // Construct the request
  const request = {
    input: { text: req.body },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Wavenet-I'
    },
    audioConfig: {
      audioEncoding: 'MP3',
      pitch: 0,
      speakingRate: 1
    },
  }

  // Perform the text-to-speech request
  return await client.synthesizeSpeech(request).then((response) => {
    res.send(JSON.stringify(response))
  })
}


/*** package.json - UNCOMMENT (Only commented because it's json) ***/

// {
//     "name": "charlie-robot-speech2",
//     "version": "1.0.0",
//     "dependencies": {
//         "@google-cloud/text-to-speech": "^3.1.3",
//         "stream": "^0.0.2",
//         "util": "^0.12.3"
//     }
// }
