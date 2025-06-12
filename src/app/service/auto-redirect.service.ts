import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../../projects/notado-lib/src/lib/security/service/user.service';
import {LanguageService} from '../../../projects/notado-lib/src/lib/service/language.service';

@Injectable({
    providedIn: 'root'
})
export class AutoRedirectService {


    /**
     * This service hold the logic when and in what condition user should be automatically redirected
     * to prevent access to certain pages (- note that this has nothing to do with security, its just ux reason)
     */
    constructor(
        private router: Router,
        private userService: UserService,
        public languageService: LanguageService,
    ) {
        router.events.subscribe((val) => {

            if (!(val instanceof NavigationEnd)) {
                return;
            }
            const navigationEnd = val as NavigationEnd;
            this.handleRedirectFromDashboard(navigationEnd);
        });
    }

    /**
     * Do not allow user to enter dashboars when is not login
     */
    private handleRedirectFromDashboard(navigationEnd: NavigationEnd) {
        if (this.userService.user) {
            // the user is login do nothing
            return;
        }

        if (navigationEnd.url.includes('dashboard')) {
            this.router.navigate(['/' + this.languageService.language + '/home']);
        }

    }
}
