import {Injectable} from '@angular/core';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {ResponseType} from '../../../projects/notado-lib/src/lib/enum/response-type.enum';


/**
 * its actually used deepl not google translate
 */
@Injectable({
  providedIn: 'root'
})
export class GoogleTranslateService {

  constructor(
    private http: HttpService
  ) {
  }

  public translate(wordToTranslate: string, srcLanguage: string, callback?: (data: any) => void): void {

    this.http.get(Api.TRANSLATOR + '/' + srcLanguage + '/' + wordToTranslate,
      (translationResult: string) => {
        return callback(translationResult);
      },
      (error) => {
        console.log(error)
        return callback(wordToTranslate);
      },
      ResponseType.TEXT);
  }

}
