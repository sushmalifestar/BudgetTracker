import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DataService } from './services/data-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private dataService:DataService) {
  }

  async ngOnInit(){
    await this.dataService.initDatabase();
    await this.dataService.createTables();
  }
}
