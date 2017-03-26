import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
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
  ]
})
export class AppModule { }
