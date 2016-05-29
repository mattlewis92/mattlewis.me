(function(window, angular) {

  angular

    .module('mwl.homepage', [
      'ui.bootstrap',
      'ngAnimate',
      'ngTouch',
      'ngSanitize',
      'duScroll'
    ])

    .constant('apiEndpoint', 'https://api.mattlewis.me')

    .constant('moment', window.moment)

    .config(function($touchProvider) {
      $touchProvider.ngClickOverrideEnabled(true);
    })

    .filter('nl2br', function() {
      return function(input) {
        if (input) {
          return input.replace(/&#10;/g, '<br>');
        }
      };
    })

    .controller('ContactFormCtrl', function($http, apiEndpoint) {

      var vm = this;

      vm.submit = function() {
        vm.loading = true;
        $http.post(apiEndpoint + '/contact', vm.form).then(function() {
          vm.submitted = true;
        }).catch(function(result) {
          vm.error = result.data;
        }).finally(function() {
          vm.loading = false;
        });
      };

    })

    .controller('TweetsCtrl', function($http, moment, apiEndpoint) {

      var vm = this;
      vm.loading = true;
      $http.get(apiEndpoint + '/social/tweets').then(function(result) {
        vm.tweets = result.data.map(function(tweet) {
          tweet.created_at = moment(tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toDate();
          return tweet;
        });
      }).catch(function(result) {
        vm.error = result.data;
      }).finally(function() {
        vm.loading = false;
      });

    });

}(window, window.angular));
