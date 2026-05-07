const fs = require('fs');
const path = require('path');

// 读取并解析clicker游戏数据
const clickerGamesDataPath = path.join(__dirname, 'js', 'data', 'clicker-games-data.js');
const clickerGamesDataContent = fs.readFileSync(clickerGamesDataPath, 'utf8');
const clickerGamesDataMatch = clickerGamesDataContent.match(/var clickerGamesData = (\[[\s\S]*?\]);/);
const clickerGamesData = JSON.parse(clickerGamesDataMatch[1]);

// 读取模板文件
const templatePath = path.join(__dirname, 'driving', 'ArcadeGP.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// 创建clicker目录（如果不存在）
const clickerDir = path.join(__dirname, 'clicker');
if (!fs.existsSync(clickerDir)) {
    fs.mkdirSync(clickerDir, { recursive: true });
}

// 生成页面
function generateClickerPages() {
    clickerGamesData.forEach(game => {
        // 生成HTML文件名
        let fileName = game.id.replace(/[^a-zA-Z0-9]/g, '');
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        const htmlPath = path.join(clickerDir, `${fileName}.html`);
        
        // 替换模板内容
        let pageContent = templateContent
            .replace(/Arcade GP/g, game.name)
            .replace(/https:\/\/html5\.gamedistribution\.com\/3fc01c17076c44149e3e4b6d79b3134f\/\?gd_sdk_referrer_url=https:\/\/www\.onlinegames\.io\/cat-runner\//g, game.iframeUrl)
            .replace(/<meta name="keywords" content="[^"]*" \/>/g, `<meta name="keywords" content="${game.keywords}, clicker games, idle games, free online games" />`)
            .replace(/<title>traffic games - Arcade GP - Play Free Online Driving Game<\/title>/g, `<title>traffic games - ${game.name} - Play Free Online Clicker Game</title>`)
            .replace(/<link rel="canonical" href="https:\/\/www\.trafficgames\.online\/driving\/ArcadeGP\.html" \/>/g, `<link rel="canonical" href="https://www.trafficgames.online/clicker/${fileName}.html" />`)
            .replace(/<h1>Arcade GP - traffic games<\/h1>/g, `<h1>${game.name} - traffic games</h1>`)
            .replace(/<h2 class="detail-title">Arcade GP - High-Speed Racing Action<\/h2>/g, `<h2 class="detail-title">${game.name} - Clicker Fun</h2>`)
            .replace(/Play Arcade GP, an exciting arcade-style racing game where you can compete in high-speed races against other drivers\. Test your skills on challenging tracks and become the champion of the Arcade GP circuit\./g, `Play ${game.name}, an exciting clicker game where you can tap, click, and collect resources to build your way to success. Test your clicking skills and become a master clicker!`)
            .replace(/Arcade GP offers a thrilling arcade racing experience with its fast-paced gameplay and challenging tracks\. Perfect for fans of classic arcade racing games, this game combines speed, skill, and excitement in every race\./g, `${game.name} offers a thrilling clicker experience with its engaging gameplay and addictive mechanics. Perfect for fans of idle and incremental games, this game combines strategy, progression, and excitement with every click.`)
            .replace(/<h2 class="detail-title">How to Play Arcade GP<\/h2>/g, `<h2 class="detail-title">How to Play ${game.name}</h2>`)
            .replace(/In Arcade GP, your goal is to compete in high-speed races against other drivers and finish in first place\. Use the arrow keys to steer your car, accelerate, and brake\. Navigate through challenging tracks, avoid obstacles, and overtake other drivers to take the lead\./g, `In ${game.name}, your goal is to click or tap to collect resources, upgrade your abilities, and progress through the game. Use your mouse or finger to click as fast as you can, and strategically invest your resources to maximize your progress.`)
            .replace(/As you progress, you'll unlock new cars and tracks with increasing difficulty\. The game features realistic physics and responsive controls, allowing you to drift around corners and make precise maneuvers\. Collect power-ups along the way to gain an advantage over your opponents and secure victory\./g, `As you progress, you'll unlock new upgrades, abilities, and features with increasing levels. The game features idle mechanics that allow you to continue earning resources even when you're not actively playing. Invest wisely to maximize your efficiency and reach new heights.`)
            .replace(/<h2 class="detail-title">Features of Arcade GP<\/h2>/g, `<h2 class="detail-title">Features of ${game.name}</h2>`)
            .replace(/Arcade GP offers a range of features that make it one of the most exciting arcade racing games available online\. These include:/g, `${game.name} offers a range of features that make it one of the most engaging clicker games available online. These include:`)
            .replace(/<li>Fast-paced arcade-style racing gameplay<\/li>/g, `<li>Addictive clicker gameplay</li>`)
            .replace(/<li>Multiple challenging tracks to master<\/li>/g, `<li>Multiple upgrades and abilities to unlock</li>`)
            .replace(/<li>A variety of cars with different performance characteristics<\/li>/g, `<li>Various progression systems to explore</li>`)
            .replace(/<li>Realistic physics and responsive controls<\/li>/g, `<li>Idle mechanics for passive progression</li>`)
            .replace(/<li>Power-ups to give you an edge in races<\/li>/g, `<li>Strategic resource management</li>`)
            .replace(/Whether you're a seasoned racing game veteran or a casual player looking for some high-speed fun, Arcade GP offers an adrenaline-pumping racing experience that will keep you coming back for more\. So rev your engines and get ready to race\!/g, `Whether you're a clicker game enthusiast or just looking for a fun way to pass the time, ${game.name} offers an engaging clicker experience that will keep you coming back for more. So start clicking and build your way to success!`)
            .replace(/<h2 class="detail-title">Arcade GP<\/h2>/g, `<h2 class="detail-title">${game.name}</h2>`)
            .replace(/<script src="\.\.\/js\/driving\/ArcadeGP-data\.js"><\/script>/g, '');
        
        // 写入HTML文件
        fs.writeFileSync(htmlPath, pageContent);
        console.log(`生成页面: ${htmlPath}`);
    });
}

// 执行生成
console.log('开始生成clicker游戏页面...');
generateClickerPages();
console.log('所有clicker游戏页面生成完成！');
