// Node.js file
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
// Import package to 
const UUID = require('uuid-v4');

// Firebase settings
const gcconfig = {
    projectId: 'awesomeadventure-1559175363264',
    keyFilename: 'gcs-awesomeadventures.json'
}
const gsc = require('@google-cloud/storage')(gcconfig);

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
        // Targets a pre-existing storage bucket
        const bucket = gsc.bucket('awesomeadventure-1559175363264.appspot.com')
        const uuid = UUID();
        
        // Upload the file to our firebase storage bucket
        return bucket.upload('/tmp/uploaded-image.jpg',
            {
                uploadType: 'media',
                destination: '/places/' + uuid + '.jpg',
                metadata: {
                    metadata: {
                        contentType: 'image/jpg',
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            },
            // Third argument.  Error is either null or the error.  The file is either the file or null (if there is an error).
            (err, file) => {
                // If there is no error...
                if (!err) {
                    return response.status(201).json({
                        // Generates a link to the image that we can access without general access rights
                        imageUrl:
                            "https://firebasestorage.googleapis.com/v0/b/" +
                            bucket.name +
                            "/o/" +
                            // Node.js function.  Encodes the name.
                            encodeURIComponent(file.name) +
                            // Query parameter
                            "?alt=media&token=" +
                            uuid
                    });
                // If there is an error...
                } else {
                    console.log(err);
                    return response.status(500).json({ error: err });
                }
            }
        );
    });
});
