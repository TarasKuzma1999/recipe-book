import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeFeature = 'recipe'
  title = 'project';

  loadedFeature(feature: string){
    this.activeFeature = feature
  }
}

