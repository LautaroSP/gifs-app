import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifServices } from '../../services/gifs.services';
import { GifList } from '../../components/gif-list/gif-list';

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html'
})
export class GifHistory 
{

  gifsService = inject(GifServices);
  query = toSignal(
  inject(ActivatedRoute).params.pipe(
    map((params) => params['query'])
  ));
  gifsByKey = computed(() => {
    return this.gifsService.getHistoryGifs(this.query());
  })
}

