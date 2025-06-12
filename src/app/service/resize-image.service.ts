import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResizeImageService {

    private imgUrl: string;
    public state: CropState;
    public cropedImgBase64: string;
    public onCropCallback: (img?: any) => void;

    constructor() {
        this.reset();
    }

    public setImgUrl(url: string): void {
        // url = url.replace('https', 'http');
        this.imgUrl = url;
    }

    public getImgUrl(): string {
        return this.imgUrl;
    }

    public reset() {
        this.state = CropState.WAITING_TO_IMG_SELECT;
        this.cropedImgBase64 = null;
    }

    public onCrop(imgUrl: any) {
        this.cropedImgBase64 = imgUrl;
        this.state = CropState.CROPED;
        fetch(imgUrl)
            .then(res => res.blob())
            .then(blob => {
                this.onCropCallback(blob);
            });
    }

}


export enum CropState {
    WAITING_TO_IMG_SELECT = 'WAITING_TO_IMG_SELECT',
    IMG_SELECTED = 'IMG_SELECTED',
    CROPED = 'CROPED'
}
