import {UserService} from '../service/user.service';
import {Router} from '@angular/router';


export class AdminCheck {

    constructor(
        public router: Router,
        public userService: UserService
    ) {

    }


    /**
     * Call that method as first in ngOnInit() !!
     */
    public checkAdmin() {
        if (this.userService.user && this.userService.user.role === 'ADMIN') {
        } else {
            this.router.navigate(['/dashboard/dashboard-button']);
        }
    }

}
