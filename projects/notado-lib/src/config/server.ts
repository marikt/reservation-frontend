import {Env} from '../lib/enum/env';
import {Injectable} from '@angular/core';

@Injectable()
export class Server {
  public environment: Env = Env.DEV;
  public SERVER: string = 'http://localhost:8080/';

}
