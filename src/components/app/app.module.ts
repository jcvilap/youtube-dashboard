import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {VideosComponent} from '../videos/videos.component';
import {VideoDetailComponent} from '../video-detail/video-detail.component';
import {MessagesComponent} from '../messages/messages.component';
import {AppRoutingModule} from '../../routes/app-routing.module';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {VideoSearchComponent} from '../video-search/video-search.component';
import {VideoService} from '../../services/video.service';
import {MessageService} from '../messages/message.service';
import {SanitizeHtmlPipe} from '../../pipes/sanitize-html.pipe';
import {TimeFromNowPipe} from '../../pipes/time-from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    VideoDetailComponent,
    MessagesComponent,
    DashboardComponent,
    VideoSearchComponent,
    SanitizeHtmlPipe,
    TimeFromNowPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [VideoService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
