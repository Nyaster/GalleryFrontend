import {
  AfterContentInit,
  AfterViewInit,
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
  viewChild
} from '@angular/core';
import {AppImageDto, ImageService, PageableImageDto} from "../images/image.service";
import {ActivatedRoute} from "@angular/router";
import {ImageCardComponent} from "../images/image-card/image-card.component";
import {NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions} from "ngx-masonry";

@Component({
  selector: 'app-image-recommendation',
  imports: [
    ImageCardComponent,
    NgxMasonryModule
  ],
  templateUrl: './image-recommendation.component.html',
  styleUrl: './image-recommendation.component.scss'
})
export class ImageRecommendationComponent implements OnInit, OnChanges{
  public Images!: AppImageDto[];
  optionsMasonry: NgxMasonryOptions = {};
  id = input.required<number>();
  readonly masonry = viewChild.required(NgxMasonryComponent);
  loadCounter : number = 0;
  public constructor(private imageService: ImageService) {
  }

  ngOnChanges(changes:SimpleChanges) {
    this.imageService.getImageRecommendation(this.id()).subscribe({
      next: (data) => {
        this.loadCounter = 0;
        this.Images = [...data];
      },
      error: (err) => console.error(err),
    });
  }
  ngOnInit(): void {
    this.imageService.getImageRecommendation(this.id()).subscribe({
      next: (data) => {
        this.Images = data;
      },
      error: (err) => console.error(err)
    })
  }
  protected count(){
    this.loadCounter++;
    if (this.loadCounter >= 20){
      this.updateMasonryItems();
    }
  }
  protected updateMasonryItems() {
    if(this.masonry()){
      this.masonry().reloadItems();
      this.masonry().layout();
    }
  }
}
