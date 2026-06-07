import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermutationService } from '../service/permutation-service';

export const permutationGuard: CanActivateFn = () => {
  const permService = inject(PermutationService);
  const router = inject(Router);

  if (permService.totalCount() !== '0') {
    return true;
  }

  return router.createUrlTree(['']);
};
