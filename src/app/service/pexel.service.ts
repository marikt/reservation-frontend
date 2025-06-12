import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PexelImgs} from '../model/pexel-imgs';
import {PexelVideos} from '../model/pexel-videos';
import {PexelVideo} from '../model/pexel-video';

@Injectable({
    providedIn: 'root'
})
export class PexelService {

    private static KEY: string = '563492ad6f9170000100000170f85f89efdc45ddb7dc651292fbd4ee';
    private static URL: string = 'https://api.pexels.com/v1/search?query=';
    private static URL_POSTFIX: string = '&per_page=100&page=1';
    private static URL_PORTRAIT: string = '&orientation=portrait';
    private static VIDEO_URL: string = 'https://api.pexels.com/videos/search?query=';
    private static VIDEO_URL_POSTFIX: string = '&per_page=20&page=1';

    constructor(private http: HttpClient) {
    }

    public getImages(searchKey: string, callback: (data?: any) => void, noOfImages?: number) {
        if (!noOfImages) {
            noOfImages = 20;
        }
        const url: string = PexelService.URL + searchKey + PexelService.URL_POSTFIX;
        const observable: Observable<any> = this.http.get(url, {
            headers: {'Authorization': PexelService.KEY},
            observe: 'response',
            responseType: 'json'
        });

        observable
            .pipe(map(
                response => {
                    const data: PexelImgs = response.body;
                    // let pexelImgs = data.photos.filter(img => img.width > img.height);
                  const pexelImgs = data.photos;
                  const pexelImgsResult = pexelImgs.splice(0, noOfImages);
                  return pexelImgsResult;
                }
            )).subscribe(
            data => {
                callback(data);
            },
            error => {
                console.error('Cant access pexel images ' + error);
                callback([]);
            }
        );
    }

    public getImagesPortrait(searchKey: string, callback: (data?: any) => void, noOfImages?: number) {
        if (!noOfImages) {
            noOfImages = 20;
        }
        const url: string = PexelService.URL + searchKey + PexelService.URL_POSTFIX + PexelService.URL_PORTRAIT;
        const observable: Observable<any> = this.http.get(url, {
            headers: {'Authorization': PexelService.KEY},
            observe: 'response',
            responseType: 'json'
        });

        observable
            .pipe(map(
                response => {
                    const data: PexelImgs = response.body;
                    // let pexelImgs = data.photos.filter(img => img.width > img.height);
                  const pexelImgs = data.photos;
                  const pexelImgsResult = pexelImgs.splice(0, noOfImages);
                  return pexelImgsResult;
                }
            )).subscribe(
            data => {
                callback(data);
            },
            error => {
                console.error('Cant access pexel images ' + error);
            }
        );
    }

    /**
     * Fetches videos from Pexels API based on search key
     * @param searchKey - The search term to find videos
     * @param callback - Callback function to handle the response
     * @param noOfVideos - Number of videos to return (default: 20)
     */
    public getVideos(searchKey: string, callback: (data?: PexelVideo[]) => void, noOfVideos?: number) {
        if (!noOfVideos) {
            noOfVideos = 20;
        }
        const url: string = PexelService.VIDEO_URL + searchKey + PexelService.VIDEO_URL_POSTFIX;
        const observable: Observable<any> = this.http.get(url, {
            headers: {'Authorization': PexelService.KEY},
            observe: 'response',
            responseType: 'json'
        });

        observable
            .pipe(map(
                response => {
                    const data: PexelVideos = response.body;
                    const pexelVideos = data.videos;
                    const pexelVideosResult = pexelVideos.splice(0, noOfVideos);
                    return pexelVideosResult;
                }
            )).subscribe(
            data => {
                callback(data);
            },
            error => {
                console.error('Cant access pexel videos ' + error);
                callback([]);
            }
        );
    }
}
