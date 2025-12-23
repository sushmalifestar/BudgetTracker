import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton,IonContent, IonLabel , IonHeader} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { AppHeaderComponent } from '../components/app-header/app-header.component';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone:true,
  imports: [IonTabs, IonTabBar,IonHeader,IonContent, IonTabButton, IonLabel,AppHeaderComponent],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square });
  }
}
