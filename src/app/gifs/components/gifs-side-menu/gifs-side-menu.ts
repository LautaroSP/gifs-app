import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideMenuHeader } from '../side-menu-header/side-menu-header';
import { SideMenuOptions } from '../side-menu-options/side-menu-options';



@Component({
  selector: 'gifs-side-menu',
  standalone: true,
  imports: [SideMenuHeader, SideMenuOptions],
  templateUrl: `./gifs-side-menu.html`,
})
export class GifsSideMenu 
{ 

}
