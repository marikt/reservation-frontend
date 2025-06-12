import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {AlertService} from '../../../projects/notado-lib/src/lib/service/alert.service';
import {StringUtil} from '../../../projects/notado-lib/src/lib/util/string-util';
import {Error} from '../../../projects/notado-lib/src/lib/util/error';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';
import {FileItem, FileUploader} from 'ng2-file-upload';

export class Uploader extends MySubscribable {

  public uploader: FileUploader;
  public uploadFinish: boolean;
  public cleanUrl: string;
  public uploadUrl: string;
  public eventOnComplete: Event;
  private onUploadCallback?: (imgUrl: string) => void;

  // ================================================
  public files: NgxFileDropEntry[] = [];

  constructor(
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService
  ) {
    super(broadcastService);
  }

  public initUploaderForCroper(onUploadCallback: (imgUrl: string) => void, imgMaxWidth: number) {
    this.onUploadCallback = onUploadCallback;
    this.uploadFinish = false;
    this.uploader = new FileUploader({url: this.uploadUrl});

    this.uploader.onCompleteAll = () => {
      this.uploadFinish = true;
    };

    this.uploader.onAfterAddingAll = (items) => {
      this.fileToBase64(items[0]._file, (imgUrl) => {
        this.compressImage(imgUrl, imgMaxWidth).then(compressed => {
          // @ts-ignore
          onUploadCallback(compressed);
        });
      });
    };

    this.uploader.onErrorItem = (file, response, status) => {
      response = StringUtil.removeInnerQuotation(response);
      if (response === Error.UNSUPPORTER_EXTENSION) {
        this.alertService.addError('Dokument nemohl být nahrán');
      }
    };
  }

  public initUploader(uploadUrl: string, eventOnComplete: Event, onUploadCallback?: (uploadedFiles: FileItem[]) => void) {
    this.uploadUrl = uploadUrl + '/file';
    this.cleanUrl = this.uploadUrl;
    this.uploadFinish = false;
    this.eventOnComplete = eventOnComplete;
    this.uploader = new FileUploader({url: this.uploadUrl});
    this.uploader.onCompleteAll = () => {
      this.uploadFinish = true;
      this.fire(this.eventOnComplete);
    };

    this.uploader.onAfterAddingAll = (items) => {
      if (onUploadCallback) {
        onUploadCallback(items);
      }
      this.uploader.uploadAll();
    };

    this.uploader.onErrorItem = (file, response, status) => {
      response = StringUtil.removeInnerQuotation(response);
      if (response === Error.UNSUPPORTER_EXTENSION) {
        this.alertService.addError('Dokument nemohl být nahrán');
      }
    };
  }

  public cleanUpload(): void {
    this.uploader.clearQueue();
    this.http.delete(this.cleanUrl);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          if (this.uploadUrl) {
            this.http.postFile(this.uploadUrl, file, (path) => {
              this.fire(this.eventOnComplete);
            });
          }

          if (this.onUploadCallback) {
            this.fileToBase64(file, (imgUrl) => {
              this.onUploadCallback(imgUrl);
            });
          }
        });
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  private fileToBase64(file, callback: (imgUrl: any) => void) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  private compressImage(src: string, newX: number) {
    return new Promise((res, rej) => {
        // tslint:disable-next-line:prefer-const
      let img = new Image();
      img.onload = () => {
        const newY = img.height * (newX / img.width);
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      };
      img.src = src;

      img.onerror = error => rej(error);
    })
  }


}
