import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  signIn() {
    console.log(this.email, this.password)

    this.authService.signIn(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Login bem-sucedido:", response);
        this.authService.saveToken(response.token)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Erro ao fazer login:", err);
      }
    });
  }
}
