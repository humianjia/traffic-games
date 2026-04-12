const fs = require('fs');
const path = require('path');

// 数据文件目录
const dataDir = path.join(__dirname, 'js', 'data');

// 获取所有数据文件
const dataFiles = fs.readdirSync(dataDir).filter(file => file.endsWith('-data.js'));

// 修复link字段中的特殊字符
function fixLinksInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 匹配所有link字段
    const linkRegex = /"link":\s*"([^"]+)"/g;
    
    content = content.replace(linkRegex, (match, link) => {
        // 替换特殊字符（保留.html）
        let htmlSuffix = '';
        if (link.endsWith('.html')) {
            htmlSuffix = '.html';
            link = link.slice(0, -5); // 移除.html后缀
        }
        
        let fixedLink = link
            .replace(/:/g, '')      // 替换冒号
            .replace(/-/g, '')      // 替换破折号
            .replace(/!/g, '')      // 替换感叹号
            .replace(/\+/g, '')     // 替换加号
            .replace(/,/g, '')      // 替换逗号
            .replace(/\./g, '')     // 替换点号
            .replace(/&/g, '');     // 替换&符号
        
        fixedLink += htmlSuffix; // 重新添加.html后缀
        
        return `"link": "${fixedLink}"`;
    });
    
    // 写入修复后的数据
    fs.writeFileSync(filePath, content);
    console.log(`已修复: ${path.basename(filePath)}`);
}

// 执行修复
console.log('开始修复所有数据文件中的link字段...');
dataFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    fixLinksInFile(filePath);
});
console.log('所有数据文件修复完成！');
