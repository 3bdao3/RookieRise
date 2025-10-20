export interface Company {
  id: string;
  nameEn: string;
  nameAr: string;
  email?: string | null;
  websiteUrl?: string | null;
  employeeCount?: number | null;
  logoUrl?: string | null;
}
export interface PagedResult<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
