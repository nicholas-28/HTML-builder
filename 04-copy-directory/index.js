const fs = require('fs/promises');
const path = require('path');
const targetDir = path.resolve(__dirname, 'files-copy');

async function createTargetDir() {
    try{
        await fs.mkdir(targetDir, {recursive: true});
        console.log("Folder 'files-copy' created successfully.");
    } catch (error) {
        console.error('Error creating target directory:', error);
    }
}

async function readFilesFolder() {
    try {
        const filesFolderPath = path.resolve(__dirname, 'files');
        const fileNames = await fs.readdir(filesFolderPath);

        console.log('Contents of the "files" folder:', fileNames);
    } catch (error) {
        console.error('Error reading "files" folder:', error);
    }
}
createTargetDir();
readFilesFolder();