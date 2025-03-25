import { Component } from '@angular/core';

@Component({
  selector: 'app-session-init-require',
  standalone: true,
  imports: [],
  template: `
    <div class="container" style="text-align: center; margin: auto">
      <img src="../assets/logo/logo.png" width="400px">
      <p>Necesita iniciar sesión para acceder a esta sección, <a href="log-in">pulse aqui para iniciar sesión si ya tiene una cuenta</a></p>
      <p>Si no tiene cuenta puede, <a href="sign-in">pulsar aqui para crear una nueva cuenta</a></p>
    </div>
  `,
  styleUrl: './session-init-require.component.css'
})
export class SessionInitRequireComponent {

}
