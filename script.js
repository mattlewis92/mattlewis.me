angular
  .module('mwl.homepage', ['ui.bootstrap', 'ngAnimate', 'ngTouch', 'duScroll'])
  .controller('HomepageCtrl', function () {
    var vm = this;
    vm.currentDate = new Date();
  });
