import {Injectable} from '@angular/core';
import {CONST} from './const';
import {LocalStorageService} from '../service/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class HttpUtil {
  private burl: string;
  private bid: string;
  private domain: string;
  private traceId: string;

  constructor(private localStorage: LocalStorageService) {
  }

  public postHeader(): any {

    if (this.getDomain()) {
      return {
        'Content-Type': 'application/json',
        'Bus-Domain': this.getDomain(),
        'X-Trace-Id': this.getTraceId()
      };
    }

    if (this.getBusinessId() && this.getBusinessUrl()) {
      return {
        'Content-Type': 'application/json',
        'Bus-Id': this.getBusinessId() + '',
        'Bus-Url': this.getBusinessUrl(),
        'X-Trace-Id': this.getTraceId()
      };
    }

    return {'Content-Type': 'application/json'};
  }

  public getHeader(): any {
    if (this.getDomain()) {
      return {
        'Bus-Domain': this.getDomain(),
        'X-Trace-Id': this.getTraceId()
      };
    }

    if (this.getBusinessId() && this.getBusinessUrl()) {
      return {
        'Bus-Id': this.getBusinessId() + '',
        'Bus-Url': this.getBusinessUrl(),
        'X-Trace-Id': this.getTraceId()
      };
    }

    return {};
  }

  private getDomain() {
    if (!this.domain) {
      this.domain = this.localStorage.get(CONST.DOMAIN);
    }
    if (this.domain) {
      this.domain.replace('.notado.cz', '');
      this.domain.replace('.test-notado.eu', '');
    }
    return this.domain;
  }

  private getBusinessUrl() {
    if (!this.burl) {
      this.burl = this.localStorage.get(CONST.BUSINESS_URL);
    }
    return this.burl;
  }

  private getBusinessId() {
    if (!this.bid) {
      this.bid = this.localStorage.get(CONST.BUSINESS_ID);
    }
    return this.bid;
  }

  private getTraceId(): string {
    if (!this.traceId) {
      this.traceId = this.localStorage.get(CONST.TRACE_ID);
    }
    if (!this.traceId) {
      this.traceId = 'trcId-' + Math.floor(Math.random() * 1_000_000_000);
      this.localStorage.set(CONST.TRACE_ID, this.traceId);
    }
    if (this.getDomain()) {
      return this.getDomain() + '-' + this.traceId;
    }

    if (this.getBusinessId()) {
      return this.getBusinessId() + '-' + this.traceId;
    }
    return 'non-' + this.traceId;
  }

}
