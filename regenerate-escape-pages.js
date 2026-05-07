const fs = require('fs');
const path = require('path');

// 读取并解析escape游戏数据
const escapeGamesDataPath = path.join(__dirname, 'js', 'data', 'escape-games-data.js');
const escapeGamesDataContent = fs.readFileSync(escapeGamesDataPath, 'utf8');
const escapeGamesDataMatch = escapeGamesDataContent.match(/var escapeGamesData = (\[[\s\S]*?\]);/);
const escapeGamesData = JSON.parse(escapeGamesDataMatch[1]);

// 读取模板文件
const templatePath = path.join(__dirname, 'driving', 'ArcadeGP.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// 创建escape目录（如果不存在）
const escapeDir = path.join(__dirname, 'escape');
if (!fs.existsSync(escapeDir)) {
    fs.mkdirSync(escapeDir, { recursive: true });
}

// 生成页面
function generateEscapePages() {
    escapeGamesData.forEach(game => {
        // 生成HTML文件名
        let fileName = game.id.replace(/[^a-zA-Z0-9]/g, '');
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        const htmlPath = path.join(escapeDir, `${fileName}.html`);
        
        // 替换模板内容
        let pageContent = templateContent
            .replace(/Arcade GP/g, game.name)
            .replace(/https:\/\/html5\.gamedistribution\.com\/3fc01c17076c44149e3e4b6d79b3134f\/\?gd_sdk_referrer_url=https:\/\/www\.onlinegames\.io\/cat-runner\//g, game.iframeUrl)
            .replace(/<meta name="keywords" content="[^"]*" \/>/g, `<meta name="keywords" content="${game.keywords}, escape games, puzzle games, free online games" />`)
            .replace(/<title>traffic games - Arcade GP - Play Free Online Driving Game<\/title>/g, `<title>traffic games - ${game.name} - Play Free Online Escape Game</title>`)
            .replace(/<link rel="canonical" href="https:\/\/www\.trafficgames\.online\/driving\/ArcadeGP\.html" \/>/g, `<link rel="canonical" href="https://www.trafficgames.online/escape/${fileName}.html" />`)
            .replace(/<h1>Arcade GP - traffic games<\/h1>/g, `<h1>${game.name} - traffic games</h1>`)
            .replace(/<h2 class="detail-title">Arcade GP - High-Speed Racing Action<\/h2>/g, `<h2 class="detail-title">${game.name} - Escape Adventure</h2>`)
            .replace(/Play Arcade GP, an exciting arcade-style racing game where you can compete in high-speed races against other drivers\. Test your skills on challenging tracks and become the champion of the Arcade GP circuit\./g, `Play ${game.name}, an exciting escape game where you can test your skills in solving puzzles, overcoming obstacles, and finding your way out of challenging situations. Challenge yourself with increasingly difficult scenarios and become a master escapist.`)
            .replace(/Arcade GP offers a thrilling arcade racing experience with its fast-paced gameplay and challenging tracks\. Perfect for fans of classic arcade racing games, this game combines speed, skill, and excitement in every race\./g, `${game.name} offers a thrilling escape experience with its engaging gameplay and challenging puzzles. Perfect for fans of puzzle and adventure games, this game combines problem-solving, exploration, and excitement in every level.`)
            .replace(/<h2 class="detail-title">How to Play Arcade GP<\/h2>/g, `<h2 class="detail-title">How to Play ${game.name}</h2>`)
            .replace(/In Arcade GP, your goal is to compete in high-speed races against other drivers and finish in first place\. Use the arrow keys to steer your car, accelerate, and brake\. Navigate through challenging tracks, avoid obstacles, and overtake other drivers to take the lead\./g, `In ${game.name}, your goal is to solve puzzles, find hidden objects, and navigate through challenging environments to escape. Use your mouse or keyboard to interact with the environment, solve puzzles, and overcome obstacles to reach the exit.`)
            .replace(/As you progress, you'll unlock new cars and tracks with increasing difficulty\. The game features realistic physics and responsive controls, allowing you to drift around corners and make precise maneuvers\. Collect power-ups along the way to gain an advantage over your opponents and secure victory\./g, `As you progress, you'll face increasingly complex puzzles and challenging environments with higher difficulty levels. The game tests your problem-solving skills, attention to detail, and ability to think creatively under pressure.`)
            .replace(/<h2 class="detail-title">Features of Arcade GP<\/h2>/g, `<h2 class="detail-title">Features of ${game.name}</h2>`)
            .replace(/Arcade GP offers a range of features that make it one of the most exciting arcade racing games available online\. These include:/g, `${game.name} offers a range of features that make it one of the most engaging escape games available online. These include:`)
            .replace(/<li>Fast-paced arcade-style racing gameplay<\/li>/g, `<li>Engaging escape gameplay</li>`)
            .replace(/<li>Multiple challenging tracks to master<\/li>/g, `<li>Multiple challenging puzzles to solve</li>`)
            .replace(/<li>A variety of cars with different performance characteristics<\/li>/g, `<li>Various environments to explore</li>`)
            .replace(/<li>Realistic physics and responsive controls<\/li>/g, `<li>Intuitive controls and smooth gameplay</li>`)
            .replace(/<li>Power-ups to give you an edge in races<\/li>/g, `<li>Progressive difficulty levels</li>`)
            .replace(/Whether you're a seasoned racing game veteran or a casual player looking for some high-speed fun, Arcade GP offers an adrenaline-pumping racing experience that will keep you coming back for more\. So rev your engines and get ready to race\!/g, `Whether you're a fan of puzzle games or just looking for an exciting challenge, ${game.name} offers an engaging escape experience that will test your skills and keep you coming back for more. So put on your thinking cap and get ready to escape!`)
            .replace(/<h2 class="detail-title">Arcade GP<\/h2>/g, `<h2 class="detail-title">${game.name}</h2>`)
            .replace(/<script src="\.\.\/js\/driving\/ArcadeGP-data\.js"><\/script>/g, '');
        
        // 写入HTML文件
        fs.writeFileSync(htmlPath, pageContent);
        console.log(`生成页面: ${htmlPath}`);
    });
}

// 执行生成
console.log('开始生成escape游戏页面...');
generateEscapePages();
console.log('所有escape游戏页面生成完成！');
