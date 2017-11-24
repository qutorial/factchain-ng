import { VoteTransaction, NewsItem, NewsAgency } from './../org.acme.sample';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class VoteService {

	
		private NAMESPACE: string = 'VoteTransaction';
	



    constructor(private dataService: DataService<VoteTransaction>) {
    };


    public voteUp(id: any): Observable<VoteTransaction> {
      return this.vote(id, 1);
    }

    public voteDown(id: any): Observable<VoteTransaction> {
      return this.vote(id, -1);
    }

    public vote(id: any, score: number): Observable<VoteTransaction> {
     

      var itemToAdd : VoteTransaction = new VoteTransaction();
      
      var newsItem : NewsItem = new NewsItem();
      newsItem.newsItemId = id;

      var agency :NewsAgency = new NewsAgency();
      agency.agencyId = "1";
      
      itemToAdd.newsItem = newsItem;
      itemToAdd.origin = agency;
      itemToAdd.score = score;
      itemToAdd.timestamp = new Date();

      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    


}
