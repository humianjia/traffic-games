(function () {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var gameCards = document.querySelectorAll('.game-card');
    var catTags = document.querySelectorAll('.cat-tag');
    var navLinks = document.querySelectorAll('.nav-link');

    // 获取所有游戏数据
    function getAllGames() {
        var allGames = [];
        
        // 检查并添加各个分类的游戏数据
        if (typeof racingGamesData !== 'undefined') {
            allGames = allGames.concat(racingGamesData);
        }
        if (typeof trafficControlGamesData !== 'undefined') {
            allGames = allGames.concat(trafficControlGamesData);
        }
        if (typeof parkingGamesData !== 'undefined') {
            allGames = allGames.concat(parkingGamesData);
        }
        if (typeof escapeGamesData !== 'undefined') {
            allGames = allGames.concat(escapeGamesData);
        }
        if (typeof triviaGamesData !== 'undefined') {
            allGames = allGames.concat(triviaGamesData);
        }
        if (typeof clickerGamesData !== 'undefined') {
            allGames = allGames.concat(clickerGamesData);
        }
        if (typeof twoPlayerGamesData !== 'undefined') {
            allGames = allGames.concat(twoPlayerGamesData);
        }
        if (typeof drivingGamesData !== 'undefined') {
            allGames = allGames.concat(drivingGamesData);
        }
        
        return allGames;
    }

    // 随机选择指定数量的游戏
    function getRandomGames(games, count) {
        var shuffled = games.sort(function() { return 0.5 - Math.random(); });
        return shuffled.slice(0, count);
    }

    // 获取每日推荐游戏
    function getDailyRecommendedGames() {
        var today = new Date().toDateString();
        var storedData = localStorage.getItem('dailyRecommendedGames');
        
        if (storedData) {
            var parsedData = JSON.parse(storedData);
            if (parsedData.date === today) {
                return parsedData.games;
            }
        }
        
        // 如果没有存储数据或日期已更新，重新选择游戏
        var allGames = getAllGames();
        var randomGames = getRandomGames(allGames, 4);
        
        // 存储新的推荐游戏和日期
        localStorage.setItem('dailyRecommendedGames', JSON.stringify({
            date: today,
            games: randomGames
        }));
        
        return randomGames;
    }

    // 获取每日Popular Games数据
    function getDailyPopularGames() {
        var today = new Date().toDateString();
        var storedData = localStorage.getItem('dailyPopularGames');
        
        if (storedData) {
            var parsedData = JSON.parse(storedData);
            // 检查是否为同一天
            if (parsedData.date === today) {
                return parsedData;
            }
        }
        
        // 如果没有存储数据或日期已更新，重新选择游戏
        var allGames = getAllGames();
        var popularGamesData = {
            date: today,
            all: getRandomGames(allGames, 20),
            new: getRandomGames(allGames, 20),
            trending: getRandomGames(allGames, 20),
            'top-rated': getRandomGames(allGames, 20)
        };
        
        // 存储新的Popular Games数据
        localStorage.setItem('dailyPopularGames', JSON.stringify(popularGamesData));
        
        return popularGamesData;
    }

    // 检查并更新Popular Games数据
    function checkAndUpdatePopularGames() {
        var currentBtn = document.querySelector('.filter-btn.active');
        var filter = currentBtn ? currentBtn.dataset.filter : 'all';
        
        // 获取最新的游戏数据
        var popularGamesData = getDailyPopularGames();
        
        // 重新渲染当前选中的分类
        if (filter === 'new') {
            renderGames(popularGamesData.new);
        } else if (filter === 'trending') {
            renderGames(popularGamesData.trending);
        } else if (filter === 'top-rated') {
            renderGames(popularGamesData['top-rated']);
        } else if (filter === 'all') {
            renderGames(popularGamesData.all);
        }
    }

    // 设置定时器，每5分钟检查一次是否需要刷新游戏
    setInterval(checkAndUpdatePopularGames, 5 * 60 * 1000);

    function renderFeaturedGames(games) {
        var featuredGrid = document.getElementById('featured-grid');
        if (!featuredGrid) return;

        games.forEach(function (game) {
            var card = document.createElement('div');
            card.className = 'featured-card';
            
            // 调整图片路径
            var imageUrl = game.imageUrl;
            if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                if (!imageUrl.startsWith('../')) {
                    imageUrl = '../' + imageUrl;
                }
            }
            
            // 调整链接路径
            var gameLink = game.link;
            if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                if (!gameLink.startsWith('../')) {
                    gameLink = '../' + gameLink;
                }
            }
            
            var badgeHtml = '';
            if (game.badge && game.badgeType) {
                badgeHtml = '<span class="thumb-badge ' + game.badgeType + '">' + game.badge + '</span>';
            }

            card.innerHTML = '<a href="' + gameLink + '" class="featured-card-link">' +
                '<div class="game-thumb" style="background: url(' + imageUrl + ') no-repeat center center / cover;">' +
                    // '<img src="' + imageUrl + '" alt="' + game.name + '" class="thumb-image">' +
                    badgeHtml +
                '</div>' +
                '<div class="featured-info">' +
                    '<h3>' + game.name + '</h3>' +
                    '<p>' + game.description + '</p>' +
                '</div>' +
            '</a>';

            featuredGrid.appendChild(card);

            // 移除阻止默认链接行为的代码，允许链接正常跳转
            /*
            card.addEventListener('click', function (e) {
                e.preventDefault();
                showGameToast(game.name);
            });
            */
        });
    }

    // 获取每日推荐游戏并渲染
    var dailyGames = getDailyRecommendedGames();
    renderFeaturedGames(dailyGames);

    // 更新Game Categories中的游戏数量
    function updateCategoryGameCounts() {
        var categoryCards = document.querySelectorAll('.category-card');
        
        // 定义分类与数据文件的映射
        var categoryDataMap = {
            'Racing Games': racingGamesData,
            'Traffic Control': trafficControlGamesData,
            'Parking Games': parkingGamesData,
            'Escape Games': escapeGamesData,
            'Trivia': triviaGamesData,
            'Clicker Games': clickerGamesData,
            '2 Player Games': twoPlayerGamesData,
            'Driving Games': drivingGamesData
        };
        
        categoryCards.forEach(function(card) {
            var categoryName = card.querySelector('h3').textContent;
            var data = categoryDataMap[categoryName];
            
            if (data) {
                var gameCount = data.length;
                var countElement = card.querySelector('span');
                if (countElement) {
                    countElement.textContent = gameCount + ' Games';
                }
            }
        });
    }

    // 调用更新游戏数量的函数
    updateCategoryGameCounts();

    function renderGames(games) {
        var gamesGrid = document.getElementById('gamesGrid');
        if (!gamesGrid) return;

        gamesGrid.innerHTML = '';

        games.forEach(function (game) {
            var card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.tags = game.tags ? game.tags.join(' ') : '';
            card.dataset.iframeUrl = game.iframeUrl || '';
            card.dataset.description = game.description || '';
            
            // 调整图片路径
            var imageUrl = game.imageUrl;
            if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                if (!imageUrl.startsWith('../')) {
                    imageUrl = '../' + imageUrl;
                }
            }
            
            // 调整链接路径
            var gameLink = game.link;
            if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                if (!gameLink.startsWith('../')) {
                    gameLink = '../' + gameLink;
                }
            }

            card.innerHTML = '<a href="' + gameLink + '" class="game-card-link">' +
                '<div class="gc-thumb" style="background: url(' + imageUrl + ') no-repeat center center / cover;">' +
                    // '<img src="' + imageUrl + '" alt="' + game.name + '" class="gc-image">' +
                    // '<span class="gc-name">' + game.name + '</span>' +
                '</div>' +
                '<p class="gc-label">' + game.name + '</p>' +
            '</a>';

            gamesGrid.appendChild(card);

            // 移除阻止默认链接行为的代码，允许链接正常跳转
            /*
            card.addEventListener('click', function (e) {
                e.preventDefault();
                if (game.iframeUrl) {
                    showGameToast(game.name + ' - Opening game...');
                } else {
                    showGameToast(game.name);
                }
            });
            */
        });

        gameCards = document.querySelectorAll('.game-card');
    }

    // 初始渲染Popular Games
    var initialPopularGames = getDailyPopularGames();
    renderGames(initialPopularGames.all);

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            var filter = btn.dataset.filter;
            
            // 获取每日Popular Games数据
            var popularGamesData = getDailyPopularGames();
            
            if (filter === 'new') {
                renderGames(popularGamesData.new);
            } else if (filter === 'trending') {
                renderGames(popularGamesData.trending);
            } else if (filter === 'top-rated') {
                renderGames(popularGamesData['top-rated']);
            } else if (filter === 'all') {
                renderGames(popularGamesData.all);
            } else {
                gameCards.forEach(function (card) {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        var tags = card.dataset.tags || '';
                        card.classList.toggle('hidden', tags.indexOf(filter) === -1);
                    }
                });
            }
        });
    });

    catTags.forEach(function (tag) {
        tag.addEventListener('click', function (e) {
            e.preventDefault();
            catTags.forEach(function (t) { t.classList.remove('active'); });
            tag.classList.add('active');
        });
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (href && href.charAt(0) === '#') {
                e.preventDefault();
                navLinks.forEach(function (l) { l.classList.remove('active'); });
                link.classList.add('active');
                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    var searchInput = document.querySelector('.header-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            var query = searchInput.value.toLowerCase().trim();
            gameCards.forEach(function (card) {
                var label = card.querySelector('.gc-label');
                if (!label) return;
                var name = label.textContent.toLowerCase();
                card.classList.toggle('hidden', query.length > 0 && name.indexOf(query) === -1);
            });
            if (query.length > 0) {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
            }
        });
    }

    gameCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var label = card.querySelector('.gc-label');
            if (label) showGameToast(label.textContent);
        });
    });

    var lbCards = document.querySelectorAll('.lb-card');
    lbCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var name = card.querySelector('h4');
            if (name) showGameToast(name.textContent);
        });
    });

    function showGameToast(name) {
        var existing = document.querySelector('.game-toast');
        if (existing) existing.remove();
        var toast = document.createElement('div');
        toast.className = 'game-toast';
        toast.innerHTML = '<span class="toast-play">▶</span> Loading <strong>' + name + '</strong>...';
        document.body.appendChild(toast);
        requestAnimationFrame(function () {
            toast.classList.add('show');
        });
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 300);
        }, 2000);
    }

    var style = document.createElement('style');
    style.textContent = '.game-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:#1a1a26;border:1px solid #2a2a3e;color:#f0f0f5;padding:12px 24px;border-radius:10px;font-size:14px;display:flex;align-items:center;gap:10px;opacity:0;transition:all 0.3s;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.4);}.game-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}.toast-play{color:#4ade80;font-size:16px;}';
    document.head.appendChild(style);
    
    // 添加分类卡片点击事件
    function addCategoryCardClickEvents() {
        var categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                var category = this.getAttribute('data-category');
                loadCategoryGames(category);
            });
        });
        
        // 也为footer中的分类链接添加点击事件
        var footerCategoryLinks = document.querySelectorAll('.footer-col a[data-category]');
        footerCategoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var category = this.getAttribute('data-category');
                loadCategoryGames(category);
            });
        });
    }

    // 加载分类游戏
    function loadCategoryGames(category) {
        var categoryData;
        var categoryTitle;
        
        // 根据分类获取对应的数据和标题
        switch(category) {
            case 'racing':
                categoryData = racingGamesData;
                categoryTitle = 'Racing Games';
                break;
            case 'trafficControl':
                categoryData = trafficControlGamesData;
                categoryTitle = 'Traffic Control Games';
                break;
            case 'parking':
                categoryData = parkingGamesData;
                categoryTitle = 'Parking Games';
                break;
            case 'escape':
                categoryData = escapeGamesData;
                categoryTitle = 'Escape Games';
                break;
            case 'trivia':
                categoryData = triviaGamesData;
                categoryTitle = 'Trivia Games';
                break;
            case 'clicker':
                categoryData = clickerGamesData;
                categoryTitle = 'Clicker Games';
                break;
            case 'twoPlayer':
                categoryData = twoPlayerGamesData;
                categoryTitle = '2 Player Games';
                break;
            case 'driving':
                categoryData = drivingGamesData;
                categoryTitle = 'Driving Games';
                break;
            default:
                return;
        }
        
        // 更新页面标题
        var categoryTitleElement = document.getElementById('category-title');
        if (categoryTitleElement) {
            categoryTitleElement.textContent = categoryTitle;
        }
        
        // 渲染分类游戏
        var featuredGrid = document.getElementById('featured-grid');
        if (featuredGrid) {
            featuredGrid.innerHTML = '';
            
            categoryData.forEach(game => {
                var card = document.createElement('div');
                card.className = 'featured-card';
                
                // 调整图片路径
                var imageUrl = game.imageUrl;
                if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                    if (!imageUrl.startsWith('../')) {
                        imageUrl = '../' + imageUrl;
                    }
                }
                
                // 调整链接路径
                var gameLink = game.link;
                if (window.location.pathname.includes('/coolmath/') || window.location.pathname.includes('/more-games/') || window.location.pathname.includes('/racing/') || window.location.pathname.includes('/trafficControl/') || window.location.pathname.includes('/parking/') || window.location.pathname.includes('/escape/') || window.location.pathname.includes('/trivia/') || window.location.pathname.includes('/clicker/') || window.location.pathname.includes('/twoPlayer/') || window.location.pathname.includes('/driving/')) {
                    if (!gameLink.startsWith('../')) {
                        gameLink = '../' + gameLink;
                    }
                }
                
                var badgeHtml = '';
                if (game.badge && game.badgeType) {
                    badgeHtml = '<span class="thumb-badge ' + game.badgeType + '">' + game.badge + '</span>';
                }

                card.innerHTML = '<a href="' + gameLink + '" class="featured-card-link">' +
                    '<div class="game-thumb" style="background: url(' + imageUrl + ') no-repeat center center / cover;">' +
                        // '<img src="' + imageUrl + '" alt="' + game.name + '" class="thumb-image">' +
                        badgeHtml +
                    '</div>' +
                    '<div class="featured-info">' +
                        '<h3>' + game.name + '</h3>' +
                        '<p>' + game.description + '</p>' +
                    '</div>' +
                '</a>';

                featuredGrid.appendChild(card);
            });
        }
    }
    
    // 处理URL参数，自动加载分类游戏
    function handleUrlParams() {
        var urlParams = new URLSearchParams(window.location.search);
        var category = urlParams.get('category');
        if (category) {
            loadCategoryGames(category);
        }
    }
    
    // 调用添加分类卡片点击事件的函数
    addCategoryCardClickEvents();
    
    // 处理URL参数
    handleUrlParams();
})();