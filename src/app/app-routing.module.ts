import { RecentComponent } from './Recent/Recent.component';
import { ProfileComponent } from './Profile/Profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { NewsItemComponent } from './NewsItem/NewsItem.component';


const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
    
    { path: 'news', component: NewsItemComponent},
    { path: 'recent', component: RecentComponent},
    { path: 'profile', component: ProfileComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
