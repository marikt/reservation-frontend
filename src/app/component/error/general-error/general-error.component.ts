import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-general-error',
    templateUrl: './general-error.component.html',
    styleUrls: ['./general-error.component.scss'],
    standalone: true
})
export class GeneralErrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public refresh(): void {
        window.location.reload()
    }
}
