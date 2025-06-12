import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-autherror',
    templateUrl: './autherror.component.html',
    styleUrls: ['./autherror.component.scss'],
    standalone: true
})
export class AutherrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public refresh(): void {
        window.location.reload()
    }
}
