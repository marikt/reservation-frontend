import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../service/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-set-business-for-test',
  templateUrl: './set-business-for-test.component.html',
  styleUrls: ['./set-business-for-test.component.scss'],
  imports: [],
  standalone: true
})
export class SetBusinessForTestComponent implements OnInit {

  constructor(public localStorage: LocalStorageService,
              private route: ActivatedRoute,
              public router: Router
  ) {
  }

  ngOnInit(): void {
    const businessUrl: string = this.route.snapshot.paramMap.get('business_url');
    this.localStorage.set('businessUrlForTest', businessUrl);
    let redirect: string = this.route.snapshot.paramMap.get('redirect');
    redirect = redirect.replaceAll('_', '/');
    this.router.navigate([redirect]);
  }

}
