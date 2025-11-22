import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment.development";
import type { GiphyResponse } from "../interfaces/gifhy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";

@Injectable({
  providedIn: 'root'
})
export class GifServices 
{
    private http = inject(HttpClient);
    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

constructor() {
    this.loadTrendingGifs();
}

    loadTrendingGifs()
    {
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
            params: {
                api_key: environment.apiKey,
                limit: 25,
                offset: 0,
                rating: 'g',
                bundle: 'messaging_non_clips'
            }
        }).subscribe((resp)=>{
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
        });
    }
}