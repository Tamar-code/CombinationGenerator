import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { GetAllResponse, NextResponse, StartResponse } from '../models/permutationModel';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PermutationService {
  private http = inject(HttpClient);
  private readonly url = environment.apiUrl;

  public inputNumber = signal<number>(1);
  public totalCount = signal<string>('0');
  public currentIndex = signal<number>(0);
  public currentPermutation = signal<number[]>([]);
  public allPermutationsCurrentIndex = signal<number>(0);
  public hasMore = signal<boolean>(true);
  public loading = signal<boolean>(false);
  public errorMsg = signal<string>('');

  get totalCountDisplay(): string {
    return BigInt(this.totalCount()).toLocaleString('he-IL');
  }

  start(onSuccess?: () => void): void {
    this.loading.set(true);
    this.errorMsg.set('');
    this.http.post<StartResponse>(`${this.url}/start`, { n: this.inputNumber() }).subscribe({
      next: (res) => {
        this.totalCount.set(res.totalCount);
        this.currentIndex.set(0);
        this.currentPermutation.set([]);
        this.hasMore.set(true);
        this.loading.set(false);
        onSuccess?.();
      },
      error: () => {
        this.errorMsg.set('שגיאה בחיבור לשרת');
        this.loading.set(false);
      },
    });
  }

  getNext(): void {
    this.loading.set(true);
    this.http.get<NextResponse>(`${this.url}/next`).subscribe({
      next: (res) => {
        this.currentIndex.set(res.index);
        this.currentPermutation.set(res.permutation);
        this.hasMore.set(res.hasMore);
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('שגיאה בטעינה');
        this.loading.set(false);
      },
    });
  }

  getAll(pageNumber: number, pageSize = 10, onSuccess?: (res: GetAllResponse) => void): void {
    this.loading.set(true);
    this.http.get<GetAllResponse>(`${this.url}/all`, {
      params: { page: pageNumber, pageSize: pageSize, fromIndex: this.allPermutationsCurrentIndex() },
    }).subscribe({
      next: (res) => {
        this.loading.set(false);
        onSuccess?.(res);
      },
      error: () => {
        this.errorMsg.set('שגיאה בטעינה');
        this.loading.set(false);
      },
    });
  }

  reset(): void {
    this.totalCount.set('0');
    this.currentIndex.set(0);
    this.currentPermutation.set([]);
    this.hasMore.set(true);
    this.errorMsg.set('');
    this.inputNumber.set(1);
  }
}
