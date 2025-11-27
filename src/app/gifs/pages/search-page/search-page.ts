import { Component, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifServices } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {


  gifService = inject(GifServices);
  gifs = signal<Gif[]>([]);

  onSearch(query: string){
    console.log({query});
    this.gifService.searchGifs(query)
    .subscribe((resp) => this.gifs.set(resp));
  }
}
