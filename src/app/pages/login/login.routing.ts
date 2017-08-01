import { Routes, RouterModule } from '@angular/router';

import { Login } from './login.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  { path: 'estimator', loadChildren: 'app/pages/estimator/estimator.module#EstimatorModule' }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
