import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NewsItemService } from './NewsItem.service';
import { DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-NewsItem',
	templateUrl: './NewsItem.component.html',
	styleUrls: ['./NewsItem.component.css'],
  providers: [NewsItemService]
})
export class NewsItemComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private nextId: number;

  
      
          title = new FormControl("", Validators.required);

          contentUrl = new FormControl("", Validators.required);
        
  
      
          contentHash = new FormControl("", Validators.required);
        

        
  


  constructor(private serviceNewsItem:NewsItemService, fb: FormBuilder) {
    this.nextId = 1;
    this.myForm = fb.group({
    
        
          title:this.title,
    
        
          contentUrl:this.contentUrl,
        
    
        
          contentHash:this.contentHash,
        

        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceNewsItem.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
        this.nextId += 1;
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.sample.NewsItem",
      
        
          "newsItemId": this.nextId,
        
      
        
          "author": "resource:org.acme.sample.NewsAgency#1",
        
      
        
          "title":this.title.value,
        
      
        
          "votes": 0,
        
      
        
          "contentUrl": this.contentUrl.value,
        
      
        
          "contentHash": this.contentHash.value,
        
      
        
          "timestamp": "2017-11-25T15:39:02.283Z"
        
      
    };

    this.myForm.setValue({
      
        
          "title":null,
        
      
        
          "contentUrl":null,
        
      
        
          "contentHash":null
        
      
    });

    return this.serviceNewsItem.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
      
          "title":null,
        
      
        
      
        
          "contentUrl":null,
        
      
        
          "contentHash":null,
        
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }



  resetForm(): void{
    this.myForm.setValue({
      
        
          "title":null,
        
      
        
          "contentUrl":null,
        
      
        
          "contentHash":null,
        
      
      });
  }

}
