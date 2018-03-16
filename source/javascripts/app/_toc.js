//= require ../lib/_jquery
//= require ../lib/_imagesloaded.min
; (function () {
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

  var closeToc = function () {
    $(".toc-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  var closeHelpHub = function () {
    $("#help-hub-button").removeClass('ods__documentation-help-hub-btn-active');
    $(".ods__documentation-help-hub-sidebar").removeClass('ods__documentation-help-hub-sidebar-active');
  }

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

      // sidebar menu
      $("#nav-button").click(function () {
        if ($("#helphub-button").has(".ods-helphub__btn--active")) {
          closeHelpHub();
          $(".toc-wrapper").toggleClass('open');
          $("#nav-button").toggleClass('open');
        } else {
          $(".toc-wrapper").toggleClass('open');
          $("#nav-button").toggleClass('open');
        }
        return false;
      });

      // sidebar help hub
      $("#helphub-button").click(function () {
        if ($("#nav-button").has(".open")) {
          closeToc();
          $("#helphub-button").toggleClass('ods-helphub__btn--active');
          $(".ods-helphub").toggleClass('ods-helphub--active');
        } else {
          $("#helphub-button").toggleClass('ods-helphub-btn-active');
          $(".ods-helphub").toggleClass('ods-helphub--active');
        }
        return false;
      });

      $(".page-wrapper").click(function () { closeToc(), closeHelpHub() });
      $(".toc-item").click(function () { closeToc(), closeHelpHub() });

      $(".page-wrapper").click(closeToc);
      $(".toc-link").click(closeToc);

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