const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs').promises;
const mime = require('mime');

async function uploadFilesToBlobStorage(files, containerName) {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const urls = [];

        for (const file of files) {
            // Fetch file data
            const fileData = await fs.readFile(file.path);

            // Get a block blob client with a unique name
            const blobName = `${Date.now()}-${file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            // Upload data to the blob
            await blockBlobClient.uploadData(fileData, {
                blobHTTPHeaders: {
                    blobContentType: file.mimetype
                }
            });

            // Add the URL of the uploaded blob to the array
            urls.push(blockBlobClient.url);
        }

        return urls;
    } catch (error) {
        throw new Error(`Error uploading files to blob storage: ${error.message}`);
    }
}

module.exports = { uploadFilesToBlobStorage};