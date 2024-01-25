const fs = require('fs/promises');
const path = require('path');

async function buildCSSBundle() {
    try {
        const stylesFolderPath = path.join(__dirname, 'styles');
        const destFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

        const fileNames = await fs.readdir(stylesFolderPath);

        const cssFiles = fileNames.filter(fileName => fileName.endsWith('.css'));

        let combinedStyles = '';

        for (const cssFile of cssFiles) {
            const filePath = path.join(stylesFolderPath, cssFile);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            combinedStyles += fileContent;
        }

        await fs.writeFile(destFilePath, combinedStyles);
        
        console.log('CSS bundle created successfully.');
    } catch (error) {
        console.error('Error building CSS bundle', error);
    }
}

buildCSSBundle();