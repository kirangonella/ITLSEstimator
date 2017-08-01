import { Routes, RouterModule } from '@angular/router';

import { EstimatorComponent } from './estimator.component';

const routes: Routes = [
    {
        path: '',
        component: EstimatorComponent
    }
];

export const routing = RouterModule.forChild(routes);
