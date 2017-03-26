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

      var $ctrl = this;

      $ctrl.submit = function() {
        $ctrl.loading = true;
        $http.post(apiEndpoint + '/contact', $ctrl.form).then(function() {
          $ctrl.submitted = true;
        }).catch(function(result) {
          $ctrl.error = result.data;
        }).finally(function() {
          $ctrl.loading = false;
        });
      };

    })

    .controller('TweetsCtrl', function($http, moment, apiEndpoint) {

      var $ctrl = this;
      $ctrl.loading = true;
      $http.get(apiEndpoint + '/social/tweets').then(function(result) {
        $ctrl.tweets = result.data.map(function(tweet) {
          tweet.created_at = moment(tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toDate();
          return tweet;
        });
      }).catch(function(result) {
        $ctrl.error = result.data;
      }).finally(function() {
        $ctrl.loading = false;
      });

    });

}(window, window.angular));
