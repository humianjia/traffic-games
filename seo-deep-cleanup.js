const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const subDirs = ['clicker', 'driving', 'escape', 'parking', 'racing', 'trafficControl', 'trivia', 'twoPlayer', 'games'];

function processFile(filePath, isRoot) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 更加通用的正则表达式，匹配 href="[./|../]home.html[#anchor]"
    // 支持 href="home.html", href="./home.html", href="../home.html" 
    // 以及带锚点的 href="home.html#categories" 等
    
    const replacement = isRoot ? '/' : '../';
    
    // 1. 替换带锚点的子目录链接 href="../home.html#abc" -> href="../#abc"
    let newContent = content.replace(/href="\.\.\/home\.html(#[\w-]+)"/g, 'href="../$1"');
    
    // 2. 替换带锚点的根链接 href="./home.html#abc" -> href="/#abc" 或 href="home.html#abc" -> href="/#abc"
    newContent = newContent.replace(/href="(\.\/)?home\.html(#[\w-]+)"/g, 'href="/$1"');
    
    // 3. 再次确保不带锚点的也被替换 (防止漏掉)
    newContent = newContent.replace(/href="home\.html"/g, `href="${replacement}"`);
    newContent = newContent.replace(/href="\.\/home\.html"/g, `href="${replacement}"`);
    newContent = newContent.replace(/href="\.\.\/home\.html"/g, 'href="../"');

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Deep cleaned: ${filePath}`);
        return true;
    }
    return false;
}

function walkDir(dir, isRoot) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            if (subDirs.includes(file)) {
                walkDir(fullPath, false);
            }
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            processFile(fullPath, isRoot);
        }
    }
}

console.log('Starting DEEP SEO link cleanup (including anchors and scripts)...');

// 处理根目录文件 (包括 js 脚本)
const rootFiles = fs.readdirSync(rootDir);
for (const file of rootFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.statSync(fullPath).isFile() && (file.endsWith('.html') || file.endsWith('.js'))) {
        if (file !== 'seo-deep-cleanup.js') {
            processFile(fullPath, true);
        }
    }
}

// 处理子目录
for (const dir of subDirs) {
    walkDir(path.join(rootDir, dir), false);
}

console.log('Deep cleanup complete.');
