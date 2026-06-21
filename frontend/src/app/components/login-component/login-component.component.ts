import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss'
})
export class LoginComponentComponent {

  username = '';
  password = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  login() {

  this.authService
    .login({
      username: this.username,
      password: this.password
    })
    .subscribe({

      next: response => {

        localStorage.setItem(
          'token',
          response.token
        );

        this.router.navigate(['/loans']);

      },

      error: () => {

        alert(
          'Invalid username or password'
        );

      }
    });
}
}