import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Company, PagedResult } from '../models/company';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private api = `${environment.apiBaseUrl}/api/Company`;

  constructor(private http: HttpClient) {}

  getCompanies(pageNumber = 1, pageSize = 9): Observable<PagedResult<Company>> {
    return this.http.post<PagedResult<Company>>(
      `${this.api}/active`,
      { pageNumber, pageSize }  
    );
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.api}/${id}`);
  }
}
