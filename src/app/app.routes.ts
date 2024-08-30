import {Routes} from '@angular/router';
import {AuthGuardService} from "./_service/auth-guard.service";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {HomeComponent} from "./home/home.component";
import {ImagesComponent} from "./images/images.component";

export const routes: Routes = [
  {path: "login", component: AuthorizationComponent}, {
    path: "register", component: AuthorizationComponent
  },
  {path: "images", component: ImagesComponent, canActivate: [AuthGuardService]},
  {
    path: "", component: HomeComponent, canActivate: [AuthGuardService],
  }
];
