# 根据driving-games-data.js生成HTML页面和数据文件

# 读取driving-games-data.js文件内容
$content = Get-Content -Path "js/data/driving-games-data.js" -Raw

# 提取游戏数据
$gamesData = $content -replace '// Driving Games 分类游戏数据', '' -replace 'var drivingGamesData = ', '' -replace ';', ''

# 解析JSON数据
$games = ConvertFrom-Json $gamesData

# 遍历每个游戏
foreach ($game in $games) {
    # 生成文件名（移除空格和特殊字符）
    $fileName = $game.name -replace '\s+', '' -replace '[^a-zA-Z0-9]', ''
    $htmlFilePath = "driving/$fileName.html"
    $dataFilePath = "js/driving/$fileName-data.js"
    
    Write-Host "Processing: $($game.name)"
    Write-Host "HTML: $htmlFilePath"
    Write-Host "Data: $dataFilePath"
    
    # 生成数据文件
    $dataContent = @"
var gameDetailData = {
    "name": "$($game.name)",
    "imageUrl": "$($game.imageUrl)",
    "gameType": "$($game.gameType)",
    "rating": "$($game.rating)",
    "description": "$($game.description)",
    "keywords": "$($game.keywords)",
    "iframeUrl": "$($game.iframeUrl)",
    "instructions": {
        "objective": "$($game.name) is a fun and challenging driving game. Test your driving skills in this exciting gameplay experience.",
        "pieces": [
            {
                "name": "Vehicle Controls",
                "movement": "Use arrow keys or WASD to control your vehicle's movement, including acceleration, braking, and steering."
            },
            {
                "name": "Environment Elements",
                "movement": "Navigate through various obstacles, traffic, and terrain features as you progress through the game."
            }
        ]
    },
    "tips": [
        "Master the controls and handling of your vehicle in $($game.name)",
        "Pay attention to traffic and obstacles on the road",
        "Practice braking and acceleration timing for optimal performance",
        "Use shortcuts and optimal routes when available",
        "Maintain focus and reaction time for sudden events",
        "Experiment with different driving techniques to find what works best"
    ],
    "extendedInfo": [
        {
            "title": "$($game.name) Gameplay",
            "content": "$($game.name) offers an exciting driving experience with engaging gameplay, realistic controls, and challenging levels. Test your driving skills in various environments and scenarios."
        },
        {
            "title": "Driving Features",
            "content": "The game features realistic vehicle physics, diverse environments, and progressive difficulty. Enjoy hours of entertainment as you improve your driving skills."
        },
        {
            "title": "Skills Developed",
            "content": "$($game.name) helps develop hand-eye coordination, spatial awareness, and quick decision-making. It's a fun way to challenge yourself and improve your virtual driving abilities."
        }
    ],
    "recommendedGames": [],
    "moreGames": []
};
"@
    
    Set-Content -Path $dataFilePath -Value $dataContent -Force
    
    # 生成HTML页面
    $htmlContent = @"
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($game.name) - Play Free Online Driving Game</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../js/detail1.css">
</head>

<body>
    <header class="header">
        <div class="header-inner">
            <a href="../home.html" class="logo">
                <div class="logo-icon">
                    <svg viewBox="0 0 40 40" width="36" height="36">
                        <rect x="8" y="8" width="24" height="24" rx="4" fill="none" stroke="#4ade80"
                            stroke-width="2.5" />
                        <circle cx="14" cy="16" r="3" fill="#4ade80" />
                        <circle cx="26" cy="16" r="3" fill="#4ade80" />
                        <rect x="14" y="22" width="12" height="2" fill="#4ade80" />
                        <line x1="20" y1="22" x2="20" y2="28" stroke="#4ade80" stroke-width="2.5"
                            stroke-linecap="round" />
                        <line x1="30" y1="20" x2="38" y2="20" stroke="#4ade80" stroke-width="2.5"
                            stroke-linecap="round" />
                    </svg>
                </div>
                <span class="logo-text">Traffic Games</span>
            </a>
            <nav class="nav">
                <a href="../home.html" class="nav-link">Home</a>
            </nav>
        </div>
    </header>

    <main class="detail-main">
        <section class="game-launch-section">
            <div class="game-launch-container">
                <div class="game-title-area">
                    <h1 class="game-title">$($game.name)</h1>
                </div>
                  
                <div class="game-iframe-container" id="gameContainer">
                    <iframe src="$($game.iframeUrl)" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
                    <button class="fullscreen-btn" id="fullscreenBtn">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path
                                d="M7 14H5v5h5v-5H7zM14 14h-2v5h5v-5h-3zM17 3h-3v5h5V3h-2zM7 3H5v5h5V3H7zM4 7H2v5h5V7H4zM17 7h-3v5h5V7h-2zM4 14H2v5h5v-5H4zM17 14h-3v5h5v-5h-2zM14 17h-2v3h5v-3h-3zM7 17H5v3h5v-3H7z"
                                fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <section class="game-detail-section">
            <div class="detail-container">
                <div class="detail-content">
                    <div class="detail-block">
                        <h2 class="detail-title">$($game.name)</h2>
                        <p class="detail-description" id="objectiveText"></p>
                    </div>

                    <div class="detail-block seo-only">
                        <h2 class="detail-title">$($game.name)</h2>
                        <div class="pieces-grid" id="piecesGrid"></div>
                    </div>

                    <div class="detail-block seo-only">
                        <h2 class="detail-title">$($game.name)</h2>
                        <ul class="tips-list" id="tipsList"></ul>
                    </div>

                    <div class="detail-block seo-only">
                        <h2 class="detail-title">Traffic Games</h2>
                        <div class="extended-info-grid" id="extendedInfoGrid"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="recommended-section">
            <div class="section-header">
                <h2>Coolmath Hot Picks</h2>
            </div>
            <div class="recommended-grid" id="recommendedGrid"></div>

            <div class="section-header">
                <h2>More Games</h2>
            </div>
            <div class="more-games-grid" id="moreGamesGrid"></div>
        </section>
    </main>

    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-col">
                <h4>Traffic Games</h4>
                <p>Play best free online traffic, driving, and racing games. No downloads required!</p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <a href="../home.html">Home</a>
                <a href="../index.html#categories">Categories</a>
                <a href="../index.html#leaderboard">Leaderboard</a>
                <a href="../index.html#popular">Popular</a>
            </div>
            <div class="footer-col">
                <h4>Game Categories</h4>
                <a href="../home.html">Racing Games</a>
                <a href="../home.html">Traffic Control</a>
                <a href="../home.html">Parking Games</a>
                <a href="../home.html">Escape Games</a>
            </div>
            <div class="footer-col">
                <h4>Support</h4>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">FAQ</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Traffic Games. All rights reserved. Play free online games.</p>
        </div>
    </footer>

    <script src="../js/driving/$fileName-data.js"></script>
    <script src="../js/coolmath/coolmath-games-data.js"></script>
    <script src="../js/more-games/more-games-data.js"></script>
    
    <script src="../js/data/racing-games-data.js"></script>
    <script src="../js/data/traffic-control-games-data.js"></script>
    <script src="../js/data/parking-games-data.js"></script>
    <script src="../js/data/escape-games-data.js"></script>
    <script src="../js/data/trivia-games-data.js"></script>
    <script src="../js/data/clicker-games-data.js"></script>
    <script src="../js/data/twoPlayer-games-data.js"></script>
    <script src="../js/data/driving-games-data.js"></script>
    <script src="../js/detail1.js"></script>
</body>

</html>
"@
    
    Set-Content -Path $htmlFilePath -Value $htmlContent -Force
    
    Write-Host "Generated: $fileName.html and $fileName-data.js"
    Write-Host ""
}

Write-Host "All driving games files generated successfully!"