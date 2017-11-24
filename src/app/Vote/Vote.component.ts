import { VoteService } from './Vote.service';
import { NewsItemService } from './../NewsItem/NewsItem.service';
import { NewsItem } from './../org.acme.sample';
import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Vote',
	templateUrl: './Vote.component.html',
	styleUrls: ['./Vote.component.css'],
  providers: []
})
export class VoteComponent {
    @Input() newsItem: NewsItem;

    private voted;

    constructor(private voteService:VoteService){
        this.voted = false;
    }

    voteUp(){
      this.voteService.voteUp(this.newsItem.newsItemId).toPromise()
      .then(() => {
        this.newsItem.votes += 1;
      }).catch((error) => {
        if(error == 'Server error'){
            console.log("Could not connect to REST server. Please check your configuration details");
        }
        else{
            console.log("error when voting", error);
        }
    });
    }

    voteDown(){
      if (this.newsItem.voters[0] +"" === "resource:org.acme.sample.NewsItem#1") {
       console.log("Already voted");
      }
      this.voteService.voteDown(this.newsItem.newsItemId).toPromise()
      .then(() => {
        this.newsItem.votes += -1;
      }).catch((error) => {
        if(error == 'Server error'){
            console.log("Could not connect to REST server. Please check your configuration details");
        }
        else{
            console.log("Error when voting", error);
        }
    });
    }
  
}