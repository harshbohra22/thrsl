import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-oauth2-callback',
  standalone: true,
  template: `
    <div class="callback-container">
      <div class="spinner"></div>
      <h2>Logging you in...</h2>
      <p>Please wait while we complete the authentication.</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #0f172a;
      color: white;
      font-family: 'Inter', sans-serif;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255, 255, 255, 0.1);
      border-top: 5px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class OAuth2CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        console.log('OAuth2 token captured, processing session...');
        // We capture the token and use a generic "Social User" name since the backend 
        // response currently doesn't include the name.
        this.authService.processToken(token, 'Social User');
        
        // Brief delay for better UX before redirecting
        setTimeout(() => {
          this.router.navigate(['/categories']);
        }, 1200);
      } else {
        console.error('No token found in OAuth2 callback');
        this.router.navigate(['/login']);
      }
    });
  }
}
