import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  title = 'The Will Will Web !';

  constructor(private datasvc: DataService)
  {

  }
}
