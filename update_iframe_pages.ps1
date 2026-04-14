# 查找所有包含iframe的HTML文件
$files = Get-ChildItem -Recurse -Filter "*.html" | Where-Object { 
    Get-Content $_.FullName | Select-String -Pattern "<iframe" -Quiet
}

# 遍历每个文件
foreach ($file in $files) {
    Write-Host "Processing $($file.FullName)..."
    
    # 读取文件内容
    $content = Get-Content $file.FullName -Raw
    
    # 更新canonical标签
    $content = $content -replace 'https://trafficgames\.com', 'https://www.trafficgames.online'
    
    # 更新logo链接
    $content = $content -replace 'href="../home\.html" class="logo"', 'href="../" class="logo"'
    
    # 检查是否已经有游戏描述部分
    if ($content -notmatch 'game-description-section') {
        # 在game-launch-section之前添加游戏描述部分
        $gameTitle = $content | Select-String -Pattern '<h1>(.*?)<\/h1>' -Context 0, 0 | ForEach-Object { $_.Matches.Groups[1].Value }
        $gameTitle = $gameTitle -replace ' - traffic games', ''
        
        # 提取游戏类别
        $category = $file.Directory.Name
        
        # 创建游戏描述
        $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is an exciting online game that offers hours of entertainment. Test your skills and have fun with this engaging game.</p>
                <p>In $gameTitle, you'll experience challenging gameplay and exciting features that will keep you coming back for more.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Engaging gameplay</li>
                        <li>Beautiful graphics</li>
                        <li>Responsive controls</li>
                        <li>Challenging levels</li>
                        <li>Free to play</li>
                        <li>No downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
        
        # 根据类别调整描述
        switch ($category) {
            "clicker" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is an exciting clicker game where you can test your reflexes and strategy. Click your way to success and build your empire in this addictive game.</p>
                <p>In $gameTitle, you'll need to click strategically to maximize your progress. The game features various upgrades and abilities that will help you reach new heights.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Addictive clicker gameplay</li>
                        <li>Multiple upgrades and abilities</li>
                        <li>Idle mechanics for passive progression</li>
                        <li>Beautiful graphics and animations</li>
                        <li>Challenging levels and achievements</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
            "racing" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is a thrilling racing game where you can test your driving skills on challenging tracks. Race against opponents and become the champion.</p>
                <p>In $gameTitle, you'll experience high-speed action and intense competition. The game features realistic graphics and responsive controls that will keep you engaged.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>High-speed racing action</li>
                        <li>Challenging tracks and opponents</li>
                        <li>Realistic graphics and physics</li>
                        <li>Multiple game modes</li>
                        <li>Upgradable vehicles</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
            "driving" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is an exciting driving game where you can test your skills behind the wheel. Navigate through challenging courses and complete various objectives.</p>
                <p>In $gameTitle, you'll experience realistic driving mechanics and challenging scenarios. The game features a variety of vehicles and environments to explore.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Realistic driving mechanics</li>
                        <li>Challenging courses and objectives</li>
                        <li>Multiple vehicles to choose from</li>
                        <li>Beautiful environments</li>
                        <li>Responsive controls</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
            "parking" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is a challenging parking game where you can test your precision and patience. Park your vehicle in various difficult scenarios.</p>
                <p>In $gameTitle, you'll need to navigate through tight spaces and avoid obstacles to park successfully. The game features realistic physics and challenging levels.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Challenging parking scenarios</li>
                        <li>Realistic physics and controls</li>
                        <li>Multiple difficulty levels</li>
                        <li>Various vehicles to park</li>
                        <li>Precision-based gameplay</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
            "trafficControl" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is an exciting traffic control game where you can test your ability to manage traffic flow and prevent accidents. Make quick decisions to keep traffic moving smoothly.</p>
                <p>In $gameTitle, you'll need to control traffic lights and manage the flow of vehicles to avoid collisions. The game features various scenarios and increasing difficulty.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Challenging traffic control scenarios</li>
                        <li>Realistic traffic patterns</li>
                        <li>Multiple difficulty levels</li>
                        <li>Time-based challenges</li>
                        <li>Strategy-based gameplay</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
            "escape" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is an exciting escape game where you can test your problem-solving skills and creativity. Navigate through challenging scenarios and find your way to freedom.</p>
                <p>In $gameTitle, you'll need to solve puzzles, find hidden objects, and overcome obstacles to escape. The game features immersive environments and engaging gameplay.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Challenging puzzles and obstacles</li>
                        <li>Immersive environments</li>
                        <li>Engaging storyline</li>
                        <li>Hidden objects to find</li>
                        <li>Multiple endings</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
            "twoPlayer" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is an exciting two-player game where you can challenge a friend or family member. Compete against each other in various fun and engaging scenarios.</p>
                <p>In $gameTitle, you'll go head-to-head with another player in a battle of skills. The game features various game modes and challenges to keep you entertained.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Two-player competitive gameplay</li>
                        <li>Various game modes and challenges</li>
                        <li>Easy-to-learn controls</li>
                        <li>Fun and engaging mechanics</li>
                        <li>Local multiplayer</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
            "trivia" {
                $gameDescription = @"
        <section class="game-description-section">
            <div class="game-description-container">
                <h2>About $gameTitle</h2>
                <p>$gameTitle is an exciting trivia game where you can test your knowledge on various topics. Answer questions and see how much you know.</p>
                <p>In $gameTitle, you'll be presented with a variety of questions on different subjects. The game features multiple difficulty levels and categories to choose from.</p>
                <div class="game-features">
                    <h3>Game Features</h3>
                    <ul>
                        <li>Wide range of trivia questions</li>
                        <li>Multiple difficulty levels</li>
                        <li>Various categories</li>
                        <li>Score tracking</li>
                        <li>Educational and fun</li>
                        <li>Free to play, no downloads required</li>
                    </ul>
                </div>
            </div>
        </section>
"@
            }
        }
        
        # 在game-launch-section之前添加游戏描述
        $content = $content -replace '(<section class=\"game-launch-section\")', "$gameDescription`n        `$1"
        
        # 更新游戏启动部分，添加标题和说明
        $content = $content -replace '(<div class=\"game-launch-container\">)', "`$1`n                <h2>Play $gameTitle Now</h2>
                <p>Click the game below to start playing. Follow the on-screen instructions for controls.</p>"
    }
    
    # 保存修改后的内容
    Set-Content $file.FullName -Value $content -Encoding UTF8
    
    Write-Host "Updated $($file.FullName)"
}

Write-Host "Processing complete!"
