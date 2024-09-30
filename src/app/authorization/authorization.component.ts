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
    FormsModule,
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {
  login = new FormControl('');
  password = new FormControl('');
  submitButtonText: string = "";
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe(x => {
      this.submitButtonText = x.toString()
    });

  }

  authorization() {
    var loginModel = new LoginModel(this.login.getRawValue()!, this.password.getRawValue()!);
    if (this.submitButtonText === "login") {
      this.authService.login(loginModel).subscribe({
        next: (x) => {
          this.errorMessage = null;
          this.router.navigate(['/images']);
        },
        error: (err) => {
          this.errorMessage = "Something went wrong. Please check your credentials and try again.";
        }
      })
    } else if (this.submitButtonText === "registration") {
      this.authService.register(loginModel).subscribe({
        next: (x) => {
          this.errorMessage = null;
          this.router.navigate(['/images']);
        },
        error: (err) => {
          this.errorMessage = "Something went wrong. Please check your credentials and try again.";
        }
      });
    }
  }
}
