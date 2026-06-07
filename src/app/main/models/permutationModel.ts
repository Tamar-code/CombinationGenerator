export interface StartResponse {
  totalCount: string;
}

export interface NextResponse {
  index: number;
  permutation: number[];
  hasMore: boolean;
}

export interface PermutationItem {
  index: number;
  permutation: number[];
}

export interface GetAllResponse {
  permutations: PermutationItem[];
  hasMore: boolean;
  totalPages: number;
}
