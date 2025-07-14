import {
  Component,
  effect,
  OnInit,
  ViewEncapsulation,
  input,
  output
} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";
import {environment} from "../../../environments/environment";
import {NgSelectComponent} from "@ng-select/ng-select";

export interface Tag {
  name: string;
}

@Component({
    selector: 'app-search',
  imports: [
    FormsModule,
    AsyncPipe,
    NgSelectComponent
  ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  readonly tagsFromAbove = input.required<string[]>();
  readonly tagsChange = output<string[]>();
  readonly search = output<void>();

  selectedTags: Tag[] = [];
  tags$!: Observable<Tag[]>;
  typeahead = new Subject<string>();

  constructor(private http: HttpClient) {
    effect(() => {
      const tagNames = this.tagsFromAbove();
      this.selectedTags = tagNames.map(name => ({ name }));
    });
  }

  ngOnInit(): void {
    this.loadTags();
  }

  private loadTags(): void {
    this.tags$ = this.typeahead.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (!term || term.length < 2) {
          return of([]);
        }
        return this.http.get<Tag[]>(
          `${environment.apiUrl}/api/tags/suggestions?tag=${term}`
        );
      })
    );
  }

  onSelectionChange(): void {
    const tagNames = this.selectedTags.map(tag => tag.name);
    this.tagsChange.emit(tagNames);
  }

  onSearchClick(): void {
    this.search.emit();
  }

}
