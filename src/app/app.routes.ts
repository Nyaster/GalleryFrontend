import {Routes} from '@angular/router';
import {AuthGuardService} from "./_service/auth-guard.service";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {HomeComponent} from "./home/home.component";
import {ImagesComponent} from "./images/images.component";
import {ImagePageComponent} from "./images/image-page/image-page.component";

export const routes: Routes = [
  {path: "login", component: AuthorizationComponent}, {
    path: "register", component: AuthorizationComponent
  },
  {
    path: "images", component: ImagesComponent, canActivate: [AuthGuardService]
  },
  {path: "images/:id", component: ImagePageComponent},
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuardService],
  },
  {path: "", redirectTo: "home", pathMatch: "full"}
];
