import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { API_ENDPOINT } from './constants';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { OpenSourceComponent } from './open-source/open-source.component';
import { MobileAppsComponent } from './mobile-apps/mobile-apps.component';
import { ContactComponent } from './contact/contact.component';
import { TweetsComponent } from './tweets/tweets.component';
import { LinkifyPipe } from './tweets/linkify.pipe';
import { FooterComponent } from './footer/footer.component';
import { TrustAsResourceUrlPipe } from './open-source/trust-as-resource-url.pipe';
import { ScrollSpyDirective } from './navbar/scroll-spy.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    OpenSourceComponent,
    MobileAppsComponent,
    ContactComponent,
    TweetsComponent,
    LinkifyPipe,
    FooterComponent,
    TrustAsResourceUrlPipe,
    ScrollSpyDirective
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'mwl-homepage'
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    FormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    NgxPageScrollModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: 'https://api.mattlewis.me'}
  ]
})
export class AppModule { }
