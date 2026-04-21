const fs = require('fs');
const path = require('path');

// Google AdSense 代码
const adsenseCode = `    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7534347140708021"
        crossorigin="anonymous"></script>
`;

// 已处理的文件（跳过）
const excludeFiles = [
    'index.html',
    'categories.html',
    'generate-favicon.html'
];

function addAdsenseToFile(filepath) {
    try {
        let content = fs.readFileSync(filepath, 'utf-8');
        
        // 检查是否已经有AdSense代码
        if (content.includes('adsbygoogle.js')) {
            console.log(`跳过 (已有AdSense): ${filepath}`);
            return false;
        }
        
        // 在最后一个 <link rel="stylesheet"> 后添加
        const linkRegex = /<link[^>]*stylesheet[^>]*>/gi;
        const matches = [...content.matchAll(linkRegex)];
        
        if (matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            const insertPos = lastMatch.index + lastMatch[0].length;
            content = content.slice(0, insertPos) + '\n' + adsenseCode + content.slice(insertPos);
        } else {
            // 如果没有找到stylesheet，在 </head> 前添加
            const headEndIndex = content.indexOf('</head>');
            if (headEndIndex === -1) {
                console.log(`跳过 (找不到</head>): ${filepath}`);
                return false;
            }
            content = content.slice(0, headEndIndex) + adsenseCode + content.slice(headEndIndex);
        }
        
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`已添加: ${filepath}`);
        return true;
        
    } catch (error) {
        console.error(`错误 ${filepath}: ${error.message}`);
        return false;
    }
}

function processDirectory(directory) {
    let count = 0;
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // 递归处理子目录
            count += processDirectory(fullPath);
        } else if (stat.isFile() && item.endsWith('.html')) {
            // 检查是否需要跳过
            const relativePath = path.relative(baseDir, fullPath);
            const fileName = path.basename(item);
            
            // 跳过根目录下已处理的文件
            if (directory === baseDir && excludeFiles.includes(fileName)) {
                console.log(`跳过 (已处理): ${relativePath}`);
                continue;
            }
            
            // 跳过 games/traffic-jam-3d.html (已处理)
            if (relativePath.includes('games') && fileName === 'traffic-jam-3d.html') {
                console.log(`跳过 (已处理): ${relativePath}`);
                continue;
            }
            
            if (addAdsenseToFile(fullPath)) {
                count++;
            }
        }
    }
    
    return count;
}

const baseDir = 'f:\\DATA\\MyWorkspace\\h5game\\traffic games';

console.log('开始添加 Google AdSense 代码到所有HTML文件...');
console.log('-'.repeat(60));

const total = processDirectory(baseDir);

console.log('-'.repeat(60));
console.log(`处理完成! 共添加 ${total} 个HTML文件`);
