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
        $http.post(apiEndpoint + '/contact', vm.form).success(function() {
          vm.submitted = true;
        }).error(function(error) {
          vm.error = error;
        }).finally(function() {
          vm.loading = false;
        });
      };

    })

    .controller('TweetsCtrl', function($http, moment, apiEndpoint) {
      var vm = this;
      $http.get(apiEndpoint + '/social/tweets').success(function(tweets) {
        vm.tweets = tweets.map(function(tweet) {
          tweet.created_at = moment(tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toDate();
          return tweet;
        });
      });
    });

}(window, window.angular));
