import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import { TooltipModule } from 'ngx-tooltip';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

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
    FormsModule,
    HttpModule,
    NgbCollapseModule.forRoot(),
    TooltipModule,
    Ng2PageScrollModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: 'https://api.mattlewis.me'}
  ]
})
export class AppModule { }
