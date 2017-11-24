import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for factchain', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be factchain', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('factchain');
    })
  });

  it('navbar-brand should be factchain@0.1.11',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('factchain@0.1.11');
  });

  
    it('NewsItem component should be loadable',() => {
      page.navigateTo('/NewsItem');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('NewsItem');
    });

    it('NewsItem table should have 8 columns',() => {
      page.navigateTo('/NewsItem');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });

  

});
