import { RecentComponent } from './Recent/Recent.component';
import { VoteService } from './Vote/Vote.service';
import { VoteComponent } from './Vote/Vote.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { NewsItemComponent } from './NewsItem/NewsItem.component';
import { ProfileComponent } from './Profile/Profile.component';
import { RecentService } from 'app/Recent/Recent.service';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    
    NewsItemComponent,
    ProfileComponent,
    VoteComponent,
    RecentComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService,
    VoteService,
    RecentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
