import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VideosComponent } from './videos/videos.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    VideoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
