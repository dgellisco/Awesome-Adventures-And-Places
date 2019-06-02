// FIREBASE FUNCTIONS FILE
// Node.js file

// Imports
const functions = require('firebase-functions');
const firebaseAdmin = require("firebase-admin");
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');

// Firebase settings
const gcconfig = {
    projectId: 'awesomeadventure-1559175363264',
    keyFilename: 'gcs-awesomeadventures.json'
}
const gsc = require('@google-cloud/storage')(gcconfig);

// Intialize firebase admin
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(require("./places.json"));
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// 
exports.storeImage = functions.https.onRequest((request, response) => {
    // All code goes in here.
    cors(request, response, () => {
        if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
            console.log("No token present!");
            // Response with status 403 (access denied), and send back json error message
            response.status(403).json({error: "Unauthorized"});
            return;
        }
        let idToken;
        // Get first element after 'Bearer', which is the token
        idToken = request.headers.authorization.split("Bearer ")[1];
        // Async task to verify token
        firebaseAdmin.auth().verifyIdToken(idToken)
            .then(decodedToken => {
                const body = JSON.parse(request.body);
                fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64',
                    // If an error occurs, exit this code block with the return statement
                    err => {
                        console.log(err);
                        return response.status(500).json({error: err});
                    }
                );
                // Target a pre-existing storage bucket
                const bucket = gsc.bucket('awesomeadventure-1559175363264.appspot.com')
                const uuid = UUID();
                // Upload the file to the firebase storage bucket
                return bucket.upload(
                    // Arg 1, File to upload
                    '/tmp/uploaded-image.jpg',
                    // Arg 2, Set details for upload
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
                    // Arg 3, error.  Either null null, or the error and the file.
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
            })
            .catch(error => {
                console.log("Token is invalid");
                response.status(403).json({error: "Unauthorized"})
            })
    });
});
