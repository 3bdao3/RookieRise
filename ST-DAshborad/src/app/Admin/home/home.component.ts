import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyCardComponent } from '../company-card/company-card.component';
import { Company, PagedResult } from '../../models/company';
import { CompanyService } from '../../core/company.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CompanyCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  companies: Company[] = [];
  page = 1;
  pageSize = 9;
  loading = false;
  hasMore = true;
  noDataMessage = 'No more companies to load.';

  constructor(private cs: CompanyService) {}

  ngOnInit(): void {
    this.loadNext();
    this.setupScrollListener();
  }

  loadNext(): void {
    if (this.loading || !this.hasMore) return;

    this.loading = true;
    this.cs.getCompanies(this.page, this.pageSize).subscribe({
      next: (res: PagedResult<Company>) => {
        this.companies.push(...res.data);   
        this.hasMore = this.page < res.totalPages; 
        this.page++;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  setupScrollListener(): void {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.loadNext();
      }
    }, { root: null, rootMargin: '200px' });

    setTimeout(() => {
      const sentinel = document.querySelector('#scroll-sentinel');
      if (sentinel) observer.observe(sentinel);
    }, 300);
  }

  onViewDetails(companyId: string) {
    console.log('Details for company:', companyId);
  }
}
