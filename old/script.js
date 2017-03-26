(function(window, angular) {

  angular

    .module('mwl.homepage', [
      'ui.bootstrap',
      'ngAnimate',
      'ngTouch',
      'ngSanitize',
      'duScroll'
    ])

    .config(function($touchProvider) {
      $touchProvider.ngClickOverrideEnabled(true);
    })

}(window, window.angular));
