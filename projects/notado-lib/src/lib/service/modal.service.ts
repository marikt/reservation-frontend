import {inject, Injectable} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalWindow: NgbModalRef;
  constructor(
    private modalService: NgbModal
  ) {
  }

  public open(content: any, options?: NgbModalOptions): NgbModalRef {
    this.close();
    this.modalWindow = this.modalService.open(content, options);
    return this.modalWindow;
  }

  public close(): void {
    if (this.modalWindow) {
      this.modalWindow.close();
    }
  }

}
