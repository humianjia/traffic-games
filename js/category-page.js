(function () {
    var page = window.categoryPageConfig || {};
    var config = window.gameHubCatalog || {};
    var categories = Array.isArray(config.categories) ? config.categories : [];
    var category = null;
    var displayLabel = page.displayLabel || (page.categoryId ? humanizeCategory(page.categoryId) : (category ? category.label : "Game"));

    if (page.categoryId) {
        category = categories.find(function (item) {
            return item.id === page.categoryId;
        }) || null;
    }

    var categoryCount = document.getElementById("categoryCount");
    var categoryBadge = document.getElementById("categoryBadge");
    var backToSection = document.getElementById("backToSection");
    var pageLink = document.getElementById("pageCategoryLink");
    var topGrid = document.getElementById("topGrid");
    var popularGrid = document.getElementById("popularGrid");
    var gameGrid = document.getElementById("gameGrid");
    var faqList = document.getElementById("faqList");
    var footerYear = document.getElementById("footerYear");

    if (footerYear) {
        footerYear.textContent = "Copyright " + new Date().getFullYear() + " Traffic Games";
    }

    if (category) {
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
            pageLink.textContent = displayLabel;
            pageLink.href = category.pageHref || "categories.html";
        }
        if (typeof document !== "undefined") {
            if (page.pageTitle) {
                document.title = page.pageTitle;
            }
        }
    }

    var items = Array.isArray(page.games) ? page.games.slice() : [];
    var featuredItems = category && Array.isArray(category.featured) ? category.featured.slice(0, 4).map(function (item) {
        return {
            title: item.title,
            href: item.href,
            image: item.image,
            category: displayLabel,
            rating: ratingFromName(item.title)
        };
    }) : [];

    var popularItems = items.slice(0, 8).map(function (item) {
        return normalizeGame(item, displayLabel);
    });

    var allItems = items.map(function (item) {
        return normalizeGame(item, displayLabel);
    });

    if (topGrid) {
        renderGrid(topGrid, featuredItems);
    }
    if (popularGrid) {
        renderGrid(popularGrid, popularItems);
    }
    if (gameGrid) {
        renderGrid(gameGrid, allItems);
    }
    if (faqList) {
        renderFaq(faqList, category);
    }

    function normalizeGame(item, label) {
        return {
            title: item && item.name ? item.name : "Untitled Game",
            href: item && item.link ? item.link : "#",
            image: item && item.imageUrl ? item.imageUrl : "img/screenshots/ss1.png",
            category: label,
            rating: item && item.rating && item.rating !== "N/A" ? item.rating : ratingFromName(item && item.name ? item.name : label)
        };
    }

    function renderGrid(target, games) {
        if (!target) {
            return;
        }

        target.innerHTML = games.map(function (game) {
            return '' +
                '<article class="game-card">' +
                    '<a href="' + escapeHtml(game.href) + '">' +
                        '<div class="game-thumb">' +
                            '<img src="' + escapeHtml(game.image) + '" alt="' + escapeHtml(game.title) + '" loading="lazy">' +
                        '</div>' +
                        '<div class="game-copy">' +
                            '<div class="game-topline">' +
                                '<span class="game-type">' + escapeHtml(game.category) + '</span>' +
                                '<span class="game-rating">Star ' + escapeHtml(game.rating) + '</span>' +
                            '</div>' +
                            '<div class="game-row">' +
                                '<h3>' + escapeHtml(game.title) + '</h3>' +
                                '<span class="game-action" aria-hidden="true">+</span>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                '</article>';
        }).join("");
    }

    function renderFaq(target, currentCategory) {
        var label = displayLabel || (currentCategory ? currentCategory.label : "Traffic");
        var topic = label.toLowerCase();
        var badge = currentCategory ? currentCategory.badge : "fast picks";

        target.innerHTML = [
            {
                q: "What makes " + label + " games different here?",
                a: label + " games on Traffic Games are grouped so players can jump straight into the " + topic + " style they want instead of searching through unrelated titles."
            },
            {
                q: "Which games should I try first?",
                a: "Start with the Top Picks block above, then move into Popular This Week if you want more variety in the same lane."
            },
            {
                q: "Is this category good for quick sessions?",
                a: "Yes. This collection is built around " + badge.toLowerCase() + ", so it works well for short browser sessions and easy replay."
            }
        ].map(function (item) {
            return '' +
                '<details class="faq-item">' +
                    '<summary><strong>' + escapeHtml(item.q) + '</strong><span>+</span></summary>' +
                    '<div class="faq-content"><p>' + escapeHtml(item.a) + '</p></div>' +
                '</details>';
        }).join("");
    }

    function ratingFromName(name) {
        var source = String(name || "");
        var total = 0;
        for (var index = 0; index < source.length; index += 1) {
            total += source.charCodeAt(index);
        }
        return (4.2 + (total % 8) / 10).toFixed(1);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function humanizeCategory(id) {
        return String(id || "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, function (m) {
                return m.toUpperCase();
            });
    }
})();
