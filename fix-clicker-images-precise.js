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
let games = JSON.parse(jsonString);

// 读取实际存在的图片文件
const clickerImgDir = path.join(__dirname, 'img', 'game_icon', 'clicker');
const existingImages = fs.readdirSync(clickerImgDir);

// 创建图片名称到文件名的映射
const imageMap = new Map();
existingImages.forEach(filename => {
    // 转换为小写并移除扩展名，用于匹配
    const key = filename.toLowerCase().replace('.jpg', '');
    imageMap.set(key, filename);
});

// 修复图片路径
let fixedCount = 0;
let missingCount = 0;

for (let game of games) {
    let gameName = game.name;
    
    // 生成多个可能的键来匹配图片
    let possibleKeys = [
        // 原始名称，移除特殊字符，转换为小写
        gameName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '').toLowerCase(),
        // 原始名称，空格替换为连字符
        gameName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase(),
        // 原始名称，空格替换为无
        gameName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '').toLowerCase(),
        // 原始名称，移除所有非字母数字字符
        gameName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
        // 原始名称，只保留字母数字
        gameName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    ];
    
    // 查找匹配的图片
    let foundFilename = null;
    for (let key of possibleKeys) {
        if (imageMap.has(key)) {
            foundFilename = imageMap.get(key);
            break;
        }
    }
    
    // 特殊情况处理
    if (!foundFilename) {
        // 检查是否有包含关系
        for (let [key, filename] of imageMap.entries()) {
            let gameKey = gameName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            if (key.includes(gameKey) || gameKey.includes(key)) {
                foundFilename = filename;
                break;
            }
        }
    }
    
    // 更新图片路径
    if (foundFilename) {
        let newImageUrl = `img/game_icon/clicker/${foundFilename}`;
        if (game.imageUrl !== newImageUrl) {
            game.imageUrl = newImageUrl;
            fixedCount++;
            console.log(`修复图片路径: ${gameName} -> ${foundFilename}`);
        }
    } else {
        // 如果没有找到图片，使用默认图片
        game.imageUrl = 'img/game_icon/clicker/default.jpg';
        missingCount++;
        console.log(`缺少图片: ${gameName}`);
    }
}

// 生成修复后的JSON数据
const fixedJson = JSON.stringify(games, null, 4);
const fixedContent = content.replace(/var clickerGamesData = \[(.*)\];/s, `var clickerGamesData = [${fixedJson.substring(1, fixedJson.length - 1)}];`);

// 写入修复后的文件
fs.writeFileSync(dataPath, fixedContent, 'utf8');

console.log(`\n修复完成: 修复了 ${fixedCount} 个图片路径，${missingCount} 个游戏使用默认图片`);
