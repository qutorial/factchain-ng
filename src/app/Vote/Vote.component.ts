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
      this.voted = true;
      this.newsItem.votes += 1;
      this.voteService.voteUp(this.newsItem.newsItemId);
    }

    voteDown(){
      this.voted = true;
      this.newsItem.votes += -1;
      this.voteService.voteDown(this.newsItem.newsItemId);
    }




   
}