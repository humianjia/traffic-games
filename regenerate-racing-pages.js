const fs = require('fs');
const path = require('path');

// 读取racing-games-data.js文件
const racingGamesDataPath = path.join(__dirname, 'js', 'data', 'racing-games-data.js');
const racingGamesDataContent = fs.readFileSync(racingGamesDataPath, 'utf8');

// 提取游戏数据
const gamesDataMatch = racingGamesDataContent.match(/var racingGamesData = \[(.*?)\];/s);
if (!gamesDataMatch) {
    console.error('无法提取游戏数据');
    process.exit(1);
}

const gamesDataJson = `[${gamesDataMatch[1]}]`;
const games = JSON.parse(gamesDataJson);

// 确保racing目录存在
const racingDir = path.join(__dirname, 'racing');
if (!fs.existsSync(racingDir)) {
    fs.mkdirSync(racingDir, { recursive: true });
}

// 生成页面 - 应用SEO优化模板
const generatePage = (game) => {
    const gameName = game.name;
    const safeFileName = gameName.replace(/[^a-zA-Z0-9]/g, '').replace(/\s+/g, '');
    const filePath = path.join(racingDir, `${safeFileName}.html`);
    
    // SEO优化的HTML模板
    const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- SEO优化：强化online/free/browser关键词 -->
    <meta name="description" content="Play ${gameName} Online for Free! Enjoy this exciting traffic racing game directly in your browser. No download required - start playing instantly on mobile or desktop!" />
    <meta name="keywords" content="${gameName}, ${gameName} online, play ${gameName}, traffic games, racing games online, free racing games, browser games, no download games, car games online" />
    <meta name="robots" content="noindex, follow" />
    <!-- 优化Title：核心词前置 -->
    <title>${gameName} Online - Play Free Racing Game in Browser | Traffic Games</title>
    <link rel="canonical" href="https://www.trafficgames.online/racing/${safeFileName}.html" />
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../js/detail1.css">
    <!-- Open Graph标签 -->
    <meta property="og:title" content="${gameName} Online - Play Free in Your Browser" />
    <meta property="og:description" content="Play ${gameName} for free! No download required - play instantly in your browser on mobile or desktop!" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.trafficgames.online/racing/${safeFileName}.html" />
    <meta property="og:site_name" content="Traffic Games Online" />
    <!-- Twitter Card标签 -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${gameName} Online - Play Free Racing Game" />
    <meta name="twitter:description" content="Play ${gameName} instantly in browser. No download needed!" />
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VWTXKBQEVM"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VWTXKBQEVM');
    </script>
</head>

<body>
    <header class="header">
        <div class="header-inner">
            <a href="../" class="logo">
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
                <div class="nav-dropdown">
                    <a href="#racing" class="nav-link dropdown-toggle">Racing & Driving <span class="dropdown-arrow">▼</span></a>
                    <div class="dropdown-menu">
                        <a href="../categories.html?category=racing" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626);">🏎️</span>
                            <span class="dropdown-text">Racing Games</span>
                        </a>
                        <a href="../categories.html?category=driving" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #f97316, #ea580c);">🚗</span>
                            <span class="dropdown-text">Driving Games</span>
                        </a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <a href="#control" class="nav-link dropdown-toggle">Parking & Control <span class="dropdown-arrow">▼</span></a>
                    <div class="dropdown-menu">
                        <a href="../categories.html?category=parking" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #22c55e, #16a34a);">🅿️</span>
                            <span class="dropdown-text">Parking Games</span>
                        </a>
                        <a href="../categories.html?category=trafficControl" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">🚦</span>
                            <span class="dropdown-text">Traffic Control</span>
                        </a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <a href="#fun" class="nav-link dropdown-toggle">Fun & Casual <span class="dropdown-arrow">▼</span></a>
                    <div class="dropdown-menu">
                        <a href="../categories.html?category=escape" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">🏃</span>
                            <span class="dropdown-text">Escape Games</span>
                        </a>
                        <a href="../categories.html?category=clicker" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #ec4899, #db2777);">👆</span>
                            <span class="dropdown-text">Clicker Games</span>
                        </a>
                        <a href="../categories.html?category=twoPlayer" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #14b8a6, #0d9488);">👥</span>
                            <span class="dropdown-text">2 Player Games</span>
                        </a>
                    </div>
                </div>
                <div class="nav-dropdown">
                    <a href="#trivia" class="nav-link dropdown-toggle">Trivia <span class="dropdown-arrow">▼</span></a>
                    <div class="dropdown-menu">
                        <a href="../categories.html?category=trivia" class="dropdown-item">
                            <span class="dropdown-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">❓</span>
                            <span class="dropdown-text">Trivia Games</span>
                        </a>
                    </div>
                </div>
            </nav>
            <div class="header-search">
                <form id="searchForm" action="../categories.html" method="GET">
                    <svg viewBox="0 0 20 20" width="16" height="16"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/><line x1="13" y1="13" x2="18" y2="18" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"/></svg>
                    <input type="text" name="search" placeholder="Search games..." required>
                    <button type="submit" class="search-btn">
                        <svg viewBox="0 0 20 20" width="16" height="16"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="#4ade80" stroke-width="1.5"/><line x1="13" y1="13" x2="18" y2="18" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </button>
                </form>
            </div>
        </div>
    </header>

    <main class="detail-main">
        <!-- SEO优化的游戏启动区 -->
        <section class="game-launch-section">
            <div class="game-launch-container">
                <!-- H1：游戏名+Online -->
                <div class="game-title-area">
                    <h1>${gameName} Online - Free Racing Game</h1>
                    <p style="color: var(--text-secondary); margin-top: 8px;">Play instantly in your browser • No download required • Mobile & Desktop friendly</p>
                </div>
                
                <!-- 卖点标签 -->
                <div class="game-selling-points" style="display: flex; gap: 12px; margin: 16px 0; flex-wrap: wrap; justify-content: center;">
                    <span style="background: rgba(74, 222, 128, 0.2); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; color: #4ade80;">✓ Free to Play</span>
                    <span style="background: rgba(74, 222, 128, 0.2); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; color: #4ade80;">✓ No Download</span>
                    <span style="background: rgba(74, 222, 128, 0.2); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; color: #4ade80;">✓ Fullscreen</span>
                </div>
                  
                <div class="game-iframe-container" id="gameContainer">
                    <iframe src="${game.iframeUrl}" width="100%" height="100%" frameborder="0" allowfullscreen title="${gameName} - Play Online"></iframe>
                    <button class="fullscreen-btn" id="fullscreenBtn" aria-label="Fullscreen">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path
                                d="M7 14H5v5h5v-5H7zM14 14h-2v5h5v-5h-3zM17 3h-3v5h5V3h-2zM7 3H5v5h5V3H7zM4 7H2v5h5V7H4zM17 7h-3v5h5V7h-2zM4 14H2v5h5v-5H4zM17 14h-3v5h5v-5h-2zM14 17h-2v3h5v-3h-3zM7 17H5v3h5v-3H7z"
                                fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <!-- SEO优化的游戏详情区 -->
        <section class="game-detail-section">
            <div class="detail-container">
                <div class="detail-content">
                    <!-- H2：游戏介绍 -->
                    <div class="detail-block">
                        <h2>Play ${gameName} Online - Free Browser Racing Game</h2>
                        <p>Experience the thrill of <strong>${gameName}</strong> directly in your browser! This exciting racing game challenges you to master high-speed driving through busy traffic. <strong>Play ${gameName} online for free</strong> - no download, no installation, just instant racing action!</p>
                        <p>Whether you're on mobile, tablet, or desktop, ${gameName} delivers smooth gameplay and stunning graphics. Navigate through challenging tracks, avoid collisions, and compete for the highest score in this addictive traffic racing game.</p>
                    </div>

                    <!-- H2：游戏玩法 -->
                    <div class="detail-block">
                        <h2>How to Play ${gameName} Online</h2>
                        <p>Getting started with <strong>${gameName}</strong> is easy:</p>
                        <ul>
                            <li><strong>Arrow Keys:</strong> Steer your vehicle left and right</li>
                            <li><strong>Up/Down:</strong> Accelerate and brake</li>
                            <li><strong>Spacebar:</strong> Activate nitro boost for extra speed</li>
                            <li><strong>Goal:</strong> Navigate through traffic without crashing</li>
                        </ul>
                        <p>The game features realistic physics and responsive controls that work perfectly on all devices. As you progress, tracks become more challenging with denser traffic and faster speeds.</p>
                    </div>

                    <!-- H2：游戏特色 -->
                    <div class="detail-block">
                        <h2>${gameName} Game Features</h2>
                        <p>Discover what makes <strong>${gameName}</strong> one of the best traffic racing games online:</p>
                        <ul>
                            <li>✓ <strong>Instant Play:</strong> No download required - play directly in browser</li>
                            <li>✓ <strong>Cross-Platform:</strong> Works on mobile, tablet, and desktop</li>
                            <li>✓ <strong>Realistic Graphics:</strong> Stunning 3D visuals and environments</li>
                            <li>✓ <strong>Multiple Tracks:</strong> Various challenging racing scenarios</li>
                            <li>✓ <strong>Smooth Controls:</strong> Responsive handling for precise driving</li>
                            <li>✓ <strong>100% Free:</strong> No hidden costs or subscriptions</li>
                        </ul>
                    </div>

                    <!-- H2：为什么玩 -->
                    <div class="detail-block">
                        <h2>Why Play ${gameName} on Traffic Games Online?</h2>
                        <p>At Traffic Games Online, we bring you the best racing games that you can play instantly. <strong>${gameName}</strong> is carefully selected for its engaging gameplay, smooth performance, and cross-device compatibility.</p>
                        <p>Unlike apps that require downloads and take up storage space, our browser-based games let you jump straight into the action. Perfect for quick gaming sessions during breaks or extended play on weekends!</p>
                    </div>

                    <!-- SEO专用区块 -->
                    <div class="detail-block seo-only">
                        <h2>${gameName} - Online Racing Game</h2>
                        <div class="pieces-grid" id="piecesGrid"></div>
                    </div>

                    <div class="detail-block seo-only">
                        <h2>${gameName} Tips & Tricks</h2>
                        <ul class="tips-list" id="tipsList"></ul>
                    </div>

                    <div class="detail-block seo-only">
                        <h2>More Traffic Games Online</h2>
                        <div class="extended-info-grid" id="extendedInfoGrid"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 推荐游戏区 -->
        <section class="recommended-section">
            <div class="section-header">
                <h2>Similar Racing Games You Might Like</h2>
            </div>
            <div class="recommended-grid" id="recommendedGrid"></div>

            <div class="section-header">
                <h2>More Free Traffic Games</h2>
            </div>
            <div class="more-games-grid" id="moreGamesGrid"></div>
        </section>
    </main>

    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-col">
                <h4>Traffic Games Online</h4>
                <p>Play the best free online traffic, driving, and racing games. No downloads required!</p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <a href="../">Home</a>
                <a href="../categories.html">All Games</a>
            </div>
            <div class="footer-col">
                <h4>Game Categories</h4>
                <a href="../categories.html?category=racing">Racing Games</a>
                <a href="../categories.html?category=trafficControl">Traffic Control</a>
                <a href="../categories.html?category=parking">Parking Games</a>
                <a href="../categories.html?category=escape">Escape Games</a>
            </div>
            <div class="footer-col">
                <h4>Support</h4>
                <a href="../privacy-policy.html">Privacy Policy</a>
                <a href="../terms.html">Terms of Service</a>
                <a href="../contact.html">Contact</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Traffic Games Online. All rights reserved. Play free online games.</p>
        </div>
    </footer>

    <script src="../js/racing/${safeFileName}-data.js"></script>
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

</html>`;
    
    fs.writeFileSync(filePath, html);
    console.log(`生成SEO优化页面: ${filePath}`);
};

// 生成所有页面
games.forEach(game => {
    generatePage(game);
});

console.log('所有racing游戏SEO优化页面生成完成！');
