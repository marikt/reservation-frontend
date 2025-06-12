import {AfterViewInit, Component, HostListener, Inject, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {SetMeta} from '../../../../projects/notado-lib/src/lib/util/set-meta';
import {HttpService} from '../../../../projects/notado-lib/src/lib/service/http.service';
import {MetaService} from '../../service/meta.service';
import {environment} from '../../environments/environment';
import {LanguageService} from '../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Meta} from '@angular/platform-browser';
import {DOCUMENT, NgIf} from '@angular/common';
import {Snippet} from '../../util/snippet';
import {TryAndVideoButtonComponent} from './try-and-video-button/try-and-video-button.component';
import {Demo2Component} from './demo/demo2/demo2.component';
import {MenuComponent} from '../menu/menu.component';
import {BelowHomeComponent} from './below-home/below-home.component';
import {NgxBackgroundBeamsComponent} from '@omnedia/ngx-background-beams';
import {SocialProofComponent} from './social-proof/social-proof.component';
import {RouterLink} from '@angular/router';
import {MenuDiscountComponent} from '../menu-discount/menu-discount.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    TryAndVideoButtonComponent,
    TranslateModule,
    Demo2Component,
    MenuComponent,
    NgxBackgroundBeamsComponent,
    SocialProofComponent,
    NgIf,
    RouterLink,
    MenuDiscountComponent
  ],
  standalone: true
})
export class HomeComponent implements OnInit, SetMeta, AfterViewInit {

  public state: string;
  public isMobile: boolean;
  public environment: any;
  public show: boolean;
  public youtubeLoad: boolean = false;

  @ViewChild('belowHomeContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;


  constructor(
    public http: HttpService,
    public metaService: MetaService,
    public languageService: LanguageService,
    public translate: TranslateService,
    private meta: Meta,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.environment = environment;
  }

  async ngAfterViewInit() {
    // tslint:disable-next-line:no-shadowed-variable
    const { BelowHomeComponent } = await import(
      './below-home/below-home.component'
      );
    this.container.createComponent(BelowHomeComponent);
  }

  ngOnInit() {
    this.languageService.initLanguage();
    this.setMeta();
    this.state = 'home';
    this.onResize();


    setTimeout(() => {
        this.show = true;
      },
      800);

  }

  public setState(state: string): void {
    this.state = state;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.INTRO');

    if (this.languageService.language && this.languageService.language === 'cs') {
      this.meta.addTag({rel: 'canonical', href: 'https://www.notado.cz/home'});
    }

    const script = this.renderer2.createElement('script');
    script.type = Snippet.type;
    script.text = Snippet.text;
    this.renderer2.appendChild(this.document.body, script);
  }

}
