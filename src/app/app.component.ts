import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  title = 'The Will Will Web !';

  keyword = 'TEST';

  default_data:any[];
  data: any[];

	constructor(private http: Http) {
    http.get('/api/articles.json')
        .subscribe(value => {
          this.data = this.default_data = value.json();
        });
	}

  doSearch(keyword: string) {
    this.keyword = keyword;

    this.data = this.default_data.filter(value => {
      return value.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });

  }

  deleteArticle(item: any) {
    let i =this.data.indexOf(item);
    this.data.splice(i, 1);
  }

}
