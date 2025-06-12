import {Component, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-form-note-window',
  templateUrl: './form-note-window.component.html',
  styleUrls: ['./form-note-window.component.scss'],
  imports: [
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class FormNoteWindowComponent extends MyForm implements OnInit {

    constructor(
        public formService: FormService,
        public broadcastService: BroadcastService,
        public http: HttpService,
        public metaService: MetaForFormService,
        public languageService: LanguageService,

    ) {
      super(formService, broadcastService, http, metaService, languageService);
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public validate(): boolean {
        return true;
    }

}
