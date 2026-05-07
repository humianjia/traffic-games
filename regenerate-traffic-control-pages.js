const fs = require('fs');
const path = require('path');

// 读取traffic control游戏数据

// 读取并解析traffic control游戏数据
const trafficControlGamesDataPath = path.join(__dirname, 'js', 'data', 'traffic-control-games-data.js');
const trafficControlGamesDataContent = fs.readFileSync(trafficControlGamesDataPath, 'utf8');
const trafficControlGamesDataMatch = trafficControlGamesDataContent.match(/var trafficControlGamesData = (\[[\s\S]*?\]);/);
const trafficControlGamesData = JSON.parse(trafficControlGamesDataMatch[1]);

// 读取模板文件
const templatePath = path.join(__dirname, 'driving', 'ArcadeGP.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// 创建trafficControl目录（如果不存在）
const trafficControlDir = path.join(__dirname, 'trafficControl');
if (!fs.existsSync(trafficControlDir)) {
    fs.mkdirSync(trafficControlDir, { recursive: true });
}

// 生成页面
function generateTrafficControlPages() {
    trafficControlGamesData.forEach(game => {
        // 生成HTML文件名
        let fileName = game.id.replace(/[^a-zA-Z0-9]/g, '');
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        const htmlPath = path.join(trafficControlDir, `${fileName}.html`);
        
        // 替换模板内容
        let pageContent = templateContent
            .replace(/Arcade GP/g, game.name)
            .replace(/https:\/\/html5\.gamedistribution\.com\/3fc01c17076c44149e3e4b6d79b3134f\/\?gd_sdk_referrer_url=https:\/\/www\.onlinegames\.io\/cat-runner\//g, game.iframeUrl)
            .replace(/<meta name="keywords" content="[^"]*" \/>/g, `<meta name="keywords" content="${game.keywords}, traffic games, traffic control games, free online games" />`)
            .replace(/<title>traffic games - Arcade GP - Play Free Online Driving Game<\/title>/g, `<title>traffic games - ${game.name} - Play Free Online Traffic Control Game</title>`)
            .replace(/<link rel="canonical" href="https:\/\/www\.trafficgames\.online\/driving\/ArcadeGP\.html" \/>/g, `<link rel="canonical" href="https://www.trafficgames.online/trafficControl/${fileName}.html" />`)
            .replace(/<h1>Arcade GP - traffic games<\/h1>/g, `<h1>${game.name} - traffic games</h1>`)
            .replace(/<h2 class="detail-title">Arcade GP - High-Speed Racing Action<\/h2>/g, `<h2 class="detail-title">${game.name} - Traffic Control Challenge</h2>`)
            .replace(/Play Arcade GP, an exciting arcade-style racing game where you can compete in high-speed races against other drivers\. Test your skills on challenging tracks and become the champion of the Arcade GP circuit\./g, `Play ${game.name}, an exciting traffic control game where you can test your skills in managing traffic flow, avoiding accidents, and keeping the roads safe. Challenge yourself with increasingly difficult scenarios and become a master traffic controller.`)
            .replace(/Arcade GP offers a thrilling arcade racing experience with its fast-paced gameplay and challenging tracks\. Perfect for fans of classic arcade racing games, this game combines speed, skill, and excitement in every race\./g, `${game.name} offers a thrilling traffic control experience with its engaging gameplay and challenging scenarios. Perfect for fans of strategy and puzzle games, this game combines quick thinking, decision-making, and precision in every level.`)
            .replace(/<h2 class="detail-title">How to Play Arcade GP<\/h2>/g, `<h2 class="detail-title">How to Play ${game.name}</h2>`)
            .replace(/In Arcade GP, your goal is to compete in high-speed races against other drivers and finish in first place\. Use the arrow keys to steer your car, accelerate, and brake\. Navigate through challenging tracks, avoid obstacles, and overtake other drivers to take the lead\./g, `In ${game.name}, your goal is to manage traffic flow, control traffic lights, or navigate vehicles through busy intersections. Use your mouse or keyboard to make decisions, time your actions carefully, and ensure smooth traffic movement while avoiding accidents.`)
            .replace(/As you progress, you'll unlock new cars and tracks with increasing difficulty\. The game features realistic physics and responsive controls, allowing you to drift around corners and make precise maneuvers\. Collect power-ups along the way to gain an advantage over your opponents and secure victory\./g, `As you progress, you'll face increasingly complex traffic scenarios with higher volumes of vehicles and more challenging layouts. The game tests your ability to make quick decisions under pressure and develop effective traffic management strategies.`)
            .replace(/<h2 class="detail-title">Features of Arcade GP<\/h2>/g, `<h2 class="detail-title">Features of ${game.name}</h2>`)
            .replace(/Arcade GP offers a range of features that make it one of the most exciting arcade racing games available online\. These include:/g, `${game.name} offers a range of features that make it one of the most engaging traffic control games available online. These include:`)
            .replace(/<li>Fast-paced arcade-style racing gameplay<\/li>/g, `<li>Engaging traffic control gameplay</li>`)
            .replace(/<li>Multiple challenging tracks to master<\/li>/g, `<li>Multiple challenging traffic scenarios</li>`)
            .replace(/<li>A variety of cars with different performance characteristics<\/li>/g, `<li>Various traffic control situations to handle</li>`)
            .replace(/<li>Realistic physics and responsive controls<\/li>/g, `<li>Intuitive controls and smooth gameplay</li>`)
            .replace(/<li>Power-ups to give you an edge in races<\/li>/g, `<li>Progressive difficulty levels</li>`)
            .replace(/Whether you're a seasoned racing game veteran or a casual player looking for some high-speed fun, Arcade GP offers an adrenaline-pumping racing experience that will keep you coming back for more\. So rev your engines and get ready to race\!/g, `Whether you're a fan of strategy games or just looking for a fun challenge, ${game.name} offers an engaging traffic control experience that will test your skills and keep you coming back for more. So put on your traffic controller hat and get ready to manage the flow!`)
            .replace(/<h2 class="detail-title">Arcade GP<\/h2>/g, `<h2 class="detail-title">${game.name}</h2>`)
            .replace(/<script src="\.\.\/js\/driving\/ArcadeGP-data\.js"><\/script>/g, '');
        
        // 写入HTML文件
        fs.writeFileSync(htmlPath, pageContent);
        console.log(`生成页面: ${htmlPath}`);
    });
}

// 执行生成
console.log('开始生成traffic control游戏页面...');
generateTrafficControlPages();
console.log('所有traffic control游戏页面生成完成！');
