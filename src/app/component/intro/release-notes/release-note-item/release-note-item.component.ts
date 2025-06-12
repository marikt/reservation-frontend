import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-release-note-item',
    templateUrl: './release-note-item.component.html',
    styleUrls: ['./release-note-item.component.scss'],
    standalone: true
})
export class ReleaseNoteItemComponent implements OnInit {

  @Input('version')
  public version: string;

  @Input('label')
  public label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
