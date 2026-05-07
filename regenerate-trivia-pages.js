const fs = require('fs');
const path = require('path');

// 读取并解析trivia游戏数据
const triviaGamesDataPath = path.join(__dirname, 'js', 'data', 'trivia-games-data.js');
const triviaGamesDataContent = fs.readFileSync(triviaGamesDataPath, 'utf8');
const triviaGamesDataMatch = triviaGamesDataContent.match(/var triviaGamesData = (\[[\s\S]*?\]);/);
const triviaGamesData = JSON.parse(triviaGamesDataMatch[1]);

// 读取模板文件
const templatePath = path.join(__dirname, 'driving', 'ArcadeGP.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// 创建trivia目录（如果不存在）
const triviaDir = path.join(__dirname, 'trivia');
if (!fs.existsSync(triviaDir)) {
    fs.mkdirSync(triviaDir, { recursive: true });
}

// 生成页面
function generateTriviaPages() {
    triviaGamesData.forEach(game => {
        // 生成HTML文件名
        let fileName = game.id.replace(/[^a-zA-Z0-9]/g, '');
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
        const htmlPath = path.join(triviaDir, `${fileName}.html`);
        
        // 替换模板内容
        let pageContent = templateContent
            .replace(/Arcade GP/g, game.name)
            .replace(/https:\/\/html5\.gamedistribution\.com\/3fc01c17076c44149e3e4b6d79b3134f\/\?gd_sdk_referrer_url=https:\/\/www\.onlinegames\.io\/cat-runner\//g, game.iframeUrl)
            .replace(/<meta name="keywords" content="[^"]*" \/>/g, `<meta name="keywords" content="${game.keywords}, trivia games, quiz games, free online games" />`)
            .replace(/<title>traffic games - Arcade GP - Play Free Online Driving Game<\/title>/g, `<title>traffic games - ${game.name} - Play Free Online Trivia Game</title>`)
            .replace(/<link rel="canonical" href="https:\/\/www\.trafficgames\.online\/driving\/ArcadeGP\.html" \/>/g, `<link rel="canonical" href="https://www.trafficgames.online/trivia/${fileName}.html" />`)
            .replace(/<h1>Arcade GP - traffic games<\/h1>/g, `<h1>${game.name} - traffic games</h1>`)
            .replace(/<h2 class="detail-title">Arcade GP - High-Speed Racing Action<\/h2>/g, `<h2 class="detail-title">${game.name} - Trivia Challenge</h2>`)
            .replace(/Play Arcade GP, an exciting arcade-style racing game where you can compete in high-speed races against other drivers\. Test your skills on challenging tracks and become the champion of the Arcade GP circuit\./g, `Play ${game.name}, an exciting trivia game where you can test your knowledge on various topics. Challenge yourself with interesting questions and see how much you know about the world around you.`)
            .replace(/Arcade GP offers a thrilling arcade racing experience with its fast-paced gameplay and challenging tracks\. Perfect for fans of classic arcade racing games, this game combines speed, skill, and excitement in every race\./g, `${game.name} offers a stimulating trivia experience with its engaging questions and challenging gameplay. Perfect for fans of quiz and knowledge games, this game combines learning, fun, and friendly competition in every round.`)
            .replace(/<h2 class="detail-title">How to Play Arcade GP<\/h2>/g, `<h2 class="detail-title">How to Play ${game.name}</h2>`)
            .replace(/In Arcade GP, your goal is to compete in high-speed races against other drivers and finish in first place\. Use the arrow keys to steer your car, accelerate, and brake\. Navigate through challenging tracks, avoid obstacles, and overtake other drivers to take the lead\./g, `In ${game.name}, your goal is to answer trivia questions correctly to score points. Read each question carefully and select the correct answer from the options provided. Test your knowledge across various categories and see how high you can score.`)
            .replace(/As you progress, you'll unlock new cars and tracks with increasing difficulty\. The game features realistic physics and responsive controls, allowing you to drift around corners and make precise maneuvers\. Collect power-ups along the way to gain an advantage over your opponents and secure victory\./g, `As you progress, you'll face increasingly challenging questions with higher difficulty levels. The game tests your knowledge across various subjects and keeps you engaged with interesting facts and information.`)
            .replace(/<h2 class="detail-title">Features of Arcade GP<\/h2>/g, `<h2 class="detail-title">Features of ${game.name}</h2>`)
            .replace(/Arcade GP offers a range of features that make it one of the most exciting arcade racing games available online\. These include:/g, `${game.name} offers a range of features that make it one of the most engaging trivia games available online. These include:`)
            .replace(/<li>Fast-paced arcade-style racing gameplay<\/li>/g, `<li>Engaging trivia gameplay</li>`)
            .replace(/<li>Multiple challenging tracks to master<\/li>/g, `<li>Multiple challenging questions to answer</li>`)
            .replace(/<li>A variety of cars with different performance characteristics<\/li>/g, `<li>Various trivia categories to explore</li>`)
            .replace(/<li>Realistic physics and responsive controls<\/li>/g, `<li>Intuitive controls and smooth gameplay</li>`)
            .replace(/<li>Power-ups to give you an edge in races<\/li>/g, `<li>Progressive difficulty levels</li>`)
            .replace(/Whether you're a seasoned racing game veteran or a casual player looking for some high-speed fun, Arcade GP offers an adrenaline-pumping racing experience that will keep you coming back for more\. So rev your engines and get ready to race\!/g, `Whether you're a trivia buff or just looking to test your knowledge, ${game.name} offers an engaging trivia experience that will challenge your mind and keep you coming back for more. So put on your thinking cap and get ready to test your knowledge!`)
            .replace(/<h2 class="detail-title">Arcade GP<\/h2>/g, `<h2 class="detail-title">${game.name}</h2>`)
            .replace(/<script src="\.\.\/js\/driving\/ArcadeGP-data\.js"><\/script>/g, '');
        
        // 写入HTML文件
        fs.writeFileSync(htmlPath, pageContent);
        console.log(`生成页面: ${htmlPath}`);
    });
}

// 执行生成
console.log('开始生成trivia游戏页面...');
generateTriviaPages();
console.log('所有trivia游戏页面生成完成！');
