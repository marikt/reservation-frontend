import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/intro/home.component';
import {Error404Component} from './component/error/404/error404.component';

const routes: Routes =
  [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: ':language/home',
      component: HomeComponent
    },
    {
      path: 'intro',
      loadChildren: () => import('./zzzmodules/intro.module').then(m => m.IntroModule)
    },
    {
      path: 'audience',
      loadChildren: () => import('./zzzmodules/for-audience.module').then(m => m.ForAudienceModule)
    },
    {
      path: 'wizard',
      loadChildren: () => import('./zzzmodules/wizard.module').then(m => m.WizardModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./zzzmodules/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'form',
      loadChildren: () => import('./zzzmodules/form.module').then(m => m.FormModule)
    },
    {
      path: 'reservation',
      loadChildren: () => import('./zzzmodules/reservation.module').then(m => m.ReservationModule)
    },
    {
      path: 'payment',
      loadChildren: () => import('./zzzmodules/payment.module').then(m => m.PaymentModule)
    },
    {
      path: 'blog',
      loadChildren: () => import('./zzzmodules/blog.module').then(m => m.BlogModule)
    },
    {
      path: 'faq',
      loadChildren: () => import('./zzzmodules/faq.module').then(m => m.FaqModule)
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {path: '**', component: Error404Component}

  ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: false,
      initialNavigation: 'enabledNonBlocking'
    })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
