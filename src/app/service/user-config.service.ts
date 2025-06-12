import {Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {FeatureConfig} from '../../../projects/notado-lib/src/lib/util/feature-config';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService extends MySubscribable {
  public features: FeatureConfig;
  constructor(
    public http: HttpService,
    public broadcastService: BroadcastService
  ) {
    super(broadcastService);
    this.subscribe(Event.USER_LOADED, (user) => {
      this.http.get(Api.USER_CONFIG + '/features/' + user.id, (features: FeatureConfig) => {
        this.features = features;
      });
    });
  }
}
