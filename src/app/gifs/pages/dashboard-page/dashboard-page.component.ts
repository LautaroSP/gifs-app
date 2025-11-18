import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { GifsSideMenu } from "../../components/gifs-side-menu/gifs-side-menu";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, GifsSideMenu],
})
export class DashboardPageComponent {}