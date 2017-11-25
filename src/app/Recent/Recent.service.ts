import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { NewsItem } from '../org.acme.sample';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RecentService {

	
		private NAMESPACE: string = 'NewsItem';
	



    constructor(private dataService: DataService<NewsItem>) {
    };

    public getAll(): Observable<NewsItem[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getCount(): Observable<number>{
      return this.dataService.getAll(this.NAMESPACE).count();
    }

    public getAsset(id: any): Observable<NewsItem> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<NewsItem> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<NewsItem> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<NewsItem> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
