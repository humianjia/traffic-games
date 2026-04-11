const fs = require('fs');
const path = require('path');

// 读取clicker-games-data.js文件
const dataPath = path.join(__dirname, 'js', 'data', 'clicker-games-data.js');
const content = fs.readFileSync(dataPath, 'utf8');

// 提取JSON数据
const jsonMatch = content.match(/var clickerGamesData = \[(.*)\];/s);
if (!jsonMatch) {
    console.error('无法提取JSON数据');
    process.exit(1);
}

const jsonString = `[${jsonMatch[1]}]`;
const games = JSON.parse(jsonString);

// 验证图片路径
let validCount = 0;
let invalidCount = 0;
let defaultCount = 0;

for (let game of games) {
    let imageUrl = game.imageUrl;
    let gameName = game.name;
    
    if (imageUrl) {
        // 构建完整的图片路径
        let imagePath = path.join(__dirname, imageUrl);
        
        if (fs.existsSync(imagePath)) {
            // 检查文件大小
            let stats = fs.statSync(imagePath);
            if (stats.size > 0) {
                validCount++;
                console.log(`✓ 有效图片: ${gameName} -> ${imageUrl}`);
            } else {
                invalidCount++;
                console.log(`✗ 无效图片（空文件）: ${gameName} -> ${imageUrl}`);
            }
        } else {
            invalidCount++;
            console.log(`✗ 图片不存在: ${gameName} -> ${imageUrl}`);
        }
    } else {
        invalidCount++;
        console.log(`✗ 缺少图片路径: ${gameName}`);
    }
    
    // 统计使用默认图片的游戏
    if (imageUrl && imageUrl.includes('default.jpg')) {
        defaultCount++;
    }
}

console.log(`\n验证完成:`);
console.log(`- 有效图片: ${validCount}`);
console.log(`- 无效图片: ${invalidCount}`);
console.log(`- 使用默认图片: ${defaultCount}`);
