import {Component, HostListener, OnInit, viewChild} from '@angular/core';
import {AppImageDto, ImageService} from "./image.service";
import { DatePipe, Location, NgOptimizedImage, ViewportScroller } from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions} from "ngx-masonry";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {SearchComponent} from "./search/search.component";
import {ImageCardComponent} from "./image-card/image-card.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-images',
  imports: [
    DatePipe,
    NgOptimizedImage,
    FormsModule,
    NgxMasonryModule,
    SearchComponent,
    RouterOutlet,
    RouterLink,
    ImageCardComponent,
    NgbPagination
  ],
    templateUrl: './images.component.html',
    styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit {
  readonly masonry = viewChild.required(NgxMasonryComponent);

  images: AppImageDto[] = [];
  page: number = 1;
  pageSize: number = 20;
  orderBy: string = 'uploadDate';
  tags: string[] = [];
  total: number = 0;
  fanImages: boolean = false;
  optionsMasonry: NgxMasonryOptions = {};

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fanImages = this.router.url.startsWith('/fan-images');
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] ? +params['page'] : 1;
      this.tags = params['tags'] ? params['tags'].split(',') : [];
      this.loadImages();
    });
  }

  changePage($event:number): void {
    this.updateQueryParams();
  }

  searchButton() {
    this.page = 1; // Reset to page 1 for a new search
    this.updateQueryParams();
  }

  @HostListener('window:keyup.control.arrowRight', ['$event'])
  nextPage() {
    const totalPages = Math.ceil(this.total / this.pageSize);
    if (this.page < totalPages) {
      this.page++;
      this.updateQueryParams();
    }
  }

  @HostListener('window:keyup.control.arrowLeft', ['$event'])
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updateQueryParams();
    }
  }


  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page > 1 ? this.page : null,
        tags: this.tags.length > 0 ? this.tags.join(',') : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  loadImages(): void {
    const apiPage = this.page;
    this.imageService.getImages(this.tags, this.orderBy, apiPage, this.pageSize, this.fanImages).subscribe({
        next: (data) => {
          this.images = data.images;
          this.total = data.total;
          this.onImageLoad();
        },
        error: (err) => console.error(err),
      }
    );
  }

  onTagsChange(newTags: string[]): void {
    this.tags = newTags;
  }

  onImageLoad(): void {
    setTimeout(() => {
      const masonry = this.masonry();
      if (masonry) {
        masonry.reloadItems();
        masonry.layout();
      }
    }, 0);
  }
}
