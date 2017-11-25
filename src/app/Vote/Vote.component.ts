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
export class VoteComponent  implements OnInit  {
    @Input() newsItem: NewsItem;

    private voted;
    private error;

    ngOnInit(): void {
        
        if ( this.newsItem.author + "" === "resource:org.acme.sample.NewsAgency#1" ) {
            this.voted = true;
        };
    }


    constructor(private voteService:VoteService){
        this.voted = false;
        this.error = false;
        if ( this.newsItem && this.newsItem.author.name === "Bloomberg" ) {
            this.voted = true;
        };
    }

    voteUp(){
      this.voteService.voteUp(this.newsItem.newsItemId).toPromise()
      .then(() => {
        this.newsItem.votes += 1;
        this.voted = true;
      }).catch((error) => {
        if(error == 'Server error'){
            console.log("Could not connect to REST server. Please check your configuration details");
        }
        else{
            this.voted = true;
            this.error = true;
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
        this.voted = true;
      }).catch((error) => {
        if(error == 'Server error'){
            console.log("Could not connect to REST server. Please check your configuration details");
        }
        else{
            this.voted = true;
            this.error = true;
            console.log("Error when voting", error);
        }
    });
    }
  
}