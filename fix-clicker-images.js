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
const existingImages = fs.readdirSync(clickerImgDir).map(file => file.toLowerCase());

// 修复图片路径
let fixedCount = 0;
let missingCount = 0;

for (let game of games) {
    let currentImageUrl = game.imageUrl;
    let gameName = game.name;
    
    // 生成可能的图片文件名
    let possibleFilenames = [
        // 原始名称
        gameName.replace(/[^a-zA-Z0-9]+/g, '') + '.jpg',
        // 空格替换为无
        gameName.replace(/\s+/g, '') + '.jpg',
        // 空格替换为下划线
        gameName.replace(/\s+/g, '_') + '.jpg',
        // 空格替换为连字符
        gameName.replace(/\s+/g, '-') + '.jpg',
        // 移除特殊字符
        gameName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '') + '.jpg',
        // 移除特殊字符，空格替换为连字符
        gameName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-') + '.jpg'
    ].map(filename => filename.toLowerCase());
    
    // 查找匹配的图片文件
    let foundImage = null;
    for (let possibleFilename of possibleFilenames) {
        if (existingImages.includes(possibleFilename)) {
            foundImage = possibleFilename;
            break;
        }
    }
    
    // 特殊情况处理
    if (!foundImage) {
        // 检查是否有相似的文件
        for (let existingImage of existingImages) {
            let existingName = existingImage.replace('.jpg', '');
            let gameNameClean = gameName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            let existingNameClean = existingName.replace(/[^a-zA-Z0-9]/g, '');
            
            // 如果名称相似度高
            if (gameNameClean.includes(existingNameClean) || existingNameClean.includes(gameNameClean)) {
                foundImage = existingImage;
                break;
            }
        }
    }
    
    // 更新图片路径
    if (foundImage) {
        let newImageUrl = `img/game_icon/clicker/${foundImage}`;
        if (currentImageUrl !== newImageUrl) {
            game.imageUrl = newImageUrl;
            fixedCount++;
            console.log(`修复图片路径: ${gameName} -> ${foundImage}`);
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

// 创建默认图片（如果不存在）
const defaultImagePath = path.join(clickerImgDir, 'default.jpg');
if (!fs.existsSync(defaultImagePath)) {
    // 创建一个简单的默认图片
    const defaultImageContent = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    fs.writeFileSync(defaultImagePath, defaultImageContent);
    console.log('创建默认图片: default.jpg');
}

console.log(`\n修复完成: 修复了 ${fixedCount} 个图片路径，${missingCount} 个游戏使用默认图片`);
