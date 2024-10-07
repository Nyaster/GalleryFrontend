import {Routes} from '@angular/router';
import {AuthGuardService} from "./_service/auth-guard.service";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {HomeComponent} from "./home/home.component";
import {ImagesComponent} from "./images/images.component";
import {ImagePageComponent} from "./images/image-page/image-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {AdminComponent} from "./admin/admin/admin.component";
import {AdminGuardService} from "./_service/admin-guard.service";
import {RegisterComponent} from "./authorization/register/register.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {UploadComponent} from "./upload/upload.component";

export const routes: Routes = [
  {path: "login", component: AuthorizationComponent}, {
    path: "register", component: RegisterComponent
  },
  {
    path: "images", component: ImagesComponent, canActivate: [AuthGuardService]
  },
  {path: "images/:id", component: ImagePageComponent},
  {
    path: "home", component: HomeComponent,
  }, {
    path: "admin", component: AdminComponent, canActivate: [AuthGuardService, AdminGuardService]
  },
  {path: "profile", component: ProfileComponent},
  {path: "upload", component: UploadComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: '**', component: PageNotFoundComponent}
];
