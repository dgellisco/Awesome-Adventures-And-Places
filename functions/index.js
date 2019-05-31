// Node.js file
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');

const gcconfig = {
    projectId: '',
    keyFilename: 'gcs-awesomeadventures.json'
}
const gcs = require('@google-cloud/storage');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    // All code goes in here.
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
            console.log(err);
            return response.status(500).json({error: err});
        });
        // This code only runs if the return above doesn't run, so if there is no error
        const bucket = 
    });

    response.send("Hello from Firebase!");
});
