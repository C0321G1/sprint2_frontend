import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';



const routes: Routes = [
  {
    path: 'statistic',
    loadChildren: () => import('./module/statistic/statistic.module').then(module => module.StatisticModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
