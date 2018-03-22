//= require ../lib/_jquery
//= require ../lib/_imagesloaded.min
(function () {
    'use strict';

    var loaded = false;

    var debounce = function (func, waitTime) {
        var timeout = false;
        return function () {
            if (timeout === false) {
                setTimeout(function () {
                    func();
                    timeout = false;
                }, waitTime);
                timeout = true;
            }
        };
    };

    function loadToc($toc, tocLinkSelector, tocListSelector, scrollOffset) {
        var headerHeights = {};
        var pageHeight = 0;
        var windowHeight = 0;
        var originalTitle = document.title;

        var recacheHeights = function () {
            headerHeights = {};
            pageHeight = $(document).height();
            windowHeight = $(window).height();

            $toc.find(tocLinkSelector).each(function () {
                var targetId = $(this).attr('href');
                if (targetId[0] === "#") {
                    headerHeights[targetId] = $(targetId).offset().top;
                }
            });
        };

        var refreshToc = function () {
            var currentTop = $(document).scrollTop() + scrollOffset;

            if (currentTop + windowHeight >= pageHeight) {
                // at bottom of page, so just select last header by making currentTop very large
                // this fixes the problem where the last header won't ever show as active if its content
                // is shorter than the window height
                currentTop = pageHeight + 1000;
            }

            var best = null;
            for (var name in headerHeights) {
                if ((headerHeights[name] < currentTop && headerHeights[name] > headerHeights[best]) || best === null) {
                    best = name;
                }
            }

            // Catch the initial load case
            if (currentTop == scrollOffset && !loaded) {
                best = window.location.hash;
                loaded = true;
            }

            var $best = $toc.find("[href='" + best + "']").first();
            if (!$best.hasClass("active")) {
                // .active is applied to the ToC link we're currently on, and its parent <ul>s selected by tocListSelector
                // .active-expanded is applied to the ToC links that are parents of this one
                $toc.find(".active").removeClass("active");
                $toc.find(".active-parent").removeClass("active-parent");
                $best.addClass("active");
                $best.parents(tocListSelector).addClass("active");
                $best.siblings(tocListSelector).addClass("active");
                $toc.find(tocListSelector).filter(":not(.active)").slideUp(150);
                $toc.find(tocListSelector).filter(".active").slideDown(150);
                // TODO remove classnames
                if ($best.data("title") == undefined) document.title = originalTitle;
                else document.title = $best.data("title") + " – " + originalTitle;
            }

        };

        var makeToc = function () {
            recacheHeights();
            refreshToc();

            // return hom when click on logo
            $("#btn-logo").click(function (event) {
                event.preventDefault();

                var target = window.location.href.split("/")[5];

                if (target == undefined) window.location.href = "https://docs.opendatasoft.com/en/using_api/index.html";
                else window.location.href = "/" + target;

            });

            /*
             *
             *  Function Menu / Helphub
             * 
             */

            var btnMenu = "#nav-button",
                btnHelphub = "#helphub-button",
                btnClassActiv = "ods-header__menu-toggle--active",
                menuElement = ".toc-wrapper",
                helphubElement = ".ods-header__nav",
                menuClassActiv = "open",
                helphubClassActiv = "ods-header__nav--active";

            function openElement(btnElement, sidebarElement, sidebarClassActiv) {
                $(btnElement).addClass(btnClassActiv);
                $(sidebarElement).addClass(sidebarClassActiv);
            }

            function closeElement(btnElement, sidebarElement, sidebarClassActiv) {
                $(btnElement).removeClass(btnClassActiv);
                $(sidebarElement).removeClass(sidebarClassActiv);
            }

            function resetStateElement() {
                closeElement(btnMenu, menuElement, menuClassActiv);
                closeElement(btnHelphub, helphubElement, helphubClassActiv);
            }

            function toggle(btnElement, sidebarElement, sidebarClass) {

                var open = $(btnElement).hasClass(btnClassActiv);

                resetStateElement();

                if (open) closeElement(btnElement, sidebarElement, sidebarClass);
                else openElement(btnElement, sidebarElement, sidebarClass);

            }

            $(btnMenu).click(function () {
                toggle(btnMenu, menuElement, menuClassActiv);
            });

            $(btnHelphub).click(function () {
                toggle(btnHelphub, helphubElement, helphubClassActiv);
            });

            //- Click on link or body
            $(".page-wrapper").click(function () { resetStateElement() });
            $(".toc-item").click(function () { resetStateElement() });
            $(".toc-link").click(function () { resetStateElement() });

            // scroll content below ods_header 
            $('a[href*="#"]').on('click', function (event) {
                event.preventDefault();
                var hash = $(this).attr('href');
                var target = $(hash).offset().top;
                $('html, body').animate({ scrollTop: target - 99 }, 0);
            });

            // reload immediately after scrolling on toc click
            $toc.find(tocLinkSelector).click(function () {
                setTimeout(function () {
                    refreshToc();
                }, 0);
            });

            $(window).scroll(debounce(refreshToc, 200));
            $(window).resize(debounce(recacheHeights, 200));
        };

        makeToc();

        window.recacheHeights = recacheHeights;
        window.refreshToc = refreshToc;
    }

    window.loadToc = loadToc;

})();