(function () {
    var page = window.categoryPageConfig || {};
    var config = window.gameHubCatalog || {};
    var categories = Array.isArray(config.categories) ? config.categories : [];
    var category = null;

    if (page.categoryId) {
        category = categories.find(function (item) {
            return item.id === page.categoryId;
        }) || null;
    }

    var grid = document.getElementById("gameGrid");
    var heroTitle = document.getElementById("categoryTitle");
    var heroDescription = document.getElementById("categoryDescription");
    var categoryCount = document.getElementById("categoryCount");
    var categoryBadge = document.getElementById("categoryBadge");
    var backToSection = document.getElementById("backToSection");
    var pageLink = document.getElementById("pageCategoryLink");
    var panelTitle = document.getElementById("panelTitle");

    if (category) {
        if (heroTitle) {
            heroTitle.textContent = category.label + " Games";
        }
        if (heroDescription) {
            heroDescription.textContent = category.description + " " + category.mood;
        }
        if (categoryCount) {
            categoryCount.textContent = String(category.count) + " games";
        }
        if (categoryBadge) {
            categoryBadge.textContent = category.badge;
        }
        if (backToSection) {
            backToSection.href = category.href || "categories.html";
        }
        if (pageLink) {
            pageLink.textContent = category.label;
            pageLink.href = category.pageHref || "categories.html";
        }
        if (panelTitle) {
            panelTitle.textContent = "All " + category.label + " Picks";
        }
        if (typeof document !== "undefined") {
            document.title = category.label + " Games | Traffic Games";
        }
    }

    if (!grid) {
        return;
    }

    var items = Array.isArray(page.games) ? page.games : [];
    grid.innerHTML = items.map(function (item) {
        return '' +
            '<article class="game-card">' +
                '<a href="' + escapeHtml(item.link || "#") + '">' +
                    '<div class="game-thumb">' +
                        '<img src="' + escapeHtml(item.imageUrl || "img/screenshots/ss1.png") + '" alt="' + escapeHtml(item.name || "Game") + '">' +
                    '</div>' +
                    '<div class="game-copy">' +
                        '<h3>' + escapeHtml(item.name || "Untitled Game") + '</h3>' +
                        '<span class="game-type">Play Now</span>' +
                    '</div>' +
                '</a>' +
            '</article>';
    }).join("");

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
})();
