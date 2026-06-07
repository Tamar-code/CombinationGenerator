import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination';
import { GetAllResponse } from '../../models/permutationModel';
import { PermutationService } from '../../service/permutation-service';

@Component({
  selector: 'app-all-permutations',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './all-permutations.html',
  styleUrl: './all-permutations.css',
})
export class AllPermutationsComponent {
  permService = inject(PermutationService);
  router = inject(Router);

  permutations = signal<{ index: number; values: number[] }[]>([]);
  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = 10;

  constructor() {
    this.permService.allPermutationsCurrentIndex.set(0);
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.currentPage.set(page);
    const fromIndex = (page - 1) * this.pageSize;
    this.permService.allPermutationsCurrentIndex.set(fromIndex);
    this.permService.getAll(page, this.pageSize, (res: GetAllResponse) => {
      this.permutations.set(res.permutations.map(p => ({ index: p.index, values: p.permutation })));
      this.totalPages.set(res.totalPages);
    });
  }

  onPageChange(page: number): void { this.loadPage(page); }

  onBack(): void {
    const lastShown = this.permutations()[this.permutations().length - 1];
    if (lastShown) {
      this.permService.currentIndex.set(lastShown.index);
      this.permService.currentPermutation.set(lastShown.values);
    }
    this.router.navigate(['/navigate']);
  }
}
