import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {InMemoryDataService} from './in-memory-data.service';
import {AppComponent} from './app.component';
import {VideosComponent} from './videos/videos.component';
import {VideoDetailComponent} from './video-detail/video-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VideoSearchComponent} from './video-search/video-search.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    VideoDetailComponent,
    MessagesComponent,
    DashboardComponent,
    VideoSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false} as any
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
