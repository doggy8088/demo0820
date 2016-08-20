import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  keyword = 'TEST';

  doSearch($event: KeyboardEvent) {
    let input = $event.target as HTMLInputElement;
    this.keyword = input.value;
  }
}
