import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LyTheme2} from '@alyle/ui';
import {ResizeImageService} from '../../service/resize-image.service';
import {
  ImgCropperConfig,
  ImgCropperErrorEvent,
  ImgCropperEvent,
  ImgResolution,
  LyImageCropper, LyImageCropperModule
} from '@alyle/ui/image-cropper';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LySliderModule} from '@alyle/ui/slider';

@Component({
  selector: 'app-image-resize',
  templateUrl: './image-resize.component.html',
  styleUrls: ['./image-resize.component.scss'],
  imports: [
    LyImageCropperModule,
    NgIf,
    FormsModule,
    LySliderModule
  ],
  standalone: true
})
export class ImageResizeComponent implements OnInit {

  @ViewChild(LyImageCropper, {static: true})
  public imgCropper: LyImageCropper;

  @Input('width')
  public width: number = 250;

  @Input('height')
  public height: number = 150;

  public myConfig: ImgCropperConfig;

  constructor(
    private theme: LyTheme2,
    private resizeImageService: ResizeImageService
  ) {
  }

  ngOnInit() {
    this.myConfig = {
      width: this.width,
      height: this.height,
      fill: '#fff',
      output: ImgResolution.OriginalImage,
      autoCrop: false,
      responsiveArea: true
    };
    const config = {
      scale: 0.745864772531767
    };
    const imgUrl = this.resizeImageService.getImgUrl();

    // Handle image URL
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      this.imgCropper.loadImage(imgUrl, () => {
        this.imgCropper.setScale(config.scale, true);
      });
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error);
    };

  }

  public onCropped(e: ImgCropperEvent) {
    this.resizeImageService.onCrop(e.dataURL)
  }

  public saveCropped(): void {
    this.imgCropper.crop();
  }

  public onError(e: ImgCropperErrorEvent) {
    console.warn('ImgCropperErrorEvent: ' + e);
  }
}
