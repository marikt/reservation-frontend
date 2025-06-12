import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreventDoubleClickService {

  public clickInProgress: boolean = false;

  /**
   *
   * max 10 secs
   */
  public preventFor(seconds?: number): void {
    if (this.clickInProgress) {
      throw new Error('IGNORE - JUST PREVENTING DOUBLE CLICK');
    }
    this.clickInProgress = true;
    setTimeout(() => {
        this.clickInProgress = false;
      },
      seconds == null ? 500 : Math.min(seconds * 1000, 10_000));
  }
}
