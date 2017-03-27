import { NgModule, enableProdMode } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';

enableProdMode();

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppServerModule {}
