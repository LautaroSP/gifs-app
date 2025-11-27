import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment.development";
import type { GiphyResponse } from "../interfaces/gifhy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, tap } from "rxjs";

const loadFromLocalStorage = () => {
    const gifsfromLS = localStorage.getItem('gifSearchHistory') ?? '[]';
    const gifs = JSON.parse(gifsfromLS);
    return gifs
}

@Injectable({
  providedIn: 'root'
})
export class GifServices 
{
    private http = inject(HttpClient);
    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

constructor() {
    this.loadTrendingGifs();
}


    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem('gifSearchHistory', historyString);
    });
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

    searchGifs(query: string)
    {
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params: {
                api_key: environment.apiKey,
                q: query,
                limit: 25,
                offset: 0,
                rating: 'g',
                bundle: 'messaging_non_clips'
            }
        }).pipe(
            map(({data}) => data),
            map((item) => GifMapper.mapGiphyItemsToGifArray(item)),
            tap( items => {
                this.searchHistory.update( history => ({
                    ...history,
                    [query.toLowerCase()] : items,
                }))
            })
        );
    }

    getHistoryGifs(query:string): Gif[]{
        return this.searchHistory()[query.toLowerCase()] ?? [];
    }
}