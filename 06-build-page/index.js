const fs = require('fs/promises');
const path = require('path');

const baseDir = __dirname;
const distDir = path.join(baseDir, 'project-dist');

async function createDistDir() {
    try {
        await fs.mkdir(distDir, { recursive: true });
        console.log('project-dist directory created successfully.');
    } catch (error) {
        console.error('Error creating project-dist directory:', error);
    }
}

createDistDir();