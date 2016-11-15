 (function() {
     var overlay = document.querySelectorAll('.left-menu-overlay');
     var btn = document.querySelectorAll('.left-panel-button');
     angular.element(btn).on("click", function() {
         angular.element(this).toggleClass('active').next('.left-nav-panel').toggleClass('active');
     });

     angular.element(overlay).on("click", function() {
         angular.element(btn).removeClass('active').next('.left-nav-panel').removeClass('active');
     });

 })();