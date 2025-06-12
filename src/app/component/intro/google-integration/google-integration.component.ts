import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {MetaService} from '../../../service/meta.service';
import {Snippet} from '../../../util/snippet';
import {DOCUMENT} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-google-integration',
  templateUrl: './google-integration.component.html',
  styleUrls: ['./google-integration.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class GoogleIntegrationComponent implements OnInit {

  constructor(public metaService: MetaService,
              public renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.setMeta();
    window.scroll(0, 0);
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.GOOGLE_INTEGRATION');

    const script = this.renderer2.createElement('script');
    script.type = Snippet.type;
    script.text = Snippet.text;
    this.renderer2.appendChild(this.document.body, script);
  }

}
