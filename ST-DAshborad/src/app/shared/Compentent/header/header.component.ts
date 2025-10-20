import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';

interface DecodedToken {
  email?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  adminEmail: string | null = null;
  profileImage = 'assets/images/icon-7797704_640.png';

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
    this.loadUserData();
  }

  loadUserData() {
    const token = this.tokenStorage.getAccessToken();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        this.adminEmail = decoded.email || null;
      } catch (e) {
        console.error('Invalid token', e);
      }
    }
  }

  logout() {
    this.tokenStorage.clear(); 
    this.router.navigate(['/login']); 
  }
}
