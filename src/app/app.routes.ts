import { Routes } from '@angular/router';
import { permutationGuard } from './main/guards/permutation-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./main/components/input/input').then(m => m.InputComponent) },
  { path: 'navigate', loadComponent: () => import('./main/components/navigator/navigator').then(m => m.NavigatorComponent), canActivate: [permutationGuard] },
  { path: 'results', loadComponent: () => import('./main/components/all-permutations/all-permutations').then(m => m.AllPermutationsComponent), canActivate: [permutationGuard] },
];
