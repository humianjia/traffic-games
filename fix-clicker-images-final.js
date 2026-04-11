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

// 修复图片路径
let fixedCount = 0;
let missingCount = 0;

for (let game of games) {
    let gameName = game.name;
    let found = false;
    
    // 直接匹配实际存在的文件名
    for (let filename of existingImages) {
        // 移除扩展名，转换为小写进行比较
        let filenameWithoutExt = filename.replace('.jpg', '').toLowerCase();
        let gameNameClean = gameName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        
        // 如果文件名包含游戏名称的主要部分，或者游戏名称包含文件名的主要部分
        if (filenameWithoutExt.includes(gameNameClean) || gameNameClean.includes(filenameWithoutExt)) {
            game.imageUrl = `img/game_icon/clicker/${filename}`;
            fixedCount++;
            console.log(`修复图片路径: ${gameName} -> ${filename}`);
            found = true;
            break;
        }
    }
    
    // 特殊情况处理 - 直接硬编码一些已知的映射
    if (!found) {
        const specialCases = {
            'Sandbox - Destroy the Ragdoll': 'Sandbox-DestroytheRagdoll.jpg',
            'sprunki clicker & merge phase 3': 'sprunkiclicker&mergephase3.jpg',
            'Color Nuts & Bolts Puzzle': 'ColorNuts&BoltsPuzzle.jpg',
            'Kung-Fu Little Animals': 'Kung-FuLittleAnimals.jpg',
            'Clash Rider - Clicker Tycoon': 'ClashRider-ClickerTycoon.jpg'
        };
        
        if (specialCases[gameName]) {
            game.imageUrl = `img/game_icon/clicker/${specialCases[gameName]}`;
            fixedCount++;
            console.log(`修复图片路径: ${gameName} -> ${specialCases[gameName]}`);
            found = true;
        }
    }
    
    // 如果仍然没有找到，使用默认图片
    if (!found) {
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
