import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.css']
})
export class ArticleComponent implements OnInit, OnChanges {

  @Input()
  item: any;

  @Input()
  i: number;


  constructor(private datasvc: DataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.datasvc.keyword);
  }
}
