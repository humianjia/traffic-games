(function () {
    // Google Analytics代码
    if (!window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VWTXKBQEVM');
        
        // 动态添加gtag.js脚本
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-VWTXKBQEVM';
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    }
    var gameContainer = document.getElementById('gameContainer');
    var fullscreenBtn = document.getElementById('fullscreenBtn');
    var objectiveText = document.getElementById('objectiveText');
    var piecesGrid = document.getElementById('piecesGrid');
    var tipsList = document.getElementById('tipsList');
    var extendedInfoGrid = document.getElementById('extendedInfoGrid');
    var recommendedGrid = document.getElementById('recommendedGrid');
    var moreGamesGrid = document.getElementById('moreGamesGrid');

    // 获取所有游戏数据
    function getAllGames() {
        var allGames = [];
        
        // 从所有分类游戏数据中获取游戏
        if (typeof racingGamesData !== 'undefined') {
            console.log('Found racingGamesData:', racingGamesData.length, 'games');
            allGames = allGames.concat(racingGamesData);
        } else {
            console.log('racingGamesData is undefined');
        }
        if (typeof trafficControlGamesData !== 'undefined') {
            console.log('Found trafficControlGamesData:', trafficControlGamesData.length, 'games');
            allGames = allGames.concat(trafficControlGamesData);
        } else {
            console.log('trafficControlGamesData is undefined');
        }
        if (typeof parkingGamesData !== 'undefined') {
            console.log('Found parkingGamesData:', parkingGamesData.length, 'games');
            allGames = allGames.concat(parkingGamesData);
        } else {
            console.log('parkingGamesData is undefined');
        }
        if (typeof escapeGamesData !== 'undefined') {
            console.log('Found escapeGamesData:', escapeGamesData.length, 'games');
            allGames = allGames.concat(escapeGamesData);
        } else {
            console.log('escapeGamesData is undefined');
        }
        if (typeof triviaGamesData !== 'undefined') {
            console.log('Found triviaGamesData:', triviaGamesData.length, 'games');
            allGames = allGames.concat(triviaGamesData);
        } else {
            console.log('triviaGamesData is undefined');
        }
        if (typeof clickerGamesData !== 'undefined') {
            console.log('Found clickerGamesData:', clickerGamesData.length, 'games');
            allGames = allGames.concat(clickerGamesData);
        } else {
            console.log('clickerGamesData is undefined');
        }
        if (typeof twoPlayerGamesData !== 'undefined') {
            console.log('Found twoPlayerGamesData:', twoPlayerGamesData.length, 'games');
            allGames = allGames.concat(twoPlayerGamesData);
        } else {
            console.log('twoPlayerGamesData is undefined');
        }
        if (typeof drivingGamesData !== 'undefined') {
            console.log('Found drivingGamesData:', drivingGamesData.length, 'games');
            allGames = allGames.concat(drivingGamesData);
        } else {
            console.log('drivingGamesData is undefined');
        }
        
        // 不包含coolmathGamesData，只使用其他分类的游戏数据
        if (typeof coolmathGamesData !== 'undefined') {
            console.log('coolmathGamesData is available but not included');
        } else {
            console.log('coolmathGamesData is undefined');
        }
        
        console.log('Total games after all sources:', allGames.length);
        return allGames;
    }

    // 随机选择指定数量的游戏
    function getRandomGames(games, count) {
        var shuffled = games.sort(function() { return 0.5 - Math.random(); });
        return shuffled.slice(0, count);
    }

    // 清除旧的localStorage数据，确保每次都重新生成游戏列表
    function clearOldLocalStorage() {
        localStorage.removeItem('dailyCoolmathGames');
        localStorage.removeItem('dailyMoreGames');
    }

    // 清除所有缓存数据
    function clearAllCache() {
        localStorage.removeItem('dailyCoolmathGames');
        localStorage.removeItem('dailyMoreGames');
    }

    // 获取每日游戏数据（24个不重复游戏）
    function getDailyGames() {
        var today = new Date().toDateString();
        var storedCoolmath = localStorage.getItem('dailyCoolmathGames');
        var storedMore = localStorage.getItem('dailyMoreGames');
        
        // 如果今天的数据已经存在，直接返回
        if (storedCoolmath && storedMore) {
            var parsedCoolmath = JSON.parse(storedCoolmath);
            var parsedMore = JSON.parse(storedMore);
            if (parsedCoolmath.date === today && parsedMore.date === today) {
                return { coolmath: parsedCoolmath.games, more: parsedMore.games };
            }
        }
        
        // 从所有游戏数据中获取游戏（不包含coolmath）
        var allGames = getAllGames();
        console.log('Total games available:', allGames.length);
        
        // 随机选择24个不重复的游戏
        var randomGames = [];
        if (allGames.length > 0) {
            // 打乱游戏顺序
            var shuffled = allGames.sort(function() { return 0.5 - Math.random(); });
            // 取前24个游戏
            randomGames = shuffled.slice(0, Math.min(24, shuffled.length));
        }
        console.log('Selected games:', randomGames.length);
        
        // 分配到两个列表中，各12个
        var coolmathGames = randomGames.slice(0, 12);
        var moreGames = randomGames.slice(12, 24);
        console.log('Coolmath Hot Picks games:', coolmathGames.length);
        console.log('More Games games:', moreGames.length);
        
        // 存储新的游戏和日期
        localStorage.setItem('dailyCoolmathGames', JSON.stringify({
            date: today,
            games: coolmathGames
        }));
        localStorage.setItem('dailyMoreGames', JSON.stringify({
            date: today,
            games: moreGames
        }));
        
        return { coolmath: coolmathGames, more: moreGames };
    }

    // 获取每日Coolmath Hot Picks游戏
    function getDailyCoolmathGames() {
        var today = new Date().toDateString();
        var storedData = localStorage.getItem('dailyCoolmathGames');
        
        if (storedData) {
            var parsedData = JSON.parse(storedData);
            if (parsedData.date === today) {
                return parsedData.games;
            }
        }
        
        // 如果没有缓存，获取新的每日游戏数据
        var dailyGames = getDailyGames();
        return dailyGames.coolmath;
    }

    // 获取每日More Games游戏
    function getDailyMoreGames() {
        var today = new Date().toDateString();
        var storedData = localStorage.getItem('dailyMoreGames');
        
        if (storedData) {
            var parsedData = JSON.parse(storedData);
            if (parsedData.date === today) {
                return parsedData.games;
            }
        }
        
        // 如果没有缓存，获取新的每日游戏数据
        var dailyGames = getDailyGames();
        return dailyGames.more;
    }

    function renderGameDetail() {
        if (!gameDetailData) return;

        objectiveText.textContent = gameDetailData.description;

        // 更新iframe的src
        if (gameDetailData.iframeUrl) {
            var iframe = gameContainer.querySelector('iframe');
            if (iframe) {
                iframe.src = gameDetailData.iframeUrl;
            }
        }

        renderPieces();
        renderTips();
        renderExtendedInfo();
    }

    function renderPieces() {
        if (!gameDetailData.instructions || !gameDetailData.instructions.pieces) return;

        gameDetailData.instructions.pieces.forEach(function (piece) {
            var pieceCard = document.createElement('div');
            pieceCard.className = 'piece-card';
            pieceCard.innerHTML = '<h3 class="piece-name">' + piece.name + '</h3>' +
                '<p class="piece-movement">' + piece.movement + '</p>';
            piecesGrid.appendChild(pieceCard);
        });
    }

    function renderTips() {
        if (!gameDetailData.tips) return;

        gameDetailData.tips.forEach(function (tip) {
            var li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
    }

    function renderExtendedInfo() {
        if (!gameDetailData.extendedInfo) return;

        gameDetailData.extendedInfo.forEach(function (info) {
            var infoCard = document.createElement('div');
            infoCard.className = 'extended-info-card';
            infoCard.innerHTML = '<h3 class="extended-info-title">' + info.title + '</h3>' +
                '<p class="extended-info-content">' + info.content + '</p>';
            extendedInfoGrid.appendChild(infoCard);
        });
    }

    function renderRecommendedGames() {
        var recommendedGrid = document.getElementById('recommendedGrid');
        if (!recommendedGrid) {
            console.log('recommendedGrid element not found');
            return;
        }
        
        // 使用每日随机游戏数据
        var games = getDailyCoolmathGames();
        console.log('Rendering Coolmath Hot Picks:', games.length, 'games');
        games.forEach(function (game) {
            var card = document.createElement('div');
            card.className = 'recommended-card';
            card.dataset.description = game.description || '';
            card.dataset.keywords = game.keywords || '';
            
            // 调整图片路径
            var imageUrl = game.imageUrl;
            var basePath = '';
            if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                // 如果在子目录中，添加../前缀
                basePath = '../';
                if (!imageUrl.startsWith('../')) {
                    imageUrl = basePath + imageUrl;
                }
            }
            
            // 调整链接路径
            var link = game.link;
            if (window.location.pathname.includes('/coolmath/')) {
                // 如果在coolmath目录中
                if (link.startsWith('coolmath/')) {
                    // 同目录游戏，移除coolmath/前缀
                    link = link.replace('coolmath/', '');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/more-games/')) {
                // 如果在more-games目录中
                if (link.startsWith('more-games/')) {
                    // 同目录游戏，移除more-games/前缀
                    link = link.replace('more-games/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/racing/')) {
                // 如果在racing目录中
                if (link.startsWith('racing/')) {
                    // 同目录游戏，移除racing/前缀
                    link = link.replace('racing/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/trafficControl/')) {
                // 如果在trafficControl目录中
                if (link.startsWith('trafficControl/')) {
                    // 同目录游戏，移除trafficControl/前缀
                    link = link.replace('trafficControl/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/parking/')) {
                // 如果在parking目录中
                if (link.startsWith('parking/')) {
                    // 同目录游戏，移除parking/前缀
                    link = link.replace('parking/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/escape/')) {
                // 如果在escape目录中
                if (link.startsWith('escape/')) {
                    // 同目录游戏，移除escape/前缀
                    link = link.replace('escape/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/trivia/')) {
                // 如果在trivia目录中
                if (link.startsWith('trivia/')) {
                    // 同目录游戏，移除trivia/前缀
                    link = link.replace('trivia/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/clicker/')) {
                // 如果在clicker目录中
                if (link.startsWith('clicker/')) {
                    // 同目录游戏，移除clicker/前缀
                    link = link.replace('clicker/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/twoPlayer/')) {
                // 如果在twoPlayer目录中
                if (link.startsWith('twoPlayer/')) {
                    // 同目录游戏，移除twoPlayer/前缀
                    link = link.replace('twoPlayer/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/driving/')) {
                // 如果在driving目录中
                if (link.startsWith('driving/')) {
                    // 同目录游戏，移除driving/前缀
                    link = link.replace('driving/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                }
            }
            
            card.innerHTML = '<div class="rc-thumb">' +
                '<img src="' + imageUrl + '" alt="' + game.name + '" loading="lazy" width="150" height="100" onerror="this.src=\'' + basePath + 'img/game1.png\'; this.onerror=null;">' +
                '<p class="rc-name">' + game.name + '</p>' +
                '</div>';
            
            // 实现图片懒加载
            var img = card.querySelector('img');
            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            img.src = img.src;
                            observer.unobserve(img);
                        }
                    });
                });
                observer.observe(img);
            }

            card.addEventListener('click', function () {
                if (link && link !== '#') {
                    window.location.href = link;
                }
            });

            recommendedGrid.appendChild(card);
        });
    }

    function renderMoreGames() {
        var moreGamesGrid = document.getElementById('moreGamesGrid');
        if (!moreGamesGrid) {
            console.log('moreGamesGrid element not found');
            return;
        }
        
        // 使用每日随机游戏数据
        var games = getDailyMoreGames();
        console.log('Rendering More Games:', games.length, 'games');
        games.forEach(function (game) {
            var card = document.createElement('div');
            card.className = 'recommended-card';
            card.dataset.description = game.description || '';
            card.dataset.keywords = game.keywords || '';
            
            // 调整图片路径
            var imageUrl = game.imageUrl;
            var basePath = '';
            if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                // 如果在子目录中，添加../前缀
                basePath = '../';
                if (!imageUrl.startsWith('../')) {
                    imageUrl = basePath + imageUrl;
                }
            }
            
            // 调整链接路径
            var link = game.link;
            if (window.location.pathname.includes('/coolmath/')) {
                // 如果在coolmath目录中
                if (link.startsWith('coolmath/')) {
                    // 同目录游戏，移除coolmath/前缀
                    link = link.replace('coolmath/', '');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/more-games/')) {
                // 如果在more-games目录中
                if (link.startsWith('more-games/')) {
                    // 同目录游戏，移除more-games/前缀
                    link = link.replace('more-games/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/racing/')) {
                // 如果在racing目录中
                if (link.startsWith('racing/')) {
                    // 同目录游戏，移除racing/前缀
                    link = link.replace('racing/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/trafficControl/')) {
                // 如果在trafficControl目录中
                if (link.startsWith('trafficControl/')) {
                    // 同目录游戏，移除trafficControl/前缀
                    link = link.replace('trafficControl/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/parking/')) {
                // 如果在parking目录中
                if (link.startsWith('parking/')) {
                    // 同目录游戏，移除parking/前缀
                    link = link.replace('parking/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/escape/')) {
                // 如果在escape目录中
                if (link.startsWith('escape/')) {
                    // 同目录游戏，移除escape/前缀
                    link = link.replace('escape/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/trivia/')) {
                // 如果在trivia目录中
                if (link.startsWith('trivia/')) {
                    // 同目录游戏，移除trivia/前缀
                    link = link.replace('trivia/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/clicker/')) {
                // 如果在clicker目录中
                if (link.startsWith('clicker/')) {
                    // 同目录游戏，移除clicker/前缀
                    link = link.replace('clicker/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/twoPlayer/')) {
                // 如果在twoPlayer目录中
                if (link.startsWith('twoPlayer/')) {
                    // 同目录游戏，移除twoPlayer/前缀
                    link = link.replace('twoPlayer/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('driving/')) {
                    // 跨目录游戏，调整为../driving/路径
                    link = link.replace('driving/', '../driving/');
                }
            } else if (window.location.pathname.includes('/driving/')) {
                // 如果在driving目录中
                if (link.startsWith('driving/')) {
                    // 同目录游戏，移除driving/前缀
                    link = link.replace('driving/', '');
                } else if (link.startsWith('coolmath/')) {
                    // 跨目录游戏，调整为../coolmath/路径
                    link = link.replace('coolmath/', '../coolmath/');
                } else if (link.startsWith('more-games/')) {
                    // 跨目录游戏，调整为../more-games/路径
                    link = link.replace('more-games/', '../more-games/');
                } else if (link.startsWith('racing/')) {
                    // 跨目录游戏，调整为../racing/路径
                    link = link.replace('racing/', '../racing/');
                } else if (link.startsWith('trafficControl/')) {
                    // 跨目录游戏，调整为../trafficControl/路径
                    link = link.replace('trafficControl/', '../trafficControl/');
                } else if (link.startsWith('parking/')) {
                    // 跨目录游戏，调整为../parking/路径
                    link = link.replace('parking/', '../parking/');
                } else if (link.startsWith('escape/')) {
                    // 跨目录游戏，调整为../escape/路径
                    link = link.replace('escape/', '../escape/');
                } else if (link.startsWith('trivia/')) {
                    // 跨目录游戏，调整为../trivia/路径
                    link = link.replace('trivia/', '../trivia/');
                } else if (link.startsWith('clicker/')) {
                    // 跨目录游戏，调整为../clicker/路径
                    link = link.replace('clicker/', '../clicker/');
                } else if (link.startsWith('twoPlayer/')) {
                    // 跨目录游戏，调整为../twoPlayer/路径
                    link = link.replace('twoPlayer/', '../twoPlayer/');
                }
            }
            
            card.innerHTML = '<div class="rc-thumb">' +
                '<img src="' + imageUrl + '" alt="' + game.name + '" loading="lazy" width="150" height="100" onerror="this.src=\'' + basePath + 'img/game1.png\'; this.onerror=null;">' +
                '<p class="rc-name">' + game.name + '</p>' +
                '</div>';
            
            // 实现图片懒加载
            var img = card.querySelector('img');
            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            img.src = img.src;
                            observer.unobserve(img);
                        }
                    });
                });
                observer.observe(img);
            }

            card.addEventListener('click', function () {
                if (link && link !== '#') {
                    window.location.href = link;
                }
            });

            moreGamesGrid.appendChild(card);
        });
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (gameContainer.requestFullscreen) {
                gameContainer.requestFullscreen();
            } else if (gameContainer.webkitRequestFullscreen) {
                gameContainer.webkitRequestFullscreen();
            } else if (gameContainer.msRequestFullscreen) {
                gameContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // 清除旧的localStorage数据，确保每次都重新生成游戏列表
    clearOldLocalStorage();
    
    // 先获取Coolmath Hot Picks游戏
    var coolmathGames = getDailyCoolmathGames();
    
    // 再获取More Games游戏（确保不重复）
    var moreGames = getDailyMoreGames();
    
    // 渲染游戏详情（如果有gameDetailData）
    renderGameDetail();
    
    // 无论是否有gameDetailData，都渲染推荐游戏和更多游戏
    renderRecommendedGames();
    renderMoreGames();
})();
