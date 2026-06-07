import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PermutationService } from '../../service/permutation-service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputComponent {
  permService = inject(PermutationService);
  private router = inject(Router);

  isValid(): boolean {
    const n = this.permService.inputNumber();
    return n >= 1 && n <= 20;
  }

  onStart(): void {
    if (this.isValid()) {
      this.permService.start(() => {
        this.router.navigate(['/navigate']);
      });
    }
  }
}
