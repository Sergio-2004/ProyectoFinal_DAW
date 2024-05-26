import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{

  constructor(private http: HttpClient){}

  public notSamePassword: boolean = false;
  sessionService: SessionService = inject(SessionService);

  ngOnInit(): void {
  }

  EULAPopup(){
    var externalWindow = null;
    externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200')?.document.write(`
    <h1>Condiciones de Uso para BetaNet</h1>


    <p>Bienvenido a BetaNet. Antes de utilizar nuestros servicios, te solicitamos que leas detenidamente estas condiciones de uso. Estas condiciones rigen tu acceso y uso de nuestra plataforma. Al acceder o utilizar nuestro sitio web, aceptas estar legalmente vinculado por estas condiciones. Si no estás de acuerdo con alguna parte de estas condiciones, por favor no utilices nuestros servicios.</p>



    <h3>Descripción del Servicio</h3>

    <p>Nuestra plataforma permite a los usuarios publicar versiones beta de sus juegos para que otros usuarios puedan probarlos y proporcionar comentarios y sugerencias. Los juegos disponibles en nuestra plataforma están en desarrollo y son versiones no finales. Los usuarios pueden registrarse, explorar juegos beta y participar en sus pruebas.</p>


    <h3>Registro de Usuario</h3>

    <p>Para acceder a la mayoría de las funciones de nuestra plataforma, es necesario registrarse como usuario. Debes proporcionar información precisa y completa durante el proceso de registro. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Si tienes razones para creer que la seguridad de tu cuenta ha sido comprometida, debes notificarnos de inmediato.</p>


    <h3>Publicación de Juegos Beta</h3>

    <p>Los desarrolladores pueden publicar sus juegos beta en nuestra plataforma para que otros usuarios puedan probarlos. Al publicar un juego, el desarrollador acepta que el juego está en fase de desarrollo y puede contener errores. Los desarrolladores conservan todos los derechos sobre sus juegos y son responsables de los contenidos que publiquen.</p>


    <h3>Uso Aceptable</h3>

    <p>Los usuarios deben utilizar nuestra plataforma de manera responsable y respetuosa. No se permite el uso indebido del sitio, incluyendo actividades ilegales, difamatorias, ofensivas o que violen los derechos de propiedad intelectual de terceros.</p>


    <h3>Comentarios y Retroalimentación</h3>

    <p>Animamos a los usuarios a proporcionar comentarios constructivos y útiles sobre los juegos beta. Sin embargo, los comentarios deben ser respetuosos y relevantes. No se permiten comentarios que sean difamatorios, ofensivos o inapropiados.</p>


    <h3>Propiedad Intelectual</h3>

    <p>Respetamos los derechos de propiedad intelectual de terceros. Los desarrolladores conservan todos los derechos sobre los juegos que publican en nuestra plataforma. Los usuarios deben respetar estos derechos y no infringirlos.</p>


    <h3>Limitación de Responsabilidad</h3>

    <p>Nuestra plataforma se proporciona "tal cual". No garantizamos la disponibilidad continua o ininterrumpida del sitio web, ni la exactitud o confiabilidad de cualquier contenido disponible en él. Los usuarios utilizan nuestra plataforma bajo su propio riesgo.</p>


    <h3>Modificaciones de las Condiciones de Uso</h3>


    <p>Nos reservamos el derecho de modificar estas condiciones de uso en cualquier momento. Las modificaciones entrarán en vigencia tan pronto como se publiquen en nuestro sitio web. Es responsabilidad del usuario revisar periódicamente estas condiciones para estar al tanto de cualquier cambio.</p>


    <h3>Ley Aplicable</h3>

    <p>Estas condiciones de uso se rigen por las leyes de la Unión Europea sin tener en cuenta sus conflictos de principios legales.</p>


    <p>Al utilizar nuestra plataforma, aceptas estas condiciones de uso. Si tienes alguna pregunta o inquietud sobre estas condiciones, no dudes en contactarnos. Te agradecemos por ser parte de nuestra comunidad de pruebas de juegos beta y esperamos que disfrutes de tu experiencia en nuestra plataforma.</p>

    `);
  }

  signIn(username: string, password: string, password2 : string, eula: boolean){

    if(username != '' && password != '' && password == password2 && eula) {
      this.http.get<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/signIn.php',  { params: { "username": username, "password": password }})
      .subscribe((response) => {
        console.log(response)
        switch (response.message){
          case "Duplicate entry '"+username+"' for key 'unique_username'":
            break;
          case "Registration successful":
            this.sessionService.setSession(response.user);
            history.back();
            break;
          default:
            break;
        }
        alert(response.message);
      });
    }
  }
}
