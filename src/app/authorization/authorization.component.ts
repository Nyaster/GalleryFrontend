import {Component} from '@angular/core';
import {AuthService} from "../_service/auth.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginModel} from "../_interfaces/login.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {
  login = new FormControl('');
  password = new FormControl('');
  submitButtonText: string = "";

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe(x => {
      this.submitButtonText = x.toString()
    });

  }

  authorization() {
    var loginModel = new LoginModel(this.login.getRawValue()!, this.password.getRawValue()!);
    this.submitButtonText === "login" ? this.authService.login(loginModel).subscribe(response => {
      console.log(`Logged in ${response}`);
      this.router.navigate(['/']);
    }) : this.authService.register(loginModel).subscribe(response => {
      console.log(`registered in ${response}`);
      this.router.navigate(['/']);
    })
    ;

  }
}
