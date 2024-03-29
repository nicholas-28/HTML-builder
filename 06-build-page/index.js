const fs = require('fs/promises');
const path = require('path');

const baseDir = __dirname;
const distDir = path.join(baseDir, 'project-dist');
const templateFilePath = path.join(baseDir, 'template.html');
const componentsDir = path.join(baseDir, 'components');
const stylesDir = path.join(baseDir, 'styles');
const assetsDir = path.join(baseDir, 'assets');
const copyAssetsDir = path.join(distDir, 'assets');

async function createDistDir() {
    try {
        await fs.mkdir(distDir, { recursive: true });
        console.log('project-dist directory created successfully.');
    } catch (error) {
        console.error('Error creating project-dist directory:', error);
    }
}

async function buildHTML() {
    try {
        let templateContent = await fs.readFile(templateFilePath, 'utf-8');

        const placeholders = templateContent.match(/{{\w+}}/g) || [];

        for (const placeholder of placeholders) {
            const componentName = placeholder.replace(/{{|}}/g, '');
            const componentPath = path.join(componentsDir, `${componentName}.html`);
            const componentContent = await fs.readFile(componentPath, 'utf-8');
            templateContent = templateContent.replace(new RegExp(placeholder, 'g'), componentContent);
        }

        await fs.writeFile(path.join(distDir, 'index.html'), templateContent);
        console.log('index.html has been created successfully.');
    } catch (error) {
        console.error('Error building index.html:', error);
    }
}

async function compileCSS() {
    try {
        const cssFiles = await fs.readdir(stylesDir);
        let combinedCSS = '';

        for (const file of cssFiles) {
            if(file.endsWith('.css')) {
                const cssContent = await fs.readFile(path.join(stylesDir, file), 'utf-8');
                combinedCSS += cssContent + '\n';
            }
        }

        await fs.writeFile(path.join(distDir, 'style.css'), combinedCSS);
        console.log('style.css has been compiled successfully.');
    } catch (error) {
        console.error('Error compiling style.css:', error);
    }
}

async function copyAssets(sourceDir, targetDir) {
    try {
        const entries = await fs.readdir(sourceDir, {withFileTypes: true });

        await fs.mkdir(targetDir, {recursive: true });

        for (const entry of entries) {
            const srcPath = path.join(sourceDir, entry.name);
            const destPath = path.join(targetDir, entry.name);

            if (entry.isDirectory()) {
                await copyAssets(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }

    } catch (error) {
        console.error('Error copying assets:', error);
    }
}

createDistDir();
buildHTML();
compileCSS();
copyAssets(assetsDir, copyAssetsDir);