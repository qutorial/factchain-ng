import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NewsItemService } from './NewsItem.service';
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

  
      
          newsItemId = new FormControl("", Validators.required);
        
  
      
          author = new FormControl("", Validators.required);
        
  
      
          title = new FormControl("", Validators.required);
        
  
      
          votes = new FormControl("", Validators.required);
        
  
      
          contentUrl = new FormControl("", Validators.required);
        
  
      
          contentHash = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private serviceNewsItem:NewsItemService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          newsItemId:this.newsItemId,
        
    
        
          author:this.author,
        
    
        
          title:this.title,
        
    
        
          votes:this.votes,
        
    
        
          contentUrl:this.contentUrl,
        
    
        
          contentHash:this.contentHash,
        
    
        
          timestamp:this.timestamp
        
    
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
      
        
          "newsItemId":this.newsItemId.value,
        
      
        
          "author":this.author.value,
        
      
        
          "title":this.title.value,
        
      
        
          "votes":this.votes.value,
        
      
        
          "contentUrl":this.contentUrl.value,
        
      
        
          "contentHash":this.contentHash.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "newsItemId":null,
        
      
        
          "author":null,
        
      
        
          "title":null,
        
      
        
          "votes":null,
        
      
        
          "contentUrl":null,
        
      
        
          "contentHash":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.serviceNewsItem.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "newsItemId":null,
        
      
        
          "author":null,
        
      
        
          "title":null,
        
      
        
          "votes":null,
        
      
        
          "contentUrl":null,
        
      
        
          "contentHash":null,
        
      
        
          "timestamp":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.sample.NewsItem",
      
        
          
        
    
        
          
            "author":this.author.value,
          
        
    
        
          
            "title":this.title.value,
          
        
    
        
          
            "votes":this.votes.value,
          
        
    
        
          
            "contentUrl":this.contentUrl.value,
          
        
    
        
          
            "contentHash":this.contentHash.value,
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.serviceNewsItem.updateAsset(form.get("newsItemId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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


  deleteAsset(): Promise<any> {

    return this.serviceNewsItem.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceNewsItem.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "newsItemId":null,
          
        
          
            "author":null,
          
        
          
            "title":null,
          
        
          
            "votes":null,
          
        
          
            "contentUrl":null,
          
        
          
            "contentHash":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.newsItemId){
          
            formObject.newsItemId = result.newsItemId;
          
        }else{
          formObject.newsItemId = null;
        }
      
        if(result.author){
          
            formObject.author = result.author;
          
        }else{
          formObject.author = null;
        }
      
        if(result.title){
          
            formObject.title = result.title;
          
        }else{
          formObject.title = null;
        }
      
        if(result.votes){
          
            formObject.votes = result.votes;
          
        }else{
          formObject.votes = null;
        }
      
        if(result.contentUrl){
          
            formObject.contentUrl = result.contentUrl;
          
        }else{
          formObject.contentUrl = null;
        }
      
        if(result.contentHash){
          
            formObject.contentHash = result.contentHash;
          
        }else{
          formObject.contentHash = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
        }
      

      this.myForm.setValue(formObject);

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

  resetForm(): void{
    this.myForm.setValue({
      
        
          "newsItemId":null,
        
      
        
          "author":null,
        
      
        
          "title":null,
        
      
        
          "votes":null,
        
      
        
          "contentUrl":null,
        
      
        
          "contentHash":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}
