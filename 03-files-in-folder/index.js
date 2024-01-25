const fs = require('fs/promises');
const path = require('path');
const secretFolderPath = path.join(__dirname, 'secret-folder');

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

async function getFileStats(dirPath, fileName) {
    const filePath = path.join(dirPath, fileName);
    try {
        const stats = await fs.stat(filePath);
        return stats;
    } catch (error) {
        console.error(`Error retrieving stats for file ${fileName}`, error);
    }
}

async function displayFileInfo(dirPath, fileNames) {
    for (const fileName of fileNames) {
        const stats = await getFileStats(dirPath, fileName);
        if (stats) {
            const fileSize = stats.size;
            const fileExtension = path.extname(fileName).slice(1);
            const name = path.basename(fileName, "." + fileExtension);
            console.log(`${name} - ${fileExtension} - ${fileSize} bytes`)
        }
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
// const dirPath = path.join(__dirname, 'secret-folder'); 
// const fileName = 'text.txt'; 

// getFileStats(dirPath, fileName)
//   .then(stats => {
//     console.log(`Stats for file ${fileName}:`, stats);
//   })
//   .catch(error => {
//     console.error('Failed to get file stats:', error);
//   });

