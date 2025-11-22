import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifServices } from '../../services/gifs.services';


@Component({
  selector: 'app-trending-page',
  imports: [GifList],
  templateUrl: './trending-page.html',
  styleUrl: './trending-page.css',
})
export class TrendingPage {
  gifService = inject(GifServices);
  
}
