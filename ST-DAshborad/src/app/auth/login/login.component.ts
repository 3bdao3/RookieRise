import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRequestDto } from '../../models/LoginRequestDto';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  currentLanguage: string = 'EN';

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
      language: [this.currentLanguage]
    });
  }

  changeLanguage(event: any) {
    this.currentLanguage = event.target.value;
    this.form.patchValue({ language: this.currentLanguage });
    console.log('Language changed to:', this.currentLanguage);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const payload: LoginRequestDto = this.form.value;

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.tokenStorage.saveTokens(res, payload.rememberMe);
        this.loading = false;
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Login failed';
      }
    });
  }
}
