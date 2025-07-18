import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../_service/auth.service";
import {Router} from "@angular/router";
import {LoginModel} from "../../_interfaces/login.model";

@Component({
    selector: 'app-register',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
  login = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15),Validators.pattern("^[a-zA-Z0-9]+$")]);
  password = new FormControl('',[Validators.required, Validators.minLength(8)]);
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router,) {

  }

  authorization() {
    var loginModel = new LoginModel(this.login.getRawValue()!, this.password.getRawValue()!);
    this.authService.register(loginModel).subscribe({
      next: (x) => {
        this.errorMessage = null;
        this.router.navigate(['/images']);
      },
      error: (err) => {
        this.errorMessage = "Something went wrong. Please check your credentials and try again.";
      }
    })

  }
}
