import { Component } from '@angular/core';

@Component({
  selector: 'mwl-mobile-apps',
  templateUrl: './mobile-apps.component.html'
})
export class MobileAppsComponent {
  apps: any[] = [
    {
      name: 'SocialSignIn',
      image: '/assets/img/socialsignin.png',
      description:
        'The SocialSignIn app allows you to schedule and manage posts for all your social networks ' +
        'as well as view your unified social inbox.',
      links: {
        ios: 'https://itunes.apple.com/gb/app/socialsignin/id564011085',
        android:
          'https://play.google.com/store/apps/details?id=uk.co.socialsignin'
      }
    },
    {
      name: 'MiResource',
      image: '/assets/img/miresource.png',
      description:
        'This is the official app for the Resource Event, taking place on 3-5 March 2015 at ExCel, London.',
      links: {
        ios: 'https://itunes.apple.com/us/app/id968397450',
        android:
          'https://play.google.com/store/apps/details?id=com.iwazat.miresource'
      }
    }
  ];
}
