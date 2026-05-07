const fs = require('fs');
const path = require('path');

// 读取并解析twoPlayer游戏数据
const twoPlayerGamesDataPath = path.join(__dirname, 'js', 'data', 'twoPlayer-games-data.js');
const twoPlayerGamesDataContent = fs.readFileSync(twoPlayerGamesDataPath, 'utf8');
const twoPlayerGamesDataMatch = twoPlayerGamesDataContent.match(/var twoPlayerGamesData = (\[[\s\S]*?\]);/);
const twoPlayerGamesData = JSON.parse(twoPlayerGamesDataMatch[1]);

// 读取模板文件
const templatePath = path.join(__dirname, 'driving', 'ArcadeGP.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// 创建twoPlayer目录（如果不存在）
const twoPlayerDir = path.join(__dirname, 'twoPlayer');
if (!fs.existsSync(twoPlayerDir)) {
    fs.mkdirSync(twoPlayerDir, { recursive: true });
}

// 生成页面
function generateTwoPlayerPages() {
    twoPlayerGamesData.forEach(game => {
        // 生成HTML文件名
        let fileName = game.id.replace(/[^a-zA-Z0-9]/g, '');
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        const htmlPath = path.join(twoPlayerDir, `${fileName}.html`);
        
        // 替换模板内容
        let pageContent = templateContent
            .replace(/Arcade GP/g, game.name)
            .replace(/https:\/\/html5\.gamedistribution\.com\/3fc01c17076c44149e3e4b6d79b3134f\/\?gd_sdk_referrer_url=https:\/\/www\.onlinegames\.io\/cat-runner\//g, game.iframeUrl)
            .replace(/<meta name="keywords" content="[^"]*" \/>/g, `<meta name="keywords" content="${game.keywords}, two player games, multiplayer games, free online games" />`)
            .replace(/<title>traffic games - Arcade GP - Play Free Online Driving Game<\/title>/g, `<title>traffic games - ${game.name} - Play Free Online Two Player Game</title>`)
            .replace(/<link rel="canonical" href="https:\/\/www\.trafficgames\.online\/driving\/ArcadeGP\.html" \/>/g, `<link rel="canonical" href="https://www.trafficgames.online/twoPlayer/${fileName}.html" />`)
            .replace(/<h1>Arcade GP - traffic games<\/h1>/g, `<h1>${game.name} - traffic games</h1>`)
            .replace(/<h2 class="detail-title">Arcade GP - High-Speed Racing Action<\/h2>/g, `<h2 class="detail-title">${game.name} - Two Player Fun</h2>`)
            .replace(/Play Arcade GP, an exciting arcade-style racing game where you can compete in high-speed races against other drivers\. Test your skills on challenging tracks and become the champion of the Arcade GP circuit\./g, `Play ${game.name}, an exciting two player game where you can compete against a friend or challenge yourself. Test your skills in various game modes and become the champion of the two player arena.`)
            .replace(/Arcade GP offers a thrilling arcade racing experience with its fast-paced gameplay and challenging tracks\. Perfect for fans of classic arcade racing games, this game combines speed, skill, and excitement in every race\./g, `${game.name} offers a thrilling two player experience with its engaging gameplay and competitive modes. Perfect for fans of multiplayer games, this game combines fun, competition, and excitement in every match.`)
            .replace(/<h2 class="detail-title">How to Play Arcade GP<\/h2>/g, `<h2 class="detail-title">How to Play ${game.name}</h2>`)
            .replace(/In Arcade GP, your goal is to compete in high-speed races against other drivers and finish in first place\. Use the arrow keys to steer your car, accelerate, and brake\. Navigate through challenging tracks, avoid obstacles, and overtake other drivers to take the lead\./g, `In ${game.name}, your goal is to compete against another player in various game modes. Use the keyboard controls to play - typically player 1 uses WASD keys and player 2 uses arrow keys. Follow the on-screen instructions to understand the specific gameplay mechanics for this game.`)
            .replace(/As you progress, you'll unlock new cars and tracks with increasing difficulty\. The game features realistic physics and responsive controls, allowing you to drift around corners and make precise maneuvers\. Collect power-ups along the way to gain an advantage over your opponents and secure victory\./g, `As you play, you'll discover different game modes and challenges that test your skills and strategy. The game features intuitive controls and engaging gameplay mechanics that make it easy to pick up but challenging to master. Compete with friends or family for the highest score and bragging rights.`)
            .replace(/<h2 class="detail-title">Features of Arcade GP<\/h2>/g, `<h2 class="detail-title">Features of ${game.name}</h2>`)
            .replace(/Arcade GP offers a range of features that make it one of the most exciting arcade racing games available online\. These include:/g, `${game.name} offers a range of features that make it one of the most engaging two player games available online. These include:`)
            .replace(/<li>Fast-paced arcade-style racing gameplay<\/li>/g, `<li>Engaging two player gameplay</li>`)
            .replace(/<li>Multiple challenging tracks to master<\/li>/g, `<li>Multiple game modes to enjoy</li>`)
            .replace(/<li>A variety of cars with different performance characteristics<\/li>/g, `<li>Competitive multiplayer action</li>`)
            .replace(/<li>Realistic physics and responsive controls<\/li>/g, `<li>Intuitive controls and smooth gameplay</li>`)
            .replace(/<li>Power-ups to give you an edge in races<\/li>/g, `<li>Fun for friends and family</li>`)
            .replace(/Whether you're a seasoned racing game veteran or a casual player looking for some high-speed fun, Arcade GP offers an adrenaline-pumping racing experience that will keep you coming back for more\. So rev your engines and get ready to race\!/g, `Whether you're a fan of multiplayer games or just looking for some fun with friends, ${game.name} offers an engaging two player experience that will keep you coming back for more. So grab a friend and get ready to compete!`)
            .replace(/<h2 class="detail-title">Arcade GP<\/h2>/g, `<h2 class="detail-title">${game.name}</h2>`)
            .replace(/<script src="\.\.\/js\/driving\/ArcadeGP-data\.js"><\/script>/g, '');
        
        // 写入HTML文件
        fs.writeFileSync(htmlPath, pageContent);
        console.log(`生成页面: ${htmlPath}`);
    });
}

// 执行生成
console.log('开始生成twoPlayer游戏页面...');
generateTwoPlayerPages();
console.log('所有twoPlayer游戏页面生成完成！');
