import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip.module';
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
import { API_ENDPOINT as apiEndpointValue } from '../shared/constants';

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
    HttpClientModule,
    NgbCollapseModule.forRoot(),
    NgbTooltipModule.forRoot(),
    Ng2PageScrollModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: apiEndpointValue}
  ]
})
export class AppModule { }
