import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {TagifyModule, TagifyService} from "ngx-tagify";
import {environment} from "../../environments/environment";
import {Tag} from "../images/search/search.component";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    FormsModule,
    TagifyModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  apiImagesEndpoint: string = '';
  imagePreviewUrl = '';
  whitelist$ = new BehaviorSubject<string[]>([]);
  selectedFile: File | null = null;
  isHidden = false;
  tags: string[] = [];
  searchSubject = new Subject<string>();
  tagifySettings = {// Predefined suggestions// Limit the number of tags
    placeholder: 'Add tags...',
    dropdown: {
      enabled: 1,
      maxItems: 5,
      closeOnSelect: true,
      fuzzySearch: true
    }, enforceWhitelist: false,
    autoComplete: {
      enabled: true,
    }// Allow custom tags
  };

  constructor(private http: HttpClient, private tagifyService: TagifyService) {
    this.apiImagesEndpoint = environment.apiUrl + '/api/images/'
  }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((search: string) => {
      this.getTagsSuggestion(search);
    });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      // Generate preview URL
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getTagsSuggestion($event: string) {
    this.http.get<Tag[]>(environment.apiUrl + `/api/tags/suggestions?tag=${$event}`)
      .subscribe(suggestions => {
        this.whitelist$.next(suggestions.map(x => x.name));
        this.tagifyService.get("upload").dropdown.show();
      })
  }

  onInputSuggestion($event: string): void {
    if (!$event || $event.length === 0) return;
    this.searchSubject.next($event);
  }

  submitForm(): void {
    if (!this.selectedFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('ImageFile', this.selectedFile);
    formData.append('IsHidden', String(this.isHidden));
    // @ts-ignore
    const value = this.tags.map(x => x.value);
    value.forEach(x=>{
      formData.append('Tags', x);
    });


    this.http.post(this.apiImagesEndpoint, formData).subscribe({
      next: () => alert('Image uploaded successfully!'),
      error: (err) => {
        console.error('Upload failed:', err);
        alert('Failed to upload image.');
      }
    });
  }
}
