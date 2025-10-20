import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './core/services/token-storage.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected readonly title = signal('Dashboard');

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    const token = this.tokenStorage.getAccessToken();
    const currentUrl = this.router.url;

    if (token && !currentUrl.startsWith('/admin')) {
      this.router.navigate(['/admin']);
      return;
    }

    if (!token && !currentUrl.startsWith('/auth/login')) {
      this.router.navigate(['/auth/login']);
    }
  }

  isLoginPage(): boolean {
    return this.router.url.includes('/auth/login');
  }
}
