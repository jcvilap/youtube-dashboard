import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FavoritesComponent} from '../favorites/favorites.component';
import {VideoDetailComponent} from '../video-detail/video-detail.component';
import {AppRoutingModule} from '../../routes/app-routing.module';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {VideoSearchComponent} from '../video-search/video-search.component';
import {VideoService} from '../../services/video.service';
import {SanitizeHtmlPipe} from '../../pipes/sanitize-html.pipe';
import {TimeFromNowPipe} from '../../pipes/time-from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    VideoDetailComponent,
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
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
