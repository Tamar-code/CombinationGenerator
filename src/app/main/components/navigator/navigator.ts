import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PermutationService } from '../../service/permutation-service';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [],
  templateUrl: './navigator.html',
  styleUrl: './navigator.css',
})
export class NavigatorComponent {
  permService = inject(PermutationService);
  router = inject(Router);

  onNext(): void { this.permService.getNext(); }
  onReset(): void {
    this.permService.reset();
    this.router.navigate(['']);
  }
  onShowAll(): void { this.router.navigate(['/results']); }
}
