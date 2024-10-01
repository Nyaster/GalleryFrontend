import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AppImageDto, ImageService} from "./image.service";
import {DatePipe, Location, NgForOf, NgOptimizedImage, ViewportScroller} from "@angular/common";
import {PageChangedEvent, PaginationModule} from "ngx-bootstrap/pagination";
import {FormsModule} from "@angular/forms";
import {NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions} from "ngx-masonry";
import {animate, style} from "@angular/animations";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {TagifyModule} from "ngx-tagify";
import {SearchComponent} from "./search/search.component";
import {ImageCardComponent} from "./image-card/image-card.component";

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgOptimizedImage,
    PaginationModule,
    FormsModule,
    NgxMasonryModule,
    TagifyModule,
    SearchComponent,
    RouterOutlet,
    RouterLink,
    ImageCardComponent,
  ],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit {
  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;
  images: AppImageDto[] = [];
  page: number = 0;
  pageSize: number = 20; // Set page size as required
  orderBy: string = 'uploadDate'; // Default ordering by upload date
  tags: string[] = [];// Add tags for filtering, e.g., ['nature', 'animals']
  total: number = 0
  optionsMasonry: NgxMasonryOptions = {

  }
  // @ts-ignore
  private url;

  @HostListener('window:keyup.control.arrowRight', ['$event'])
  keyboarderEvent(event: KeyboardEvent) {
    this.nextPage();
  }

  @HostListener('window:keyup.control.arrowLeft', ['$event'])
  keyboarderEvent1(event: KeyboardEvent) {
    this.prevPage();
  }

  constructor(private location: Location, private imageService: ImageService,
              private viewportScroller: ViewportScroller, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.page = +params['page'] || 1;// Default to page 1 if not provided
      }
      if (params['tags']) {
        this.tags = params['tags'].split(',') || [];
      }
      this.loadImages();
    });
  }

  updateQueryParams(): void {
    const queryParams = {
      page: this.page,
      tags: this.tags.join(',')
    };

    // Construct the new URL with updated query params
    this.url = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    }).toString();

    this.location.go(this.url);
  }


  loadImages(): void {
    this.imageService.getImages(this.tags, this.orderBy, this.page, this.pageSize).subscribe({
        next: (data) => {
          this.images = data.images;
          this.total = data.total;
          this.total = (this.page * this.pageSize) < this.total ? this.total : this.page * this.pageSize;
          this.onImageLoad();
        },
        error: (x) => x,
      }
    );
  }


  changePage(event: PageChangedEvent): void {
    if (event.page != this.page) {
      this.page = event.page;
      this.updateQueryParams()
    }
    this.loadImages();

  }
  onImageLoad(): void {
    if (this.masonry) {
      this.masonry.reloadItems();
      this.masonry.layout();
    }
  }

  onTagsChange(newTags: string[]): void {
    this.tags = newTags;// Reset to the first page
    //this.updateQueryParams();  // Update the query parameters with new tags// Reload images with new tag filter
  }

  searchButton() {
    this.page = 1;
    this.updateQueryParams();
    this.loadImages();
  }
  nextPage() {
    this.updateQueryParams();
    this.page = this.page + 1;

  }

  prevPage() {

    if (this.page > 0) {
      this.updateQueryParams();
      this.page = this.page - 1;
    }
  }
}
