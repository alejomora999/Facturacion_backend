// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'reportes_facturacion';

const createBucket = async (bucketName) => {
    // Creates the new bucket
    await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
}

const uploadFile = async (filename) => {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        destination: filename,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
}

const downloadFile = async (filename) => {
    const options = {
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination: `./${filename}`,
    };

    // Downloads the file
    await storage.bucket(bucketName).file(filename).download(options);

    console.log(
        `gs://${bucketName}/${filename} downloaded to ${filename}.`
    );
}

module.exports = {
    createBucket: createBucket,
    uploadFile: uploadFile,
    downloadFile: downloadFile,
}