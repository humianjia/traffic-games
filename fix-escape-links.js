const fs = require('fs');
const path = require('path');

// 读取escape游戏数据文件
const escapeGamesDataPath = path.join(__dirname, 'js', 'data', 'escape-games-data.js');
let escapeGamesDataContent = fs.readFileSync(escapeGamesDataPath, 'utf8');

// 修复link字段中的特殊字符
function fixLinks() {
    // 匹配所有link字段
    const linkRegex = /"link":\s*"([^"]+)"/g;
    
    escapeGamesDataContent = escapeGamesDataContent.replace(linkRegex, (match, link) => {
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
    fs.writeFileSync(escapeGamesDataPath, escapeGamesDataContent);
    console.log('已修复escape-games-data.js中的link字段特殊字符');
}

// 执行修复
fixLinks();
