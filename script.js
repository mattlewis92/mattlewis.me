angular
  .module('mwl.homepage', ['ui.bootstrap', 'ngAnimate', 'duScroll'])
  .controller('HomepageCtrl', function () {
    var vm = this;
    vm.currentDate = new Date();
  });
