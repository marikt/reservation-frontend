import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../service/meta.service';
import {ReleaseNoteItemComponent} from './release-note-item/release-note-item.component';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss'],
  imports: [
    ReleaseNoteItemComponent
  ],
  standalone: true
})
export class ReleaseNotesComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService,) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('Release notes');
  }

}
