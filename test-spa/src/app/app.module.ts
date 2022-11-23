import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SomeService,
    {provide: 'test', useValue: 'test' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
