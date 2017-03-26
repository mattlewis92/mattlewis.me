import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip.module';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbCollapseModule.forRoot(),
    NgbTooltipModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: 'https://api.mattlewis.me'}
  ]
})
export class AppModule { }
