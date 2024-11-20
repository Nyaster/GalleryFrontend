import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {UploadedImagesComponent} from "./uploaded-images/uploaded-images.component";

@Component({
    selector: 'app-profile',
    imports: [
        RouterOutlet,
        UploadedImagesComponent
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
