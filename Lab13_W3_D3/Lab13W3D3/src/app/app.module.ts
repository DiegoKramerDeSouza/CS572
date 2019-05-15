import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IsVisible } from './custom.directive';
import { MakeBigger } from './custom2.directive';
import { MultiPipe } from './multi.pipe';
import { SmartComponent } from './smart/smart.component';
import { DumbComponent } from './dumb/dumb.component';

@NgModule({
  declarations: [
    AppComponent,
    IsVisible,
    MakeBigger,
	MultiPipe,
	SmartComponent,
	DumbComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
