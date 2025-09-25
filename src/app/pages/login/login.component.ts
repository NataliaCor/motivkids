import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Simular login - aquí iría la lógica real de autenticación
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }, 1500);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  navigateToRegister() {
    // Navegar a registro - implementar cuando exista la ruta
    console.log('Navegar a registro');
  }

  navigateToForgotPassword() {
    // Navegar a recuperar contraseña - implementar cuando exista la ruta
    console.log('Navegar a recuperar contraseña');
  }

  // Getters para facilitar el acceso a los controles en el template
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
