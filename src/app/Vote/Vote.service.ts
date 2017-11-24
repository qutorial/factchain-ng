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
     
      var asset = 
      {
        "$class": "org.acme.sample.VoteTransaction",
        "newsItem": "resource:org.acme.sample.NewsItem#" + id,
        "origin": "resource:org.acme.sample.NewsAgency#1",
        "score": score,
        "timestamp": new Date()
      }

      return this.addAsset(asset);
    }

    public addAsset(itemToAdd: any): Observable<VoteTransaction> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }


}
