import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
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

        next: (response) => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.router.navigate(['/loans']);
        },

        error: () => {

          alert(
            'Usuario o contraseña inválidos'
          );
        }
      });
  }
}