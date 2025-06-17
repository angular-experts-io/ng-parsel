import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeatureComponent } from './feature/feature.component';

@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent],
  imports: [BrowserModule, FeatureComponent],
  providers: [SomeService, { provide: 'test', useValue: 'test' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
