import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-card',
   standalone: true,
  imports: [CommonModule], 
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {
  @Input() company!: Company;
  @Output() viewDetails = new EventEmitter<string>();

  getLogoUrl(): string {
    const logo = this.company?.logoUrl;
    if (!logo) return '/assets/placeholders/favicon.png';
    if (logo.startsWith('http')) return logo;
    return `${environment.apiBaseUrl}${logo}`; 
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholders/favicon.ico';
  }

  onViewDetails() {
    this.viewDetails.emit(this.company.id);
  }
}
