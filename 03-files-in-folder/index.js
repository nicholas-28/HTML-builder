const fs = require('fs/promises');
const path = require('path');

async function listFilesInDirectory(dirPath) {
    try {
        const dirents = await fs.readdir(dirPath, { withFileTypes: true });

        const fileNames = [];

        for (const dirent of dirents) {
            if (dirent.isFile()) {
                fileNames.push(dirent.name);
            }
        }
        return fileNames;
    } catch (error) {
        console.error("Error reading directory", error);
    }
}

// const testDirPath = path.join(__dirname, 'secret-folder');

// listFilesInDirectory(testDirPath)
//   .then(fileNames => {
//     console.log('Files in directory:', fileNames);
//   })
//   .catch(error => {
//     console.error('An error occurred:', error);
//   });